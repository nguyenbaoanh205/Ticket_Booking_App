import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";

export default function AdminScan() {
    const scannerRef = useRef(null);
    const lastScannedRef = useRef(null);
    const lockRef = useRef(false);

    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        if (scannerRef.current) return;

        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 30, qrbox: 280 },
            false
        );

        scanner.render(
            async (decodedText) => {
                try {
                    const payload = JSON.parse(decodedText);
                    const ticketCode = payload.ticketCode;

                    if (lockRef.current && lastScannedRef.current === ticketCode) {
                        setMessage("⚠️ Vé này vừa được quét");
                        setType("warning");
                        return;
                    }

                    lockRef.current = true;
                    lastScannedRef.current = ticketCode;

                    const res = await axios.post("/admin/checkin", { ticketCode });

                    setMessage(res.data.message);
                    setType("success");

                } catch (err) {
                    setMessage(err.response?.data?.message || "❌ QR không hợp lệ");
                    setType("error");
                }

                // ⏱ mở khóa sau 3s
                setTimeout(() => {
                    lockRef.current = false;
                    lastScannedRef.current = null;
                }, 4000);
            },
            () => { }
        );

        scannerRef.current = scanner;

        return () => scanner.clear();
    }, []);

    const messageStyle = {
        success: "bg-green-50 text-green-700 border-green-200",
        error: "bg-red-50 text-red-700 border-red-200",
        warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-center text-slate-800 mb-4">
                    📷 Admin Scan QR
                </h2>

                <div className="flex justify-center mb-4">
                    <div
                        id="reader"
                        className="qr-wrapper rounded-lg overflow-hidden border border-slate-300"
                    />
                </div>

                {message && (
                    <div
                        className={`mt-4 text-sm border rounded-md px-3 py-2 text-center ${messageStyle[type]
                            }`}
                    >
                        {message}
                    </div>
                )}

                <p className="mt-6 text-xs text-center text-slate-400">
                    Quét QR vé để check-in sự kiện
                </p>
            </div>
        </div>
    );
}

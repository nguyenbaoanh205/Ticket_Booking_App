import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";

export default function AdminScan() {
    const scannerRef = useRef(null);
    const lockRef = useRef(false);
    const [flash, setFlash] = useState("");

    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [scanning, setScanning] = useState(true);

    const startScanner = () => {
        lockRef.current = false;

        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 20, qrbox: 280 },
            false
        );

        scanner.render(
            async (decodedText) => {
                if (lockRef.current) return;
                lockRef.current = true;

                try {
                    const payload = JSON.parse(decodedText);
                    const ticketCode = payload.ticketCode;

                    const res = await axios.post("/admin/checkin", {
                        ticketCode
                    });

                    setMessage(res.data.message);
                    setType("success");
                    setFlash("success");

                    setTimeout(() => setFlash(""), 600);
                } catch (err) {
                    setMessage(err.response?.data?.message || "❌ QR không hợp lệ");
                    setType("error");
                    setFlash("error");

                    setTimeout(() => setFlash(""), 600);
                }

                // 🛑 TẮT CAMERA SAU KHI QUÉT
                await scanner.clear();
                setScanning(false);
            },
            () => { }
        );

        scannerRef.current = scanner;
    };

    useEffect(() => {
        startScanner();
        return () => scannerRef.current?.clear();
    }, []);

    const handleRescan = () => {
        setMessage("");
        setType("");
        setScanning(true);

        setTimeout(() => {
            startScanner();
        }, 300);
    };

    const messageStyle = {
        success: "bg-green-50 text-green-700 border-green-200",
        error: "bg-red-50 text-red-700 border-red-200",
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 relative">

            {flash && (
                <div
                    className={`
                    fixed inset-0 z-50 pointer-events-none
                    transition-opacity duration-500
                    ${flash === "success"
                            ? "bg-green-300/40"
                            : "bg-red-300/40"}
                `}
                />
            )}

            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 relative z-10">

                <h2 className="text-2xl font-bold text-center text-slate-800 mb-4">
                    📷 Admin Scan QR
                </h2>

                {scanning && (
                    <div className="flex justify-center mb-4">
                        <div
                            id="reader"
                            className="qr-wrapper rounded-lg overflow-hidden border border-slate-300"
                        />
                    </div>
                )}

                {message && (
                    <div
                        className={`
                        mt-4 text-sm border rounded-md px-3 py-2 text-center
                        transform transition-all duration-500
                        animate-fade-in-up
                        ${messageStyle[type]}
                    `}
                    >
                        {message}
                    </div>
                )}

                {!scanning && (
                    <button
                        onClick={handleRescan}
                        className="
                        mt-6 w-full bg-blue-600 hover:bg-blue-700
                        text-white py-2 rounded-lg font-semibold
                        transition transform hover:scale-[1.02] active:scale-[0.97]
                    "
                    >
                        🔄 Quét vé tiếp theo
                    </button>
                )}

                <p className="mt-6 text-xs text-center text-slate-400">
                    Quét QR vé để check-in sự kiện
                </p>
            </div>
        </div>
    );
}

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";

export default function AdminScan() {
    const scannerRef = useRef(null);
    const [message, setMessage] = useState("");
    const scannedRef = useRef(false); // 🚫 chống scan liên tục

    useEffect(() => {
        if (scannerRef.current) return;

        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 10,
                qrbox: 250
            },
            false
        );

        scanner.render(
            async (decodedText) => {

                if (scannedRef.current) return;
                scannedRef.current = true;

                try {
                    const payload = JSON.parse(decodedText);

                    const res = await axios.post("/admin/checkin", {
                        bookingId: payload.bookingId
                    });

                    setMessage(res.data.message);
                } catch (err) {
                    setMessage(
                        err.response?.data?.message || "❌ QR không hợp lệ"
                    );
                }

                setTimeout(() => {
                    scannedRef.current = false;
                }, 3000);
            },
            (err) => { }
        );

        scannerRef.current = scanner;

        return () => {
            scanner.clear();
        };
    }, []);

    return (
        <div>
            <h2>📷 Admin Scan QR</h2>
            <div id="reader" style={{ width: 300 }} />
            <p>{message}</p>
        </div>
    );
}

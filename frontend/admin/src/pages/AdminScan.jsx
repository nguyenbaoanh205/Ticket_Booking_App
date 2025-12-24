import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";

export default function AdminScan() {
  const scannerRef = useRef(null);
  const lastScannedRef = useRef(null);
  const lockRef = useRef(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (scannerRef.current) return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 30, qrbox: 300 },
      false
    );

    scanner.render(
      async (decodedText) => {
        try {
          const payload = JSON.parse(decodedText);
          const ticketCode = payload.ticketCode;

          // 🚫 Chống quét trùng trong phiên
          if (lockRef.current && lastScannedRef.current === ticketCode) {
            setMessage("⚠️ QR này vừa được quét");
            return;
          }

          lockRef.current = true;
          lastScannedRef.current = ticketCode;

          const res = await axios.post("/admin/checkin", { ticketCode });
          setMessage(res.data.message);

        } catch (err) {
          setMessage(err.response?.data?.message || "❌ QR không hợp lệ");
        }

        // ⏱ mở khóa sau 3s
        setTimeout(() => {
          lockRef.current = false;
          lastScannedRef.current = null;
        }, 3000);
      },
      () => {}
    );

    scannerRef.current = scanner;

    return () => scanner.clear();
  }, []);

  return (
    <div>
      <h2>📷 Admin Scan QR</h2>
      <div id="reader" style={{ width: 300 }} />
      <p>{message}</p>
    </div>
  );
}

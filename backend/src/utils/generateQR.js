const QRCode = require("qrcode");
const path = require("path");
const fs = require("fs");

module.exports = async (data, fileName) => {
    try {
        const qrDir = path.join(__dirname, "../public/qrs");

        // tạo folder nếu chưa có
        if (!fs.existsSync(qrDir)) {
            fs.mkdirSync(qrDir, { recursive: true });
        }

        const filePath = path.join(qrDir, `${fileName}.png`);

        await QRCode.toFile(
            filePath,
            JSON.stringify(data),
            {
                errorCorrectionLevel: "H",
                type: "png",
                width: 300,
                margin: 2
            }
        );

        return `/qrs/${fileName}.png`; // 👈 URL để admin quét
    } catch (err) {
        console.error("❌ Generate QR file error:", err);
        throw err;
    }
};

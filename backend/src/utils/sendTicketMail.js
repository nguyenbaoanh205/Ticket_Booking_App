const transporter = require("../config/mail");
const path = require("path");

module.exports = async ({ to, userName, event, tickets }) => {
  const eventDate = new Date(event.date).toLocaleString("vi-VN");

  // 1️⃣ Tạo attachments từ danh sách vé
  const attachments = tickets.map((t, index) => {
    const fileName = path.basename(t.qrCode); // ticket_xxx.png
    return {
      filename: fileName,
      path: path.join(__dirname, "../public/qrs", fileName),
      cid: `qr${index}` // 👈 mỗi QR 1 CID
    };
  });

  // 2️⃣ Render HTML cho từng vé
  const ticketsHtml = tickets
    .map(
      (t, index) => `
        <hr style="margin:40px 0; border:none; border-top:1px solid #eee;" />

        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="font-size:18px; font-weight:700; text-align:center;">
              Vé #${index + 1}
            </td>
          </tr>
          <tr>
            <td style="text-align:center; padding:15px 0;">
              <div style="font-size:20px; font-weight:700; letter-spacing:2px;">
                ${t.ticketCode}
              </div>
            </td>
          </tr>
          <tr>
            <td style="text-align:center;">
              <img 
                src="cid:qr${index}" 
                alt="QR Code Vé"
                style="width:260px; height:260px; border:1px solid #ddd; border-radius:6px;"
              />
            </td>
          </tr>
          <tr>
            <td style="text-align:center; font-size:15px; font-weight:600; color:#c70000; padding-top:10px;">
              Vé chỉ sử dụng được 1 lần
            </td>
          </tr>
        </table>
      `
    )
    .join("");

  // 3️⃣ Gửi mail
  await transporter.sendMail({
    from: `"Ticket Booking System" <${process.env.EMAIL}>`,
    to,
    subject: `🎫 Vé tham dự sự kiện: ${event.title}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="font-family:Arial,sans-serif; background:#fff; color:#333;">
        <div style="max-width:600px; margin:20px auto;">

          <h2 style="text-align:center;">Thanh toán thành công 🎉</h2>
          <p style="text-align:center;">
            Xin chào <strong>${userName}</strong>,<br/>
            Dưới đây là vé tham dự sự kiện của bạn:
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
            <tr>
              <td><strong>Sự kiện:</strong></td>
              <td>${event.title}</td>
            </tr>
            <tr>
              <td><strong>Địa điểm:</strong></td>
              <td>${event.location}</td>
            </tr>
            <tr>
              <td><strong>Thời gian:</strong></td>
              <td>${eventDate}</td>
            </tr>
          </table>

          ${ticketsHtml}

          <p style="text-align:center; margin-top:40px; font-size:14px; color:#777;">
            Vui lòng xuất trình QR code khi check-in.<br/>
            Chúc bạn tham gia sự kiện vui vẻ!
          </p>

        </div>
      </body>
      </html>
    `,
    attachments
  });
};

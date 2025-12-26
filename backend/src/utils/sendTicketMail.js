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
      <html lang="vi">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Vé sự kiện</title>
      </head>

      <body style="margin:0; padding:0; background-color:#f3f4f6; font-family:Arial, Helvetica, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6; padding:20px 0;">
          <tr>
            <td align="center">

              <!-- Container -->
              <table width="100%" cellpadding="0" cellspacing="0" 
                style="max-width:600px; background:#ffffff; border-radius:12px; overflow:hidden;">

                <!-- Header -->
                <tr>
                  <td style="padding:24px; text-align:center; background:#0f172a; color:#ffffff;">
                    <h1 style="margin:0; font-size:22px;">🎉 Thanh toán thành công</h1>
                    <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">
                      Ticket Booking System
                    </p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding:24px; color:#333333;">
                    <p style="margin:0 0 16px; font-size:16px;">
                      Xin chào <strong>${userName}</strong>,
                    </p>

                    <p style="margin:0 0 24px; font-size:15px; line-height:1.6;">
                      Cảm ơn bạn đã thanh toán thành công.  
                      Dưới đây là thông tin vé tham dự sự kiện của bạn:
                    </p>

                    <!-- Event info -->
                    <table width="100%" cellpadding="0" cellspacing="0"
                      style="background:#f8fafc; border-radius:8px; padding:16px;">
                      <tr>
                        <td style="padding:6px 0; font-size:14px;"><strong>Sự kiện:</strong></td>
                        <td style="padding:6px 0; font-size:14px;">${event.title}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0; font-size:14px;"><strong>Địa điểm:</strong></td>
                        <td style="padding:6px 0; font-size:14px;">${event.location}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0; font-size:14px;"><strong>Thời gian:</strong></td>
                        <td style="padding:6px 0; font-size:14px;">${eventDate}</td>
                      </tr>
                    </table>

                    <!-- Tickets -->
                    <div style="margin-top:24px;">
                      ${ticketsHtml}
                    </div>

                    <!-- Note -->
                    <div style="margin-top:32px; text-align:center;">
                      <p style="margin:0; font-size:14px; color:#555;">
                        📱 Vui lòng xuất trình <strong>QR code</strong> khi check-in
                      </p>
                      <p style="margin:8px 0 0; font-size:14px; color:#777;">
                        Chúc bạn tham gia sự kiện vui vẻ!
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding:16px; text-align:center; background:#f8fafc; font-size:12px; color:#888;">
                    © ${new Date().getFullYear()} Ticket Booking System  
                    <br/> Email này được gửi tự động, vui lòng không trả lời
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      </body>
      </html>
  `,
    attachments
  });

};

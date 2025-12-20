const transporter = require("../config/mail");
const path = require("path");

module.exports = async ({ to, userName, event, ticketCode, qrCode }) => {
  await transporter.sendMail({
    from: `"Ticket Booking System" <${process.env.EMAIL}>`,
    to,
    subject: `🎫 Vé tham dự sự kiện: ${event.title}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vé tham dự sự kiện</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
            background-color: #ffffff; margin: 0; padding: 0; color: #333333; 
            line-height: 1.6;
          }
          .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; }
          .header { padding: 30px 20px 25px; text-align: center; border-bottom: 1px solid #eeeeee; }
          .header h1 { margin: 0; font-size: 26px; font-weight: 600; }
          .header p { margin: 10px 0 0; font-size: 15px; color: #666666; }
          .content { padding: 30px; }
          .greeting { font-size: 17px; margin-bottom: 25px; text-align: center; }
          .greeting h2 { margin: 0 0 12px; font-size: 24px; font-weight: 600; }
          table.info-table { 
            width: 100%; max-width: 520px; margin: 20px auto 30px; border-collapse: collapse; 
          }
          table.info-table td { padding: 10px 0; vertical-align: top; border-bottom: 1px solid #f2f2f2; }
          table.info-table tr:last-child td { border-bottom: none; }
          table.info-table .label { 
            font-weight: 600; color: #000000; width: 35%; font-size: 16px; 
            padding-right: 15px; text-align: left; 
          }
          table.info-table .value { 
            color: #333333; width: 65%; font-size: 16px; text-align: left; 
          }
          table.info-table .value strong { font-weight: 600; }
          .ticket-code { 
            font-size: 23px; 
            font-weight: 700; 
            text-align: center; 
            margin: 26px 0; 
            letter-spacing: 2px; 
            color: #000000; 
          }
          .qr-section { text-align: center; margin: 40px 0 30px; }
          .qr-note { font-size: 17px; font-weight: 600; margin-bottom: 18px; color: #000000; }
          .important-note { font-weight: 700; color: #c70000ff; margin-top: 24px; font-size: 16px; }
          .button { 
            display: inline-block; 
            background-color: #f8f8f8; 
            color: #333333; 
            padding: 12px 32px; 
            text-decoration: none; 
            border-radius: 6px; 
            font-weight: 600; 
            font-size: 16px; 
            margin: 25px 0; 
            border: 1px solid #dddddd; 
          }
          .footer { 
            padding: 30px; 
            text-align: center; 
            font-size: 14px; 
            color: #777777; 
            border-top: 1px solid #eeeeee; 
          }
          @media (max-width: 600px) {
            .header { padding: 25px 20px 20px; }
            .header h1 { font-size: 24px; }
            .content { padding: 25px 20px; }
            .greeting { font-size: 16px; margin-bottom: 20px; }
            .greeting h2 { font-size: 22px; }
            table.info-table { max-width: 100%; }
            table.info-table .label, table.info-table .value { 
              font-size: 15.5px; padding: 9px 0; 
            }
            .ticket-code { font-size: 24px; letter-spacing: 1.5px; }
            .qr-note { font-size: 16px; }
            .button { padding: 12px 28px; font-size: 15px; }
          }
        </style>
      </head>
      <body>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <table class="container" cellpadding="0" cellspacing="0">
                <!-- Header -->
                <tr>
                  <td class="header">
                    <h1>Ticket Booking System</h1>
                    <p>Xác nhận vé tham dự sự kiện</p>
                  </td>
                </tr>
                <!-- Content -->
                <tr>
                  <td class="content">
                    <div class="greeting">
                      <h2>Thanh toán thành công!</h2>
                      <p>Xin chào <strong>${userName}</strong>,</p>
                      <p>Cảm ơn bạn đã đặt vé. Dưới đây là thông tin vé tham dự sự kiện:</p>
                    </div>

                    <table class="info-table" cellpadding="0" cellspacing="0">
                      <tr>
                        <td class="label">Sự kiện:</td>
                        <td class="value"><strong>${event.title}</strong></td>
                      </tr>
                      <tr>
                        <td class="label">Địa điểm:</td>
                        <td class="value">${event.location}</td>
                      </tr>
                      <tr>
                        <td class="label">Thời gian:</td>
                        <td class="value">${event.date}</td>
                      </tr>
                      <tr>
                        <td class="label">Mã vé:</td>
                        <td class="value"><span class="ticket-code">${ticketCode}</span></td>
                      </tr>
                    </table>

                    <div class="qr-section">
                      <p class="qr-note">Vui lòng xuất trình QR code dưới đây khi check-in</p>
                      <img src="cid:ticketqr" alt="QR Code Vé" style="width:280px; height:280px; border:1px solid #dddddd; border-radius:6px;" />
                      <p class="important-note">Vé chỉ sử dụng được một lần duy nhất.</p>
                    </div>

                    <div style="text-align:center;">
                      <a href="#" class="button">Thêm vào lịch cá nhân</a>
                      <p style="font-size:14px; color:#777777; margin-top:10px;">(Liên kết iCal/Google Calendar nếu có)</p>
                    </div>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td class="footer">
                    <p>Chúc bạn tham gia sự kiện vui vẻ!</p>
                    <p>Nếu cần hỗ trợ, liên hệ: support@ticketbooking.com</p>
                    <p>&copy; 2025 Ticket Booking System. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    attachments: [
      {
        filename: "ticket-qr.png",
        path: path.join(__dirname, `../public${qrCode}`),
        cid: "ticketqr"
      }
    ]
  });
};
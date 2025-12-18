const transporter = require("../config/mail");
const path = require("path");

module.exports = async ({ to, userName, event, ticketCode, qrCode }) => {
  await transporter.sendMail({
    from: `"Ticket Booking System" <${process.env.EMAIL}>`,
    to,
    subject: `🎫 Vé tham dự: ${event.title}`,
    html: `
      <h2>🎉 Thanh toán thành công!</h2>

      <p>Xin chào <b>${userName}</b>,</p>

      <p><b>Sự kiện:</b> ${event.title}</p>
      <p><b>Địa điểm:</b> ${event.location}</p>
      <p><b>Thời gian:</b> ${event.date}</p>
      <p><b>Mã vé:</b> <strong>${ticketCode}</strong></p>

      <p>📌 Xuất trình QR khi check-in</p>

      <img src="cid:ticketqr" width="200" />

      <p style="margin-top:16px;">
        Vé chỉ sử dụng <b>1 lần</b>.  
        Chúc bạn tham gia sự kiện vui vẻ 🎊
      </p>
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

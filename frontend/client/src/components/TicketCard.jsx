import { QRCode } from "react-qr-code";

export default function TicketCard({ ticket }) {
  const { eventId, ticketCode, isUsed } = ticket;

  return (
    <div className="flex bg-white rounded-xl shadow-md border overflow-hidden">
      <div className="w-1/3 flex items-center justify-center bg-gray-50 p-4 border-r">
        <QRCode
          value={ticketCode}
          size={120}
        />
      </div>

      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold">{eventId?.title}</h2>
          <p className="text-sm">Địa điểm: {eventId?.location}</p>
          <p className="text-sm">
            Ngày: {new Date(eventId?.date).toLocaleDateString()}
          </p>

          <p className="mt-2 text-xs">
            Mã vé: <span className="font-mono">{ticketCode}</span>
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span
            className={`text-xs px-3 py-1 rounded-full ${isUsed
                ? "bg-gray-200 text-gray-600"
                : "bg-green-100 text-green-700"
              }`}
          >
            {isUsed ? "Đã sử dụng" : "Còn hiệu lực"}
          </span>
        </div>
      </div>
    </div>
  );
}

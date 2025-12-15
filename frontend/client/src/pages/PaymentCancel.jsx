import { Link } from "react-router-dom";

function PaymentCancel() {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>❌ Thanh toán bị hủy</h1>
      <p>Bạn đã hủy hoặc thanh toán chưa hoàn tất.</p>

      <Link to="/" style={{ marginTop: 20, display: "inline-block" }}>
        ⬅ Quay lại trang sự kiện
      </Link>
    </div>
  );
}

export default PaymentCancel;

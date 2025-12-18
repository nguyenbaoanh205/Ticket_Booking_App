import { Navigate } from "react-router-dom";

export default function AdminPrivateRoute({ children }) {
  const token = localStorage.getItem("admin_token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}
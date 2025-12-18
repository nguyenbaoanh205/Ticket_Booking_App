import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminScan from "./pages/AdminScan";
import AdminPrivateRoute from "./components/AdminPrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />

        <Route
          path="/scan"
          element={
            <AdminPrivateRoute>
              <AdminScan />
            </AdminPrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

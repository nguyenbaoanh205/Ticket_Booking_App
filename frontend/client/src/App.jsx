import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/" element={<Events />} /> */}
        <Route path="/events/:id" element={<EventDetail />} />

        {/* Payment result */}
        <Route
          path="/payment-success"
          element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />
        <Route path="/payment-cancel" element={<PaymentCancel />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

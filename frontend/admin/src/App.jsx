import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminScan from "./pages/AdminScan";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import EventList from "./pages/EventList";
import EventForm from "./pages/EventForm";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />

        <Route
          path="/scan"
          element={
            <AdminPrivateRoute>
              <AdminScan />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/events"
          element={
            <AdminPrivateRoute>
              <EventList />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/events/create"
          element={
            <AdminPrivateRoute>
              <EventForm />
            </AdminPrivateRoute>
          }
        />
        
        <Route
          path="/events/edit/:id"
          element={
            <AdminPrivateRoute>
              <EventForm />
            </AdminPrivateRoute>
          }
        />
      
      </Routes>
    </BrowserRouter>
  );
}

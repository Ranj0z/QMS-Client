// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/kiosk/Welcome";
import ServiceSelect from "./pages/kiosk/ServiceSelect";
import CustomerForm from "./pages/kiosk/CustomerForm";
import TicketWrapper from "./pages/kiosk/TicketDisplayWrapper";
import { ToastProvider } from "./context/toast/ToastProvider";

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/services" element={<ServiceSelect />} />
          <Route path="/customer" element={<CustomerForm />} />
          <Route path="/ticket" element={<TicketWrapper />} /> {/* wrapper here */}
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
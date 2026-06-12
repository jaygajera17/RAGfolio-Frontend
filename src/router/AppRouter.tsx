import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import { Login } from "../components/Login";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

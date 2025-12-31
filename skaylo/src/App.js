import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Scan from "./pages/scan"; // lowercase to match file name
import Home from "./pages/Home.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/scan" element={<Scan />} />
    </Routes>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Zap } from "./pages/Zap";
import { ZapCreate } from "./pages/ZapCreate";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Zap/:id" element={<Zap />} />
        <Route path="/Zap/Create" element={<ZapCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

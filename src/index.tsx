import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Home } from "./screens/Home/Home";
import { Login } from "./screens/Login/Login";
import { SignUp } from "./screens/SignUp/SignUp";
import { Upload } from "./screens/Upload/Upload";
import { Analyzer } from "./screens/Analyzer/Analyzer";
import { Profile } from "./screens/Profile/Profile";
import { History } from "./screens/History/History";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/analyzer" element={<Analyzer />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  </StrictMode>,
);
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/home/Dashboard";
import InterviewPrep from "./pages/interviewPrep/InterviewPrep";
import { Toaster } from "react-hot-toast";
import UserProvider from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/interview-prep/:sessionId"
              element={<InterviewPrep />}
            />
          </Routes>
        </BrowserRouter>
        <Toaster
          toastOptions={{ className: "", style: { fontSize: "13px" } }}
        />
      </div>
    </UserProvider>
  );
}

export default App;

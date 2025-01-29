import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import ChatBot from "./components/ChatBot";
import SignInPage from "./pages/Sign-In/SignIn";
import SignUpPage from "./pages/Sign-Up/SignUp";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
        <SignedOut>
          <Routes>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="*" element={<Navigate to="/sign-in" />} />
          </Routes>
        </SignedOut>

        <SignedIn>
          <div className="flex justify-between p-4 bg-gray-200">
            <Navbar/>
          </div>
          <Routes>
            <Route path="/" element={<ChatBot />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </SignedIn>
      </>
  )
}

export default App

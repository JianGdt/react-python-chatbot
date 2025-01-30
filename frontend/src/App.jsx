import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import ChatBot from "./components/ChatBot";
import SignInPage from "./pages/Sign-In/SignIn";
import SignUpPage from "./pages/Sign-Up/SignUp";

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
          <Routes>
            <Route path="/" element={<ChatBot />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </SignedIn>
      </>
  )
}

export default App

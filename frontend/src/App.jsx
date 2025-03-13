import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import ChatBot from "./components/ChatBot";
import SignInPage from "./pages/Sign-In/SignIn";
import SignUpPage from "./pages/Sign-Up/SignUp";
import { AuthContext } from "./context/authContext.jsx";

function App() {
  const { isAuthenticated } = useContext(AuthContext);



  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <ChatBot /> : <Navigate to="/sign-in" />}
      />
      <Route
        path="/sign-in"
        element={!isAuthenticated ? <SignInPage /> : <Navigate to="/" />}
      />
      <Route
        path="/sign-up"
        element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />}
      />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/sign-in"} />} />
    </Routes>
  );
}

export default App;

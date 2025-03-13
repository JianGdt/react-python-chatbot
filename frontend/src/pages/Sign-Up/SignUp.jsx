import { useState } from "react";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    console.log("Response:", data)
    setMessage(response.ok ? "Registration successful!" : data.detail);
  };
  

  return (
    <form onSubmit={handleRegister}>
    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    <button type="submit">Sign Up</button>
  </form>
  );
};

export default SignUpPage;

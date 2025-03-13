import { useState } from "react";
import { useAuthStore } from "../../store/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await login({ username, password });
    console.log('data', data)
    if (data.access_token) {
      console.log('data.access_token', data.access_token)
      alert("Login Successful");
      localStorage.setItem("access_token", data.access_token);
      window.location.href = "/";
    } else {
      alert("Login Failed: " + (data.error || "Unknown error"));
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

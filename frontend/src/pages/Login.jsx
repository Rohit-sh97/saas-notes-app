import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/notes");
    } catch (err) {
        console.error("Login error:",err);
      alert("Login failed");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /><br/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

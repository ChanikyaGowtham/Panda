import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AuthPage({ setToken, isSignup }) {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignup ? "http://localhost:5001/signup" : "http://localhost:5001/login";
    try {
      const response = await axios.post(url, formData);
      if (isSignup) {
        // On signup, redirect to login page
        setError("");
        navigate("/login");
      } else {
        // On login, set token and redirect to main page
        const token = response.data.token;
        localStorage.setItem("token", token);
        setToken(token);
        setError("");
        navigate("/main");
      }
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <div style={{ marginBottom: "15px" }}>
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            />
          </div>
        )}
        <div style={{ marginBottom: "15px" }}>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            style={{ width: "100%", padding: "8px", fontSize: "16px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            style={{ width: "100%", padding: "8px", fontSize: "16px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>
      <p style={{ marginTop: "15px" }}>
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <a href={isSignup ? "/login" : "/signup"}>{isSignup ? "Login" : "Sign Up"}</a>
      </p>
    </div>
  );
}

export default AuthPage;
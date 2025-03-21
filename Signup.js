// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Signup({ setToken }) {
//   const [formData, setFormData] = useState({ username: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5001/signup", formData);
//       setError("");
//       navigate("/login"); // Redirect to login after successful signup
//     } catch (err) {
//       setError(err.response?.data?.error || "An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
//       <h2>Sign Up</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: "15px" }}>
//           <input
//             name="username"
//             type="text"
//             value={formData.username}
//             onChange={handleChange}
//             placeholder="Username"
//             required
//             style={{ width: "100%", padding: "8px", fontSize: "16px" }}
//           />
//         </div>
//         <div style={{ marginBottom: "15px" }}>
//           <input
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             required
//             style={{ width: "100%", padding: "8px", fontSize: "16px" }}
//           />
//         </div>
//         <div style={{ marginBottom: "15px" }}>
//           <input
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Password"
//             required
//             style={{ width: "100%", padding: "8px", fontSize: "16px" }}
//           />
//         </div>
//         <button
//           type="submit"
//           style={{
//             width: "100%",
//             padding: "10px",
//             backgroundColor: "#007bff",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Sign Up
//         </button>
//       </form>
//       <p style={{ marginTop: "15px" }}>
//         Already have an account? <a href="/login">Login</a>
//       </p>
//     </div>
//   );
// }

// export default Signup;



// Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css";

function Signup({ setToken }) {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/signup", formData);
      setError("");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>
        <div>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Signup;
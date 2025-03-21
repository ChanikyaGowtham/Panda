import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import MainPage from "./MainPage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Root route: Redirect to /main if token exists, else /signup */}
        <Route path="/" element={<Navigate to={token ? "/main" : "/signup"} />} />
        {/* Signup route */}
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        {/* Login route */}
        <Route path="/login" element={<Login setToken={setToken} />} />
        {/* Main route: Protected, requires token */}
        <Route path="/main" element={token ? <MainPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
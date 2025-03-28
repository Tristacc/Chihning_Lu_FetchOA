import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Favorite from "./pages/Favorite";
import ErrorPage from "./pages/ErrorPage";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  // handle logout logic
  const logout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Logout failed: ${response.status}`);
      }

      window.location.href = "/";
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <BrowserRouter>
      <header className="flex-container">
        <img src="/fetch_logo.png" alt="fetch_logo" />
        <div>Fetch Frontend Take-Home Exercise</div>
        <button onClick={logout}>logout</button>
      </header>
      <section>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </section>
    </BrowserRouter>
  );
}

export default App;

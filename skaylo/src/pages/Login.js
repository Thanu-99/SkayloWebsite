// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import googleIcon from "../assets/google.png";
import "../auth.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /* EMAIL/PASSWORD LOGIN */
  const loginUser = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // ✅ correct route
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* GOOGLE LOGIN */
  const loginWithGoogle = async () => {
    if (loading) return; // 🔒 prevent popup spam

    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/"); // ✅ correct route
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* 🌫️ Steam Background */}
      <div className="steam-bg">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <h1 className="hero-title animate-fade-down">Skaylo</h1>

      <div className="card glass-card animate-fade-up">
        <h2 className="card-title">Login</h2>

        <form onSubmit={loginUser} className="login-form">
          <input
            type="email"
            placeholder="Email ✉️"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />

          <input
            type="password"
            placeholder="Password 🔒"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />

          {/* LOGIN BUTTON */}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="or-divider">OR</div>

          {/* GOOGLE LOGIN */}
          <button
            type="button"
            className="submit-btn google-btn"
            onClick={loginWithGoogle}
            disabled={loading}
          >
            <img src={googleIcon} alt="Google" className="google" />
            {loading ? "Please wait..." : "Sign in with Google"}
          </button>

          {/* REGISTER */}
          <small className="switch-text mt-3">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="switch-btn"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </small>
        </form>
      </div>
    </div>
  );
}

export default Login;

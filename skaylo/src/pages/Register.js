import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import googleIcon from "../assets/google.png"; // your Google icon
import "../auth.css"; // keep existing styling

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirm) {
      alert("Fill all fields");
      return;
    }
    if (password !== confirm) {
      alert("Passwords don’t match");
      return;
    }

    try {
      setLoading(true);

      // Backend registration
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigate("/");
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-Up
  const signUpWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/"); // after Google sign-up, go to homepage
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login-wrapper">
      <h1 className="hero-title">Skaylo</h1>
      <div className="card glass-card">
        <h2 className="card-title">Register</h2>

        <form className="login-form" onSubmit={registerUser}>
          <input
            className="input-field"
            type="email"
            placeholder="Email ✉️"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />

          <input
            className="input-field"
            type="password"
            placeholder="Password 🔒"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />

          <input
            className="input-field"
            type="password"
            placeholder="Confirm Password 🔒"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            disabled={loading}
            required
          />

          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="or-divider">OR</div>

        {/* Google Sign-Up Button */}
        <button
          type="button"
          className="submit-btn google-btn"
          onClick={signUpWithGoogle}
        >
          <img src={googleIcon} alt="Google" className="google" />
          Sign up with Google
        </button>

        <div className="switch-text">
          Already have an account?{" "}
          <button
            className="switch-btn"
            onClick={() => navigate("/")}
            disabled={loading}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;

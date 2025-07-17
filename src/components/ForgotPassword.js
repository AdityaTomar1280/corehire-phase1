import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/coreopsai.png";
import { backend_url } from "../config";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${backend_url}/request-password-reset`,
        {
          email,
        }
      );
      setMessage(response.data.message);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        backgroundColor: "#f9f9f9",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.08)",
          backgroundColor: "white",
          textAlign: "center",
          animation: "fadeIn 0.5s ease",
        }}
      >
        <img
          src={logo}
          alt="CoreOpsAI"
          style={{
            width: "150px",
            marginBottom: "1.5rem",
          }}
        />

        <h2
          style={{
            color: "#333",
            fontSize: "1.8rem",
            marginBottom: "1.5rem",
            position: "relative",
            display: "inline-block",
          }}
        >
          Forgot Password
          <span
            style={{
              content: "",
              position: "absolute",
              bottom: "-8px",
              left: "0",
              width: "100%",
              height: "3px",
              background: "linear-gradient(90deg, #673ab7, #9c27b0)",
              borderRadius: "1.5px",
            }}
          ></span>
        </h2>

        <p
          style={{
            color: "#666",
            marginBottom: "1.5rem",
            fontSize: "0.95rem",
          }}
        >
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        {error && (
          <div
            style={{
              padding: "0.8rem",
              marginBottom: "1.5rem",
              borderRadius: "8px",
              backgroundColor: "#ffebee",
              color: "#d32f2f",
              fontSize: "0.9rem",
              borderLeft: "4px solid #d32f2f",
            }}
          >
            {error}
          </div>
        )}

        {message && (
          <div
            style={{
              padding: "0.8rem",
              marginBottom: "1.5rem",
              borderRadius: "8px",
              backgroundColor: "#e8f5e9",
              color: "#2e7d32",
              fontSize: "0.9rem",
              borderLeft: "4px solid #2e7d32",
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#555",
                fontSize: "0.9rem",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "1rem",
                transition: "all 0.3s ease",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.8rem",
              background: "linear-gradient(90deg, #673ab7, #9c27b0)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div
            style={{
              marginTop: "1.5rem",
              textAlign: "center",
              paddingTop: "1.5rem",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <Link
              to="/signin"
              style={{
                color: "#673ab7",
                textDecoration: "none",
                fontWeight: "500",
                transition: "color 0.3s ease",
              }}
            >
              Back to Sign In
            </Link>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default ForgotPassword;

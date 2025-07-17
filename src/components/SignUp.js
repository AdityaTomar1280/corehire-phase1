import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/coreopsai.png";
import HRMSImage from "../assets/hrms.jpg";
import { backend_url } from "../config";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [animateCard, setAnimateCard] = useState(false);
  const navigate = useNavigate();

  // Apply entrance animation when component mounts
  useEffect(() => {
    setAnimateCard(true);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${backend_url}/register`, {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        setMessage("Registration Successful. Please verify your email.");
        setTimeout(() => {
          navigate("/signin"); // Redirect to sign-in after successful registration
        }, 2000);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please check your details."
      );
    } finally {
      setLoading(false);
    }
  };

  // Add animated field highlight
  const handleFocus = (field) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  // Inline styles
  const styles = {
    signinPageContainer: {
      display: "flex",
      height: "100vh",
      width: "100%",
      overflow: "hidden",
      position: "relative",
    },
    imageContainer: {
      flex: "1",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    hrmsImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    authContainer: {
      flex: "1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      background: "#f8f9fa",
    },
    authCard: {
      width: "100%",
      maxWidth: "450px",
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
      padding: "2rem",
      transition: "all 0.3s ease",
      transform: "translateY(20px)",
      opacity: "0",
    },
    cardAnimated: {
      transform: "translateY(0)",
      opacity: "1",
    },
    authHeader: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    logoImage: {
      height: "60px",
      marginBottom: "1rem",
    },
    logoPulse: {
      animation: "pulse 2s infinite",
    },
    authTitle: {
      fontSize: "1.8rem",
      fontWeight: "600",
      color: "#333",
      margin: "0",
    },
    errorMessage: {
      background: "#ffe6e6",
      color: "#d32f2f",
      padding: "0.8rem",
      borderRadius: "6px",
      marginBottom: "1.5rem",
      fontSize: "0.9rem",
      textAlign: "center",
    },
    successMessage: {
      background: "#e6ffed",
      color: "#2e7d32",
      padding: "0.8rem",
      borderRadius: "6px",
      marginBottom: "1.5rem",
      fontSize: "0.9rem",
      textAlign: "center",
    },
    authForm: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    formGroup: {
      position: "relative",
      transition: "all 0.3s ease",
    },
    activeField: {
      transform: "translateY(-4px)",
    },
    label: {
      position: "absolute",
      left: "12px",
      top: "12px",
      color: "#666",
      fontSize: "1rem",
      pointerEvents: "none",
      transition: "all 0.2s ease",
      background: "white",
      padding: "0 4px",
    },
    hasValue: {
      top: "-10px",
      left: "12px",
      fontSize: "0.85rem",
      color: "#3f51b5",
    },
    formInput: {
      width: "100%",
      padding: "12px",
      fontSize: "1rem",
      border: "1px solid #ddd",
      borderRadius: "8px",
      outline: "none",
      transition: "all 0.3s ease",
    },
    passwordStrength: {
      marginTop: "8px",
      height: "4px",
      borderRadius: "2px",
      overflow: "hidden",
      backgroundColor: "#f0f0f0",
    },
    strengthMeter: {
      height: "100%",
      transition: "all 0.3s ease",
    },
    strengthWeak: {
      width: "30%",
      backgroundColor: "#f44336",
    },
    strengthMedium: {
      width: "70%",
      backgroundColor: "#ff9800",
    },
    strengthStrong: {
      width: "100%",
      backgroundColor: "#4caf50",
    },
    submitButton: {
      padding: "12px",
      fontSize: "1rem",
      background: "#3f51b5",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      marginTop: "1rem",
    },
    loading: {
      backgroundColor: "#3949ab",
      pointerEvents: "none",
    },
    spinner: {
      width: "20px",
      height: "20px",
      border: "3px solid rgba(255, 255, 255, 0.3)",
      borderTop: "3px solid white",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    authFooter: {
      marginTop: "1.5rem",
      textAlign: "center",
      fontSize: "0.9rem",
      color: "#666",
    },
    signinLink: {
      color: "#3f51b5",
      textDecoration: "none",
      fontWeight: "600",
      transition: "all 0.2s ease",
    },
  };

  // Add keyframe animations as a style tag
  const keyframeStyles = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{keyframeStyles}</style>
      <div style={styles.signinPageContainer}>
        <div style={styles.imageContainer}>
          <img src={HRMSImage} alt="HRMS" style={styles.hrmsImage} />
        </div>

        <div style={styles.authContainer}>
          <div
            style={{
              ...styles.authCard,
              ...(animateCard ? styles.cardAnimated : {}),
            }}
          >
            <div style={styles.authHeader}>
              <img
                src={logo}
                alt="CoreOpsAI"
                style={{ ...styles.logoImage, ...styles.logoPulse }}
              />
              <h2 style={styles.authTitle}>Sign Up</h2>
            </div>

            {error && (
              <div style={styles.errorMessage}>
                <span>{error}</span>
              </div>
            )}

            {message && (
              <div style={styles.successMessage}>
                <span>{message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={styles.authForm}>
              <div
                style={{
                  ...styles.formGroup,
                  ...(activeField === "name" ? styles.activeField : {}),
                }}
              >
                <label
                  htmlFor="name"
                  style={{
                    ...styles.label,
                    ...(name ? styles.hasValue : {}),
                    ...(activeField === "name" ? { color: "#3f51b5" } : {}),
                  }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  style={{
                    ...styles.formInput,
                    ...(activeField === "name"
                      ? { borderColor: "#3f51b5" }
                      : {}),
                  }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => handleFocus("name")}
                  onBlur={handleBlur}
                  required
                />
              </div>

              <div
                style={{
                  ...styles.formGroup,
                  ...(activeField === "email" ? styles.activeField : {}),
                }}
              >
                <label
                  htmlFor="email"
                  style={{
                    ...styles.label,
                    ...(email ? styles.hasValue : {}),
                    ...(activeField === "email" ? { color: "#3f51b5" } : {}),
                  }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  style={{
                    ...styles.formInput,
                    ...(activeField === "email"
                      ? { borderColor: "#3f51b5" }
                      : {}),
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => handleFocus("email")}
                  onBlur={handleBlur}
                  required
                />
              </div>

              <div
                style={{
                  ...styles.formGroup,
                  ...(activeField === "password" ? styles.activeField : {}),
                }}
              >
                <label
                  htmlFor="password"
                  style={{
                    ...styles.label,
                    ...(password ? styles.hasValue : {}),
                    ...(activeField === "password" ? { color: "#3f51b5" } : {}),
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  style={{
                    ...styles.formInput,
                    ...(activeField === "password"
                      ? { borderColor: "#3f51b5" }
                      : {}),
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => handleFocus("password")}
                  onBlur={handleBlur}
                  required
                />
                {password && (
                  <div style={styles.passwordStrength}>
                    <div
                      style={{
                        ...styles.strengthMeter,
                        ...(password.length < 6
                          ? styles.strengthWeak
                          : password.length < 8
                            ? styles.strengthMedium
                            : styles.strengthStrong),
                      }}
                    ></div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                style={{
                  ...styles.submitButton,
                  ...(loading ? styles.loading : {}),
                }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div style={styles.spinner}></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Register</span>
                )}
              </button>
            </form>

            <div style={styles.authFooter}>
              <p>
                Already have an account?{" "}
                <Link to="/signin" style={styles.signinLink}>
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;

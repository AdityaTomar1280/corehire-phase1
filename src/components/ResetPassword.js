// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import logo from "../assets/coreopsai.png";
// import { backend_url } from "../config";
// import "../ResetPassword.css";

// function ResetPassword() {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [id, setId] = useState(null);
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const id = searchParams.get("id");
//     const token = searchParams.get("token");
//     setToken(token);
//     setId(id);
//     if (!id || !token) {
//       setError("Invalid or missing reset link parameters");
//     }
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError("");
//     setMessage("");

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     if (password.length < 8) {
//       setError("Password must be at least 8 characters long");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post(
//         `${backend_url}/reset-password?id=${id}&token=${token}`,
//         { password },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setMessage(
//         response.data.message || "Password has been reset successfully!"
//       );
//       setTimeout(() => navigate("/signin"), 2000);
//     } catch (err) {
//       if (err.response && err.response.data && err.response.data.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("Failed to reset password. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setConfirmPasswordVisible(!confirmPasswordVisible);
//   };

//   // Calculate password strength
//   const getPasswordStrength = () => {
//     if (password.length === 0) return "";
//     if (password.length < 6) return "weak";
//     if (password.length < 8) return "medium";
//     return "strong";
//   };

//   const passwordStrength = getPasswordStrength();

//   return (
//     <div className="reset-page-container">
//       <div className="reset-card">
//         <img src={logo} alt="CoreOpsAI" className="logo-image" />

//         <h2 className="reset-title">Reset Password</h2>

//         <p className="reset-description">
//           Please enter your new password below.
//         </p>

//         {error && <div className="error-message">{error}</div>}

//         {message && <div className="success-message">{message}</div>}

//         <form onSubmit={handleSubmit} className="reset-form">
//           <div className="form-group">
//             <label htmlFor="password">New Password</label>
//             <div className="password-input-wrapper">
//               <input
//                 type={passwordVisible ? "text" : "password"}
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="password-input"
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="toggle-visibility"
//               >
//                 {passwordVisible ? "Hide" : "Show"}
//               </button>
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="confirmPassword">Confirm New Password</label>
//             <div className="password-input-wrapper">
//               <input
//                 type={confirmPasswordVisible ? "text" : "password"}
//                 id="confirmPassword"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 className="password-input"
//               />
//               <button
//                 type="button"
//                 onClick={toggleConfirmPasswordVisibility}
//                 className="toggle-visibility"
//               >
//                 {confirmPasswordVisible ? "Hide" : "Show"}
//               </button>
//             </div>
//             {password && confirmPassword && password !== confirmPassword && (
//               <p className="password-mismatch">Passwords do not match</p>
//             )}
//           </div>

//           {password && (
//             <div className="password-strength-container">
//               <div className="strength-labels">
//                 <span>Password strength:</span>
//                 <span className={`strength-text strength-${passwordStrength}`}>
//                   {passwordStrength === "weak"
//                     ? "Weak"
//                     : passwordStrength === "medium"
//                       ? "Medium"
//                       : "Strong"}
//                 </span>
//               </div>
//               <div className="strength-meter-background">
//                 <div
//                   className={`strength-meter strength-${passwordStrength}`}
//                 ></div>
//               </div>
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading || !id || !token}
//             className={`reset-button ${loading ? "loading" : ""} ${
//               !id || !token ? "disabled" : ""
//             }`}
//           >
//             {loading ? (
//               <>
//                 <div className="spinner"></div>
//                 <span>Processing...</span>
//               </>
//             ) : (
//               "Reset Password"
//             )}
//           </button>

//           <div className="reset-footer">
//             <Link to="/signin" className="back-to-signin">
//               Back to Sign In
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../Auth.css";
import logo from "../assets/coreopsai.png";
import { backend_url } from "../config";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setid] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const token = searchParams.get("token");
    setToken(token);
    setid(id);
    if (!id || !token) {
      setError("Invalid or missing reset link parameter");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${backend_url}/reset-password?id=${id}&token=${token}`, // Pass id and token
        { password }, // Send new password in the request body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(response.data.message);
      // Redirect to login after successful password reset
      setTimeout(() => navigate("/signin"), 2000);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Failed to reset password. Please try again.");
      }
    }
  };

  return (
    <div className="signin-page-container">
      <div className="auth-container">
        <img src={logo} alt="corehr" className="corehr-image"></img>
        <h2>Reset Password</h2>
        {error && <div className="error">{error}</div>}
        {message && <div className="success">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;

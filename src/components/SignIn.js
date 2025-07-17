// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../Auth.css';
// import HRMSImage from '../assets/hrms.jpg';
// import logo from '../assets/coreopsai.png';
// import { backend_url } from '../config';

// function SignIn({ setIsLoggedIn }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError('');

//     try {
//       const response = await axios.post(`${backend_url}/login`, {
//         email,
//         password,
//       });

//       if (response.status === 200) {
//         setIsLoggedIn(true);
//         navigate('/upload');
//       } else {
//         setError(
//           response.data.message || 'Invalid credentials. Please try again.'
//         );
//       }
//     } catch (err) {
//       console.error('SignIn Error:', err);
//       setError('Invalid credentials or server error. Please try again.');
//     }
//   };

//   return (
//     <div className="signin-page-container">
//       <div className="image-container">
//         <img src={HRMSImage} alt="HRMS" className="hrms-image" />
//       </div>
//       <div className="auth-container">
//         <img src={logo} alt="corehr" className="corehr-image" />
//         <h2>CoreHire.AI - Making recruiting easy and 2x faster</h2>
//         <h2>Sign In</h2>
//         {error && <div className="error">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <div className="checkbox">
//               <input
//                 type="checkbox"
//                 id="showPassword"
//                 checked={showPassword}
//                 onChange={() => setShowPassword(!showPassword)}
//               />
//               <label htmlFor="showPassword">Show Password</label>
//             </div>
//           </div>
//           <button type="submit">Login</button>
//           <p>
//             Don't have an account? <Link to="/signup">Sign up</Link>
//           </p>
//           <p>
//             <Link to="/forgotpassword">Forgot Password?</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SignIn;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Auth.css";
import HRMSImage from "../assets/hrms.jpg";
import logo from "../assets/coreopsai.png";
import { backend_url } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faSignInAlt,
  faExclamationTriangle,
  faUserPlus,
  faQuestionCircle,
  faRocket,
  faUserTie,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

function SignIn({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(`${backend_url}/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        // Add success animation before redirect
        setTimeout(() => {
          // Set the logged in state
          setIsLoggedIn(true);
          // Note: App.js now handles storing this in localStorage
          navigate("/upload");
        }, 800);
      } else {
        setError(
          response.data.message || "Invalid credentials. Please try again."
        );
        setIsLoading(false);
      }
    } catch (err) {
      console.error("SignIn Error:", err);
      setError("Invalid credentials or server error. Please try again.");
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signin-page-container">
      <div
        className="content-side"
        style={{
          backgroundImage: `url(${HRMSImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* Overlay to ensure text is readable against the background image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1,
          }}
        ></div>

        {/* Content wrapper with higher z-index to appear above the overlay */}
        <div style={{ position: "relative", zIndex: 2, height: "100%" }}>
          <div className="brand-section">
            {/* <img src={logo} alt="CoreHR" className="logo-image-large" /> */}
            <h1 className="brand-tagline" style={{ color: "#fff" }}>
              Making recruiting easy and 2x faster
            </h1>
          </div>

          <div className="feature-cards">
            <div
              className="feature-card"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            >
              <div className="feature-icon-container">
                <FontAwesomeIcon icon={faRocket} className="feature-icon" />
              </div>
              <h3>Accelerate Your Hiring</h3>
              <p>
                Cut your hiring time in half with AI-powered candidate matching
                and advanced resume parsing
              </p>
            </div>

            <div
              className="feature-card"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            >
              <div className="feature-icon-container">
                <FontAwesomeIcon icon={faUserTie} className="feature-icon" />
              </div>
              <h3>Find Better Talent</h3>
              <p>
                Identify the most qualified candidates with precision scoring
                and intelligent ranking
              </p>
            </div>

            <div
              className="feature-card"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            >
              <div className="feature-icon-container">
                <FontAwesomeIcon icon={faChartLine} className="feature-icon" />
              </div>
              <h3>Data-Driven Decisions</h3>
              <p>
                Make smarter hiring choices with comprehensive analytics and
                detailed candidate insights
              </p>
            </div>
          </div>

          <div
            className="testimonial"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
          >
            <p>
              "COREHire transformed our recruitment process, saving us countless
              hours and helping us find exceptional talent."
            </p>
            {/* <div className="testimonial-author">
              <div className="author-initial">A,M</div>
              <div className="author-info">
                <strong>Aditya & Mansih</strong>
                <span>Developers of this product</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <img src={logo} alt="CoreHR" className="logo-image" />
            <h2 className="auth-title">Sign In</h2>
          </div>

          {error && (
            <div className="error-message">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="icon-input"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-icon-wrapper">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="icon-input"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <div className="form-footer">
              <Link to="/forgotpassword" className="forgot-password">
                <FontAwesomeIcon icon={faQuestionCircle} /> Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className={`submit-button ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSignInAlt} /> Sign In
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account?</p>
            <Link to="/signup" className="signup-link">
              <FontAwesomeIcon icon={faUserPlus} /> Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

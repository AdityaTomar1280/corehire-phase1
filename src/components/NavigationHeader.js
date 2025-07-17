// import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// //import './NavigationHeader.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faUsers,
//   faCloudUploadAlt,
//   faSignOutAlt,
// } from '@fortawesome/free-solid-svg-icons';
// import logo from '../assets/coreopsai.png';

// function NavigationHeader({ setIsLoggedIn }) {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear any auth state/tokens
//     setIsLoggedIn(false);
//     // Redirect to login page
//     navigate('/signin');
//   };

//   return (
//     <header className="nav-header">
//       <div className="nav-logo">
//         <img src={logo} alt="CoreHire.AI" />
//         <h1>CoreHire.AI</h1>
//       </div>

//       <nav className="nav-links">
//         <Link
//           to="/candidates"
//           className={location.pathname === '/candidates' ? 'active' : ''}
//         >
//           <FontAwesomeIcon icon={faUsers} /> Candidates
//         </Link>
//         <Link
//           to="/upload"
//           className={location.pathname === '/upload' ? 'active' : ''}
//         >
//           <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload Resumes
//         </Link>
//       </nav>

//       <button className="logout-button" onClick={handleLogout}>
//         <FontAwesomeIcon icon={faSignOutAlt} /> Logout
//       </button>
//     </header>
//   );
// }

// export default NavigationHeader;

// import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faUsers,
//   faCloudUploadAlt,
//   faSignOutAlt,
//   faChartBar,
// } from '@fortawesome/free-solid-svg-icons';

// function NavigationHeader({ setIsLoggedIn }) {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear any auth state/tokens
//     setIsLoggedIn(false);
//     // Redirect to login page
//     navigate('/signin');
//   };

//   // Inline styles
//   const styles = {
//     header: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: '12px 20px',
//       backgroundColor: '#ffffff',
//       boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//       marginBottom: '20px',
//     },
//     logo: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '10px',
//     },
//     logoImage: {
//       height: '35px',
//     },
//     logoText: {
//       fontSize: '1.2rem',
//       fontWeight: '600',
//       color: '#5e35b1',
//       margin: '0',
//     },
//     navLinks: {
//       display: 'flex',
//       gap: '20px',
//     },
//     link: {
//       textDecoration: 'none',
//       color: '#555',
//       fontWeight: '500',
//       padding: '8px 12px',
//       borderRadius: '4px',
//       transition: 'all 0.3s ease',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '6px',
//     },
//     activeLink: {
//       backgroundColor: '#5e35b1',
//       color: 'white',
//     },
//     logoutButton: {
//       backgroundColor: '#f5f5f5',
//       color: '#555',
//       border: 'none',
//       padding: '8px 15px',
//       borderRadius: '4px',
//       cursor: 'pointer',
//       fontWeight: '500',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '6px',
//     },
//   };

//   return (
//     <header style={styles.header}>
//       <div style={styles.logo}>
//         <h1 style={styles.logoText}>COREHire</h1>
//       </div>

//       <nav style={styles.navLinks}>
//         <Link
//           to="/candidates"
//           style={{
//             ...styles.link,
//             ...(location.pathname === '/candidates' ? styles.activeLink : {}),
//           }}
//         >
//           <FontAwesomeIcon icon={faUsers} /> Candidates
//         </Link>
//                 <Link
//           to="/qualified-candidates"
//           style={{
//             ...styles.link,
//             ...(location.pathname === '/qualified-candidates' ? styles.activeLink : {}),
//           }}
//         >
//           <FontAwesomeIcon icon={faUsers} /> Candidates
//         </Link>
//         <Link
//           to="/interview-tracking"
//           style={{
//             ...styles.link,
//             ...(location.pathname === '/interview-tracking'
//               ? styles.activeLink
//               : {}),
//           }}
//         >
//           <FontAwesomeIcon icon={faChartBar} /> Interview Tracking
//         </Link>
//         <Link
//           to="/upload"
//           style={{
//             ...styles.link,
//             ...(location.pathname === '/upload' ? styles.activeLink : {}),
//           }}
//         >
//           <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload Resumes
//         </Link>
//       </nav>

//       <button style={styles.logoutButton} onClick={handleLogout}>
//         <FontAwesomeIcon icon={faSignOutAlt} /> Logout
//       </button>
//     </header>
//   );
// }

// export default NavigationHeader;

import { React, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCloudUploadAlt,
  faSignOutAlt,
  faChartBar,
  faUserCheck, // Icon for qualified candidates
  faCogs, // For CoreOps.ai logo feel
} from "@fortawesome/free-solid-svg-icons";
// Optional: If you have a logo image
// import coreOpsLogo from './path-to-your-coreops-logo.svg';

// It's generally better to put styles in a CSS file, but for this example,
// we'll adapt the inline styles to the CoreOps.ai theme.

function NavigationHeader({ setIsLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token"); // Example: Clear token from local storage
    localStorage.removeItem("user"); // Example: Clear user info
    navigate("/signin");
  };

  // CoreOps.ai Theme Variables (inline for this example)
  const coreopsTheme = {
    primary: "#0A2540", // Deep Navy Blue
    secondary: "#00A4CC", // Teal
    accent: "#00C4FF", // Bright Cyan
    background: "#ffffff", // Header background
    textPrimary: "#2c3e50", // Dark grey for text
    textSecondary: "#566573", // Lighter grey
    activeLinkBg: "#0A2540", // Primary color for active link bg
    activeLinkText: "#ffffff",
    hoverLinkBg: "#f0f4f8", // Light grey-blue for hover
    borderColor: "#dde4eb",
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  };

  const styles = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px", // Adjusted padding
      backgroundColor: coreopsTheme.background,
      boxShadow: "0 3px 8px rgba(0, 0, 0, 0.07)", // Softer shadow
      fontFamily: coreopsTheme.fontFamily,
      position: "sticky", // Make header sticky
      top: 0,
      zIndex: 1000, // Ensure it's above other content
      width: "100%",
      boxSizing: "border-box",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none", // If logo is a link
    },
    logoIcon: {
      color: coreopsTheme.secondary, // Use secondary for icon
      fontSize: "1.8em", // Slightly larger icon
      marginRight: "10px",
    },
    logoText: {
      fontSize: "1.5rem", // Adjusted size
      fontWeight: "700", // Bolder
      color: coreopsTheme.primary, // Use primary for text
      margin: "0",
      letterSpacing: "-0.5px",
    },
    navLinks: {
      display: "flex",
      gap: "10px", // Slightly reduced gap for more links
      alignItems: "center", // Vertically align items
    },
    link: {
      textDecoration: "none",
      color: coreopsTheme.textSecondary, // Use secondary text color for inactive
      fontWeight: "500",
      padding: "10px 18px", // Adjusted padding
      borderRadius: "6px", // Slightly more rounded
      transition: "all 0.2s ease-in-out",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "0.95rem",
    },
    activeLink: {
      backgroundColor: coreopsTheme.activeLinkBg,
      color: coreopsTheme.activeLinkText,
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    },
    linkHover: {
      // To be applied with onMouseEnter/onMouseLeave or :hover in CSS
      backgroundColor: coreopsTheme.hoverLinkBg,
      color: coreopsTheme.primary,
    },
    logoutButton: {
      backgroundColor: "transparent",
      color: coreopsTheme.textSecondary,
      border: `1px solid ${coreopsTheme.borderColor}`,
      padding: "9px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "0.95rem",
      transition: "all 0.2s ease-in-out",
    },
    logoutButtonHover: {
      backgroundColor: coreopsTheme.primary,
      color: coreopsTheme.activeLinkText,
      borderColor: coreopsTheme.primary,
    },
  };

  // State for hover effects if not using CSS :hover
  const [hoveredLink, setHoveredLink] = useState(null);
  const [logoutHover, setLogoutHover] = useState(false);

  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logoContainer}>
        {" "}
        {/* Make logo a link to home */}
        <FontAwesomeIcon icon={faCogs} style={styles.logoIcon} />
        {/* <img src={coreOpsLogo} alt="CoreOps.ai" style={styles.logoImage} /> */}
        <h1 style={styles.logoText}>COREHire</h1>
      </Link>

      <nav style={styles.navLinks}>
        <Link
          to="/upload"
          style={{
            ...styles.link,
            ...(location.pathname === "/upload" || location.pathname === "/"
              ? styles.activeLink
              : {}),
            ...(hoveredLink === "/upload" &&
            !(location.pathname === "/upload" || location.pathname === "/")
              ? styles.linkHover
              : {}),
          }}
          onMouseEnter={() => setHoveredLink("/upload")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <FontAwesomeIcon icon={faCloudUploadAlt} /> Analyze Resumes
        </Link>
        <Link
          to="/candidates"
          style={{
            ...styles.link,
            ...(location.pathname === "/candidates" ? styles.activeLink : {}),
            ...(hoveredLink === "/candidates" &&
            location.pathname !== "/candidates"
              ? styles.linkHover
              : {}),
          }}
          onMouseEnter={() => setHoveredLink("/candidates")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <FontAwesomeIcon icon={faUsers} /> All Candidates
        </Link>
        {/* <Link
          to="/qualified-candidates"
          style={{
            ...styles.link,
            ...(location.pathname === '/qualified-candidates' ? styles.activeLink : {}),
            ...(hoveredLink === '/qualified-candidates' && location.pathname !== '/qualified-candidates' ? styles.linkHover : {})
          }}
          onMouseEnter={() => setHoveredLink('/qualified-candidates')}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <FontAwesomeIcon icon={faUserCheck} /> Qualified
        </Link> */}
        <Link
          to="/interview-tracking"
          style={{
            ...styles.link,
            ...(location.pathname === "/interview-tracking"
              ? styles.activeLink
              : {}),
            ...(hoveredLink === "/interview-tracking" &&
            location.pathname !== "/interview-tracking"
              ? styles.linkHover
              : {}),
          }}
          onMouseEnter={() => setHoveredLink("/interview-tracking")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <FontAwesomeIcon icon={faChartBar} /> Tracking
        </Link>
        <Link
          to="/companysearchpage"
          style={{
            ...styles.link,
            ...(location.pathname === "/companysearchpage"
              ? styles.activeLink
              : {}),
            ...(hoveredLink === "/companysearchpage" &&
            location.pathname !== "/companysearchpage"
              ? styles.linkHover
              : {}),
          }}
          onMouseEnter={() => setHoveredLink("/companysearchpage")}
          onMouseLeave={() => setHoveredLink(null)}
        >
          <FontAwesomeIcon icon={faChartBar} /> Search by Company
        </Link>
      </nav>

      <button
        style={{
          ...styles.logoutButton,
          ...(logoutHover ? styles.logoutButtonHover : {}),
        }}
        onClick={handleLogout}
        onMouseEnter={() => setLogoutHover(true)}
        onMouseLeave={() => setLogoutHover(false)}
        title="Logout"
      >
        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
      </button>
    </header>
  );
}

export default NavigationHeader;

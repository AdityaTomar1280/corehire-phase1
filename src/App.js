// // frontend/src/App.js
// import React from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from 'react-router-dom';
// import SignUp from './components/SignUp';
// import SignIn from './components/SignIn';
// import FileUpload from './components/FileUpload'; // Default import
// import ResultsTable from './components/ResultsTable';
// import { useState } from 'react';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [analysisResults, setAnalysisResults] = useState([]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/signup" element={<SignUp />} />
//         <Route
//           path="/signin"
//           element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
//         />
//         <Route
//           path="/upload"
//           element={
//             isLoggedIn ? (
//               <FileUpload setAnalysisResults={setAnalysisResults} />
//             ) : (
//               <Navigate to="/signin" replace />
//             )
//           }
//         />
//         <Route
//           path="/results"
//           element={
//             isLoggedIn ? (
//               <ResultsTable analysisResults={analysisResults} />
//             ) : (
//               <Navigate to="/signin" replace />
//             )
//           }
//         />
//         <Route path="/" element={<Navigate to="/signin" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from 'react-router-dom';
// import SignUp from './components/SignUp';
// import SignIn from './components/SignIn';
// import FileUpload from './components/FileUpload';
// import ResultsTable from './components/ResultsTable';
// import { useState } from 'react';
// import ForgotPassword from './components/ForgotPassword';
// import ResetPassword from './components/ResetPassword';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [analysisResults, setAnalysisResults] = useState([]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/signup" element={<SignUp />} />
//         <Route
//           path="/signin"
//           element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
//         />
//         <Route path="/forgotpassword" element={<ForgotPassword />} />
//         <Route path="/resetpassword" element={<ResetPassword />} />
//         <Route
//           path="/upload"
//           element={
//             isLoggedIn ? (
//               <FileUpload setAnalysisResults={setAnalysisResults} />
//             ) : (
//               <Navigate to="/signin" replace />
//             )
//           }
//         />
//         <Route
//           path="/results"
//           element={
//             isLoggedIn ? (
//               <ResultsTable analysisResults={analysisResults} />
//             ) : (
//               <Navigate to="/signin" replace />
//             )
//           }
//         />
//         <Route path="/" element={<Navigate to="/signin" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from 'react-router-dom';
// import SignUp from './components/SignUp';
// import SignIn from './components/SignIn';
// import FileUpload from './components/FileUpload';
// import ResultsTable from './components/ResultsTable';
// import SavedCandidates from './components/SavedCandidates';
// import InterviewTracking from './components/InterviewTracking';
// import CandidateProfile from './components/CandidateProfile';
// import NavigationHeader from './components/NavigationHeader';
// import { useState } from 'react';
// import ForgotPassword from './components/ForgotPassword';
// import ResetPassword from './components/ResetPassword';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [analysisResults, setAnalysisResults] = useState([]);

//   return (
//     <Router>
//       <Routes>
//         {/* Public routes */}
//         <Route path="/signup" element={<SignUp />} />
//         <Route
//           path="/signin"
//           element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
//         />
//         <Route path="/forgotpassword" element={<ForgotPassword />} />
//         <Route path="/resetpassword" element={<ResetPassword />} />

//         {/* Protected routes */}
//         <Route
//           path="/candidates"
//           element={
//             isLoggedIn ? (
//               <>
//                 <NavigationHeader setIsLoggedIn={setIsLoggedIn} />
//                 <SavedCandidates />
//               </>
//             ) : (
//               <Navigate to="/signin" replace />
//             )
//           }
//         />
//         <Route
//           path="/candidates/:id"
//           element={
//             isLoggedIn ? (
//               <>
//                 <NavigationHeader setIsLoggedIn={setIsLoggedIn} />
//                 <CandidateProfile />
//               </>
//             ) : (
//               <Navigate to="/signin" replace />
//             )
//           }
//         />
//         <Route
//           path="/interview-tracking"
//           element={
//             isLoggedIn ? (
//               <>
//                 <NavigationHeader setIsLoggedIn={setIsLoggedIn} />
//                 <InterviewTracking />
//               </>
//             ) : (
//               <Navigate to="/signin" replace />
//             )
//           }
//         />
//         <Route
//           path="/upload"
//           element={
//             isLoggedIn ? (
//               <>
//                 <NavigationHeader setIsLoggedIn={setIsLoggedIn} />
//                 <FileUpload setAnalysisResults={setAnalysisResults} />
//               </>
//             ) : (
//               <Navigate to="/signin" replace />
//             )
//           }
//         />
//         <Route
//           path="/results"
//           element={
//             isLoggedIn ? (
//               <>
//                 <NavigationHeader setIsLoggedIn={setIsLoggedIn} />
//                 <ResultsTable analysisResults={analysisResults} />
//               </>
//             ) : (
//               <Navigate to="/signin" replace />
//             )
//           }
//         />

//         {/* Default route */}
//         <Route
//           path="/"
//           element={
//             isLoggedIn ? (
//               <Navigate to="/candidates" replace />
//             ) : (
//               <Navigate to="/signin" replace />
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import FileUpload from "./components/FileUpload";
import ResultsTable from "./components/ResultsTable";
import SavedCandidates from "./components/SavedCandidates";
import InterviewTracking from "./components/InterviewTracking";
import CandidateProfile from "./components/CandidateProfile";
import NavigationHeader from "./components/NavigationHeader";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
// import QualifiedCandidates from "./components/QualifiedCandidates";

function App() {
  // Initialize isLoggedIn state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if user is logged in from localStorage
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [analysisResults, setAnalysisResults] = useState([]);

  // Update localStorage when isLoggedIn changes
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("isLoggedIn", "true");
    } else {
      localStorage.removeItem("isLoggedIn");
    }
  }, [isLoggedIn]);

  // Create a wrapper for setIsLoggedIn to handle both state and localStorage
  const handleLogout = () => {
    setIsLoggedIn(false);
    // localStorage.removeItem is handled in the useEffect
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/signin"
          element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        {/* <Route path="/companysearchpage" element={<CompanySearchPage />} /> */}

        {/* Protected routes */}
        <Route
          path="/candidates"
          element={
            isLoggedIn ? (
              <>
                <NavigationHeader setIsLoggedIn={handleLogout} />
                <SavedCandidates />
              </>
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/candidates/:id"
          element={
            isLoggedIn ? (
              <>
                <NavigationHeader setIsLoggedIn={handleLogout} />
                <CandidateProfile />
              </>
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        {/* <Route
          path="/companysearchpage"
          element={
            isLoggedIn ? (
              <>
                <NavigationHeader setIsLoggedIn={handleLogout} />
                <CandidateProfile />
              </>
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        /> */}
        {/* <Route
          path="/qualified-candidates"
          element={
            isLoggedIn ? (
              <>
                <NavigationHeader setIsLoggedIn={handleLogout} />
                <QualifiedCandidates />
              </>
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        /> */}
        <Route
          path="/interview-tracking"
          element={
            isLoggedIn ? (
              <>
                <NavigationHeader setIsLoggedIn={handleLogout} />
                <InterviewTracking />
              </>
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/upload"
          element={
            isLoggedIn ? (
              <>
                <NavigationHeader setIsLoggedIn={handleLogout} />
                <FileUpload setAnalysisResults={setAnalysisResults} />
              </>
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/results"
          element={
            isLoggedIn ? (
              <>
                <NavigationHeader setIsLoggedIn={handleLogout} />
                <ResultsTable analysisResults={analysisResults} />
              </>
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />

        {/* Default route */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/candidates" replace />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

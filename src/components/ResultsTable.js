// import React, { useState } from "react";
// import "../ResultsTable.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faEnvelope,
//   faFileAlt,
//   faStar,
//   faPaperPlane,
//   faCalendarAlt,
//   faUserTie,
//   faFilter,
//   faSave,
//   faCheckCircle,
//   faExclamationTriangle,
//   faSpinner,
//   faGraduationCap,
//   faBriefcase,
//   faMapMarkerAlt,
//   faPhone,
// } from "@fortawesome/free-solid-svg-icons";
// import { backend_url } from "../config"; // Import backend_url from config

// function ResultsTable({ analysisResults }) {
//   const [selectedCandidates, setSelectedCandidates] = useState([]);
//   const [showFilterOptions, setShowFilterOptions] = useState(false);
//   const [scoreThreshold, setScoreThreshold] = useState(55);
//   const [isSaving, setIsSaving] = useState(false);
//   const [saveSuccess, setSaveSuccess] = useState(false);
//   const [saveError, setSaveError] = useState(null);

//   const sortedResults = [...analysisResults].sort(
//     (a, b) => b.similarityScore - a.similarityScore
//   );

//   // Filter results based on threshold (for highlighting purposes only)
//   const highlightedResults = sortedResults.filter(
//     (result) => result.similarityScore >= scoreThreshold
//   );

//   // Use all sorted results regardless of threshold
//   const filteredResults = sortedResults;

//   const toggleCandidateSelection = (email) => {
//     setSelectedCandidates((prevSelected) =>
//       prevSelected.includes(email)
//         ? prevSelected.filter((e) => e !== email)
//         : [...prevSelected, email]
//     );
//   };

//   const generateMailLink = (email, result) => {
//     // const subject = encodeURIComponent("Resume Analysis - Google Form");
//     // const googleFormBaseUrl =
//     //   "https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/viewform";

//     // const formLink = `${googleFormBaseUrl}?entry.123456=${encodeURIComponent(
//     //   result.name
//     // )}&entry.654321=${encodeURIComponent(
//     //   result.email
//     // )}&entry.111222=${encodeURIComponent(result.similarityScore)}`;

//     // const body = encodeURIComponent(
//     //   `Hi ${result.name},\n\nThank you for submitting your resume.\nPlease fill out this short form:\n\n${formLink}\n\nBest regards,\nTeam CoreHire\n`
//     // );

//     const MSFormBaseUrl = "https://forms.office.com/r/nRE70b6HiR";
//     const formLink = `${MSFormBaseUrl}`;

//     const subject = encodeURIComponent("Resume Analysis - Google Form");
//     const body = encodeURIComponent(
//       `Hi ${result.name},\n\nThank you for submitting your resume.\nPlease fill out this short form:\n\n${formLink}\n\nBest regards,\nTeam CoreHire\n`
//     );
//     const outlookLink = `https://outlook.office.com/mail/deeplink/compose?to=${result.email}&subject=${subject}&body=${body}`;
//     window.open(outlookLink);
//   };

//   const generateBulkMailLinkPerPerson = (candidates) => {
//     candidates.forEach((current) => {
//       const bccList = candidates
//         .filter((c) => c.email !== current.email)
//         .map((c) => c.email)
//         .join(";");

//       // const googleFormBaseUrl =
//       //   "https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/viewform";
//       // const formLink = `${googleFormBaseUrl}?entry.123456=${encodeURIComponent(
//       //   current.name
//       // )}&entry.654321=${encodeURIComponent(
//       //   current.email
//       // )}&entry.111222=${encodeURIComponent(current.similarityScore)}`;
//       const MSFormBaseUrl = "https://forms.office.com/r/nRE70b6HiR";
//       const formLink = `${MSFormBaseUrl}`;

//       const subject = encodeURIComponent("Resume Analysis - Google Form");
//       const body = encodeURIComponent(
//         `Hi Future Builder,\n\nThank you for submitting your resume.\nPlease fill out this short form:\n\n${formLink}\n\nBest regards,\nTeam CoreHire\n`
//       );

//       const outlookLink =
//         `https://outlook.office.com/mail/deeplink/compose?to=${current.email}` +
//         (bccList ? `&bcc=${encodeURIComponent(bccList)}` : "") +
//         `&subject=${subject}&body=${body}`;

//       window.open(outlookLink, "_blank");
//     });
//   };

//   const generateBulkCalendarInvitePerPerson = (candidates) => {
//     candidates.forEach((current) => {
//       const bccList = candidates
//         .filter((c) => c.email !== current.email)
//         .map((c) => c.email)
//         .join(";");

//       const subject = `Meeting Invitation - Resume Review for ${current.name}`;
//       const bodyHTML = `
//         <div style="font-family: Arial, sans-serif; color: #333;">
//           <h2 style="color: #5e42a6;">Hi ${current.name},</h2>
//           <p>Please join the meeting to discuss your job roles and some important points related to your resume.</p>
//           <p>Looking forward to our conversation!</p>
//           <p style="margin-top: 30px;">Thanks,<br><strong>Team CoreHire</strong></p>
//         </div>
//       `;

//       const outlookCalendarLink =
//         `https://outlook.office.com/calendar/0/deeplink/compose` +
//         `?path=/calendar/action/compose` +
//         `&to=${encodeURIComponent(current.email)}` +
//         (bccList ? `&bcc=${encodeURIComponent(bccList)}` : "") +
//         `&subject=${encodeURIComponent(subject)}` +
//         `&body=${encodeURIComponent(bodyHTML)}`;

//       window.open(outlookCalendarLink, "_blank");
//     });
//   };

//   const selectAllCandidates = () => {
//     const allFilteredEmails = filteredResults.map((result) => result.email);
//     setSelectedCandidates(allFilteredEmails);
//   };

//   const clearAllSelections = () => {
//     setSelectedCandidates([]);
//   };

//   const saveSelectedCandidates = async () => {
//     if (selectedCandidates.length === 0) {
//       return;
//     }

//     try {
//       setIsSaving(true);
//       setSaveSuccess(false);
//       setSaveError(null);

//       // Get the full data for selected candidates
//       const candidatesToSave = sortedResults
//         .filter((candidate) => selectedCandidates.includes(candidate.email))
//         .map((candidate) => ({
//           name: candidate.name,
//           email: candidate.email,
//           keySkills: candidate.keySkills,
//           resumeSummary: candidate.resumeSummary,
//           commonSkills: candidate.commonSkills,
//           similarityScore: candidate.similarityScore,
//           companiesWorked: candidate.companiesWorked,
//           totalExperienceYears: candidate.totalExperienceYears,
//           location: candidate.location,
//           education: candidate.education,
//           roleName: candidate.roleName,
//         }));

//       // Make API call to save candidates using the backend_url from config
//       const response = await fetch(`${backend_url}/candidates`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ candidates: candidatesToSave }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to save candidates");
//       }

//       const data = await response.json();
//       console.log("Save successful:", data);
//       setSaveSuccess(true);

//       // Auto-hide success message after 3 seconds
//       setTimeout(() => setSaveSuccess(false), 3000);
//     } catch (error) {
//       console.error("Error saving candidates:", error);
//       setSaveError(error.message || "Failed to save candidates");

//       // Auto-hide error message after 5 seconds
//       setTimeout(() => setSaveError(null), 5000);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className="app-container">
//       <div className="full-page-container">
//         <div className="results-table-container">
//           <h2>
//             <FontAwesomeIcon icon={faFileAlt} className="table-icon" /> Analysis
//             Results
//           </h2>

//           {/* Filter Section */}
//           <div className="filter-section" style={{ marginBottom: "15px" }}>
//             <button
//               className="email-button"
//               style={{ marginRight: "10px", backgroundColor: "#673ab7" }}
//               onClick={() => setShowFilterOptions(!showFilterOptions)}
//             >
//               <FontAwesomeIcon icon={faFilter} /> Filters
//             </button>

//             {showFilterOptions && (
//               <div
//                 style={{
//                   marginTop: "10px",
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "10px",
//                 }}
//               >
//                 <label htmlFor="scoreFilter" style={{ fontSize: "0.9em" }}>
//                   Minimum Score:
//                 </label>
//                 <input
//                   type="range"
//                   id="scoreFilter"
//                   min="0"
//                   max="100"
//                   value={scoreThreshold}
//                   onChange={(e) => setScoreThreshold(parseInt(e.target.value))}
//                   style={{ width: "150px" }}
//                 />
//                 <span style={{ fontSize: "0.9em" }}>{scoreThreshold}</span>
//               </div>
//             )}
//           </div>

//           {/* Results Summary */}
//           <div
//             style={{ marginBottom: "15px", fontSize: "0.9em", color: "#555" }}
//           >
//             Showing all {sortedResults.length} candidates
//             {scoreThreshold > 0
//               ? ` (highlighting ${highlightedResults.length} candidates with score ≥ ${scoreThreshold})`
//               : ""}
//           </div>

//           {/* Bulk Actions */}
//           {filteredResults.length > 0 && (
//             <div className="bulk-actions-container">
//               <div className="selected-count">
//                 {selectedCandidates.length > 0
//                   ? `${selectedCandidates.length} candidates selected`
//                   : "No candidates selected"}
//               </div>

//               <button
//                 className="email-button"
//                 onClick={selectAllCandidates}
//                 style={{ backgroundColor: "#673ab7" }}
//                 disabled={filteredResults.length === 0}
//               >
//                 Select All
//               </button>

//               <button
//                 className="email-button"
//                 onClick={clearAllSelections}
//                 style={{ backgroundColor: "#888" }}
//                 disabled={selectedCandidates.length === 0}
//               >
//                 Clear Selection
//               </button>

//               {selectedCandidates.length > 0 && (
//                 <>
//                   <button
//                     className="email-button"
//                     onClick={() => {
//                       const selected = sortedResults.filter((result) =>
//                         selectedCandidates.includes(result.email)
//                       );
//                       generateBulkMailLinkPerPerson(selected);
//                     }}
//                   >
//                     <FontAwesomeIcon icon={faPaperPlane} /> Send Form
//                   </button>

//                   <button
//                     className="email-button"
//                     onClick={saveSelectedCandidates}
//                     disabled={isSaving}
//                     style={{ backgroundColor: "#28a745" }}
//                   >
//                     {isSaving ? (
//                       <>
//                         <FontAwesomeIcon icon={faSpinner} spin /> Saving...
//                       </>
//                     ) : (
//                       <>
//                         <FontAwesomeIcon icon={faSave} /> Save to Database
//                       </>
//                     )}
//                   </button>
//                 </>
//               )}

//               {saveSuccess && (
//                 <div className="save-notification success">
//                   <FontAwesomeIcon icon={faCheckCircle} /> Candidates saved
//                   successfully!
//                 </div>
//               )}

//               {saveError && (
//                 <div className="save-notification error">
//                   <FontAwesomeIcon icon={faExclamationTriangle} /> {saveError}
//                 </div>
//               )}
//             </div>
//           )}

//           {filteredResults.length > 0 ? (
//             <table>
//               {/* <thead>
//                 <tr>
//                   <th style={{ width: "40px" }}>
//                     <input
//                       type="checkbox"
//                       checked={
//                         selectedCandidates.length === filteredResults.length &&
//                         filteredResults.length > 0
//                       }
//                       onChange={
//                         selectedCandidates.length === filteredResults.length
//                           ? clearAllSelections
//                           : selectAllCandidates
//                       }
//                     />
//                   </th>
//                   <th style={{ width: "120px" }}>
//                     <FontAwesomeIcon icon={faUserTie} className="header-icon" />{" "}
//                     Name
//                   </th>
//                   <th style={{ width: "180px" }}>
//                     <FontAwesomeIcon
//                       icon={faEnvelope}
//                       className="header-icon"
//                     />{" "}
//                     Email
//                   </th>
//                   <th style={{ width: "80px" }}>
//                     <FontAwesomeIcon icon={faStar} className="header-icon" />{" "}
//                     Score
//                   </th>
//                   <th style={{ width: "40%" }}>
//                     <FontAwesomeIcon icon={faFileAlt} className="header-icon" />{" "}
//                     Summary
//                   </th>
//                   <th style={{ width: "40%" }}>
//                     <FontAwesomeIcon icon={faFileAlt} className="header-icon" />{" "}
//                     Common Skills
//                   </th>
//                   <th style={{ width: "40%" }}>
//                     <FontAwesomeIcon icon={faFileAlt} className="header-icon" />{" "}
//                     Experience
//                   </th>
//                   <th style={{ width: "180px" }}>Actions</th>
//                 </tr>
//               </thead> */}
//               <thead>
//                 <tr>
//                   <th style={{ width: "40px" }}>
//                     <input
//                       type="checkbox"
//                       checked={
//                         selectedCandidates.length === filteredResults.length &&
//                         filteredResults.length > 0
//                       }
//                       onChange={
//                         selectedCandidates.length === filteredResults.length
//                           ? clearAllSelections
//                           : selectAllCandidates
//                       }
//                     />
//                   </th>
//                   <th style={{ width: "120px" }}>
//                     <FontAwesomeIcon icon={faUserTie} className="header-icon" />{" "}
//                     Name
//                   </th>
//                   <th style={{ width: "180px" }}>
//                     <FontAwesomeIcon
//                       icon={faEnvelope}
//                       className="header-icon"
//                     />{" "}
//                     Email
//                   </th>
//                   <th style={{ width: "120px" }}>
//                     <FontAwesomeIcon icon={faPhone} className="header-icon" />{" "}
//                     Phone
//                   </th>
//                   <th style={{ width: "120px" }}>
//                     <FontAwesomeIcon
//                       icon={faBriefcase}
//                       className="header-icon"
//                     />{" "}
//                     Role
//                   </th>
//                   <th style={{ width: "80px" }}>
//                     <FontAwesomeIcon icon={faStar} className="header-icon" />{" "}
//                     Score
//                   </th>
//                   <th style={{ width: "120px" }}>
//                     <FontAwesomeIcon
//                       icon={faMapMarkerAlt}
//                       className="header-icon"
//                     />{" "}
//                     Location
//                   </th>
//                   <th style={{ width: "40%" }}>
//                     <FontAwesomeIcon icon={faFileAlt} className="header-icon" />{" "}
//                     Summary
//                   </th>
//                   <th style={{ width: "40%" }}>
//                     <FontAwesomeIcon icon={faFileAlt} className="header-icon" />{" "}
//                     Experience
//                   </th>
//                   <th style={{ width: "180px" }}>Actions</th>
//                 </tr>
//               </thead>
//               {/* <tbody>
//                 {filteredResults.map((result, index) => (
//                   <tr
//                     key={index}
//                     className={
//                       result.similarityScore >= scoreThreshold
//                         ? "highlighted-row"
//                         : ""
//                     }
//                   >
//                     <td>
//                       <input
//                         type="checkbox"
//                         checked={selectedCandidates.includes(result.email)}
//                         onChange={() => toggleCandidateSelection(result.email)}
//                       />
//                     </td>
//                     <td className="name">{result.name}</td>
//                     <td>{result.email}</td>
//                     <td className="score">{result.similarityScore}</td>
//                     <td>{result.resumeSummary}</td>
//                     <td>{result.commonSkills}</td>
//                     <td>{result.totalExperienceYears}</td>
//                     <td>
//                       <button
//                         className="email-button"
//                         onClick={() => generateMailLink(result.email, result)}
//                       >
//                         <FontAwesomeIcon icon={faPaperPlane} /> Send Form
//                       </button>
//                       <button
//                         className="email-button"
//                         onClick={() =>
//                           generateBulkCalendarInvitePerPerson([result])
//                         }
//                       >
//                         <FontAwesomeIcon icon={faCalendarAlt} /> Send Event
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody> */}
//               <tbody>
//                 {filteredResults.map((result, index) => (
//                   <tr
//                     key={index}
//                     className={
//                       result.similarityScore >= scoreThreshold
//                         ? "highlighted-row"
//                         : ""
//                     }
//                   >
//                     <td>
//                       <input
//                         type="checkbox"
//                         checked={selectedCandidates.includes(result.email)}
//                         onChange={() => toggleCandidateSelection(result.email)}
//                       />
//                     </td>
//                     <td className="name">{result.name}</td>
//                     <td>{result.email}</td>
//                     <td>{result.phone}</td> {/* Added phone number */}
//                     <td>{result.roleName || "N/A"}</td>
//                     <td className="score">{result.similarityScore}</td>
//                     <td>{result.location}</td> {/* Added location */}
//                     <td>{result.resumeSummary}</td>
//                     <td>{result.totalExperienceYears}</td>
//                     <td>
//                       <button
//                         className="email-button"
//                         onClick={() => generateMailLink(result.email, result)}
//                       >
//                         <FontAwesomeIcon icon={faPaperPlane} /> Send Form
//                       </button>
//                       <button
//                         className="email-button"
//                         onClick={() =>
//                           generateBulkCalendarInvitePerPerson([result])
//                         }
//                       >
//                         <FontAwesomeIcon icon={faCalendarAlt} /> Send Event
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <div
//               style={{
//                 padding: "30px",
//                 textAlign: "center",
//                 backgroundColor: "#f8f8f8",
//                 borderRadius: "8px",
//                 color: "#666",
//               }}
//             >
//               <FontAwesomeIcon
//                 icon={faFileAlt}
//                 style={{ fontSize: "2em", marginBottom: "15px", opacity: 0.5 }}
//               />
//               <p>No candidates match the current filters.</p>
//               <button
//                 className="email-button"
//                 onClick={() => setScoreThreshold(0)}
//                 style={{ marginTop: "10px" }}
//               >
//                 Reset Filters
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ResultsTable;

// import React, { useState } from 'react';
// import '../ResultsTable.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faEnvelope,
//   faFileAlt,
//   faStar,
//   faPaperPlane,
//   faCalendarAlt,
//   faUserTie,
//   faFilter,
//   faSave,
//   faCheckCircle,
//   faExclamationTriangle,
//   faSpinner,
//   faUserCheck,
// } from '@fortawesome/free-solid-svg-icons';
// import { backend_url } from '../config'; // Import backend_url from config

// function ResultsTable({ analysisResults }) {
//   const [selectedCandidates, setSelectedCandidates] = useState([]);
//   const [showFilterOptions, setShowFilterOptions] = useState(false);
//   const [scoreThreshold, setScoreThreshold] = useState(55);
//   const [isSaving, setIsSaving] = useState(false);
//   const [saveSuccess, setSaveSuccess] = useState(false);
//   const [saveError, setSaveError] = useState(null);

//   const sortedResults = [...analysisResults].sort(
//     (a, b) => b.similarityScore - a.similarityScore
//   );

//   // Filter results based on threshold (for highlighting purposes only)
//   const highlightedResults = sortedResults.filter(
//     (result) => result.similarityScore >= scoreThreshold
//   );

//   // Use all sorted results regardless of threshold
//   const filteredResults = sortedResults;

//   const toggleCandidateSelection = (email) => {
//     setSelectedCandidates((prevSelected) =>
//       prevSelected.includes(email)
//         ? prevSelected.filter((e) => e !== email)
//         : [...prevSelected, email]
//     );
//   };

//   const generateMailLink = (email, result) => {
//     const subject = encodeURIComponent('Resume Analysis - Google Form');
//     const googleFormBaseUrl =
//       'https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/viewform';

//     const formLink = `${googleFormBaseUrl}?entry.123456=${encodeURIComponent(
//       result.name
//     )}&entry.654321=${encodeURIComponent(
//       result.email
//     )}&entry.111222=${encodeURIComponent(result.similarityScore)}`;

//     const body = encodeURIComponent(
//       `Hi ${result.name},\n\nThank you for submitting your resume.\nPlease fill out this short form:\n\n${formLink}\n\nBest regards,\nTeam CoreHire\n`
//     );

//     const outlookLink = `https://outlook.office.com/mail/deeplink/compose?to=${email}&subject=${subject}&body=${body}`;
//     window.open(outlookLink);
//   };

//   const generateBulkMailLinkPerPerson = (candidates) => {
//     candidates.forEach((current) => {
//       const bccList = candidates
//         .filter((c) => c.email !== current.email)
//         .map((c) => c.email)
//         .join(';');

//       const googleFormBaseUrl =
//         'https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/viewform';
//       const formLink = `${googleFormBaseUrl}?entry.123456=${encodeURIComponent(
//         current.name
//       )}&entry.654321=${encodeURIComponent(
//         current.email
//       )}&entry.111222=${encodeURIComponent(current.similarityScore)}`;

//       const subject = encodeURIComponent('Resume Analysis - Google Form');
//       const body = encodeURIComponent(
//         `Hi ${current.name},\n\nThank you for submitting your resume.\nPlease fill out this short form:\n\n${formLink}\n\nBest regards,\nTeam CoreHire\n`
//       );

//       const outlookLink =
//         `https://outlook.office.com/mail/deeplink/compose?to=${current.email}` +
//         (bccList ? `&bcc=${encodeURIComponent(bccList)}` : '') +
//         `&subject=${subject}&body=${body}`;

//       window.open(outlookLink, '_blank');
//     });
//   };

//   const generateBulkCalendarInvitePerPerson = (candidates) => {
//     candidates.forEach((current) => {
//       const bccList = candidates
//         .filter((c) => c.email !== current.email)
//         .map((c) => c.email)
//         .join(';');

//       const subject = `Meeting Invitation - Resume Review for ${current.name}`;
//       const bodyHTML = `
//         <div style="font-family: Arial, sans-serif; color: #333;">
//           <h2 style="color: #5e42a6;">Hi ${current.name},</h2>
//           <p>Please join the meeting to discuss your job roles and some important points related to your resume.</p>
//           <p>Looking forward to our conversation!</p>
//           <p style="margin-top: 30px;">Thanks,<br><strong>Team CoreHire</strong></p>
//         </div>
//       `;

//       const outlookCalendarLink =
//         `https://outlook.office.com/calendar/0/deeplink/compose` +
//         `?path=/calendar/action/compose` +
//         `&to=${encodeURIComponent(current.email)}` +
//         (bccList ? `&bcc=${encodeURIComponent(bccList)}` : '') +
//         `&subject=${encodeURIComponent(subject)}` +
//         `&body=${encodeURIComponent(bodyHTML)}`;

//       window.open(outlookCalendarLink, '_blank');
//     });
//   };

//   // New function to select all qualified candidates
//   const selectAllQualifiedCandidates = () => {
//     const qualifiedEmails = sortedResults
//       .filter((result) => result.similarityScore >= scoreThreshold)
//       .map((result) => result.email);
//     setSelectedCandidates(qualifiedEmails);
//   };

//   const selectAllCandidates = () => {
//     const allFilteredEmails = filteredResults.map((result) => result.email);
//     setSelectedCandidates(allFilteredEmails);
//   };

//   const clearAllSelections = () => {
//     setSelectedCandidates([]);
//   };

//   const saveSelectedCandidates = async () => {
//     if (selectedCandidates.length === 0) {
//       return;
//     }

//     try {
//       setIsSaving(true);
//       setSaveSuccess(false);
//       setSaveError(null);

//       // Get the full data for selected candidates
//       const candidatesToSave = sortedResults
//         .filter((candidate) => selectedCandidates.includes(candidate.email))
//         .map((candidate) => ({
//           name: candidate.name,
//           email: candidate.email,
//           resumeSummary: candidate.resumeSummary,
//           similarityScore: candidate.similarityScore,
//         }));

//       // Make API call to save candidates using the backend_url from config
//       const response = await fetch(`${backend_url}/candidates`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ candidates: candidatesToSave }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to save candidates');
//       }

//       const data = await response.json();
//       console.log('Save successful:', data);
//       setSaveSuccess(true);

//       // Auto-hide success message after 3 seconds
//       setTimeout(() => setSaveSuccess(false), 3000);
//     } catch (error) {
//       console.error('Error saving candidates:', error);
//       setSaveError(error.message || 'Failed to save candidates');

//       // Auto-hide error message after 5 seconds
//       setTimeout(() => setSaveError(null), 5000);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className='app-container'>
//       <div className='full-page-container'>
//         <div className='results-table-container'>
//           <h2>
//             <FontAwesomeIcon icon={faFileAlt} className='table-icon' /> Analysis
//             Results
//           </h2>

//           {/* Filter Section */}
//           <div className='filter-section' style={{ marginBottom: '15px' }}>
//             <button
//               className='email-button'
//               style={{ marginRight: '10px', backgroundColor: '#673ab7' }}
//               onClick={() => setShowFilterOptions(!showFilterOptions)}
//             >
//               <FontAwesomeIcon icon={faFilter} /> Filters
//             </button>

//             {showFilterOptions && (
//               <div
//                 style={{
//                   marginTop: '10px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '10px',
//                 }}
//               >
//                 <label htmlFor='scoreFilter' style={{ fontSize: '0.9em' }}>
//                   Minimum Score:
//                 </label>
//                 <input
//                   type='range'
//                   id='scoreFilter'
//                   min='0'
//                   max='100'
//                   value={scoreThreshold}
//                   onChange={(e) => setScoreThreshold(parseInt(e.target.value))}
//                   style={{ width: '150px' }}
//                 />
//                 <span style={{ fontSize: '0.9em' }}>{scoreThreshold}</span>
//               </div>
//             )}
//           </div>

//           {/* Results Summary */}
//           <div
//             style={{ marginBottom: '15px', fontSize: '0.9em', color: '#555' }}
//           >
//             Showing all {sortedResults.length} candidates
//             {scoreThreshold > 0
//               ? ` (highlighting ${highlightedResults.length} candidates with score ≥ ${scoreThreshold})`
//               : ''}
//           </div>

//           {/* Bulk Actions */}
//           {filteredResults.length > 0 && (
//             <div className='bulk-actions-container'>
//               <div className='selected-count'>
//                 {selectedCandidates.length > 0
//                   ? `${selectedCandidates.length} candidates selected`
//                   : 'No candidates selected'}
//               </div>

//               <button
//                 className='email-button'
//                 onClick={selectAllCandidates}
//                 style={{ backgroundColor: '#673ab7' }}
//                 disabled={filteredResults.length === 0}
//               >
//                 Select All
//               </button>

//               {/* New button to select qualified candidates */}
//               <button
//                 className='email-button'
//                 onClick={selectAllQualifiedCandidates}
//                 style={{ backgroundColor: '#009688' }}
//                 disabled={highlightedResults.length === 0}
//               >
//                 <FontAwesomeIcon icon={faUserCheck} /> Select Qualified
//               </button>

//               {/* <button
//                 className='email-button'
//                 onClick={clearAllSelections}
//                 style={{ backgroundColor: '#888' }}
//                 disabled={selectedCandidates.length === 0}
//               >
//                 Clear Selection
//               </button> */}

//               <button
//                 className='email-button clear-selection-button'
//                 onClick={clearAllSelections}
//                 style={{
//                   backgroundColor: '#ff5252',
//                   color: 'white',
//                   fontWeight: '500',
//                   padding: '8px 16px',
//                   borderRadius: '4px',
//                   border: 'none',
//                   cursor: 'pointer',
//                   transition: 'background-color 0.3s',
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                 }}
//                 disabled={selectedCandidates.length === 0}
//               >
//                 Clear Selection
//               </button>

//               {selectedCandidates.length > 0 && (
//                 <>
//                   <button
//                     className='email-button'
//                     onClick={() => {
//                       const selected = sortedResults.filter((result) =>
//                         selectedCandidates.includes(result.email)
//                       );
//                       generateBulkMailLinkPerPerson(selected);
//                     }}
//                   >
//                     <FontAwesomeIcon icon={faPaperPlane} /> Send Form
//                   </button>

//                   <button
//                     className='email-button'
//                     onClick={saveSelectedCandidates}
//                     disabled={isSaving}
//                     style={{ backgroundColor: '#28a745' }}
//                   >
//                     {isSaving ? (
//                       <>
//                         <FontAwesomeIcon icon={faSpinner} spin /> Saving...
//                       </>
//                     ) : (
//                       <>
//                         <FontAwesomeIcon icon={faSave} /> Save to Database
//                       </>
//                     )}
//                   </button>
//                 </>
//               )}

//               {saveSuccess && (
//                 <div className='save-notification success'>
//                   <FontAwesomeIcon icon={faCheckCircle} /> Candidates saved
//                   successfully!
//                 </div>
//               )}

//               {saveError && (
//                 <div className='save-notification error'>
//                   <FontAwesomeIcon icon={faExclamationTriangle} /> {saveError}
//                 </div>
//               )}
//             </div>
//           )}

//           {filteredResults.length > 0 ? (
//             <table>
//               <thead>
//                 <tr>
//                   <th style={{ width: '40px' }}>
//                     <input
//                       type='checkbox'
//                       checked={
//                         selectedCandidates.length === filteredResults.length &&
//                         filteredResults.length > 0
//                       }
//                       onChange={
//                         selectedCandidates.length === filteredResults.length
//                           ? clearAllSelections
//                           : selectAllCandidates
//                       }
//                     />
//                   </th>
//                   <th style={{ width: '120px' }}>
//                     <FontAwesomeIcon icon={faUserTie} className='header-icon' />{' '}
//                     Name
//                   </th>
//                   <th style={{ width: '180px' }}>
//                     <FontAwesomeIcon
//                       icon={faEnvelope}
//                       className='header-icon'
//                     />{' '}
//                     Email
//                   </th>
//                   <th style={{ width: '80px' }}>
//                     <FontAwesomeIcon icon={faStar} className='header-icon' />{' '}
//                     Score
//                   </th>
//                   <th style={{ width: '40%' }}>
//                     <FontAwesomeIcon icon={faFileAlt} className='header-icon' />{' '}
//                     Summary
//                   </th>
//                   <th style={{ width: '180px' }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredResults.map((result, index) => (
//                   <tr
//                     key={index}
//                     className={
//                       result.similarityScore >= scoreThreshold
//                         ? 'highlighted-row'
//                         : ''
//                     }
//                   >
//                     <td>
//                       <input
//                         type='checkbox'
//                         checked={selectedCandidates.includes(result.email)}
//                         onChange={() => toggleCandidateSelection(result.email)}
//                       />
//                     </td>
//                     <td className='name'>{result.name}</td>
//                     <td>{result.email}</td>
//                     <td className='score'>{result.similarityScore}</td>
//                     <td>{result.resumeSummary}</td>
//                     <td>
//                       <button
//                         className='email-button'
//                         onClick={() => generateMailLink(result.email, result)}
//                       >
//                         <FontAwesomeIcon icon={faPaperPlane} /> Send Form
//                       </button>
//                       <button
//                         className='email-button'
//                         onClick={() =>
//                           generateBulkCalendarInvitePerPerson([result])
//                         }
//                       >
//                         <FontAwesomeIcon icon={faCalendarAlt} /> Send Event
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <div
//               style={{
//                 padding: '30px',
//                 textAlign: 'center',
//                 backgroundColor: '#f8f8f8',
//                 borderRadius: '8px',
//                 color: '#666',
//               }}
//             >
//               <FontAwesomeIcon
//                 icon={faFileAlt}
//                 style={{ fontSize: '2em', marginBottom: '15px', opacity: 0.5 }}
//               />
//               <p>No candidates match the current filters.</p>
//               <button
//                 className='email-button'
//                 onClick={() => setScoreThreshold(0)}
//                 style={{ marginTop: '10px' }}
//               >
//                 Reset Filters
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ResultsTable;

// import React, { useState } from 'react';
// import '../ResultsTable.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faEnvelope,
//   faFileAlt,
//   faStar,
//   faPaperPlane,
//   faCalendarAlt,
//   faUserTie,
//   faFilter,
//   faSave,
//   faCheckCircle,
//   faExclamationTriangle,
//   faSpinner,
//   faUserCheck,
// } from '@fortawesome/free-solid-svg-icons';
// import { backend_url } from '../config'; // Import backend_url from config

// function ResultsTable({ analysisResults }) {
//   const [selectedCandidates, setSelectedCandidates] = useState([]);
//   const [showFilterOptions, setShowFilterOptions] = useState(false);
//   const [scoreThreshold, setScoreThreshold] = useState(55);
//   const [isSaving, setIsSaving] = useState(false);
//   const [saveSuccess, setSaveSuccess] = useState(false);
//   const [saveError, setSaveError] = useState(null);

//   // ---- START: Added states for conditional saving ----
//   const [saveIntent, setSaveIntent] = useState('default'); // 'default' or 'qualified'
//   const [successMessage, setSuccessMessage] = useState(''); // For custom success messages
//   // ---- END: Added states ----

//   const sortedResults = [...analysisResults].sort(
//     (a, b) => b.similarityScore - a.similarityScore
//   );

//   const highlightedResults = sortedResults.filter(
//     (result) => result.similarityScore >= scoreThreshold
//   );

//   const filteredResults = sortedResults; // Still showing all results

//   const toggleCandidateSelection = (email) => {
//     setSelectedCandidates((prevSelected) =>
//       prevSelected.includes(email)
//         ? prevSelected.filter((e) => e !== email)
//         : [...prevSelected, email]
//     );
//     // ---- START: Reset intent on manual selection ----
//     setSaveIntent('default');
//     // ---- END: Reset intent ----
//   };

//   const generateMailLink = (email, result) => {
//     // ... (your existing mail link generation logic - unchanged)
//     const subject = encodeURIComponent('Resume Analysis - Google Form');
//     const googleFormBaseUrl =
//       'https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/viewform';

//     const formLink = `${googleFormBaseUrl}?entry.123456=${encodeURIComponent(
//       result.name
//     )}&entry.654321=${encodeURIComponent(
//       result.email
//     )}&entry.111222=${encodeURIComponent(result.similarityScore)}`;

//     const body = encodeURIComponent(
//       `Hi ${result.name},\n\nThank you for submitting your resume.\nPlease fill out this short form:\n\n${formLink}\n\nBest regards,\nTeam CoreHire\n`
//     );

//     const outlookLink = `https://outlook.office.com/mail/deeplink/compose?to=${email}&subject=${subject}&body=${body}`;
//     window.open(outlookLink);
//   };

//   const generateBulkMailLinkPerPerson = (candidates) => {
//     // ... (your existing bulk mail logic - unchanged)
//     candidates.forEach((current) => {
//       const bccList = candidates
//         .filter((c) => c.email !== current.email)
//         .map((c) => c.email)
//         .join(';');

//       const googleFormBaseUrl =
//         'https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/viewform';
//       const formLink = `${googleFormBaseUrl}?entry.123456=${encodeURIComponent(
//         current.name
//       )}&entry.654321=${encodeURIComponent(
//         current.email
//       )}&entry.111222=${encodeURIComponent(current.similarityScore)}`;

//       const subject = encodeURIComponent('Resume Analysis - Google Form');
//       const body = encodeURIComponent(
//         `Hi ${current.name},\n\nThank you for submitting your resume.\nPlease fill out this short form:\n\n${formLink}\n\nBest regards,\nTeam CoreHire\n`
//       );

//       const outlookLink =
//         `https://outlook.office.com/mail/deeplink/compose?to=${current.email}` +
//         (bccList ? `&bcc=${encodeURIComponent(bccList)}` : '') +
//         `&subject=${subject}&body=${body}`;

//       window.open(outlookLink, '_blank');
//     });
//   };

//   const generateBulkCalendarInvitePerPerson = (candidates) => {
//     // ... (your existing bulk calendar logic - unchanged)
//     candidates.forEach((current) => {
//       const bccList = candidates
//         .filter((c) => c.email !== current.email)
//         .map((c) => c.email)
//         .join(';');

//       const subject = `Meeting Invitation - Resume Review for ${current.name}`;
//       const bodyHTML = `
//         <div style="font-family: Arial, sans-serif; color: #333;">
//           <h2 style="color: #5e42a6;">Hi ${current.name},</h2>
//           <p>Please join the meeting to discuss your job roles and some important points related to your resume.</p>
//           <p>Looking forward to our conversation!</p>
//           <p style="margin-top: 30px;">Thanks,<br><strong>Team CoreHire</strong></p>
//         </div>
//       `;

//       const outlookCalendarLink =
//         `https://outlook.office.com/calendar/0/deeplink/compose` +
//         `?path=/calendar/action/compose` +
//         `&to=${encodeURIComponent(current.email)}` +
//         (bccList ? `&bcc=${encodeURIComponent(bccList)}` : '') +
//         `&subject=${encodeURIComponent(subject)}` +
//         `&body=${encodeURIComponent(bodyHTML)}`;

//       window.open(outlookCalendarLink, '_blank');
//     });
//   };

//   const selectAllQualifiedCandidates = () => {
//     const qualifiedEmails = sortedResults
//       .filter((result) => result.similarityScore >= scoreThreshold)
//       .map((result) => result.email);
//     setSelectedCandidates(qualifiedEmails);
//     // ---- START: Set intent for qualified save ----
//     if (qualifiedEmails.length > 0) {
//       setSaveIntent('qualified');
//     } else {
//       setSaveIntent('default'); // If no qualified selected, revert to default
//     }
//     // ---- END: Set intent ----
//   };

//   const selectAllCandidates = () => {
//     const allFilteredEmails = filteredResults.map((result) => result.email);
//     setSelectedCandidates(allFilteredEmails);
//     // ---- START: Set intent for default save ----
//     setSaveIntent('default');
//     // ---- END: Set intent ----
//   };

//   const clearAllSelections = () => {
//     setSelectedCandidates([]);
//     // ---- START: Reset intent ----
//     setSaveIntent('default');
//     // ---- END: Reset intent ----
//   };

//   const saveSelectedCandidates = async () => {
//     if (selectedCandidates.length === 0) {
//       return;
//     }

//     setIsSaving(true);
//     setSaveSuccess(false);
//     setSaveError(null);
//     // ---- START: Reset dynamic success message ----
//     setSuccessMessage('');
//     // ---- END: Reset ----

//     const candidatesToSave = sortedResults
//       .filter((candidate) => selectedCandidates.includes(candidate.email))
//       .map((candidate) => ({
//         name: candidate.name,
//         email: candidate.email,
//         resumeSummary: candidate.resumeSummary,
//         similarityScore: candidate.similarityScore,
//       }));

//     if (candidatesToSave.length === 0) {
//         setIsSaving(false);
//         return;
//     }

//     // ---- START: Conditional endpoint logic ----
//     let endpoint = `${backend_url}/candidates`; // Default endpoint for general 'candidates' collection
//     let currentSaveType = 'default';

//     if (saveIntent === 'qualified') {
//       // Double-check: ensure all selected are actually qualified if intent is 'qualified'
//       const allSelectedAreTrulyQualified = candidatesToSave.every(
//         (c) => c.similarityScore >= scoreThreshold
//       );

//       if (allSelectedAreTrulyQualified) {
//         endpoint = `${backend_url}/qualified-candidates`; // Target 'qualifiedcandidates' collection
//         currentSaveType = 'qualified';
//       } else {
//         // If intent was 'qualified', but selection was mixed (e.g., manual changes after "Select Qualified")
//         // it's safer to save to the general 'candidates' collection or show an error.
//         // For this implementation, we'll revert to default with a warning.
//         console.warn(
//           "Save intent was 'qualified', but current selection is mixed or doesn't meet criteria. Saving to general candidates database."
//         );
//         // endpoint remains the default one, currentSaveType remains 'default'
//       }
//     }
//     // ---- END: Conditional endpoint logic ----

//     try {
//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ candidates: candidatesToSave }), // Backend expects { "candidates": [...] }
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(
//           errorData.message ||
//             `Failed to save ${
//               currentSaveType === 'qualified' ? 'qualified ' : ''
//             }candidates`
//         );
//       }

//       const data = await response.json();
//       console.log('Save successful:', data);
//       setSaveSuccess(true);
//       // ---- START: Set dynamic success message ----
//       setSuccessMessage(
//         `${candidatesToSave.length} ${
//           currentSaveType === 'qualified' ? 'qualified ' : ''
//         }candidate(s) saved successfully!`
//       );
//       // ---- END: Set dynamic success message ----

//       setTimeout(() => {
//         setSaveSuccess(false);
//         setSuccessMessage('');
//       }, 3000);
//     } catch (error) {
//       console.error('Error saving candidates:', error);
//       setSaveError(
//         error.message ||
//           `Failed to save ${
//             currentSaveType === 'qualified' ? 'qualified ' : ''
//           }candidates`
//       );
//       setTimeout(() => setSaveError(null), 5000);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className='app-container'>
//       <div className='full-page-container'>
//         <div className='results-table-container'>
//           <h2>
//             <FontAwesomeIcon icon={faFileAlt} className='table-icon' /> Analysis
//             Results
//           </h2>

//           {/* Filter Section */}
//           <div className='filter-section' style={{ marginBottom: '15px' }}>
//             <button
//               className='email-button'
//               style={{ marginRight: '10px', backgroundColor: '#673ab7' }}
//               onClick={() => setShowFilterOptions(!showFilterOptions)}
//             >
//               <FontAwesomeIcon icon={faFilter} /> Filters
//             </button>

//             {showFilterOptions && (
//               <div
//                 style={{
//                   marginTop: '10px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '10px',
//                 }}
//               >
//                 <label htmlFor='scoreFilter' style={{ fontSize: '0.9em' }}>
//                   Minimum Score:
//                 </label>
//                 <input
//                   type='range'
//                   id='scoreFilter'
//                   min='0'
//                   max='100'
//                   value={scoreThreshold}
//                   onChange={(e) => setScoreThreshold(parseInt(e.target.value))}
//                   style={{ width: '150px' }}
//                 />
//                 <span style={{ fontSize: '0.9em' }}>{scoreThreshold}</span>
//               </div>
//             )}
//           </div>

//           {/* Results Summary */}
//           <div
//             style={{ marginBottom: '15px', fontSize: '0.9em', color: '#555' }}
//           >
//             Showing all {sortedResults.length} candidates
//             {scoreThreshold > 0
//               ? ` (highlighting ${highlightedResults.length} candidates with score ≥ ${scoreThreshold})`
//               : ''}
//           </div>

//           {/* Bulk Actions */}
//           {filteredResults.length > 0 && (
//             <div className='bulk-actions-container'>
//               <div className='selected-count'>
//                 {selectedCandidates.length > 0
//                   ? `${selectedCandidates.length} candidates selected ${
//                       // ---- START: Add intent to selected count message ----
//                       saveIntent === 'qualified' &&
//                       selectedCandidates.length > 0 &&
//                       selectedCandidates.every((email) =>
//                         highlightedResults.find((hr) => hr.email === email)
//                       ) // ensure all selected are actually qualified
//                         ? '(for Qualified DB)'
//                         : '(for General DB)'
//                       // ---- END: Add intent ----
//                     }`
//                   : 'No candidates selected'}
//               </div>

//               <button
//                 className='email-button'
//                 onClick={selectAllCandidates}
//                 style={{ backgroundColor: '#673ab7' }}
//                 disabled={filteredResults.length === 0}
//               >
//                 Select All
//               </button>

//               <button
//                 className='email-button'
//                 onClick={selectAllQualifiedCandidates}
//                 style={{ backgroundColor: '#009688' }}
//                 disabled={highlightedResults.length === 0}
//               >
//                 <FontAwesomeIcon icon={faUserCheck} /> Select Qualified
//               </button>

//               <button
//                 className='email-button clear-selection-button'
//                 onClick={clearAllSelections}
//                 // ... (your existing styles)
//                 disabled={selectedCandidates.length === 0}
//               >
//                 Clear Selection
//               </button>

//               {selectedCandidates.length > 0 && (
//                 <>
//                   <button
//                     className='email-button'
//                     onClick={() => {
//                       const selected = sortedResults.filter((result) =>
//                         selectedCandidates.includes(result.email)
//                       );
//                       generateBulkMailLinkPerPerson(selected);
//                     }}
//                   >
//                     <FontAwesomeIcon icon={faPaperPlane} /> Send Form
//                   </button>

//                   <button
//                     className='email-button'
//                     onClick={saveSelectedCandidates}
//                     disabled={isSaving}
//                     style={{ backgroundColor: '#28a745' }}
//                   >
//                     {isSaving ? (
//                       <>
//                         <FontAwesomeIcon icon={faSpinner} spin /> Saving...
//                       </>
//                     ) : (
//                       <>
//                         <FontAwesomeIcon icon={faSave} />
//                         {/* ---- START: Dynamic button text ---- */}
//                         {saveIntent === 'qualified' &&
//                         selectedCandidates.length > 0 &&
//                         selectedCandidates.every((email) =>
//                             highlightedResults.find((hr) => hr.email === email)
//                         )
//                           ? 'Save to Qualified DB'
//                           : 'Save to General DB'}
//                         {/* ---- END: Dynamic button text ---- */}
//                       </>
//                     )}
//                   </button>
//                 </>
//               )}

//               {saveSuccess && (
//                 <div className='save-notification success'>
//                   <FontAwesomeIcon icon={faCheckCircle} /> {successMessage}
//                 </div>
//               )}

//               {saveError && (
//                 <div className='save-notification error'>
//                   <FontAwesomeIcon icon={faExclamationTriangle} /> {saveError}
//                 </div>
//               )}
//             </div>
//           )}

//           {filteredResults.length > 0 ? (
//             <table>
//               {/* ... (your table antd thead - unchanged) ... */}
//               <thead>
//                 <tr>
//                   <th style={{ width: '40px' }}>
//                     <input
//                       type='checkbox'
//                       checked={
//                         selectedCandidates.length === filteredResults.length &&
//                         filteredResults.length > 0
//                       }
//                       onChange={
//                         selectedCandidates.length === filteredResults.length
//                           ? clearAllSelections
//                           : selectAllCandidates
//                       }
//                     />
//                   </th>
//                   <th style={{ width: '120px' }}>
//                     <FontAwesomeIcon icon={faUserTie} className='header-icon' />{' '}
//                     Name
//                   </th>
//                   <th style={{ width: '180px' }}>
//                     <FontAwesomeIcon
//                       icon={faEnvelope}
//                       className='header-icon'
//                     />{' '}
//                     Email
//                   </th>
//                   <th style={{ width: '80px' }}>
//                     <FontAwesomeIcon icon={faStar} className='header-icon' />{' '}
//                     Score
//                   </th>
//                   <th style={{ width: '40%' }}>
//                     <FontAwesomeIcon icon={faFileAlt} className='header-icon' />{' '}
//                     Summary
//                   </th>
//                   <th style={{ width: '180px' }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredResults.map((result, index) => (
//                   <tr
//                     key={index}
//                     className={
//                       result.similarityScore >= scoreThreshold
//                         ? 'highlighted-row'
//                         : ''
//                     }
//                   >
//                     <td>
//                       <input
//                         type='checkbox'
//                         checked={selectedCandidates.includes(result.email)}
//                         onChange={() => toggleCandidateSelection(result.email)}
//                       />
//                     </td>
//                     <td className='name'>{result.name}</td>
//                     <td>{result.email}</td>
//                     <td className='score'>{result.similarityScore}</td>
//                     <td>{result.resumeSummary}</td>
//                     <td>
//                       <button
//                         className='email-button'
//                         onClick={() => generateMailLink(result.email, result)}
//                       >
//                         <FontAwesomeIcon icon={faPaperPlane} /> Send Form
//                       </button>
//                       <br />
//                       <button
//                         className='email-button'
//                         onClick={() =>
//                           generateBulkCalendarInvitePerPerson([result])
//                         }
//                       >
//                         <FontAwesomeIcon icon={faCalendarAlt} /> Send Event
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             // ... (your "No candidates match" message - unchanged)
//              <div
//               style={{
//                 padding: '30px',
//                 textAlign: 'center',
//                 backgroundColor: '#f8f8f8',
//                 borderRadius: '8px',
//                 color: '#666',
//               }}
//             >
//               <FontAwesomeIcon
//                 icon={faFileAlt}
//                 style={{ fontSize: '2em', marginBottom: '15px', opacity: 0.5 }}
//               />
//               {analysisResults && analysisResults.length === 0 && !scoreThreshold ? // Check if initial data is empty
//                 <p>No analysis results available. Please upload resumes first.</p> :
//                 <p>No candidates match the current filters.</p>
//               }
//               <button
//                 className='email-button'
//                 onClick={() => setScoreThreshold(0)} // This only affects highlighting
//                 style={{ marginTop: '10px' }}
//               >
//                 Reset Score Filter
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ResultsTable;

// import React, { useState, useEffect, useMemo } from 'react';
// import '../ResultsTable.css'; // This CSS should contain the CoreOps.ai theme
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import ClipLoader from 'react-spinners/ClipLoader';
// import {
//   faEnvelope,
//   faFileAlt,
//   faStar,
//   faPaperPlane,
//   faCalendarAlt,
//   faUserTie,
//   faFilter,
//   faSave,
//   faCheckCircle,
//   faExclamationTriangle,
//   faSpinner,
//   faUserCheck,
//   faUndo,
//   faListAlt, // New icon for results header
//   faExclamationCircle, // For error icon in rows
// } from '@fortawesome/free-solid-svg-icons';
// import { backend_url } from '../config';
// import { Link } from 'react-router-dom'; // For "Go to Upload" link

// function ResultsTable({ analysisResults }) {
//   const [selectedCandidates, setSelectedCandidates] = useState([]);
//   const [showFilterOptions, setShowFilterOptions] = useState(false);
//   const [scoreThreshold, setScoreThreshold] = useState(55);
//   const [isSaving, setIsSaving] = useState(false);
//   const [saveSuccess, setSaveSuccess] = useState(false);
//   const [saveError, setSaveError] = useState(null);
//   const [saveIntent, setSaveIntent] = useState('default');
//   const [successMessage, setSuccessMessage] = useState('');

//   // useEffect for logging (can be removed in production)
//   useEffect(() => {
//     console.log("ResultsTable received analysisResults:", analysisResults);
//     if (analysisResults && analysisResults.length > 0) {
//         console.log("First result structure:", analysisResults[0]);
//     }
//   }, [analysisResults]);

//   const processedResults = useMemo(() => {
//     if (!analysisResults || !Array.isArray(analysisResults)) {
//       return [];
//     }
//     return analysisResults
//       .map(item => ({
//         fileName: item.fileName || 'N/A',
//         name: item.analysis?.name || 'N/A',
//         email: item.analysis?.email || 'N/A',
//         phone: item.analysis?.phone || 'N/A',
//         location: item.analysis?.location || 'N/A',
//         keySkills: item.analysis?.keySkills || [],
//         totalExperienceYears: item.analysis?.totalExperienceYears || 0,
//         mainDomain: item.analysis?.mainDomain || 'N/A',
//         companiesWorked: item.analysis?.companiesWorked || [],
//         education: item.analysis?.education || [],
//         similarityScore: typeof item.analysis?.similarityScore === 'number' ? item.analysis.similarityScore : 0,
//         commonSkills: item.analysis?.commonSkills || [],
//         preferred: item.analysis?.preferred || 'No',
//         roleName: item.analysis?.roleName || 'N/A',
//         resumeSummary: item.summary || 'N/A',
//         error: item.error,
//         analysisError: item.analysis?.error
//       }))
//       .sort((a, b) => b.similarityScore - a.similarityScore);
//   }, [analysisResults]);

//   const highlightedResults = useMemo(() => {
//     return processedResults.filter(
//       (result) => result.similarityScore >= scoreThreshold && !result.error && !result.analysisError
//     );
//   }, [processedResults, scoreThreshold]);

//   const displayResults = processedResults;

//   const toggleCandidateSelection = (email) => {
//     setSelectedCandidates((prevSelected) =>
//       prevSelected.includes(email)
//         ? prevSelected.filter((e) => e !== email)
//         : [...prevSelected, email]
//     );
//     setSaveIntent('default');
//   };

//   const generateMailLink = (email, candidateData) => {
//     if (!email || email === 'N/A') {
//         alert("Cannot generate mail link: Candidate email is not available.");
//         return;
//     }
//     const subject = encodeURIComponent('Follow Up: Your Application with CoreOps.ai');
//     const googleFormBaseUrl =
//       'https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID_HERE/viewform';

//     if (googleFormBaseUrl.includes('YOUR_GOOGLE_FORM_ID_HERE')) {
//         alert("Action Required: Please configure the Google Form ID in ResultsTable.js (generateMailLink function) to enable sending emails with pre-filled forms.");
//         return;
//     }

//     // IMPORTANT: Replace these with your actual Google Form pre-fill entry IDs
//     const formLink = `${googleFormBaseUrl}?usp=pp_url&entry.YOUR_NAME_FIELD_ID=${encodeURIComponent(
//       candidateData.name
//     )}&entry.YOUR_EMAIL_FIELD_ID=${encodeURIComponent(
//       candidateData.email
//     )}&entry.YOUR_SCORE_FIELD_ID=${encodeURIComponent(candidateData.similarityScore)}`;

//     const body = encodeURIComponent(
//       `Dear ${candidateData.name || 'Candidate'},\n\nThank you for your interest in a position at CoreOps.ai. We were impressed with your resume.\n\nTo help us learn a bit more about you, please take a few minutes to complete this short form: ${formLink}\n\nWe look forward to hearing from you.\n\nBest regards,\nTalent Acquisition Team\nCoreOps.ai`
//     );

//     const outlookLink = `https://outlook.office.com/mail/deeplink/compose?to=${email}&subject=${subject}&body=${body}`;
//     window.open(outlookLink, '_blank');
//   };

//   const generateBulkMailLink = (candidatesToMail) => {
//     if (candidatesToMail.length === 0) return;
//     candidatesToMail.forEach(candidate => {
//         generateMailLink(candidate.email, candidate);
//     });
//   };

//   const selectAllQualifiedCandidates = () => {
//     const qualifiedEmails = highlightedResults
//       .filter(result => !result.error && !result.analysisError)
//       .map((result) => result.email);
//     setSelectedCandidates(qualifiedEmails);
//     if (qualifiedEmails.length > 0) {
//       setSaveIntent('qualified');
//     } else {
//       setSaveIntent('default');
//     }
//   };

//   const selectAllCandidates = () => {
//     const allDisplayEmails = displayResults
//       .filter(result => !result.error && !result.analysisError)
//       .map((result) => result.email);
//     setSelectedCandidates(allDisplayEmails);
//     setSaveIntent('default');
//   };

//   const clearAllSelections = () => {
//     setSelectedCandidates([]);
//     setSaveIntent('default');
//   };

//   const saveSelectedCandidates = async () => {
//     if (selectedCandidates.length === 0) {
//         setSaveError("Please select at least one candidate to save.");
//         setTimeout(() => setSaveError(null), 3000);
//         return;
//     }

//     setIsSaving(true);
//     setSaveSuccess(false);
//     setSaveError(null);
//     setSuccessMessage('');

//     const candidatesToSave = processedResults
//       .filter((candidate) => selectedCandidates.includes(candidate.email))
//       .map((candidate) => ({
//         name: candidate.name,
//         email: candidate.email,
//         phone: candidate.phone,
//         location: candidate.location,
//         keySkills: candidate.keySkills,
//         totalExperienceYears: candidate.totalExperienceYears,
//         mainDomain: candidate.mainDomain,
//         resumeSummary: candidate.resumeSummary,
//         similarityScore: candidate.similarityScore,
//         preferred: candidate.preferred,
//         roleName: candidate.roleName,
//         fileName: candidate.fileName
//       }));

//     if (candidatesToSave.length === 0) {
//         setIsSaving(false);
//         return;
//     }

//     let endpoint = `${backend_url}/candidates`;
//     let currentSaveType = 'default';

//     if (saveIntent === 'qualified') {
//       const allSelectedAreTrulyQualified = candidatesToSave.every(
//         (c) => c.similarityScore >= scoreThreshold
//       );
//       if (allSelectedAreTrulyQualified && candidatesToSave.length > 0) {
//         endpoint = `${backend_url}/qualified-candidates`;
//         currentSaveType = 'qualified';
//       } else if (candidatesToSave.length > 0) {
//         console.warn("Save intent 'qualified', but selection mixed or empty after filtering. Saving to general.");
//       }
//     }

//     try {
//       console.log(`Saving ${candidatesToSave.length} candidates to ${endpoint}`);
//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ candidates: candidatesToSave }),
//       });
//       const responseData = await response.json();
//       if (!response.ok) {
//         throw new Error(responseData.message || `Server error: ${response.status}`);
//       }
//       setSaveSuccess(true);
//       setSuccessMessage(
//         responseData.message || `${candidatesToSave.length} ${
//           currentSaveType === 'qualified' ? 'qualified ' : ''
//         }candidate(s) saved successfully!`
//       );
//       setTimeout(() => { setSaveSuccess(false); setSuccessMessage(''); }, 4000);
//     } catch (error) {
//       console.error('Error saving candidates:', error);
//       setSaveError(error.message || `An error occurred while saving candidates.`);
//       setTimeout(() => setSaveError(null), 5000);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // Loading and Empty States
//   if (!analysisResults) {
//     return (
//         <div className='coreops-page-container results-page'> {/* Consistent naming */}
//             <div className='coreops-content-wrapper'>
//                 <div className='coreops-message-container loading'>
//                     <FontAwesomeIcon icon={faSpinner} spin size="3x" />
//                     <p>Loading Candidate Analysis...</p>
//                 </div>
//             </div>
//         </div>
//     );
//   }

//   if (displayResults.length === 0) { // Check displayResults instead of analysisResults directly
//      return (
//         <div className='coreops-page-container results-page'>
//             <div className='coreops-content-wrapper'>
//                 <header className='coreops-main-header results-sub-header'> {/* Sub-header */}
//                     <h1><FontAwesomeIcon icon={faListAlt} /> Candidate Analysis</h1>
//                 </header>
//                 <div className='coreops-message-container empty'>
//                     <FontAwesomeIcon icon={faFileAlt} size="4x" />
//                     <p className="empty-title">No Candidate Data Available</p>
//                     <p className="empty-subtitle">It seems no resumes were processed or they didn't produce any results.</p>
//                     <Link to="/" className="coreops-button coreops-button-primary">
//                         <FontAwesomeIcon icon={faUndo} /> Go Back to Upload
//                     </Link>
//                 </div>
//                  <footer className="coreops-footer results-sub-footer">
//                     <p>© {new Date().getFullYear()} CoreOps.ai</p>
//                 </footer>
//             </div>
//         </div>
//      );
//   }

//   const candidatesAvailableForSelection = displayResults.filter(r => !r.error && !r.analysisError).length;
//   const highlightedAvailableForSelection = highlightedResults.length; // highlightedResults already filters errors

//   return (
//     <div className='coreops-page-container results-page'>
//       <div className='coreops-content-wrapper'> {/* For centering and max-width */}
//         <div className='coreops-results-table-container'>
//           <header className='coreops-main-header results-sub-header'>
//             <h1>
//                 <FontAwesomeIcon icon={faListAlt} /> Candidate Analysis Results
//             </h1>
//             <div className='coreops-results-summary-global'>
//                 Showing {displayResults.length} candidate profile(s).
//                 {scoreThreshold > 0 && highlightedResults.length > 0
//                 ? ` (${highlightedResults.length} with score ≥ ${scoreThreshold} are highlighted)`
//                 : scoreThreshold > 0 ? ` (0 candidates meet score ≥ ${scoreThreshold})` : ''}
//             </div>
//           </header>

//           <div className='coreops-controls-panel'>
//             <div className='coreops-filter-section'>
//               <button
//                 className={`coreops-button coreops-button-secondary filter-toggle-button ${showFilterOptions ? 'active' : ''}`}
//                 onClick={() => setShowFilterOptions(!showFilterOptions)}
//               >
//                 <FontAwesomeIcon icon={faFilter} /> Filters
//               </button>
//               {showFilterOptions && (
//                 <div className='coreops-filter-options-active'>
//                   <label htmlFor='scoreFilter'>Min. Score:</label>
//                   <input
//                     type='range'
//                     id='scoreFilter'
//                     min='0'
//                     max='100'
//                     value={scoreThreshold}
//                     onChange={(e) => setScoreThreshold(parseInt(e.target.value))}
//                   />
//                   <span className='coreops-score-display'>{scoreThreshold}</span>
//                   <button
//                     className="coreops-button-inline reset-filter"
//                     onClick={() => setScoreThreshold(55)}
//                     title="Reset score to default (55)"
//                   >
//                      <FontAwesomeIcon icon={faUndo} />
//                   </button>
//                 </div>
//               )}
//             </div>

//             {displayResults.length > 0 && (
//                 <div className='coreops-bulk-actions-container'>
//                     <div className='coreops-selected-count'>
//                     {selectedCandidates.length > 0
//                       ? `${selectedCandidates.length} selected ${
//                           saveIntent === 'qualified' &&
//                           selectedCandidates.length > 0 &&
//                           selectedCandidates.every((email) =>
//                             highlightedResults.find((hr) => hr.email === email && !hr.error && !hr.analysisError)
//                           )
//                             ? '(Target: Qualified DB)'
//                             : '(Target: General DB)'
//                         }`
//                       : 'No candidates selected'}
//                     </div>
//                     <div className="coreops-action-buttons-group">
//                         <button
//                             className='coreops-button coreops-button-secondary'
//                             onClick={selectAllCandidates}
//                             disabled={candidatesAvailableForSelection === 0}
//                             title={candidatesAvailableForSelection === 0 ? "No candidates available to select" : "Select all processable candidates"}
//                         > Select All ({candidatesAvailableForSelection})
//                         </button>
//                         <button
//                             className='coreops-button coreops-button-success' // Success color for qualified
//                             onClick={selectAllQualifiedCandidates}
//                             disabled={highlightedAvailableForSelection === 0}
//                             title={highlightedAvailableForSelection === 0 ? "No qualified candidates available to select" : "Select all qualified candidates"}
//                         > <FontAwesomeIcon icon={faUserCheck} /> Select Qualified ({highlightedAvailableForSelection})
//                         </button>
//                         <button
//                             className='coreops-button coreops-button-warning' // Warning color for clear
//                             onClick={clearAllSelections}
//                             disabled={selectedCandidates.length === 0}
//                         > Clear Selection
//                         </button>
//                         {selectedCandidates.length > 0 && (
//                             <>
//                             <button
//                                 className='coreops-button coreops-button-info' // Info color for send
//                                 onClick={() => {
//                                 const selectedData = processedResults.filter((result) =>
//                                     selectedCandidates.includes(result.email)
//                                 );
//                                 generateBulkMailLink(selectedData);
//                                 }}
//                                 title="Send Google Form link to selected candidates"
//                             > <FontAwesomeIcon icon={faPaperPlane} /> Send Form
//                             </button>
//                             <button
//                                 className={`coreops-button coreops-button-primary save-button ${isSaving ? "loading" : ""}`}
//                                 onClick={saveSelectedCandidates}
//                                 disabled={isSaving}
//                                 title="Save selected candidates to database"
//                             >
//                                 {isSaving ? (
//                                 <><ClipLoader color="var(--coreops-light-text)" size={18} /> Saving...</>
//                                 ) : (
//                                 <><FontAwesomeIcon icon={faSave} />
//                                     {saveIntent === 'qualified' &&
//                                     selectedCandidates.length > 0 &&
//                                     selectedCandidates.every((email) =>
//                                         highlightedResults.find((hr) => hr.email === email && !hr.error && !hr.analysisError)
//                                     )
//                                     ? ' Save Qualified'
//                                     : ' Save Selected'}
//                                 </>
//                                 )}
//                             </button>
//                             </>
//                         )}
//                     </div>
//                      {(saveSuccess && successMessage) && (
//                         <div className='coreops-save-notification success'>
//                         <FontAwesomeIcon icon={faCheckCircle} /> {successMessage}
//                         </div>
//                     )}
//                     {saveError && (
//                         <div className='coreops-save-notification error'>
//                         <FontAwesomeIcon icon={faExclamationTriangle} /> {saveError}
//                         </div>
//                     )}
//                 </div>
//             )}
//           </div>

//           {displayResults.length > 0 ? (
//             <div className="coreops-table-responsive-wrapper">
//               <table className="coreops-results-table">
//                 <thead>
//                   <tr>
//                     <th style={{ width: '3%' }}>
//                       <input
//                         type='checkbox'
//                         className="coreops-checkbox"
//                         title={candidatesAvailableForSelection === 0 ? "No candidates to select" : (selectedCandidates.length === candidatesAvailableForSelection ? "Deselect all" : "Select all")}
//                         checked={
//                             candidatesAvailableForSelection > 0 &&
//                             selectedCandidates.length === candidatesAvailableForSelection
//                         }
//                         onChange={
//                           selectedCandidates.length === candidatesAvailableForSelection
//                             ? clearAllSelections
//                             : selectAllCandidates
//                         }
//                         disabled={candidatesAvailableForSelection === 0}
//                       />
//                     </th>
//                     <th style={{ width: '15%' }}><FontAwesomeIcon icon={faUserTie} className='coreops-header-icon' /> Name</th>
//                     <th style={{ width: '20%' }}><FontAwesomeIcon icon={faEnvelope} className='coreops-header-icon' /> Email</th>
//                     <th style={{ width: '7%' }}><FontAwesomeIcon icon={faStar} className='coreops-header-icon' /> Score</th>
//                     <th style={{ width: '35%' }}><FontAwesomeIcon icon={faFileAlt} className='coreops-header-icon' /> Summary</th>
//                     <th style={{ width: '20%' }}>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {displayResults.map((candidate, index) => (
//                     <tr
//                       key={candidate.email + '-' + index + '-' + candidate.fileName}
//                       className={`${
//                         candidate.similarityScore >= scoreThreshold && !candidate.error && !candidate.analysisError
//                           ? 'highlighted-row'
//                           : ''
//                       } ${candidate.error || candidate.analysisError ? 'error-row' : ''}`}
//                     >
//                       <td>
//                         {!(candidate.error || candidate.analysisError) ? (
//                             <input
//                             type='checkbox'
//                             className="coreops-checkbox"
//                             checked={selectedCandidates.includes(candidate.email)}
//                             onChange={() => toggleCandidateSelection(candidate.email)}
//                             title={`Select ${candidate.name}`}
//                             />
//                         ) : (
//                             <FontAwesomeIcon icon={faExclamationCircle} title={candidate.error || candidate.analysisError || "Cannot process this candidate"} className="coreops-error-indicator-icon"/>
//                         )}
//                       </td>
//                       <td className='coreops-td-name' title={candidate.name}>{candidate.name}</td>
//                       <td className='coreops-td-email' title={candidate.email}>{candidate.email}</td>
//                       <td className='coreops-td-score' title={`Similarity Score: ${candidate.similarityScore}`}>{candidate.similarityScore}</td>
//                       <td className='coreops-td-summary' title={candidate.resumeSummary}>
//                         {candidate.error ? (
//                             <span className="coreops-error-text">Error: {candidate.error}</span>
//                         ) : candidate.analysisError ? (
//                              <span className="coreops-error-text">Analysis Error: {candidate.analysisError}</span>
//                         ) : (
//                             candidate.resumeSummary
//                         )}
//                         </td>
//                       <td className="coreops-td-actions">
//                         {!(candidate.error || candidate.analysisError) ? (
//                         <>
//                         <button
//                           className='coreops-button-inline send-form'
//                           onClick={() => generateMailLink(candidate.email, candidate)}
//                           title={`Send form to ${candidate.name}`}
//                         >
//                           <FontAwesomeIcon icon={faPaperPlane} /> Form
//                         </button>
//                         <button
//                           className='coreops-button-inline send-event'
//                           onClick={() => {
//                             alert(`Calendar invite for ${candidate.name} to be implemented (requires specific calendar service integration).`);
//                           }}
//                           title={`Send calendar invite to ${candidate.name}`}
//                         >
//                           <FontAwesomeIcon icon={faCalendarAlt} /> Event
//                         </button>
//                         </>
//                         ) : (
//                             <span className="coreops-action-na">N/A</span>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             // This case should be covered by the initial empty state check now,
//             // but keeping a fallback for filter-no-results is fine.
//             <div className='coreops-message-container no-filter-results'>
//               <FontAwesomeIcon icon={faFileAlt} />
//                 <p>No candidates match the current filter criteria.</p>
//                 {showFilterOptions && (
//                     <button className='coreops-button coreops-button-secondary' onClick={() => {setScoreThreshold(55); setShowFilterOptions(false)}}>
//                         Reset All Filters
//                     </button>
//                 )}
//             </div>
//           )}
//         </div>
//          <footer className="coreops-footer results-sub-footer">
//             <p>© {new Date().getFullYear()} CoreOps.ai - Candidate Analysis Dashboard</p>
//         </footer>
//       </div>
//     </div>
//   );
// }

// export default ResultsTable;

import React, { useState, useEffect, useMemo } from "react";
import "../ResultsTable.css"; // Ensure this CSS file is correctly linked and styled
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClipLoader from "react-spinners/ClipLoader"; // Assuming you've installed this
import {
  faEnvelope,
  faFileAlt,
  faStar,
  faPaperPlane,
  faCalendarAlt,
  faUserTie,
  faFilter,
  faSave,
  faCheckCircle,
  faExclamationTriangle,
  faSpinner,
  faUserCheck,
  faUndo,
  faListAlt,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { backend_url } from "../config";
import { Link } from "react-router-dom";

function ResultsTable({ analysisResults }) {
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [scoreThreshold, setScoreThreshold] = useState(55);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveIntent, setSaveIntent] = useState("default");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    console.log("ResultsTable received analysisResults:", analysisResults);
    if (analysisResults && analysisResults.length > 0) {
      console.log("First result structure:", analysisResults[0]);
    }
  }, [analysisResults]);

  const processedResults = useMemo(() => {
    if (!analysisResults || !Array.isArray(analysisResults)) {
      return [];
    }
    return analysisResults
      .map((item) => ({
        fileName: item.fileName || "N/A",
        name: item.analysis?.name || "N/A",
        email: item.analysis?.email || "N/A",
        phone: item.analysis?.phone || "N/A",
        location: item.analysis?.location || "N/A",
        keySkills: item.analysis?.keySkills || [],
        totalExperienceYears: item.analysis?.totalExperienceYears || 0,
        mainDomain: item.analysis?.mainDomain || "N/A",
        companiesWorked: item.analysis?.companiesWorked || [],
        education: item.analysis?.education || [],
        similarityScore:
          typeof item.analysis?.similarityScore === "number"
            ? item.analysis.similarityScore
            : 0,
        commonSkills: item.analysis?.commonSkills || [],
        preferred: item.analysis?.preferred || "No",
        roleName: item.analysis?.roleName || "N/A",
        resumeSummary: item.summary || "N/A",
        error: item.error,
        analysisError: item.analysis?.error,
      }))
      .sort((a, b) => b.similarityScore - a.similarityScore);
  }, [analysisResults]);

  const highlightedResults = useMemo(() => {
    return processedResults.filter(
      (result) =>
        result.similarityScore >= scoreThreshold &&
        !result.error &&
        !result.analysisError
    );
  }, [processedResults, scoreThreshold]);

  const displayResults = processedResults;

  const toggleCandidateSelection = (email) => {
    setSelectedCandidates((prevSelected) =>
      prevSelected.includes(email)
        ? prevSelected.filter((e) => e !== email)
        : [...prevSelected, email]
    );
    setSaveIntent("default");
  };

  const generateMailLink = (email, candidateData) => {
    if (!email || email === "N/A") {
      alert("Cannot generate mail link: Candidate email is not available.");
      return;
    }
    const subject = encodeURIComponent(
      "Follow Up: Your Application with CoreOps.ai"
    );

    // --- GOOGLE FORM INTEGRATION (OPTIONAL) ---
    const googleFormBaseUrl =
      "https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID_HERE/viewform"; // <<<< REPLACE IF USING

    let formLinkForBody = "";

    if (googleFormBaseUrl.includes("YOUR_GOOGLE_FORM_ID_HERE")) {
      console.warn(
        "Google Form ID is not configured in ResultsTable.js. Email will be sent without a pre-filled form link. Update 'YOUR_GOOGLE_FORM_ID_HERE' and entry IDs if needed."
      );
    } else {
      // IMPORTANT: Replace these with your actual Google Form pre-fill entry IDs
      formLinkForBody = `${googleFormBaseUrl}?usp=pp_url&entry.YOUR_NAME_FIELD_ID=${encodeURIComponent(
        candidateData.name || ""
      )}&entry.YOUR_EMAIL_FIELD_ID=${encodeURIComponent(
        candidateData.email || ""
      )}&entry.YOUR_SCORE_FIELD_ID=${encodeURIComponent(candidateData.similarityScore || 0)}`;
    }

    let emailBodyContent = `Dear ${candidateData.name || "Candidate"},\n\nThank you for your interest in a position at CoreOps.ai. We were impressed with your resume.\n\n`;

    if (formLinkForBody) {
      emailBodyContent += `To help us learn a bit more about you, please take a few minutes to complete this short form: ${formLinkForBody}\n\n`;
    } else {
      emailBodyContent += `We would like to discuss your application further. Please let us know your availability for a brief call.\n\n`;
    }

    emailBodyContent += `We look forward to hearing from you.\n\nBest regards,\nTalent Acquisition Team\nCoreOps.ai`;

    const body = encodeURIComponent(emailBodyContent);
    const outlookLink = `https://outlook.office.com/mail/deeplink/compose?to=${email}&subject=${subject}&body=${body}`;

    console.log("Opening Outlook link:", outlookLink);
    window.open(outlookLink, "_blank");
  };

  const generateBulkMailLink = (candidatesToMail) => {
    if (candidatesToMail.length === 0) return;
    candidatesToMail.forEach((candidate) => {
      if (candidate.email && candidate.email !== "N/A") {
        // Ensure email exists
        generateMailLink(candidate.email, candidate);
      } else {
        console.warn(
          `Skipping email for ${candidate.name || "a candidate"} due to missing email.`
        );
      }
    });
  };

  const generateCalendarInvite = (candidateData) => {
    if (!candidateData.email || candidateData.email === "N/A") {
      alert(
        "Cannot generate calendar invite: Candidate email is not available."
      );
      return;
    }

    const subject = `Interview: ${candidateData.name || "Candidate"} with CoreOps.ai`;
    // Basic body, can be enhanced with HTML
    const description = `Dear ${candidateData.name || "Candidate"},\n\nThis is an invitation to discuss your application for a position at CoreOps.ai.\n\nPlease confirm your availability.\n\nWe look forward to speaking with you.\n\nBest regards,\nTalent Acquisition Team\nCoreOps.ai`;

    // Outlook Calendar Deeplink (basic example)
    // For specific times, you'd need to format start and end datetimes
    // Example: &startdt=2024-01-01T10:00:00&enddt=2024-01-01T11:00:00
    // This requires getting user input for date/time or having predefined slots.
    // For now, it opens a new event compose screen.
    const outlookCalendarLink =
      `https://outlook.office.com/calendar/0/deeplink/compose` +
      `?path=/calendar/action/compose` +
      `&rru=addevent` + // Ensure it's adding an event
      `&to=${encodeURIComponent(candidateData.email)}` +
      `&subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(description)}`;

    console.log("Opening Outlook Calendar link:", outlookCalendarLink);
    window.open(outlookCalendarLink, "_blank");
  };

  const selectAllQualifiedCandidates = () => {
    const qualifiedEmails = highlightedResults
      .filter((result) => !result.error && !result.analysisError)
      .map((result) => result.email);
    setSelectedCandidates(qualifiedEmails);
    if (qualifiedEmails.length > 0) {
      setSaveIntent("qualified");
    } else {
      setSaveIntent("default");
    }
  };

  const selectAllCandidates = () => {
    const allDisplayEmails = displayResults
      .filter((result) => !result.error && !result.analysisError)
      .map((result) => result.email);
    setSelectedCandidates(allDisplayEmails);
    setSaveIntent("default");
  };

  const clearAllSelections = () => {
    setSelectedCandidates([]);
    setSaveIntent("default");
  };

  const saveSelectedCandidates = async () => {
    if (selectedCandidates.length === 0) {
      setSaveError("Please select at least one candidate to save.");
      setTimeout(() => setSaveError(null), 3000);
      return;
    }

    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError(null);
    setSuccessMessage("");

    const candidatesToSave = processedResults
      .filter((candidate) => selectedCandidates.includes(candidate.email))
      .map((candidate) => ({
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone,
        location: candidate.location,
        keySkills: candidate.keySkills,
        totalExperienceYears: candidate.totalExperienceYears,
        mainDomain: candidate.mainDomain,
        resumeSummary: candidate.resumeSummary,
        similarityScore: candidate.similarityScore,
        preferred: candidate.preferred,
        roleName: candidate.roleName,
        companiesWorked: candidate.companiesWorked,
        education: candidate.education,
      }));

    if (candidatesToSave.length === 0) {
      setIsSaving(false);
      return;
    }

    let endpoint = `${backend_url}/candidates`;
    let currentSaveType = "default";

    if (saveIntent === "qualified") {
      const allSelectedAreTrulyQualified = candidatesToSave.every(
        (c) => c.similarityScore >= scoreThreshold
      );
      if (allSelectedAreTrulyQualified && candidatesToSave.length > 0) {
        endpoint = `${backend_url}/qualified-candidates`;
        currentSaveType = "qualified";
      } else if (candidatesToSave.length > 0) {
        console.warn(
          "Save intent 'qualified', but selection mixed or empty after filtering. Saving to general."
        );
      }
    }

    try {
      console.log(
        `Saving ${candidatesToSave.length} candidates to ${endpoint}`
      );
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidates: candidatesToSave }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(
          responseData.message || `Server error: ${response.status}`
        );
      }
      setSaveSuccess(true);
      setSuccessMessage(
        responseData.message ||
          `${candidatesToSave.length} ${
            currentSaveType === "qualified" ? "qualified " : ""
          }candidate(s) saved successfully!`
      );
      setTimeout(() => {
        setSaveSuccess(false);
        setSuccessMessage("");
      }, 4000);
    } catch (error) {
      console.error("Error saving candidates:", error);
      setSaveError(
        error.message || `An error occurred while saving candidates.`
      );
      setTimeout(() => setSaveError(null), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  if (!analysisResults) {
    return (
      <div className="coreops-page-container results-page">
        <div className="coreops-content-wrapper">
          <div className="coreops-message-container loading">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
            <p>Loading Candidate Analysis...</p>
          </div>
        </div>
      </div>
    );
  }

  if (displayResults.length === 0) {
    return (
      <div className="coreops-page-container results-page">
        <div className="coreops-content-wrapper">
          <header className="coreops-main-header results-sub-header">
            <h1>
              <FontAwesomeIcon icon={faListAlt} /> Candidate Analysis
            </h1>
          </header>
          <div className="coreops-message-container empty">
            <FontAwesomeIcon icon={faFileAlt} size="4x" />
            <p className="empty-title">No Candidate Data Available</p>
            <p className="empty-subtitle">
              It seems no resumes were processed or they didn't produce any
              results.
            </p>
            <Link to="/" className="coreops-button coreops-button-primary">
              <FontAwesomeIcon icon={faUndo} /> Go Back to Upload
            </Link>
          </div>
          <footer className="coreops-footer results-sub-footer">
            <p>© {new Date().getFullYear()} CoreOps.ai</p>
          </footer>
        </div>
      </div>
    );
  }

  const candidatesAvailableForSelection = displayResults.filter(
    (r) => !r.error && !r.analysisError
  ).length;
  const highlightedAvailableForSelection = highlightedResults.length;

  return (
    <div className="coreops-page-container results-page">
      <div className="coreops-content-wrapper">
        <div className="coreops-results-table-container">
          <header className="coreops-main-header results-sub-header">
            <h1>
              <FontAwesomeIcon icon={faListAlt} /> Candidate Analysis Results
            </h1>
            <div className="coreops-results-summary-global">
              Showing {displayResults.length} candidate profile(s).
              {scoreThreshold > 0 && highlightedResults.length > 0
                ? ` (${highlightedResults.length} with score ≥ ${scoreThreshold} are highlighted)`
                : scoreThreshold > 0
                  ? ` (0 candidates meet score ≥ ${scoreThreshold})`
                  : ""}
            </div>
          </header>

          <div className="coreops-controls-panel">
            <div className="coreops-filter-section">
              <button
                className={`coreops-button coreops-button-secondary filter-toggle-button ${showFilterOptions ? "active" : ""}`}
                onClick={() => setShowFilterOptions(!showFilterOptions)}
              >
                <FontAwesomeIcon icon={faFilter} /> Filters
              </button>
              {showFilterOptions && (
                <div className="coreops-filter-options-active">
                  <label htmlFor="scoreFilter">Min. Score:</label>
                  <input
                    type="range"
                    id="scoreFilter"
                    min="0"
                    max="100"
                    value={scoreThreshold}
                    onChange={(e) =>
                      setScoreThreshold(parseInt(e.target.value))
                    }
                  />
                  <span className="coreops-score-display">
                    {scoreThreshold}
                  </span>
                  <button
                    className="coreops-button-inline reset-filter"
                    onClick={() => setScoreThreshold(55)}
                    title="Reset score to default (55)"
                  >
                    <FontAwesomeIcon icon={faUndo} />
                  </button>
                </div>
              )}
            </div>

            {displayResults.length > 0 && (
              <div className="coreops-bulk-actions-container">
                <div className="coreops-selected-count">
                  {selectedCandidates.length > 0
                    ? `${selectedCandidates.length} selected ${
                        saveIntent === "qualified" &&
                        selectedCandidates.length > 0 &&
                        selectedCandidates.every((email) =>
                          highlightedResults.find(
                            (hr) =>
                              hr.email === email &&
                              !hr.error &&
                              !hr.analysisError
                          )
                        )
                          ? "(Target: Qualified DB)"
                          : "(Target: General DB)"
                      }`
                    : "No candidates selected"}
                </div>
                <div className="coreops-action-buttons-group">
                  <button
                    className="coreops-button coreops-button-secondary"
                    onClick={selectAllCandidates}
                    disabled={candidatesAvailableForSelection === 0}
                    title={
                      candidatesAvailableForSelection === 0
                        ? "No candidates available to select"
                        : "Select all processable candidates"
                    }
                  >
                    {" "}
                    Select All ({candidatesAvailableForSelection})
                  </button>
                  <button
                    className="coreops-button coreops-button-success"
                    onClick={selectAllQualifiedCandidates}
                    disabled={highlightedAvailableForSelection === 0}
                    title={
                      highlightedAvailableForSelection === 0
                        ? "No qualified candidates available to select"
                        : "Select all qualified candidates"
                    }
                  >
                    {" "}
                    <FontAwesomeIcon icon={faUserCheck} /> Select Qualified (
                    {highlightedAvailableForSelection})
                  </button>
                  <button
                    className="coreops-button coreops-button-warning"
                    onClick={clearAllSelections}
                    disabled={selectedCandidates.length === 0}
                  >
                    {" "}
                    Clear Selection
                  </button>
                  {selectedCandidates.length > 0 && (
                    <>
                      <button
                        className="coreops-button coreops-button-info"
                        onClick={() => {
                          const selectedData = processedResults.filter(
                            (result) =>
                              selectedCandidates.includes(result.email)
                          );
                          generateBulkMailLink(selectedData);
                        }}
                        title="Send Google Form link to selected candidates"
                      >
                        {" "}
                        <FontAwesomeIcon icon={faPaperPlane} /> Send Form
                      </button>
                      <button
                        className={`coreops-button coreops-button-primary save-button ${isSaving ? "loading" : ""}`}
                        onClick={saveSelectedCandidates}
                        disabled={isSaving}
                        title="Save selected candidates to database"
                      >
                        {isSaving ? (
                          <>
                            <ClipLoader
                              color="var(--coreops-light-text)"
                              size={18}
                            />{" "}
                            Saving...
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon icon={faSave} />
                            {saveIntent === "qualified" &&
                            selectedCandidates.length > 0 &&
                            selectedCandidates.every((email) =>
                              highlightedResults.find(
                                (hr) =>
                                  hr.email === email &&
                                  !hr.error &&
                                  !hr.analysisError
                              )
                            )
                              ? " Save Qualified"
                              : " Save Selected"}
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
                {saveSuccess && successMessage && (
                  <div className="coreops-save-notification success">
                    <FontAwesomeIcon icon={faCheckCircle} /> {successMessage}
                  </div>
                )}
                {saveError && (
                  <div className="coreops-save-notification error">
                    <FontAwesomeIcon icon={faExclamationTriangle} /> {saveError}
                  </div>
                )}
              </div>
            )}
          </div>

          {displayResults.length > 0 ? (
            <div className="coreops-table-responsive-wrapper">
              <table className="coreops-results-table">
                <thead>
                  <tr>
                    <th style={{ width: "3%" }}>
                      <input
                        type="checkbox"
                        className="coreops-checkbox"
                        title={
                          candidatesAvailableForSelection === 0
                            ? "No candidates to select"
                            : selectedCandidates.length ===
                                candidatesAvailableForSelection
                              ? "Deselect all"
                              : "Select all"
                        }
                        checked={
                          candidatesAvailableForSelection > 0 &&
                          selectedCandidates.length ===
                            candidatesAvailableForSelection
                        }
                        onChange={
                          selectedCandidates.length ===
                          candidatesAvailableForSelection
                            ? clearAllSelections
                            : selectAllCandidates
                        }
                        disabled={candidatesAvailableForSelection === 0}
                      />
                    </th>
                    <th style={{ width: "15%" }}>
                      <FontAwesomeIcon
                        icon={faUserTie}
                        className="coreops-header-icon"
                      />{" "}
                      Name
                    </th>
                    <th style={{ width: "20%" }}>
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="coreops-header-icon"
                      />{" "}
                      Email
                    </th>
                    <th style={{ width: "7%" }}>
                      <FontAwesomeIcon
                        icon={faStar}
                        className="coreops-header-icon"
                      />{" "}
                      Score
                    </th>
                    <th style={{ width: "35%" }}>
                      <FontAwesomeIcon
                        icon={faFileAlt}
                        className="coreops-header-icon"
                      />{" "}
                      Summary
                    </th>
                    <th style={{ width: "20%" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayResults.map((candidate, index) => (
                    <tr
                      key={
                        candidate.email + "-" + index + "-" + candidate.fileName
                      }
                      className={`${
                        candidate.similarityScore >= scoreThreshold &&
                        !candidate.error &&
                        !candidate.analysisError
                          ? "highlighted-row"
                          : ""
                      } ${candidate.error || candidate.analysisError ? "error-row" : ""}`}
                    >
                      <td>
                        {!(candidate.error || candidate.analysisError) ? (
                          <input
                            type="checkbox"
                            className="coreops-checkbox"
                            checked={selectedCandidates.includes(
                              candidate.email
                            )}
                            onChange={() =>
                              toggleCandidateSelection(candidate.email)
                            }
                            title={`Select ${candidate.name}`}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faExclamationCircle}
                            title={
                              candidate.error ||
                              candidate.analysisError ||
                              "Cannot process this candidate"
                            }
                            className="coreops-error-indicator-icon"
                          />
                        )}
                      </td>
                      <td className="coreops-td-name" title={candidate.name}>
                        {candidate.name}
                      </td>
                      <td className="coreops-td-email" title={candidate.email}>
                        {candidate.email}
                      </td>
                      <td
                        className="coreops-td-score"
                        title={`Similarity Score: ${candidate.similarityScore}`}
                      >
                        {candidate.similarityScore}
                      </td>
                      <td
                        className="coreops-td-summary"
                        title={candidate.resumeSummary}
                      >
                        {candidate.error ? (
                          <span className="coreops-error-text">
                            Error: {candidate.error}
                          </span>
                        ) : candidate.analysisError ? (
                          <span className="coreops-error-text">
                            Analysis Error: {candidate.analysisError}
                          </span>
                        ) : (
                          candidate.resumeSummary
                        )}
                      </td>
                      <td className="coreops-td-actions">
                        {!(candidate.error || candidate.analysisError) ? (
                          <>
                            <button
                              className="coreops-button-inline send-form"
                              onClick={() =>
                                generateMailLink(candidate.email, candidate)
                              }
                              title={`Send form to ${candidate.name}`}
                            >
                              <FontAwesomeIcon icon={faPaperPlane} /> Form
                            </button>
                            <button
                              className="coreops-button-inline send-event"
                              onClick={() => generateCalendarInvite(candidate)}
                              title={`Send calendar invite to ${candidate.name}`}
                            >
                              <FontAwesomeIcon icon={faCalendarAlt} /> Event
                            </button>
                          </>
                        ) : (
                          <span className="coreops-action-na">N/A</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="coreops-message-container no-filter-results">
              <FontAwesomeIcon icon={faFileAlt} />
              <p>No candidates match the current filter criteria.</p>
              {showFilterOptions && (
                <button
                  className="coreops-button coreops-button-secondary"
                  onClick={() => {
                    setScoreThreshold(55);
                    setShowFilterOptions(false);
                  }}
                >
                  Reset All Filters
                </button>
              )}
            </div>
          )}
        </div>
        <footer className="coreops-footer results-sub-footer">
          <p>
            © {new Date().getFullYear()} COREHire - Candidate Analysis
            Dashboard
          </p>
        </footer>
      </div>
    </div>
  );
}

export default ResultsTable;

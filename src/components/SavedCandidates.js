// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFileAlt,
//   faUserTie,
//   faEnvelope,
//   faStar,
//   faCloudUploadAlt,
//   faTrash,
//   faSpinner,
//   faExclamationTriangle,
//   faSearch,
//   faSort,
//   faSortUp,
//   faSortDown,
//   faCalendarAlt,
//   faChartBar,
//   faListAlt,
//   faEdit,
//   faSave,
//   faTimes,
//   faClipboardList,
//   faFilter,
//   faUser,
// } from "@fortawesome/free-solid-svg-icons";
// import { backend_url } from "../config";
// import "../SavedCandidates.css";

// function SavedCandidates() {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const stageFilter = queryParams.get("stage");

//   const [candidates, setCandidates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortConfig, setSortConfig] = useState({
//     key: "similarityScore",
//     direction: "descending",
//   });
//   const [editingCandidate, setEditingCandidate] = useState(null);
//   const [interviewStatus, setInterviewStatus] = useState("");
//   const [interviewNote, setInterviewNote] = useState("");
//   const [nextInterviewDate, setNextInterviewDate] = useState("");
//   const [showNotesModal, setShowNotesModal] = useState(false);
//   const [currentCandidateNotes, setCurrentCandidateNotes] = useState([]);
//   const [currentCandidateName, setCurrentCandidateName] = useState("");
//   const [showFilterOptions, setShowFilterOptions] = useState(false);
//   const [statusFilter, setStatusFilter] = useState(stageFilter || "All");

//   // Interview stage colors for visual representation
//   const stageColors = {
//     "Not Started": "#808080",
//     "Resume Screening": "#a5d6a7",
//     "Phone Interview": "#81c784",
//     "Technical Assessment": "#66bb6a",
//     "On-site Interview": "#4caf50",
//     "Reference Check": "#43a047",
//     "Offer Extended": "#2e7d32",
//     Hired: "#1b5e20",
//     Rejected: "#d32f2f",
//   };

//   // Available interview stages
//   const interviewStages = [
//     "Not Started",
//     "Resume Screening",
//     "Phone Interview",
//     "Technical Assessment",
//     "On-site Interview",
//     "Reference Check",
//     "Offer Extended",
//     "Hired",
//     "Rejected",
//   ];

//   useEffect(() => {
//     fetchCandidates();
//   }, [stageFilter]);

//   useEffect(() => {
//     if (stageFilter) {
//       setStatusFilter(stageFilter);
//       setShowFilterOptions(true);
//     }
//   }, [stageFilter]);

//   const fetchCandidates = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${backend_url}/candidates`);

//       if (!response.ok) {
//         throw new Error(`Failed to fetch candidates: ${response.status}`);
//       }

//       const data = await response.json();
//       setCandidates(data);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching candidates:", err);
//       setError("Failed to load candidates. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteCandidate = async (candidateId) => {
//     if (!window.confirm("Are you sure you want to delete this candidate?")) {
//       return;
//     }

//     try {
//       const response = await fetch(`${backend_url}/candidates/${candidateId}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete candidate");
//       }

//       // Update the UI by removing the deleted candidate
//       setCandidates(
//         candidates.filter((candidate) => candidate._id !== candidateId)
//       );
//     } catch (err) {
//       console.error("Error deleting candidate:", err);
//       setError("Failed to delete candidate. Please try again.");
//     }
//   };

//   const handleSort = (key) => {
//     let direction = "ascending";
//     if (sortConfig.key === key && sortConfig.direction === "ascending") {
//       direction = "descending";
//     }
//     setSortConfig({ key, direction });
//   };

//   const startEditingCandidate = (candidate) => {
//     setEditingCandidate(candidate._id);
//     setInterviewStatus(candidate.interviewStatus || "Not Started");
//     setInterviewNote("");
//     setNextInterviewDate(
//       candidate.nextInterviewDate
//         ? new Date(candidate.nextInterviewDate).toISOString().split("T")[0]
//         : ""
//     );
//   };

//   const cancelEditing = () => {
//     setEditingCandidate(null);
//     setInterviewStatus("");
//     setInterviewNote("");
//     setNextInterviewDate("");
//   };

//   const saveInterviewStatus = async (candidateId) => {
//     try {
//       const response = await fetch(
//         `${backend_url}/candidates/${candidateId}/interview-status`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             interviewStatus,
//             note: interviewNote,
//             nextInterviewDate: nextInterviewDate || null,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update interview status");
//       }

//       const updatedCandidate = await response.json();

//       // Update the candidates array with the updated candidate
//       setCandidates(
//         candidates.map((candidate) =>
//           candidate._id === candidateId ? updatedCandidate.candidate : candidate
//         )
//       );

//       // Reset editing state
//       cancelEditing();
//     } catch (err) {
//       console.error("Error updating interview status:", err);
//       setError("Failed to update interview status. Please try again.");
//     }
//   };

//   const viewCandidateNotes = (candidate) => {
//     setCurrentCandidateNotes(candidate.interviewNotes || []);
//     setCurrentCandidateName(candidate.name);
//     setShowNotesModal(true);
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return "Not scheduled";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const sortedCandidates = [...candidates].sort((a, b) => {
//     if (a[sortConfig.key] < b[sortConfig.key]) {
//       return sortConfig.direction === "ascending" ? -1 : 1;
//     }
//     if (a[sortConfig.key] > b[sortConfig.key]) {
//       return sortConfig.direction === "ascending" ? 1 : -1;
//     }
//     return 0;
//   });

//   // First filter by status if selected
//   const statusFilteredCandidates =
//     statusFilter === "All"
//       ? sortedCandidates
//       : sortedCandidates.filter(
//           (candidate) =>
//             candidate.interviewStatus === statusFilter ||
//             (!candidate.interviewStatus && statusFilter === "Not Started")
//         );

//   // Then apply search filter
//   const filteredCandidates = statusFilteredCandidates.filter((candidate) => {
//     return (
//       candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (candidate.resumeSummary &&
//         candidate.resumeSummary
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase()))
//     );
//   });

//   const getSortIcon = (name) => {
//     if (sortConfig.key === name) {
//       return sortConfig.direction === "ascending" ? faSortUp : faSortDown;
//     }
//     return faSort;
//   };

//   return (
//     <div className="candidates-container">
//       <div className="candidates-header">
//         <h2 className="candidates-title">
//           <FontAwesomeIcon icon={faUserTie} /> Saved Candidates
//         </h2>
//         <div className="header-buttons">
//           <Link to="/interview-tracking" className="tracking-button">
//             <FontAwesomeIcon icon={faChartBar} /> Interview Tracking
//           </Link>
//           <Link to="/upload" className="upload-button">
//             <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload New Resumes
//           </Link>
//         </div>
//       </div>

//       {/* Search & Filter */}
//       <div className="search-filter-row">
//         <div className="search-container">
//           <FontAwesomeIcon icon={faSearch} className="search-icon" />
//           <input
//             type="text"
//             placeholder="Search candidates..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="search-input"
//           />
//         </div>

//         <div className="filter-container">
//           <button
//             className={`filter-button ${
//               statusFilter !== "All" ? "active" : ""
//             }`}
//             onClick={() => setShowFilterOptions(!showFilterOptions)}
//           >
//             <FontAwesomeIcon icon={faFilter} />
//             {statusFilter !== "All" ? ` ${statusFilter}` : " Filter by Status"}
//           </button>
//           <div className="candidate-count">
//             {filteredCandidates.length} candidates found
//           </div>
//         </div>
//       </div>

//       {/* Filter options */}
//       <div
//         className="filter-options"
//         style={{ display: showFilterOptions ? "flex" : "none" }}
//       >
//         <div
//           className={`filter-pill ${statusFilter === "All" ? "active" : ""}`}
//           onClick={() => setStatusFilter("All")}
//         >
//           All
//         </div>
//         {interviewStages.map((stage) => (
//           <div
//             key={stage}
//             className={`filter-pill ${statusFilter === stage ? "active" : ""}`}
//             onClick={() => setStatusFilter(stage)}
//           >
//             {stage}
//           </div>
//         ))}
//       </div>

//       {loading ? (
//         <div className="loading-container">
//           <FontAwesomeIcon icon={faSpinner} spin className="loading-icon" />
//           <p>Loading candidates...</p>
//         </div>
//       ) : error ? (
//         <div className="error-container">
//           <FontAwesomeIcon
//             icon={faExclamationTriangle}
//             className="error-icon"
//           />
//           <p>{error}</p>
//           <button className="action-button" onClick={fetchCandidates}>
//             Retry
//           </button>
//         </div>
//       ) : filteredCandidates.length === 0 ? (
//         <div className="empty-container">
//           <FontAwesomeIcon icon={faFileAlt} className="empty-icon" />
//           <p>No candidates found.</p>
//           {searchTerm || statusFilter !== "All" ? (
//             <button
//               className="action-button"
//               onClick={() => {
//                 setSearchTerm("");
//                 setStatusFilter("All");
//               }}
//             >
//               Clear Filters
//             </button>
//           ) : (
//             <Link to="/upload" className="upload-button">
//               <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload Resumes
//             </Link>
//           )}
//         </div>
//       ) : (
//         <table className="candidates-table">
//           <thead>
//             <tr>
//               <th onClick={() => handleSort("name")}>
//                 <FontAwesomeIcon icon={faUserTie} />
//                 Name
//                 <FontAwesomeIcon
//                   icon={getSortIcon("name")}
//                   className="sort-icon"
//                 />
//               </th>
//               <th onClick={() => handleSort("email")}>
//                 <FontAwesomeIcon icon={faEnvelope} />
//                 Email
//                 <FontAwesomeIcon
//                   icon={getSortIcon("email")}
//                   className="sort-icon"
//                 />
//               </th>
//               <th onClick={() => handleSort("similarityScore")}>
//                 <FontAwesomeIcon icon={faStar} />
//                 Score
//                 <FontAwesomeIcon
//                   icon={getSortIcon("similarityScore")}
//                   className="sort-icon"
//                 />
//               </th>
//               <th onClick={() => handleSort("interviewStatus")}>
//                 <FontAwesomeIcon icon={faListAlt} />
//                 Status
//                 <FontAwesomeIcon
//                   icon={getSortIcon("interviewStatus")}
//                   className="sort-icon"
//                 />
//               </th>
//               <th>
//                 <FontAwesomeIcon icon={faCalendarAlt} />
//                 Next Interview
//               </th>
//               <th>
//                 <FontAwesomeIcon icon={faFileAlt} />
//                 Summary
//               </th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredCandidates.map((candidate) => (
//               <React.Fragment key={candidate._id}>
//                 <tr>
//                   <td>{candidate.name}</td>
//                   <td>{candidate.email}</td>
//                   <td>{candidate.similarityScore}</td>
//                   <td>
//                     <div className="status-cell">
//                       <span
//                         className="status-pill"
//                         style={{
//                           backgroundColor:
//                             stageColors[
//                               candidate.interviewStatus || "Not Started"
//                             ],
//                         }}
//                       >
//                         {candidate.interviewStatus || "Not Started"}
//                       </span>
//                     </div>
//                   </td>
//                   <td>{formatDate(candidate.nextInterviewDate)}</td>
//                   <td className="summary-cell">{candidate.resumeSummary}</td>
//                   <td className="action-buttons">
//                     <Link
//                       to={`/candidates/${candidate._id}`}
//                       className="profile-button"
//                       title="View Profile"
//                     >
//                       <FontAwesomeIcon icon={faUser} />
//                     </Link>
//                     <button
//                       className="edit-button"
//                       onClick={() => startEditingCandidate(candidate)}
//                       title="Update Status"
//                     >
//                       <FontAwesomeIcon icon={faEdit} />
//                     </button>
//                     {candidate.interviewNotes &&
//                       candidate.interviewNotes.length > 0 && (
//                         <button
//                           className="notes-button"
//                           onClick={() => viewCandidateNotes(candidate)}
//                           title="View Notes"
//                         >
//                           <FontAwesomeIcon icon={faClipboardList} />
//                         </button>
//                       )}
//                     <button
//                       className="delete-button"
//                       onClick={() => handleDeleteCandidate(candidate._id)}
//                       title="Delete Candidate"
//                     >
//                       <FontAwesomeIcon icon={faTrash} />
//                     </button>
//                   </td>
//                 </tr>
//                 {editingCandidate === candidate._id && (
//                   <tr>
//                     <td colSpan="7">
//                       <div className="edit-row">
//                         <div className="form-group">
//                           <label className="form-label">
//                             Interview Status:
//                           </label>
//                           <select
//                             value={interviewStatus}
//                             onChange={(e) => setInterviewStatus(e.target.value)}
//                             className="form-select"
//                           >
//                             {interviewStages.map((stage) => (
//                               <option key={stage} value={stage}>
//                                 {stage}
//                               </option>
//                             ))}
//                           </select>
//                         </div>
//                         <div className="form-group">
//                           <label className="form-label">Add Note:</label>
//                           <textarea
//                             value={interviewNote}
//                             onChange={(e) => setInterviewNote(e.target.value)}
//                             placeholder="Enter notes about this interview stage..."
//                             className="form-textarea"
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label className="form-label">
//                             Next Interview Date:
//                           </label>
//                           <input
//                             type="datetime-local"
//                             value={nextInterviewDate}
//                             onChange={(e) =>
//                               setNextInterviewDate(e.target.value)
//                             }
//                             className="form-input"
//                           />
//                         </div>
//                         <div className="button-group">
//                           <button
//                             className="cancel-button"
//                             onClick={cancelEditing}
//                           >
//                             <FontAwesomeIcon icon={faTimes} /> Cancel
//                           </button>
//                           <button
//                             className="save-button"
//                             onClick={() => saveInterviewStatus(candidate._id)}
//                           >
//                             <FontAwesomeIcon icon={faSave} /> Save
//                           </button>
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Notes Modal */}
//       {showNotesModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <div className="modal-header">
//               <div className="modal-title">
//                 Notes for {currentCandidateName}
//               </div>
//               <button
//                 className="modal-close-button"
//                 onClick={() => setShowNotesModal(false)}
//               >
//                 &times;
//               </button>
//             </div>
//             <div>
//               {currentCandidateNotes.length > 0 ? (
//                 currentCandidateNotes.map((note, index) => (
//                   <div key={index} className="note-item">
//                     <div className="note-header">
//                       <span className="note-stage">{note.stage}</span>
//                       <span className="note-date">
//                         {formatDate(note.createdAt)}
//                       </span>
//                     </div>
//                     <div>{note.note}</div>
//                   </div>
//                 ))
//               ) : (
//                 <p>No notes available.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SavedCandidates;

// import React, { useState, useEffect, useMemo } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFileAlt,
//   faUserTie,
//   faEnvelope,
//   faStar,
//   faCloudUploadAlt,
//   faTrash,
//   faSpinner,
//   faExclamationTriangle,
//   faSearch,
//   faSort,
//   faSortUp,
//   faSortDown,
//   faCalendarAlt,
//   faChartBar,
//   faListAlt,
//   faEdit,
//   faSave,
//   faTimes,
//   faClipboardList,
//   faFilter,
//   faUser,
//   faPaperPlane, // Added back for consistency if needed
//   faBriefcase, // Added back for consistency if needed
//   faUsers, // For page title
//   faUndo, // For clear filters
//   faPlusCircle, // Example for "Add" actions
//   faExclamationCircle, // For error indicators
// } from "@fortawesome/free-solid-svg-icons";
// import { backend_url } from "../config";
// import "../SavedCandidates.css"; // Ensure this CSS file has the CoreOps.ai theme

// function SavedCandidates() {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const stageFilter = queryParams.get("stage");

//   const [candidates, setCandidates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortConfig, setSortConfig] = useState({
//     key: "similarityScore", // Default sort, ensure this field exists on your fetched candidates
//     direction: "descending",
//   });
//   const [editingCandidateId, setEditingCandidateId] = useState(null); // Store ID
//   const [editFormData, setEditFormData] = useState({
//     interviewStatus: "",
//     note: "",
//     nextInterviewDate: "",
//   });
//   const [showNotesModal, setShowNotesModal] = useState(false);
//   const [currentCandidateNotes, setCurrentCandidateNotes] = useState([]);
//   const [currentCandidateNameForModal, setCurrentCandidateNameForModal] =
//     useState("");
//   const [showFilterOptions, setShowFilterOptions] = useState(false);
//   const [statusFilter, setStatusFilter] = useState(stageFilter || "All");
//   const [selectedCandidateIds, setSelectedCandidateIds] = useState([]); // Store IDs

//   const stageColors = {
//     // CoreOps.ai themed colors
//     "Not Started": "#adb5bd",
//     "Resume Screening": "#a9def9",
//     "Phone Interview": "#72d5fd",
//     "Technical Assessment": "#2ab7ca",
//     "On-site Interview": "var(--coreops-secondary, #00A4CC)",
//     "Reference Check": "#0077b6",
//     "Offer Extended": "#2a9d8f",
//     Hired: "var(--coreops-success-text, #28a745)",
//     Rejected: "var(--coreops-error-text, #d9534f)",
//     "On Hold": "#fdc500",
//   };

//   const interviewStages = [
//     "Not Started",
//     "Resume Screening",
//     "Phone Interview",
//     "Technical Assessment",
//     "On-site Interview",
//     "Reference Check",
//     "Offer Extended",
//     "Hired",
//     "Rejected",
//     "On Hold",
//   ];

//   useEffect(() => {
//     fetchCandidates();
//   }, [location.pathname]); // Fetch when pathname changes (e.g., /candidates vs /qualified-candidates)

//   useEffect(() => {
//     const currentStageFilterFromUrl = queryParams.get("stage");
//     if (currentStageFilterFromUrl) {
//       setStatusFilter(currentStageFilterFromUrl);
//       // setShowFilterOptions(true); // Optionally open filters if URL has one
//     } else if (!stageFilter) {
//       // If no stageFilter from URL on initial load/change
//       setStatusFilter("All"); // Default to "All"
//     }
//   }, [location.search, stageFilter]);

//   const fetchCandidates = async () => {
//     try {
//       setLoading(true);
//       setError(null); // Clear previous errors
//       const endpoint = location.pathname.toLowerCase().includes("qualified")
//         ? `${backend_url}/qualified-candidates`
//         : `${backend_url}/candidates`;
//       console.log(`Fetching from: ${endpoint}`);
//       const response = await fetch(endpoint);

//       if (!response.ok) {
//         const errorData = await response
//           .json()
//           .catch(() => ({ message: `HTTP error! status: ${response.status}` }));
//         throw new Error(
//           errorData.message || `Failed to fetch candidates: ${response.status}`
//         );
//       }

//       const data = await response.json();
//       const candidatesArray = (
//         Array.isArray(data) ? data : data.candidates || []
//       ).map((c) => ({ ...c, similarityScore: c.similarityScore || 0 }));
//       setCandidates(candidatesArray);
//     } catch (err) {
//       console.error("Error fetching candidates:", err);
//       setError(err.message || "Failed to load candidates. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteCandidate = async (candidateId) => {
//     if (
//       !window.confirm(
//         "Are you sure you want to delete this candidate permanently? This action cannot be undone."
//       )
//     ) {
//       return;
//     }
//     try {
//       const endpoint = location.pathname.toLowerCase().includes("qualified")
//         ? `${backend_url}/qualified-candidates/${candidateId}`
//         : `${backend_url}/candidates/${candidateId}`;
//       const response = await fetch(endpoint, { method: "DELETE" });
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || "Failed to delete candidate");
//       }
//       setCandidates(candidates.filter((c) => c._id !== candidateId));
//       // Add success notification here if desired
//     } catch (err) {
//       console.error("Error deleting candidate:", err);
//       setError(err.message || "Failed to delete candidate. Please try again.");
//     }
//   };

//   const handleSort = (key) => {
//     let direction = "ascending";
//     if (sortConfig.key === key && sortConfig.direction === "ascending") {
//       direction = "descending";
//     }
//     setSortConfig({ key, direction });
//   };

//   const startEditingCandidate = (candidate) => {
//     setEditingCandidateId(candidate._id);
//     setEditFormData({
//       interviewStatus: candidate.interviewStatus || "Not Started",
//       note: "",
//       nextInterviewDate: candidate.nextInterviewDate
//         ? new Date(candidate.nextInterviewDate).toISOString().slice(0, 16)
//         : "",
//     });
//   };

//   const handleEditFormChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const cancelEditing = () => {
//     setEditingCandidateId(null);
//     setEditFormData({ interviewStatus: "", note: "", nextInterviewDate: "" });
//   };

//   const saveInterviewUpdate = async (candidateId) => {
//     try {
//       const endpoint = location.pathname.toLowerCase().includes("qualified")
//         ? `${backend_url}/qualified-candidates/${candidateId}/interview-status`
//         : `${backend_url}/candidates/${candidateId}/interview-status`;
//       const response = await fetch(endpoint, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           interviewStatus: editFormData.interviewStatus,
//           note: editFormData.note,
//           nextInterviewDate: editFormData.nextInterviewDate || null,
//         }),
//       });
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(
//           errorData.message || "Failed to update interview status"
//         );
//       }
//       const updatedCandidateData = await response.json();
//       setCandidates(
//         candidates.map((c) =>
//           c._id === candidateId
//             ? updatedCandidateData.candidate || updatedCandidateData
//             : c
//         )
//       );
//       cancelEditing();
//     } catch (err) {
//       console.error("Error updating interview status:", err);
//       setError(err.message || "Failed to update interview status.");
//     }
//   };

//   const viewCandidateNotes = (candidate) => {
//     setCurrentCandidateNotes(candidate.interviewNotes || []);
//     setCurrentCandidateNameForModal(candidate.name);
//     setShowNotesModal(true);
//   };

//   const formatDate = (dateString, includeTime = true) => {
//     if (!dateString) return "Not Set";
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return "Invalid Date";
//       const options = { year: "numeric", month: "short", day: "numeric" };
//       if (includeTime) {
//         options.hour = "2-digit";
//         options.minute = "2-digit";
//         options.hour12 = true;
//       }
//       return date.toLocaleDateString("en-US", options);
//     } catch (e) {
//       return "Date Error";
//     }
//   };

//   const sortedAndFilteredCandidates = useMemo(() => {
//     let processed = [...candidates];
//     processed =
//       statusFilter === "All"
//         ? processed
//         : processed.filter(
//             (c) =>
//               c.interviewStatus === statusFilter ||
//               (!c.interviewStatus && statusFilter === "Not Started")
//           );
//     if (searchTerm) {
//       const lowerSearchTerm = searchTerm.toLowerCase();
//       processed = processed.filter(
//         (c) =>
//           c.name?.toLowerCase().includes(lowerSearchTerm) ||
//           c.email?.toLowerCase().includes(lowerSearchTerm) ||
//           c.roleName?.toLowerCase().includes(lowerSearchTerm) ||
//           c.mainDomain?.toLowerCase().includes(lowerSearchTerm) ||
//           (c.keySkills &&
//             c.keySkills.join(" ").toLowerCase().includes(lowerSearchTerm)) ||
//           c.resumeSummary?.toLowerCase().includes(lowerSearchTerm)
//       );
//     }
//     if (sortConfig.key) {
//       processed.sort((a, b) => {
//         let valA = a[sortConfig.key];
//         let valB = b[sortConfig.key];
//         if (
//           sortConfig.key === "similarityScore" ||
//           sortConfig.key === "totalExperienceYears"
//         ) {
//           valA = Number(valA) || 0;
//           valB = Number(valB) || 0;
//         } else if (sortConfig.key === "nextInterviewDate") {
//           valA = valA
//             ? new Date(valA).getTime()
//             : sortConfig.direction === "ascending"
//               ? Infinity
//               : -Infinity;
//           valB = valB
//             ? new Date(valB).getTime()
//             : sortConfig.direction === "ascending"
//               ? Infinity
//               : -Infinity;
//         } else if (typeof valA === "string") {
//           valA = valA.toLowerCase();
//           valB = String(valB || "").toLowerCase();
//         } else if (valA === undefined || valA === null) {
//           return sortConfig.direction === "ascending" ? -1 : 1;
//         } else if (valB === undefined || valB === null) {
//           return sortConfig.direction === "ascending" ? 1 : -1;
//         }

//         if (valA < valB) return sortConfig.direction === "ascending" ? -1 : 1;
//         if (valA > valB) return sortConfig.direction === "ascending" ? 1 : -1;
//         return 0;
//       });
//     }
//     return processed;
//   }, [candidates, searchTerm, sortConfig, statusFilter]);

//   const getSortIcon = (name) => {
//     if (sortConfig.key === name) {
//       return sortConfig.direction === "ascending" ? faSortUp : faSortDown;
//     }
//     return faSort;
//   };

//   const sendIndividualMail = (candidate) => {
//     const subject = encodeURIComponent(
//       `Regarding Your Application - CoreOps.ai`
//     );
//     const body = encodeURIComponent(
//       `Dear ${candidate.name},\n\nThank you for your interest in CoreOps.ai. We are currently reviewing applications and will be in touch regarding next steps.\n\nBest regards,\nThe CoreOps.ai Talent Team`
//     );
//     const mailtoLink = `mailto:${candidate.email}?subject=${subject}&body=${body}`;
//     window.open(mailtoLink, "_blank");
//   };

//   const sendBulkMail = () => {
//     if (selectedCandidateIds.length === 0) {
//       alert("No candidates selected for bulk mail.");
//       return;
//     }
//     const selectedForMail = candidates.filter(
//       (c) =>
//         selectedCandidateIds.includes(c._id) && c.email && c.email !== "N/A"
//     );
//     if (selectedForMail.length === 0) {
//       alert("None of the selected candidates have valid email addresses.");
//       return;
//     }
//     const bccList = selectedForMail.map((c) => c.email).join(",");
//     const subject = encodeURIComponent("Update from CoreOps.ai");
//     const body = encodeURIComponent(
//       `Dear Candidates,\n\nThank you for your interest in CoreOps.ai. We are currently reviewing applications and will be in touch with updates soon.\n\nBest regards,\nThe CoreOps.ai Talent Team`
//     );
//     const mailtoLink = `mailto:?bcc=${bccList}&subject=${subject}&body=${body}`;
//     window.open(mailtoLink, "_blank");
//   };

//   const sendCalendarInvite = (candidate) => {
//     const subject = `Interview: ${candidate.name} with CoreOps.ai`;
//     const bodyHTML = `
//       <div style="font-family: Inter, Arial, sans-serif; color: #2c3e50;">
//         <h2 style="color: #0A2540;">Hi ${candidate.name},</h2>
//         <p>This is an invitation to discuss your application further with the CoreOps.ai team.</p>
//         <p>Please use the scheduling link that will be sent in a separate email, or reply to this message with your availability.</p>
//         <p style="margin-top: 25px;">We look forward to our conversation!</p>
//         <p style="margin-top: 30px;">Thanks,<br><strong>The CoreOps.ai Talent Team</strong></p>
//       </div>
//     `;
//     const outlookCalendarLink = `https://outlook.office.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&to=${encodeURIComponent(
//       candidate.email
//     )}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
//       bodyHTML
//     )}`;
//     window.open(outlookCalendarLink, "_blank");
//   };

//   const toggleSingleCandidateSelection = (candidateId) => {
//     // Renamed for clarity
//     setSelectedCandidateIds((prevSelected) =>
//       prevSelected.includes(candidateId)
//         ? prevSelected.filter((id) => id !== candidateId)
//         : [...prevSelected, candidateId]
//     );
//   };

//   const handleSelectAllFilteredCandidates = () => {
//     // Renamed for clarity
//     if (
//       selectedCandidateIds.length ===
//       sortedAndFilteredCandidates.filter((c) => !c.error && !c.analysisError)
//         .length
//     ) {
//       setSelectedCandidateIds([]);
//     } else {
//       const allFilteredIds = sortedAndFilteredCandidates
//         .filter((c) => !c.error && !c.analysisError)
//         .map((c) => c._id);
//       setSelectedCandidateIds(allFilteredIds);
//     }
//   };

//   const handleAddSelectedToShortlist = async () => {
//     // Example "Save Selected" action
//     if (selectedCandidateIds.length === 0) {
//       alert("No candidates selected to add to shortlist.");
//       return;
//     }
//     // This is a placeholder. You'd typically make an API call here.
//     // For example, post the selected IDs to a /shortlist endpoint.
//     try {
//       // const response = await fetch(`${backend_url}/shortlist/add`, {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify({ candidateIds: selectedCandidateIds, listName: 'Default Shortlist' })
//       // });
//       // if (!response.ok) throw new Error ('Failed to add to shortlist');
//       // const result = await response.json();
//       // alert(result.message || `${selectedCandidateIds.length} candidates added to shortlist.`);
//       alert(
//         `Simulating: ${selectedCandidateIds.length} candidates added to a shortlist.`
//       );
//       setSelectedCandidateIds([]); // Clear selection after action
//     } catch (err) {
//       alert(`Error: ${err.message}`);
//     }
//   };

//   return (
//     <div className="coreops-page-container saved-candidates-page">
//       <div className="coreops-content-wrapper">
//         <header className="coreops-main-header results-sub-header">
//           <h1>
//             <FontAwesomeIcon icon={faUsers} /> Candidate Pipeline{" "}
//             {/* Changed title */}
//           </h1>
//           <div className="coreops-results-summary-global">
//             {sortedAndFilteredCandidates.length} candidate(s) found{" "}
//             {statusFilter !== "All" ? ` (Status: ${statusFilter})` : ""}
//           </div>
//         </header>

//         <div className="coreops-controls-panel candidates-controls">
//           <div className="coreops-search-container">
//             <FontAwesomeIcon icon={faSearch} className="coreops-search-icon" />
//             <input
//               type="text"
//               placeholder="Search by name, email, role, skills..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="coreops-search-input"
//             />
//           </div>

//           <div className="coreops-filter-section">
//             <button
//               className={`coreops-button coreops-button-secondary filter-toggle-button ${showFilterOptions ? "active" : ""} ${statusFilter !== "All" ? "filter-active-indicator" : ""}`}
//               onClick={() => setShowFilterOptions(!showFilterOptions)}
//             >
//               <FontAwesomeIcon icon={faFilter} />
//               {statusFilter !== "All"
//                 ? ` Status: ${statusFilter}`
//                 : " Filter by Status"}
//             </button>
//           </div>
//         </div>

//         {showFilterOptions && (
//           <div className="coreops-filter-options-dropdown">
//             <div className="filter-pills-container">
//               <div
//                 key="All"
//                 className={`coreops-filter-pill ${statusFilter === "All" ? "active" : ""}`}
//                 onClick={() => {
//                   setStatusFilter("All");
//                   setShowFilterOptions(false);
//                 }}
//               >
//                 All Statuses
//               </div>
//               {interviewStages.map((stage) => (
//                 <div
//                   key={stage}
//                   className={`coreops-filter-pill ${statusFilter === stage ? "active" : ""}`}
//                   onClick={() => {
//                     setStatusFilter(stage);
//                     setShowFilterOptions(false);
//                   }}
//                 >
//                   {stage}
//                 </div>
//               ))}
//             </div>
//             <button
//               className="coreops-button-inline clear-all-filters-button"
//               onClick={() => {
//                 setStatusFilter("All");
//                 setSearchTerm("");
//                 setShowFilterOptions(false);
//               }}
//               title="Clear all filters and search"
//             >
//               <FontAwesomeIcon icon={faUndo} /> Clear All
//             </button>
//           </div>
//         )}

//         {loading ? (
//           <div className="coreops-message-container loading">
//             <FontAwesomeIcon icon={faSpinner} spin size="3x" />
//             <p>Loading Candidates...</p>
//           </div>
//         ) : error ? (
//           <div className="coreops-message-container error">
//             <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
//             <p className="error-title">Error Loading Data</p>
//             <p>{error}</p>
//             <button
//               className="coreops-button coreops-button-primary"
//               onClick={fetchCandidates}
//             >
//               <FontAwesomeIcon icon={faUndo} /> Retry
//             </button>
//           </div>
//         ) : sortedAndFilteredCandidates.length === 0 ? (
//           <div className="coreops-message-container empty">
//             <FontAwesomeIcon icon={faUsers} size="4x" /> {/* Changed icon */}
//             <p className="empty-title">No Candidates Found</p>
//             {searchTerm || statusFilter !== "All" ? (
//               <>
//                 <p className="empty-subtitle">
//                   Try adjusting your search or filter criteria.
//                 </p>
//                 <button
//                   className="coreops-button coreops-button-secondary"
//                   onClick={() => {
//                     setSearchTerm("");
//                     setStatusFilter("All");
//                     setShowFilterOptions(false);
//                   }}
//                 >
//                   <FontAwesomeIcon icon={faUndo} /> Clear Search & Filters
//                 </button>
//               </>
//             ) : (
//               <>
//                 <p className="empty-subtitle">
//                   Your candidate pipeline is currently empty.
//                 </p>
//                 <Link
//                   to="/upload"
//                   className="coreops-button coreops-button-primary"
//                 >
//                   <FontAwesomeIcon icon={faCloudUploadAlt} /> Analyze New
//                   Resumes
//                 </Link>
//               </>
//             )}
//           </div>
//         ) : (
//           <>
//             <div className="coreops-bulk-actions-bar">
//               <div className="select-all-container">
//                 <input
//                   type="checkbox"
//                   className="coreops-checkbox"
//                   title={
//                     sortedAndFilteredCandidates.length === 0
//                       ? "No candidates to select"
//                       : selectedCandidateIds.length ===
//                           sortedAndFilteredCandidates.filter(
//                             (c) => !c.error && !c.analysisError
//                           ).length
//                         ? "Deselect all"
//                         : "Select all visible processable"
//                   }
//                   checked={
//                     sortedAndFilteredCandidates.filter(
//                       (c) => !c.error && !c.analysisError
//                     ).length > 0 &&
//                     selectedCandidateIds.length ===
//                       sortedAndFilteredCandidates.filter(
//                         (c) => !c.error && !c.analysisError
//                       ).length
//                   }
//                   onChange={handleSelectAllFilteredCandidates}
//                   disabled={
//                     sortedAndFilteredCandidates.filter(
//                       (c) => !c.error && !c.analysisError
//                     ).length === 0
//                   }
//                   id="selectAllTableCheckbox"
//                 />
//                 <label htmlFor="selectAllTableCheckbox">
//                   {selectedCandidateIds.length > 0
//                     ? `${selectedCandidateIds.length} Selected`
//                     : "Select All"}
//                 </label>
//               </div>
//               {selectedCandidateIds.length > 0 && (
//                 <div className="coreops-action-buttons-group">
//                   <button
//                     className="coreops-button coreops-button-secondary"
//                     onClick={sendBulkMail}
//                     title="Send email to selected candidates"
//                   >
//                     {" "}
//                     <FontAwesomeIcon icon={faEnvelope} /> Email Selected
//                   </button>
//                   <button
//                     className="coreops-button coreops-button-secondary" // Changed to secondary, primary can be for a more prominent action
//                     onClick={handleAddSelectedToShortlist}
//                     title="Add selected candidates to a shortlist"
//                   >
//                     {" "}
//                     <FontAwesomeIcon icon={faClipboardList} /> Add to Shortlist
//                   </button>
//                   {/* You can add more bulk actions like "Bulk Delete" or "Bulk Update Status" here */}
//                 </div>
//               )}
//             </div>

//             <div className="coreops-table-responsive-wrapper">
//               <table className="coreops-results-table saved-candidates-table">
//                 <thead>
//                   <tr>
//                     <th style={{ width: "3%" }}>
//                       {" "}
//                       {/* Empty for select all checkbox */}{" "}
//                     </th>
//                     <th
//                       onClick={() => handleSort("name")}
//                       style={{ width: "18%" }}
//                     >
//                       {" "}
//                       {/* Adjusted width */}
//                       <FontAwesomeIcon
//                         icon={faUserTie}
//                         className="coreops-header-icon"
//                       />{" "}
//                       Name
//                       <FontAwesomeIcon
//                         icon={getSortIcon("name")}
//                         className="coreops-sort-icon"
//                       />
//                     </th>
//                     <th
//                       onClick={() => handleSort("email")}
//                       style={{ width: "18%" }}
//                     >
//                       {" "}
//                       {/* Adjusted width */}
//                       <FontAwesomeIcon
//                         icon={faEnvelope}
//                         className="coreops-header-icon"
//                       />{" "}
//                       Email
//                       <FontAwesomeIcon
//                         icon={getSortIcon("email")}
//                         className="coreops-sort-icon"
//                       />
//                     </th>
//                     <th
//                       onClick={() => handleSort("interviewStatus")}
//                       style={{ width: "15%" }}
//                     >
//                       <FontAwesomeIcon
//                         icon={faListAlt}
//                         className="coreops-header-icon"
//                       />{" "}
//                       Status
//                       <FontAwesomeIcon
//                         icon={getSortIcon("interviewStatus")}
//                         className="coreops-sort-icon"
//                       />
//                     </th>
//                     <th
//                       onClick={() => handleSort("similarityScore")}
//                       style={{ width: "8%" }}
//                     >
//                       <FontAwesomeIcon
//                         icon={faStar}
//                         className="coreops-header-icon"
//                       />{" "}
//                       Score
//                       <FontAwesomeIcon
//                         icon={getSortIcon("similarityScore")}
//                         className="coreops-sort-icon"
//                       />
//                     </th>
//                     <th
//                       style={{ width: "15%" }}
//                       onClick={() => handleSort("roleName")}
//                     >
//                       <FontAwesomeIcon
//                         icon={faBriefcase}
//                         className="coreops-header-icon"
//                       />{" "}
//                       Target Role
//                       <FontAwesomeIcon
//                         icon={getSortIcon("roleName")}
//                         className="coreops-sort-icon"
//                       />
//                     </th>
//                     <th
//                       style={{ width: "10%" }}
//                       onClick={() => handleSort("nextInterviewDate")}
//                     >
//                       <FontAwesomeIcon
//                         icon={faCalendarAlt}
//                         className="coreops-header-icon"
//                       />{" "}
//                       Next Step
//                       <FontAwesomeIcon
//                         icon={getSortIcon("nextInterviewDate")}
//                         className="coreops-sort-icon"
//                       />
//                     </th>
//                     <th style={{ width: "13%" }}>Actions</th>{" "}
//                     {/* Adjusted width */}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {sortedAndFilteredCandidates.map((candidate) => (
//                     <React.Fragment key={candidate._id}>
//                       <tr
//                         className={
//                           editingCandidateId === candidate._id
//                             ? "row-being-edited"
//                             : ""
//                         }
//                       >
//                         <td>
//                           <input
//                             type="checkbox"
//                             className="coreops-checkbox"
//                             checked={selectedCandidateIds.includes(
//                               candidate._id
//                             )}
//                             onChange={() =>
//                               toggleSingleCandidateSelection(candidate._id)
//                             }
//                             title={`Select ${candidate.name}`}
//                           />
//                         </td>
//                         <td className="coreops-td-name" title={candidate.name}>
//                           <Link
//                             to={`/candidates/${candidate._id}`}
//                             className="coreops-candidate-name-link"
//                           >
//                             {candidate.name}
//                           </Link>
//                         </td>
//                         <td
//                           className="coreops-td-email"
//                           title={candidate.email}
//                         >
//                           {candidate.email}
//                         </td>
//                         <td>
//                           <div className="coreops-status-cell">
//                             <span
//                               className="coreops-status-pill"
//                               style={{
//                                 backgroundColor:
//                                   stageColors[
//                                     candidate.interviewStatus || "Not Started"
//                                   ],
//                               }}
//                               title={`Status: ${candidate.interviewStatus || "Not Started"}`}
//                             >
//                               {candidate.interviewStatus || "Not Started"}
//                             </span>
//                           </div>
//                         </td>
//                         <td
//                           className="coreops-td-score"
//                           title={`Match Score: ${candidate.similarityScore || 0}`}
//                         >
//                           {candidate.similarityScore || 0}%
//                         </td>
//                         <td title={candidate.roleName || "N/A"}>
//                           {candidate.roleName || "N/A"}
//                         </td>
//                         <td
//                           title={
//                             candidate.nextInterviewDate
//                               ? formatDate(candidate.nextInterviewDate)
//                               : "Not Set"
//                           }
//                         >
//                           {candidate.nextInterviewDate
//                             ? formatDate(candidate.nextInterviewDate)
//                             : "Not Set"}
//                         </td>
//                         <td className="coreops-td-actions">
//                           <button
//                             className="coreops-button-icon"
//                             onClick={() => startEditingCandidate(candidate)}
//                             title="Update Status/Notes"
//                           >
//                             {" "}
//                             <FontAwesomeIcon icon={faEdit} />
//                           </button>
//                           {candidate.interviewNotes &&
//                             candidate.interviewNotes.length > 0 && (
//                               <button
//                                 className="coreops-button-icon"
//                                 onClick={() => viewCandidateNotes(candidate)}
//                                 title="View Interview Notes"
//                               >
//                                 {" "}
//                                 <FontAwesomeIcon icon={faClipboardList} />
//                               </button>
//                             )}
//                           <button
//                             className="coreops-button-icon"
//                             onClick={() => sendIndividualMail(candidate)}
//                             title={`Email ${candidate.name}`}
//                           >
//                             {" "}
//                             <FontAwesomeIcon icon={faPaperPlane} />
//                           </button>
//                           <br />
//                           <button
//                             className="coreops-button-icon"
//                             onClick={() => sendCalendarInvite(candidate)}
//                             title={`Schedule Interview with ${candidate.name}`}
//                           >
//                             {" "}
//                             <FontAwesomeIcon icon={faCalendarAlt} />
//                           </button>
//                           <button
//                             className="coreops-button-icon delete"
//                             onClick={() => handleDeleteCandidate(candidate._id)}
//                             title="Delete Candidate"
//                           >
//                             {" "}
//                             <FontAwesomeIcon icon={faTrash} />
//                           </button>
//                         </td>
//                       </tr>
//                       {editingCandidateId === candidate._id && (
//                         <tr className="coreops-edit-row">
//                           <td colSpan="8">
//                             <div className="coreops-edit-form-container">
//                               <h4 className="coreops-edit-form-title">
//                                 Update Status for {candidate.name}
//                               </h4>
//                               <div className="coreops-form-grid">
//                                 <div className="coreops-form-group">
//                                   <label
//                                     htmlFor={`interviewStatus-${candidate._id}`}
//                                     className="coreops-form-label"
//                                   >
//                                     Interview Stage:
//                                   </label>
//                                   <select
//                                     id={`interviewStatus-${candidate._id}`}
//                                     name="interviewStatus"
//                                     value={editFormData.interviewStatus}
//                                     onChange={handleEditFormChange}
//                                     className="coreops-select"
//                                   >
//                                     {interviewStages.map((stage) => (
//                                       <option key={stage} value={stage}>
//                                         {stage}
//                                       </option>
//                                     ))}
//                                   </select>
//                                 </div>
//                                 <div className="coreops-form-group">
//                                   <label
//                                     htmlFor={`nextInterviewDate-${candidate._id}`}
//                                     className="coreops-form-label"
//                                   >
//                                     Next Interview Date:
//                                   </label>
//                                   <input
//                                     type="datetime-local"
//                                     id={`nextInterviewDate-${candidate._id}`}
//                                     name="nextInterviewDate"
//                                     value={editFormData.nextInterviewDate}
//                                     onChange={handleEditFormChange}
//                                     className="coreops-input"
//                                   />
//                                 </div>
//                                 <div className="coreops-form-group full-width">
//                                   <label
//                                     htmlFor={`interviewNote-${candidate._id}`}
//                                     className="coreops-form-label"
//                                   >
//                                     Add Note (for this update):
//                                   </label>
//                                   <textarea
//                                     id={`interviewNote-${candidate._id}`}
//                                     name="note"
//                                     value={editFormData.note}
//                                     onChange={handleEditFormChange}
//                                     placeholder="Enter notes about this stage or update..."
//                                     className="coreops-textarea"
//                                     rows="3"
//                                   />
//                                 </div>
//                               </div>
//                               <div className="coreops-edit-form-actions">
//                                 <button
//                                   className="coreops-button coreops-button-secondary"
//                                   onClick={cancelEditing}
//                                 >
//                                   {" "}
//                                   <FontAwesomeIcon icon={faTimes} /> Cancel
//                                 </button>
//                                 <button
//                                   className="coreops-button coreops-button-primary"
//                                   onClick={() =>
//                                     saveInterviewUpdate(candidate._id)
//                                   }
//                                 >
//                                   {" "}
//                                   <FontAwesomeIcon icon={faSave} /> Save Update
//                                 </button>
//                               </div>
//                             </div>
//                           </td>
//                         </tr>
//                       )}
//                     </React.Fragment>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}

//         {showNotesModal && (
//           <div
//             className="coreops-modal-overlay"
//             onClick={() => setShowNotesModal(false)}
//           >
//             <div
//               className="coreops-modal-content"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="coreops-modal-header">
//                 <h3 className="coreops-modal-title">
//                   <FontAwesomeIcon icon={faClipboardList} /> Interview Notes for{" "}
//                   {currentCandidateNameForModal}
//                 </h3>
//                 <button
//                   className="coreops-modal-close-button"
//                   onClick={() => setShowNotesModal(false)}
//                   title="Close"
//                 >
//                   <FontAwesomeIcon icon={faTimes} />
//                 </button>
//               </div>
//               <div className="coreops-modal-body scrollable">
//                 {currentCandidateNotes.length > 0 ? (
//                   currentCandidateNotes
//                     .slice()
//                     .reverse()
//                     .map((note, index) => (
//                       <div key={index} className="coreops-note-item">
//                         <div className="coreops-note-header">
//                           <span
//                             className="coreops-note-stage"
//                             style={{
//                               backgroundColor:
//                                 stageColors[note.stage || "Not Started"],
//                             }}
//                           >
//                             {note.stage || "General Note"}
//                           </span>
//                           <span className="coreops-note-date">
//                             {formatDate(note.createdAt)}
//                           </span>
//                         </div>
//                         <p className="coreops-note-text">{note.note}</p>
//                       </div>
//                     ))
//                 ) : (
//                   <p className="no-notes-text">
//                     No notes available for this candidate.
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//         <footer className="coreops-footer results-sub-footer">
//           <p>© {new Date().getFullYear()} COREHire - Candidate Management</p>
//         </footer>
//       </div>
//     </div>
//   );
// }

// export default SavedCandidates;

import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faUserTie,
  faEnvelope,
  faStar,
  faCloudUploadAlt,
  faTrash,
  faSpinner,
  faExclamationTriangle,
  faSearch,
  faSort,
  faSortUp,
  faSortDown,
  faCalendarAlt,
  faChartBar,
  faListAlt,
  faEdit,
  faSave,
  faTimes,
  faClipboardList,
  faFilter,
  faUser,
  faPaperPlane,
  faBriefcase,
  faUsers,
  faUndo,
  faPlusCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { backend_url } from "../config";
import "../SavedCandidates.css"; // Ensure this CSS file has the CoreOps.ai theme

function SavedCandidates() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const stageFilter = queryParams.get("stage");

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "similarityScore",
    direction: "descending",
  });
  const [editingCandidateId, setEditingCandidateId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    interviewStatus: "",
    note: "",
    nextInterviewDate: "",
  });
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [currentCandidateNotes, setCurrentCandidateNotes] = useState([]);
  const [currentCandidateNameForModal, setCurrentCandidateNameForModal] =
    useState("");
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [statusFilter, setStatusFilter] = useState(stageFilter || "All");
  const [selectedCandidateIds, setSelectedCandidateIds] = useState([]);

  const stageColors = {
    "Not Started": "#adb5bd",
    "Resume Screening": "#a9def9",
    "Phone Interview": "#72d5fd",
    "Technical Assessment": "#2ab7ca",
    "On-site Interview": "var(--coreops-secondary, #00A4CC)",
    "Reference Check": "#0077b6",
    "Offer Extended": "#2a9d8f",
    Hired: "var(--coreops-success-text, #28a745)",
    Rejected: "var(--coreops-error-text, #d9534f)",
    "On Hold": "#fdc500",
  };

  const interviewStages = [
    "Not Started",
    "Resume Screening",
    "Phone Interview",
    "Technical Assessment",
    "On-site Interview",
    "Reference Check",
    "Offer Extended",
    "Hired",
    "Rejected",
    "On Hold",
  ];

  useEffect(() => {
    fetchCandidates();
  }, [location.pathname]);

  useEffect(() => {
    const currentStageFilterFromUrl = queryParams.get("stage");
    if (currentStageFilterFromUrl) {
      setStatusFilter(currentStageFilterFromUrl);
    } else if (!stageFilter) {
      setStatusFilter("All");
    }
  }, [location.search, stageFilter]);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      setError(null);
      const endpoint = location.pathname.toLowerCase().includes("qualified")
        ? `${backend_url}/qualified-candidates`
        : `${backend_url}/candidates`;
      console.log(`Fetching from: ${endpoint}`);
      const response = await fetch(endpoint);

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: `HTTP error! status: ${response.status}` }));
        throw new Error(
          errorData.message || `Failed to fetch candidates: ${response.status}`
        );
      }

      const data = await response.json();
      // --- MODIFICATION START ---
      // Pre-process candidates to add easily accessible properties for sorting and display.
      const candidatesArray = (
        Array.isArray(data) ? data : data.candidates || []
      ).map((c) => ({
        ...c,
        similarityScore: c.similarityScore || 0,
        // Assumption: backend provides a workHistory array, with the most recent job first.
        // Create a 'currentCompany' field for easy sorting and display.
        currentCompany:
          c.workHistory && c.workHistory.length > 0
            ? c.workHistory[0].companyName
            : "N/A",
      }));
      // --- MODIFICATION END ---
      setCandidates(candidatesArray);
    } catch (err) {
      console.error("Error fetching candidates:", err);
      setError(err.message || "Failed to load candidates. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCandidate = async (candidateId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this candidate permanently? This action cannot be undone."
      )
    ) {
      return;
    }
    try {
      const endpoint = location.pathname.toLowerCase().includes("qualified")
        ? `${backend_url}/qualified-candidates/${candidateId}`
        : `${backend_url}/candidates/${candidateId}`;
      const response = await fetch(endpoint, { method: "DELETE" });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete candidate");
      }
      setCandidates(candidates.filter((c) => c._id !== candidateId));
    } catch (err) {
      console.error("Error deleting candidate:", err);
      setError(err.message || "Failed to delete candidate. Please try again.");
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const startEditingCandidate = (candidate) => {
    setEditingCandidateId(candidate._id);
    setEditFormData({
      interviewStatus: candidate.interviewStatus || "Not Started",
      note: "",
      nextInterviewDate: candidate.nextInterviewDate
        ? new Date(candidate.nextInterviewDate).toISOString().slice(0, 16)
        : "",
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const cancelEditing = () => {
    setEditingCandidateId(null);
    setEditFormData({ interviewStatus: "", note: "", nextInterviewDate: "" });
  };

  const saveInterviewUpdate = async (candidateId) => {
    try {
      const endpoint = location.pathname.toLowerCase().includes("qualified")
        ? `${backend_url}/qualified-candidates/${candidateId}/interview-status`
        : `${backend_url}/candidates/${candidateId}/interview-status`;
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interviewStatus: editFormData.interviewStatus,
          note: editFormData.note,
          nextInterviewDate: editFormData.nextInterviewDate || null,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Failed to update interview status"
        );
      }
      const updatedCandidateData = await response.json();
      setCandidates(
        candidates.map((c) =>
          c._id === candidateId
            ? {
                ...(updatedCandidateData.candidate || updatedCandidateData),
                currentCompany: c.currentCompany,
              } // Preserve pre-processed company
            : c
        )
      );
      cancelEditing();
    } catch (err) {
      console.error("Error updating interview status:", err);
      setError(err.message || "Failed to update interview status.");
    }
  };

  const viewCandidateNotes = (candidate) => {
    setCurrentCandidateNotes(candidate.interviewNotes || []);
    setCurrentCandidateNameForModal(candidate.name);
    setShowNotesModal(true);
  };

  const formatDate = (dateString, includeTime = true) => {
    if (!dateString) return "Not Set";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";
      const options = { year: "numeric", month: "short", day: "numeric" };
      if (includeTime) {
        options.hour = "2-digit";
        options.minute = "2-digit";
        options.hour12 = true;
      }
      return date.toLocaleDateString("en-US", options);
    } catch (e) {
      return "Date Error";
    }
  };

  const sortedAndFilteredCandidates = useMemo(() => {
    let processed = [...candidates];
    processed =
      statusFilter === "All"
        ? processed
        : processed.filter(
            (c) =>
              c.interviewStatus === statusFilter ||
              (!c.interviewStatus && statusFilter === "Not Started")
          );
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      processed = processed.filter(
        (c) =>
          c.name?.toLowerCase().includes(lowerSearchTerm) ||
          c.email?.toLowerCase().includes(lowerSearchTerm) ||
          c.roleName?.toLowerCase().includes(lowerSearchTerm) ||
          c.mainDomain?.toLowerCase().includes(lowerSearchTerm) ||
          (c.keySkills &&
            c.keySkills.join(" ").toLowerCase().includes(lowerSearchTerm)) ||
          c.resumeSummary?.toLowerCase().includes(lowerSearchTerm) ||
          // --- MODIFICATION: ADDED COMPANY SEARCH LOGIC ---
          // Check if any company in the work history matches the search term.
          (c.workHistory &&
            c.workHistory.some(
              (job) =>
                job.companyName &&
                job.companyName.toLowerCase().includes(lowerSearchTerm)
            ))
        // --- MODIFICATION END ---
      );
    }
    if (sortConfig.key) {
      processed.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];
        if (
          sortConfig.key === "similarityScore" ||
          sortConfig.key === "totalExperienceYears"
        ) {
          valA = Number(valA) || 0;
          valB = Number(valB) || 0;
        } else if (sortConfig.key === "nextInterviewDate") {
          valA = valA
            ? new Date(valA).getTime()
            : sortConfig.direction === "ascending"
              ? Infinity
              : -Infinity;
          valB = valB
            ? new Date(valB).getTime()
            : sortConfig.direction === "ascending"
              ? Infinity
              : -Infinity;
        } else if (typeof valA === "string") {
          valA = valA.toLowerCase();
          valB = String(valB || "").toLowerCase();
        } else if (valA === undefined || valA === null) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        } else if (valB === undefined || valB === null) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }

        if (valA < valB) return sortConfig.direction === "ascending" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return processed;
  }, [candidates, searchTerm, sortConfig, statusFilter]);

  const getSortIcon = (name) => {
    if (sortConfig.key === name) {
      return sortConfig.direction === "ascending" ? faSortUp : faSortDown;
    }
    return faSort;
  };

  // All other helper functions (sendIndividualMail, sendBulkMail, etc.) remain unchanged
  const sendIndividualMail = (candidate) => {
    const subject = encodeURIComponent(
      `Regarding Your Application - CoreOps.ai`
    );
    const body = encodeURIComponent(
      `Dear ${candidate.name},\n\nThank you for your interest in CoreOps.ai. We are currently reviewing applications and will be in touch regarding next steps.\n\nBest regards,\nThe CoreOps.ai Talent Team`
    );
    const mailtoLink = `mailto:${candidate.email}?subject=${subject}&body=${body}`;
    window.open(mailtoLink, "_blank");
  };

  const sendBulkMail = () => {
    if (selectedCandidateIds.length === 0) {
      alert("No candidates selected for bulk mail.");
      return;
    }
    const selectedForMail = candidates.filter(
      (c) =>
        selectedCandidateIds.includes(c._id) && c.email && c.email !== "N/A"
    );
    if (selectedForMail.length === 0) {
      alert("None of the selected candidates have valid email addresses.");
      return;
    }
    const bccList = selectedForMail.map((c) => c.email).join(",");
    const subject = encodeURIComponent("Update from CoreOps.ai");
    const body = encodeURIComponent(
      `Dear Candidates,\n\nThank you for your interest in CoreOps.ai. We are currently reviewing applications and will be in touch with updates soon.\n\nBest regards,\nThe CoreOps.ai Talent Team`
    );
    const mailtoLink = `mailto:?bcc=${bccList}&subject=${subject}&body=${body}`;
    window.open(mailtoLink, "_blank");
  };

  const sendCalendarInvite = (candidate) => {
    const subject = `Interview: ${candidate.name} with CoreOps.ai`;
    const bodyHTML = `<div style="font-family: Inter, Arial, sans-serif; color: #2c3e50;"><h2 style="color: #0A2540;">Hi ${candidate.name},</h2><p>This is an invitation to discuss your application further with the CoreOps.ai team.</p><p>Please use the scheduling link that will be sent in a separate email, or reply to this message with your availability.</p><p style="margin-top: 25px;">We look forward to our conversation!</p><p style="margin-top: 30px;">Thanks,<br><strong>The CoreOps.ai Talent Team</strong></p></div>`;
    const outlookCalendarLink = `https://outlook.office.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&to=${encodeURIComponent(candidate.email)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyHTML)}`;
    window.open(outlookCalendarLink, "_blank");
  };

  const toggleSingleCandidateSelection = (candidateId) => {
    setSelectedCandidateIds((prevSelected) =>
      prevSelected.includes(candidateId)
        ? prevSelected.filter((id) => id !== candidateId)
        : [...prevSelected, candidateId]
    );
  };

  const handleSelectAllFilteredCandidates = () => {
    if (
      selectedCandidateIds.length ===
      sortedAndFilteredCandidates.filter((c) => !c.error && !c.analysisError)
        .length
    ) {
      setSelectedCandidateIds([]);
    } else {
      const allFilteredIds = sortedAndFilteredCandidates
        .filter((c) => !c.error && !c.analysisError)
        .map((c) => c._id);
      setSelectedCandidateIds(allFilteredIds);
    }
  };

  const handleAddSelectedToShortlist = async () => {
    if (selectedCandidateIds.length === 0) {
      alert("No candidates selected to add to shortlist.");
      return;
    }
    alert(
      `Simulating: ${selectedCandidateIds.length} candidates added to a shortlist.`
    );
    setSelectedCandidateIds([]);
  };

  return (
    <div className="coreops-page-container saved-candidates-page">
      <div className="coreops-content-wrapper">
        <header className="coreops-main-header results-sub-header">
          <h1>
            <FontAwesomeIcon icon={faUsers} /> Candidate Pipeline
          </h1>
          <div className="coreops-results-summary-global">
            {sortedAndFilteredCandidates.length} candidate(s) found{" "}
            {statusFilter !== "All" ? ` (Status: ${statusFilter})` : ""}
          </div>
        </header>

        <div className="coreops-controls-panel candidates-controls">
          <div className="coreops-search-container">
            <FontAwesomeIcon icon={faSearch} className="coreops-search-icon" />
            <input
              type="text"
              // --- MODIFICATION: UPDATED PLACEHOLDER ---
              placeholder="Search by name, skills, company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="coreops-search-input"
            />
          </div>

          <div className="coreops-filter-section">
            <button
              className={`coreops-button coreops-button-secondary filter-toggle-button ${showFilterOptions ? "active" : ""} ${statusFilter !== "All" ? "filter-active-indicator" : ""}`}
              onClick={() => setShowFilterOptions(!showFilterOptions)}
            >
              <FontAwesomeIcon icon={faFilter} />
              {statusFilter !== "All"
                ? ` Status: ${statusFilter}`
                : " Filter by Status"}
            </button>
          </div>
        </div>

        {showFilterOptions && (
          // ... (filter options dropdown remains unchanged)
          <div className="coreops-filter-options-dropdown">
            <div className="filter-pills-container">
              <div
                key="All"
                className={`coreops-filter-pill ${statusFilter === "All" ? "active" : ""}`}
                onClick={() => {
                  setStatusFilter("All");
                  setShowFilterOptions(false);
                }}
              >
                All Statuses
              </div>
              {interviewStages.map((stage) => (
                <div
                  key={stage}
                  className={`coreops-filter-pill ${statusFilter === stage ? "active" : ""}`}
                  onClick={() => {
                    setStatusFilter(stage);
                    setShowFilterOptions(false);
                  }}
                >
                  {stage}
                </div>
              ))}
            </div>
            <button
              className="coreops-button-inline clear-all-filters-button"
              onClick={() => {
                setStatusFilter("All");
                setSearchTerm("");
                setShowFilterOptions(false);
              }}
              title="Clear all filters and search"
            >
              <FontAwesomeIcon icon={faUndo} /> Clear All
            </button>
          </div>
        )}

        {loading ? (
          <div className="coreops-message-container loading">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
            <p>Loading Candidates...</p>
          </div>
        ) : error ? (
          <div className="coreops-message-container error">
            <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
            <p className="error-title">Error Loading Data</p>
            <p>{error}</p>
            <button
              className="coreops-button coreops-button-primary"
              onClick={fetchCandidates}
            >
              <FontAwesomeIcon icon={faUndo} /> Retry
            </button>
          </div>
        ) : sortedAndFilteredCandidates.length === 0 ? (
          <div className="coreops-message-container empty">
            <FontAwesomeIcon icon={faUsers} size="4x" />
            <p className="empty-title">No Candidates Found</p>
            {searchTerm || statusFilter !== "All" ? (
              <>
                <p className="empty-subtitle">
                  Try adjusting your search or filter criteria.
                </p>
                <button
                  className="coreops-button coreops-button-secondary"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("All");
                    setShowFilterOptions(false);
                  }}
                >
                  <FontAwesomeIcon icon={faUndo} /> Clear Search & Filters
                </button>
              </>
            ) : (
              <>
                <p className="empty-subtitle">
                  Your candidate pipeline is currently empty.
                </p>
                <Link
                  to="/upload"
                  className="coreops-button coreops-button-primary"
                >
                  <FontAwesomeIcon icon={faCloudUploadAlt} /> Analyze New
                  Resumes
                </Link>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="coreops-bulk-actions-bar">
              {/* Bulk actions bar remains unchanged */}
              <div className="select-all-container">
                <input
                  type="checkbox"
                  className="coreops-checkbox"
                  title={
                    sortedAndFilteredCandidates.length === 0
                      ? "No candidates to select"
                      : selectedCandidateIds.length ===
                          sortedAndFilteredCandidates.filter(
                            (c) => !c.error && !c.analysisError
                          ).length
                        ? "Deselect all"
                        : "Select all visible processable"
                  }
                  checked={
                    sortedAndFilteredCandidates.filter(
                      (c) => !c.error && !c.analysisError
                    ).length > 0 &&
                    selectedCandidateIds.length ===
                      sortedAndFilteredCandidates.filter(
                        (c) => !c.error && !c.analysisError
                      ).length
                  }
                  onChange={handleSelectAllFilteredCandidates}
                  disabled={
                    sortedAndFilteredCandidates.filter(
                      (c) => !c.error && !c.analysisError
                    ).length === 0
                  }
                  id="selectAllTableCheckbox"
                />
                <label htmlFor="selectAllTableCheckbox">
                  {selectedCandidateIds.length > 0
                    ? `${selectedCandidateIds.length} Selected`
                    : "Select All"}
                </label>
              </div>
              {selectedCandidateIds.length > 0 && (
                <div className="coreops-action-buttons-group">
                  <button
                    className="coreops-button coreops-button-secondary"
                    onClick={sendBulkMail}
                    title="Send email to selected candidates"
                  >
                    {" "}
                    <FontAwesomeIcon icon={faEnvelope} /> Email Selected
                  </button>
                  <button
                    className="coreops-button coreops-button-secondary"
                    onClick={handleAddSelectedToShortlist}
                    title="Add selected candidates to a shortlist"
                  >
                    {" "}
                    <FontAwesomeIcon icon={faClipboardList} /> Add to Shortlist
                  </button>
                </div>
              )}
            </div>

            <div className="coreops-table-responsive-wrapper">
              <table className="coreops-results-table saved-candidates-table">
                <thead>
                  {/* --- MODIFICATION: ADJUSTED TABLE HEADERS --- */}
                  <tr>
                    <th style={{ width: "3%" }}></th>
                    <th
                      onClick={() => handleSort("name")}
                      style={{ width: "16%" }}
                    >
                      <FontAwesomeIcon
                        icon={faUserTie}
                        className="coreops-header-icon"
                      />{" "}
                      Name
                      <FontAwesomeIcon
                        icon={getSortIcon("name")}
                        className="coreops-sort-icon"
                      />
                    </th>
                    <th
                      onClick={() => handleSort("currentCompany")}
                      style={{ width: "15%" }}
                    >
                      <FontAwesomeIcon
                        icon={faBriefcase}
                        className="coreops-header-icon"
                      />{" "}
                      Company
                      <FontAwesomeIcon
                        icon={getSortIcon("currentCompany")}
                        className="coreops-sort-icon"
                      />
                    </th>
                    <th
                      onClick={() => handleSort("interviewStatus")}
                      style={{ width: "13%" }}
                    >
                      <FontAwesomeIcon
                        icon={faListAlt}
                        className="coreops-header-icon"
                      />{" "}
                      Status
                      <FontAwesomeIcon
                        icon={getSortIcon("interviewStatus")}
                        className="coreops-sort-icon"
                      />
                    </th>
                    <th
                      onClick={() => handleSort("similarityScore")}
                      style={{ width: "8%" }}
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        className="coreops-header-icon"
                      />{" "}
                      Score
                      <FontAwesomeIcon
                        icon={getSortIcon("similarityScore")}
                        className="coreops-sort-icon"
                      />
                    </th>
                    <th
                      style={{ width: "15%" }}
                      onClick={() => handleSort("roleName")}
                    >
                      <FontAwesomeIcon
                        icon={faBriefcase}
                        className="coreops-header-icon"
                      />{" "}
                      Target Role
                      <FontAwesomeIcon
                        icon={getSortIcon("roleName")}
                        className="coreops-sort-icon"
                      />
                    </th>
                    <th
                      style={{ width: "10%" }}
                      onClick={() => handleSort("nextInterviewDate")}
                    >
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="coreops-header-icon"
                      />{" "}
                      Next Step
                      <FontAwesomeIcon
                        icon={getSortIcon("nextInterviewDate")}
                        className="coreops-sort-icon"
                      />
                    </th>
                    <th style={{ width: "10%" }}>Actions</th>
                  </tr>
                  {/* --- MODIFICATION END --- */}
                </thead>
                <tbody>
                  {sortedAndFilteredCandidates.map((candidate) => (
                    <React.Fragment key={candidate._id}>
                      <tr
                        className={
                          editingCandidateId === candidate._id
                            ? "row-being-edited"
                            : ""
                        }
                      >
                        <td>
                          <input
                            type="checkbox"
                            className="coreops-checkbox"
                            checked={selectedCandidateIds.includes(
                              candidate._id
                            )}
                            onChange={() =>
                              toggleSingleCandidateSelection(candidate._id)
                            }
                            title={`Select ${candidate.name}`}
                          />
                        </td>
                        <td className="coreops-td-name" title={candidate.name}>
                          <Link
                            to={`/candidates/${candidate._id}`}
                            className="coreops-candidate-name-link"
                          >
                            {candidate.name}
                          </Link>
                        </td>
                        {/* --- MODIFICATION: ADDED COMPANY CELL --- */}
                        <td title={candidate.currentCompany || "N/A"}>
                          {candidate.currentCompany || "N/A"}
                        </td>
                        {/* --- MODIFICATION END --- */}
                        <td>
                          <div className="coreops-status-cell">
                            <span
                              className="coreops-status-pill"
                              style={{
                                backgroundColor:
                                  stageColors[
                                    candidate.interviewStatus || "Not Started"
                                  ],
                              }}
                              title={`Status: ${candidate.interviewStatus || "Not Started"}`}
                            >
                              {candidate.interviewStatus || "Not Started"}
                            </span>
                          </div>
                        </td>
                        <td
                          className="coreops-td-score"
                          title={`Match Score: ${candidate.similarityScore || 0}`}
                        >
                          {candidate.similarityScore || 0}%
                        </td>
                        <td title={candidate.roleName || "N/A"}>
                          {candidate.roleName || "N/A"}
                        </td>
                        <td
                          title={
                            candidate.nextInterviewDate
                              ? formatDate(candidate.nextInterviewDate)
                              : "Not Set"
                          }
                        >
                          {candidate.nextInterviewDate
                            ? formatDate(candidate.nextInterviewDate)
                            : "Not Set"}
                        </td>
                        <td className="coreops-td-actions">
                          {/* Actions buttons remain unchanged */}
                          <button
                            className="coreops-button-icon"
                            onClick={() => startEditingCandidate(candidate)}
                            title="Update Status/Notes"
                          >
                            {" "}
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          {candidate.interviewNotes &&
                            candidate.interviewNotes.length > 0 && (
                              <button
                                className="coreops-button-icon"
                                onClick={() => viewCandidateNotes(candidate)}
                                title="View Interview Notes"
                              >
                                {" "}
                                <FontAwesomeIcon icon={faClipboardList} />
                              </button>
                            )}
                          <button
                            className="coreops-button-icon"
                            onClick={() => sendIndividualMail(candidate)}
                            title={`Email ${candidate.name}`}
                          >
                            {" "}
                            <FontAwesomeIcon icon={faPaperPlane} />
                          </button>
                          <button
                            className="coreops-button-icon"
                            onClick={() => sendCalendarInvite(candidate)}
                            title={`Schedule Interview with ${candidate.name}`}
                          >
                            {" "}
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </button>
                          <button
                            className="coreops-button-icon delete"
                            onClick={() => handleDeleteCandidate(candidate._id)}
                            title="Delete Candidate"
                          >
                            {" "}
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                      {editingCandidateId === candidate._id && (
                        // Edit row remains unchanged
                        <tr className="coreops-edit-row">
                          <td colSpan="8">
                            <div className="coreops-edit-form-container">
                              <h4 className="coreops-edit-form-title">
                                Update Status for {candidate.name}
                              </h4>
                              <div className="coreops-form-grid">
                                <div className="coreops-form-group">
                                  <label
                                    htmlFor={`interviewStatus-${candidate._id}`}
                                    className="coreops-form-label"
                                  >
                                    Interview Stage:
                                  </label>
                                  <select
                                    id={`interviewStatus-${candidate._id}`}
                                    name="interviewStatus"
                                    value={editFormData.interviewStatus}
                                    onChange={handleEditFormChange}
                                    className="coreops-select"
                                  >
                                    {interviewStages.map((stage) => (
                                      <option key={stage} value={stage}>
                                        {stage}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="coreops-form-group">
                                  <label
                                    htmlFor={`nextInterviewDate-${candidate._id}`}
                                    className="coreops-form-label"
                                  >
                                    Next Interview Date:
                                  </label>
                                  <input
                                    type="datetime-local"
                                    id={`nextInterviewDate-${candidate._id}`}
                                    name="nextInterviewDate"
                                    value={editFormData.nextInterviewDate}
                                    onChange={handleEditFormChange}
                                    className="coreops-input"
                                  />
                                </div>
                                <div className="coreops-form-group full-width">
                                  <label
                                    htmlFor={`interviewNote-${candidate._id}`}
                                    className="coreops-form-label"
                                  >
                                    Add Note (for this update):
                                  </label>
                                  <textarea
                                    id={`interviewNote-${candidate._id}`}
                                    name="note"
                                    value={editFormData.note}
                                    onChange={handleEditFormChange}
                                    placeholder="Enter notes about this stage or update..."
                                    className="coreops-textarea"
                                    rows="3"
                                  />
                                </div>
                              </div>
                              <div className="coreops-edit-form-actions">
                                <button
                                  className="coreops-button coreops-button-secondary"
                                  onClick={cancelEditing}
                                >
                                  {" "}
                                  <FontAwesomeIcon icon={faTimes} /> Cancel
                                </button>
                                <button
                                  className="coreops-button coreops-button-primary"
                                  onClick={() =>
                                    saveInterviewUpdate(candidate._id)
                                  }
                                >
                                  {" "}
                                  <FontAwesomeIcon icon={faSave} /> Save Update
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {showNotesModal && (
          // Notes modal remains unchanged
          <div
            className="coreops-modal-overlay"
            onClick={() => setShowNotesModal(false)}
          >
            <div
              className="coreops-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="coreops-modal-header">
                <h3 className="coreops-modal-title">
                  <FontAwesomeIcon icon={faClipboardList} /> Interview Notes for{" "}
                  {currentCandidateNameForModal}
                </h3>
                <button
                  className="coreops-modal-close-button"
                  onClick={() => setShowNotesModal(false)}
                  title="Close"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className="coreops-modal-body scrollable">
                {currentCandidateNotes.length > 0 ? (
                  currentCandidateNotes
                    .slice()
                    .reverse()
                    .map((note, index) => (
                      <div key={index} className="coreops-note-item">
                        <div className="coreops-note-header">
                          <span
                            className="coreops-note-stage"
                            style={{
                              backgroundColor:
                                stageColors[note.stage || "Not Started"],
                            }}
                          >
                            {note.stage || "General Note"}
                          </span>
                          <span className="coreops-note-date">
                            {formatDate(note.createdAt)}
                          </span>
                        </div>
                        <p className="coreops-note-text">{note.note}</p>
                      </div>
                    ))
                ) : (
                  <p className="no-notes-text">
                    No notes available for this candidate.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        <footer className="coreops-footer results-sub-footer">
          <p>© {new Date().getFullYear()} COREHire - Candidate Management</p>
        </footer>
      </div>
    </div>
  );
}

export default SavedCandidates;

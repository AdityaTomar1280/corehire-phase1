# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
// faFileAlt,
// faUserTie,
// faEnvelope,
// faStar,
// faCloudUploadAlt,
// faTrash,
// faSpinner,
// faExclamationTriangle,
// faSearch,
// faSort,
// faSortUp,
// faSortDown,
// faCalendarAlt,
// faChartBar,
// faListAlt,
// faEdit,
// faSave,
// faTimes,
// faClipboardList,
// faFilter,
// faUser,
// faPaperPlane,
// faBriefcase,
// } from "@fortawesome/free-solid-svg-icons";
// import { backend_url } from "../config";
// import "../SavedCandidates.css";

// function SavedCandidates() {
// const location = useLocation();
// const queryParams = new URLSearchParams(location.search);
// const stageFilter = queryParams.get("stage");

// const [candidates, setCandidates] = useState([]);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);
// const [searchTerm, setSearchTerm] = useState("");
// const [sortConfig, setSortConfig] = useState({
// key: "similarityScore",
// direction: "descending",
// });
// const [editingCandidate, setEditingCandidate] = useState(null);
// const [interviewStatus, setInterviewStatus] = useState("");
// const [interviewNote, setInterviewNote] = useState("");
// const [nextInterviewDate, setNextInterviewDate] = useState("");
// const [showNotesModal, setShowNotesModal] = useState(false);
// const [currentCandidateNotes, setCurrentCandidateNotes] = useState([]);
// const [currentCandidateName, setCurrentCandidateName] = useState("");
// const [showFilterOptions, setShowFilterOptions] = useState(false);
// const [statusFilter, setStatusFilter] = useState(stageFilter || "All");

// // Interview stage colors for visual representation
// const stageColors = {
// "Not Started": "#808080",
// "Resume Screening": "#a5d6a7",
// "Phone Interview": "#81c784",
// "Technical Assessment": "#66bb6a",
// "On-site Interview": "#4caf50",
// "Reference Check": "#43a047",
// "Offer Extended": "#2e7d32",
// Hired: "#1b5e20",
// Rejected: "#d32f2f",
// };

// // Available interview stages
// const interviewStages = [
// "Not Started",
// "Resume Screening",
// "Phone Interview",
// "Technical Assessment",
// "On-site Interview",
// "Reference Check",
// "Offer Extended",
// "Hired",
// "Rejected",
// ];

// useEffect(() => {
// fetchCandidates();
// }, [stageFilter]);

// useEffect(() => {
// if (stageFilter) {
// setStatusFilter(stageFilter);
// setShowFilterOptions(true);
// }
// }, [stageFilter]);

// const fetchCandidates = async () => {
// try {
// setLoading(true);
// const response = await fetch(`${backend_url}/candidates`);

// if (!response.ok) {
// throw new Error(`Failed to fetch candidates: ${response.status}`);
// }

// const data = await response.json();
// setCandidates(data);
// setError(null);
// } catch (err) {
// console.error("Error fetching candidates:", err);
// setError("Failed to load candidates. Please try again.");
// } finally {
// setLoading(false);
// }
// };

// const handleDeleteCandidate = async (candidateId) => {
// if (!window.confirm("Are you sure you want to delete this candidate?")) {
// return;
// }

// try {
// const response = await fetch(`${backend_url}/candidates/${candidateId}`, {
// method: "DELETE",
// });

// if (!response.ok) {
// throw new Error("Failed to delete candidate");
// }

// // Update the UI by removing the deleted candidate
// setCandidates(
// candidates.filter((candidate) => candidate.\_id !== candidateId)
// );
// } catch (err) {
// console.error("Error deleting candidate:", err);
// setError("Failed to delete candidate. Please try again.");
// }
// };

// const handleSort = (key) => {
// let direction = "ascending";
// if (sortConfig.key === key && sortConfig.direction === "ascending") {
// direction = "descending";
// }
// setSortConfig({ key, direction });
// };

// const startEditingCandidate = (candidate) => {
// setEditingCandidate(candidate.\_id);
// setInterviewStatus(candidate.interviewStatus || "Not Started");
// setInterviewNote("");
// setNextInterviewDate(
// candidate.nextInterviewDate
// ? new Date(candidate.nextInterviewDate).toISOString().split("T")[0]
// : ""
// );
// };

// const cancelEditing = () => {
// setEditingCandidate(null);
// setInterviewStatus("");
// setInterviewNote("");
// setNextInterviewDate("");
// };

// const saveInterviewStatus = async (candidateId) => {
// try {
// const response = await fetch(
// `${backend_url}/candidates/${candidateId}/interview-status`,
// {
// method: "PUT",
// headers: {
// "Content-Type": "application/json",
// },
// body: JSON.stringify({
// interviewStatus,
// note: interviewNote,
// nextInterviewDate: nextInterviewDate || null,
// }),
// }
// );

// if (!response.ok) {
// throw new Error("Failed to update interview status");
// }

// const updatedCandidate = await response.json();

// // Update the candidates array with the updated candidate
// setCandidates(
// candidates.map((candidate) =>
// candidate.\_id === candidateId ? updatedCandidate.candidate : candidate
// )
// );

// // Reset editing state
// cancelEditing();
// } catch (err) {
// console.error("Error updating interview status:", err);
// setError("Failed to update interview status. Please try again.");
// }
// };

// const viewCandidateNotes = (candidate) => {
// setCurrentCandidateNotes(candidate.interviewNotes || []);
// setCurrentCandidateName(candidate.name);
// setShowNotesModal(true);
// };

// // Format date for display
// const formatDate = (dateString) => {
// if (!dateString) return "Not scheduled";
// const date = new Date(dateString);
// return date.toLocaleDateString("en-US", {
// year: "numeric",
// month: "short",
// day: "numeric",
// hour: "2-digit",
// minute: "2-digit",
// });
// };

// const sortedCandidates = [...candidates].sort((a, b) => {
// if (a[sortConfig.key] < b[sortConfig.key]) {
// return sortConfig.direction === "ascending" ? -1 : 1;
// }
// if (a[sortConfig.key] > b[sortConfig.key]) {
// return sortConfig.direction === "ascending" ? 1 : -1;
// }
// return 0;
// });

// // First filter by status if selected
// const statusFilteredCandidates =
// statusFilter === "All"
// ? sortedCandidates
// : sortedCandidates.filter(
// (candidate) =>
// candidate.interviewStatus === statusFilter ||
// (!candidate.interviewStatus && statusFilter === "Not Started")
// );

// // Then apply search filter
// const filteredCandidates = statusFilteredCandidates.filter((candidate) => {
// return (
// candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
// (candidate.resumeSummary &&
// candidate.resumeSummary
// .toLowerCase()
// .includes(searchTerm.toLowerCase()))
// );
// });

// const getSortIcon = (name) => {
// if (sortConfig.key === name) {
// return sortConfig.direction === "ascending" ? faSortUp : faSortDown;
// }
// return faSort;
// };

// const sendIndividualMail = (candidate) => {
// const subject = encodeURIComponent("Resume Analysis - Individual Mail");
// const body = encodeURIComponent(
// `Hi ${candidate.name},\n\nThank you for submitting your resume.\nWe will get back to you soon.\n\nBest regards,\nTeam CoreHire`
// );
// const mailtoLink = `mailto:${candidate.email}?subject=${subject}&body=${body}`;
// window.open(mailtoLink, "\_blank");
// };

// const sendBulkMail = (candidates) => {
// const bccList = candidates.map((candidate) => candidate.email).join(",");
// const subject = encodeURIComponent("Resume Analysis - Bulk Mail");
// const body = encodeURIComponent(
// `Hi Team,\n\nThank you for submitting your resumes.\nWe will get back to you soon.\n\nBest regards,\nTeam CoreHire`
// );
// const mailtoLink = `mailto:?bcc=${bccList}&subject=${subject}&body=${body}`;
// window.open(mailtoLink, "\_blank");
// };

// const sendCalendarInvite = (candidate) => {
// const subject = `Meeting Invitation - Resume Review for ${candidate.name}`;
// const bodyHTML = `//       <div style="font-family: Arial, sans-serif; color: #333;">
//         <h2 style="color: #5e42a6;">Hi ${candidate.name},</h2>
//         <p>Please join the meeting to discuss your resume and next steps.</p>
//         <p>Looking forward to our conversation!</p>
//         <p style="margin-top: 30px;">Thanks,<br><strong>Team CoreHire</strong></p>
//       </div>
//    `;
// const outlookCalendarLink = `https://outlook.office.com/calendar/0/deeplink/compose?path=/calendar/action/compose&to=${encodeURIComponent(
//       candidate.email
//     )}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
//       bodyHTML
//     )}`;
// window.open(outlookCalendarLink, "\_blank");
// };

// return (
// <div className="candidates-container">
// <div className="candidates-header">
// <h2 className="candidates-title">
// <FontAwesomeIcon icon={faUserTie} /> Saved Candidates
// </h2>
// {/_ <div className="header-buttons">
// <Link to="/interview-tracking" className="tracking-button">
// <FontAwesomeIcon icon={faChartBar} /> Interview Tracking
// </Link>
// <Link to="/upload" className="upload-button">
// <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload New Resumes
// </Link>
// </div> _/}
// </div>

// {/_ Search & Filter _/}
// <div className="search-filter-row">
// <div className="search-container">
// <FontAwesomeIcon icon={faSearch} className="search-icon" />
// <input
// type="text"
// placeholder="Search candidates..."
// value={searchTerm}
// onChange={(e) => setSearchTerm(e.target.value)}
// className="search-input"
// />
// </div>

// <div className="filter-container">
// <button
// className={`filter-button ${
//               statusFilter !== "All" ? "active" : ""
//             }`}
// onClick={() => setShowFilterOptions(!showFilterOptions)}
// >
// <FontAwesomeIcon icon={faFilter} />
// {statusFilter !== "All" ? ` ${statusFilter}` : " Filter by Status"}
// </button>
// <div className="candidate-count">
// {filteredCandidates.length} candidates found
// </div>
// </div>
// </div>

// {/_ Filter options _/}
// <div
// className="filter-options"
// style={{ display: showFilterOptions ? "flex" : "none" }}
// >
// <div
// className={`filter-pill ${statusFilter === "All" ? "active" : ""}`}
// onClick={() => setStatusFilter("All")}
// >
// All
// </div>
// {interviewStages.map((stage) => (
// <div
// key={stage}
// className={`filter-pill ${statusFilter === stage ? "active" : ""}`}
// onClick={() => setStatusFilter(stage)}
// >
// {stage}
// </div>
// ))}
// </div>

// {loading ? (
// <div className="loading-container">
// <FontAwesomeIcon icon={faSpinner} spin className="loading-icon" />
// <p>Loading candidates...</p>
// </div>
// ) : error ? (
// <div className="error-container">
// <FontAwesomeIcon
// icon={faExclamationTriangle}
// className="error-icon"
// />
// <p>{error}</p>
// <button className="action-button" onClick={fetchCandidates}>
// Retry
// </button>
// </div>
// ) : filteredCandidates.length === 0 ? (
// <div className="empty-container">
// <FontAwesomeIcon icon={faFileAlt} className="empty-icon" />
// <p>No candidates found.</p>
// {searchTerm || statusFilter !== "All" ? (
// <button
// className="action-button"
// onClick={() => {
// setSearchTerm("");
// setStatusFilter("All");
// }}
// >
// Clear Filters
// </button>
// ) : (
// <Link to="/upload" className="upload-button">
// <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload Resumes
// </Link>
// )}
// </div>
// ) : (
// <table className="candidates-table">
// <thead>
// <tr>
// <th onClick={() => handleSort("name")}>
// <FontAwesomeIcon icon={faUserTie} />
// Name
// <FontAwesomeIcon
// icon={getSortIcon("name")}
// className="sort-icon"
// />
// </th>
// <th onClick={() => handleSort("email")}>
// <FontAwesomeIcon icon={faEnvelope} />
// Email
// <FontAwesomeIcon
// icon={getSortIcon("email")}
// className="sort-icon"
// />
// </th>
// {/_ <th onClick={() => handleSort("similarityScore")}>
// <FontAwesomeIcon icon={faStar} />
// Score
// <FontAwesomeIcon
// icon={getSortIcon("similarityScore")}
// className="sort-icon"
// />
// </th> _/}
// <th onClick={() => handleSort("interviewStatus")}>
// <FontAwesomeIcon icon={faListAlt} />
// Status
// <FontAwesomeIcon
// icon={getSortIcon("interviewStatus")}
// className="sort-icon"
// />
// </th>
// <th>
// <FontAwesomeIcon icon={faBriefcase} />
// Role
// </th>
// <th>
// <FontAwesomeIcon icon={faCalendarAlt} />
// Next Interview
// </th>
// {/_ <th>
// <FontAwesomeIcon icon={faFileAlt} />
// Summary
// </th> _/}
// <th>
// Actions{" "}
// <button
// className="action-icon"
// onClick={() => sendBulkMail(candidates)}
// title="Send Bulk Mail"
// >
// <FontAwesomeIcon icon={faEnvelope} />
// </button>
// </th>
// </tr>
// </thead>
// <tbody>
// {filteredCandidates.map((candidate) => (
// <React.Fragment key={candidate.\_id}>
// <tr>
// <td className="name">{candidate.name}</td>
// <td>{candidate.email}</td>
// <td>
// <div className="status-cell">
// <span
// className="status-pill"
// style={{
//                           backgroundColor:
//                             stageColors[
//                               candidate.interviewStatus || "Not Started"
//                             ],
//                         }}
// >
// {candidate.interviewStatus || "Not Started"}
// </span>
// </div>
// </td>
// <td>{candidate.roleName}</td>
// <td>{formatDate(candidate.nextInterviewDate)}</td>
// {/_ <td className="summary-cell">{candidate.resumeSummary}</td> _/}
// <td className="action-buttons">
// <Link
// to={`/candidates/${candidate._id}`}
// className="profile-button"
// title="View Profile"
// >
// <FontAwesomeIcon icon={faUser} />
// </Link>
// <button
// className="edit-button"
// onClick={() => startEditingCandidate(candidate)}
// title="Update Status"
// >
// <FontAwesomeIcon icon={faEdit} />
// </button>
// {candidate.interviewNotes &&
// candidate.interviewNotes.length > 0 && (
// <button
// className="notes-button"
// onClick={() => viewCandidateNotes(candidate)}
// title="View Notes"
// >
// <FontAwesomeIcon icon={faClipboardList} />
// </button>
// )}
// <button
// className="delete-button"
// onClick={() => handleDeleteCandidate(candidate.\_id)}
// title="Delete Candidate"
// >
// <FontAwesomeIcon icon={faTrash} />
// </button>
// <button
// className="action-icon"
// onClick={() => sendIndividualMail(candidate)}
// title="Send Individual Mail"
// >
// <FontAwesomeIcon icon={faPaperPlane} />
// </button>
// <button
// className="action-icon"
// onClick={() => sendCalendarInvite(candidate)}
// title="Send Calendar Invite"
// >
// <FontAwesomeIcon icon={faCalendarAlt} />
// </button>
// </td>
// </tr>
// {editingCandidate === candidate.\_id && (
// <tr>
// <td colSpan="7">
// <div className="edit-row">
// <div className="form-group">
// <label className="form-label">
// Interview Status:
// </label>
// <select
// value={interviewStatus}
// onChange={(e) => setInterviewStatus(e.target.value)}
// className="form-select"
// >
// {interviewStages.map((stage) => (
// <option key={stage} value={stage}>
// {stage}
// </option>
// ))}
// </select>
// </div>
// <div className="form-group">
// <label className="form-label">Add Note:</label>
// <textarea
// value={interviewNote}
// onChange={(e) => setInterviewNote(e.target.value)}
// placeholder="Enter notes about this interview stage..."
// className="form-textarea"
// />
// </div>
// <div className="form-group">
// <label className="form-label">
// Next Interview Date:
// </label>
// <input
// type="datetime-local"
// value={nextInterviewDate}
// onChange={(e) =>
// setNextInterviewDate(e.target.value)
// }
// className="form-input"
// />
// </div>
// <div className="button-group">
// <button
// className="cancel-button"
// onClick={cancelEditing}
// >
// <FontAwesomeIcon icon={faTimes} /> Cancel
// </button>
// <button
// className="save-button"
// onClick={() => saveInterviewStatus(candidate.\_id)}
// >
// <FontAwesomeIcon icon={faSave} /> Save
// </button>
// </div>
// </div>
// </td>
// </tr>
// )}
// </React.Fragment>
// ))}
// </tbody>
// </table>
// )}

// {/_ Notes Modal _/}
// {showNotesModal && (
// <div className="modal-overlay">
// <div className="modal-content">
// <div className="modal-header">
// <div className="modal-title">
// Notes for {currentCandidateName}
// </div>
// <button
// className="modal-close-button"
// onClick={() => setShowNotesModal(false)}
// >
// &times;
// </button>
// </div>
// <div>
// {currentCandidateNotes.length > 0 ? (
// currentCandidateNotes.map((note, index) => (
// <div key={index} className="note-item">
// <div className="note-header">
// <span className="note-stage">{note.stage}</span>
// <span className="note-date">
// {formatDate(note.createdAt)}
// </span>
// </div>
// <div>{note.note}</div>
// </div>
// ))
// ) : (
// <p>No notes available.</p>
// )}
// </div>
// </div>
// </div>
// )}
// </div>
// );
// }

// export default SavedCandidates;

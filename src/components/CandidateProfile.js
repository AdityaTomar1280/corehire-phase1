// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFileAlt,
//   faUser,
//   faEnvelope,
//   faPhone,
//   faMapMarkerAlt,
//   faStar,
//   faFile,
//   faFileDownload,
//   faGraduationCap,
//   faBriefcase,
//   faClipboardList,
//   faEdit,
//   faChevronLeft,
//   faCalendarAlt,
//   faSpinner,
//   faExclamationTriangle,
//   faTimes,
//   faSave,
//   faPlus,
//   faTrash,
//   faCloudUploadAlt,
// } from "@fortawesome/free-solid-svg-icons";
// import { backend_url } from "../config";
// import "../CandidateProfile.css";

// function CandidateProfile() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [candidate, setCandidate] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [editMode, setEditMode] = useState(false);
//   const [profileData, setProfileData] = useState({
//     phoneNumber: "",
//     location: "",
//     skills: [],
//     experience: [],
//     education: [],
//   });

//   const [skillInput, setSkillInput] = useState("");
//   const [fileUploading, setFileUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadError, setUploadError] = useState(null);

//   // Interview stages and colors (same as in SavedCandidates)
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

//   useEffect(() => {
//     fetchCandidateProfile();
//   }, [id]);

//   const fetchCandidateProfile = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${backend_url}/candidates/${id}`);

//       if (!response.ok) {
//         throw new Error(`Failed to fetch candidate: ${response.status}`);
//       }

//       const data = await response.json();
//       setCandidate(data);

//       // Initialize profile data for editing
//       setProfileData({
//         phoneNumber: data.phoneNumber || "",
//         location: data.location || "",
//         skills: data.skills || [],
//         experience: data.experience || [],
//         education: data.education || [],
//       });

//       setError(null);
//     } catch (err) {
//       console.error("Error fetching candidate profile:", err);
//       setError("Failed to load candidate profile. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleProfileUpdate = async () => {
//     try {
//       setLoading(true);

//       const response = await fetch(`${backend_url}/candidates/${id}/profile`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(profileData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update profile");
//       }

//       const data = await response.json();
//       setCandidate(data.candidate);
//       setEditMode(false);
//       setError(null);
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       setError("Failed to update profile. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("resumeFile", file);

//     try {
//       setFileUploading(true);
//       setUploadProgress(0);
//       setUploadError(null);

//       const xhr = new XMLHttpRequest();

//       // Track upload progress
//       xhr.upload.addEventListener("progress", (event) => {
//         if (event.lengthComputable) {
//           const progressPercent = Math.round(
//             (event.loaded / event.total) * 100
//           );
//           setUploadProgress(progressPercent);
//         }
//       });

//       xhr.onload = function () {
//         if (xhr.status === 200) {
//           fetchCandidateProfile(); // Refresh candidate data
//         } else {
//           setUploadError("Upload failed. Please try again.");
//         }
//         setFileUploading(false);
//       };

//       xhr.onerror = function () {
//         setUploadError("Upload failed. Please try again.");
//         setFileUploading(false);
//       };

//       xhr.open("POST", `${backend_url}/candidates/${id}/resume`);
//       xhr.send(formData);
//     } catch (err) {
//       console.error("Error uploading file:", err);
//       setUploadError("Upload failed. Please try again.");
//       setFileUploading(false);
//     }
//   };

//   const handleAddSkill = () => {
//     if (skillInput.trim() === "") return;

//     // Add skill if it doesn't already exist
//     if (!profileData.skills.includes(skillInput.trim())) {
//       setProfileData({
//         ...profileData,
//         skills: [...profileData.skills, skillInput.trim()],
//       });
//     }

//     setSkillInput("");
//   };

//   const handleRemoveSkill = (skill) => {
//     setProfileData({
//       ...profileData,
//       skills: profileData.skills.filter((s) => s !== skill),
//     });
//   };

//   const handleAddExperience = () => {
//     setProfileData({
//       ...profileData,
//       experience: [
//         ...profileData.experience,
//         { title: "", company: "", duration: "", description: "" },
//       ],
//     });
//   };

//   const handleUpdateExperience = (index, field, value) => {
//     const updatedExperience = [...profileData.experience];
//     updatedExperience[index][field] = value;

//     setProfileData({
//       ...profileData,
//       experience: updatedExperience,
//     });
//   };

//   const handleRemoveExperience = (index) => {
//     setProfileData({
//       ...profileData,
//       experience: profileData.experience.filter((_, i) => i !== index),
//     });
//   };

//   const handleAddEducation = () => {
//     setProfileData({
//       ...profileData,
//       education: [
//         ...profileData.education,
//         { degree: "", institution: "", year: "" },
//       ],
//     });
//   };

//   const handleUpdateEducation = (index, field, value) => {
//     const updatedEducation = [...profileData.education];
//     updatedEducation[index][field] = value;

//     setProfileData({
//       ...profileData,
//       education: updatedEducation,
//     });
//   };

//   const handleRemoveEducation = (index) => {
//     setProfileData({
//       ...profileData,
//       education: profileData.education.filter((_, i) => i !== index),
//     });
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

//   if (loading && !candidate) {
//     return (
//       <div className="candidate-container">
//         <div className="loading-container">
//           <FontAwesomeIcon icon={faSpinner} spin className="icon" />
//           <p>Loading candidate profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error && !candidate) {
//     return (
//       <div className="candidate-container">
//         <div className="loading-container">
//           <FontAwesomeIcon
//             icon={faExclamationTriangle}
//             className="error-icon"
//           />
//           <p>{error}</p>
//           <button
//             onClick={fetchCandidateProfile}
//             className="edit-button"
//             style={{ marginTop: "15px" }}
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!candidate) {
//     return (
//       <div className="candidate-container">
//         <div className="loading-container">
//           <p>Candidate not found.</p>
//           <Link to="/candidates" className="back-link">
//             <FontAwesomeIcon icon={faChevronLeft} /> Back to Candidates
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="candidate-container">
//       <div className="candidate-header">
//         <Link to="/candidates" className="back-link">
//           <FontAwesomeIcon icon={faChevronLeft} /> Back to Candidates
//         </Link>

//         {!editMode ? (
//           <button onClick={() => setEditMode(true)} className="edit-button">
//             <FontAwesomeIcon icon={faEdit} /> Edit Profile
//           </button>
//         ) : (
//           <div className="button-group">
//             <button
//               onClick={() => setEditMode(false)}
//               className="cancel-button"
//             >
//               <FontAwesomeIcon icon={faTimes} /> Cancel
//             </button>
//             <button onClick={handleProfileUpdate} className="save-button">
//               <FontAwesomeIcon icon={faSave} /> Save Changes
//             </button>
//           </div>
//         )}
//       </div>

//       <div className="profile-grid">
//         {/* Sidebar */}
//         <div className="sidebar">
//           <div className="profile-image">
//             <FontAwesomeIcon icon={faUser} />
//           </div>

//           <h2 className="candidate-name">{candidate.name}</h2>

//           <div
//             className="status-badge"
//             style={{
//               backgroundColor:
//                 stageColors[candidate.interviewStatus || "Not Started"],
//             }}
//           >
//             {candidate.interviewStatus || "Not Started"}
//           </div>

//           <div className="info-item">
//             <FontAwesomeIcon icon={faEnvelope} className="info-icon" />
//             <span>{candidate.email}</span>
//           </div>

//           {!editMode ? (
//             <>
//               {candidate.phoneNumber && (
//                 <div className="info-item">
//                   <FontAwesomeIcon icon={faPhone} className="info-icon" />
//                   <span>{candidate.phoneNumber}</span>
//                 </div>
//               )}

//               {candidate.location && (
//                 <div className="info-item">
//                   <FontAwesomeIcon
//                     icon={faMapMarkerAlt}
//                     className="info-icon"
//                   />
//                   <span>{candidate.location}</span>
//                 </div>
//               )}
//             </>
//           ) : (
//             <>
//               <div className="form-group">
//                 <label className="label">Phone Number</label>
//                 <input
//                   type="text"
//                   value={profileData.phoneNumber}
//                   onChange={(e) =>
//                     setProfileData({
//                       ...profileData,
//                       phoneNumber: e.target.value,
//                     })
//                   }
//                   className="text-input"
//                   placeholder="Enter phone number"
//                 />
//               </div>

//               <div className="form-group">
//                 <label className="label">Location</label>
//                 <input
//                   type="text"
//                   value={profileData.location}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, location: e.target.value })
//                   }
//                   className="text-input"
//                   placeholder="Enter location"
//                 />
//               </div>
//             </>
//           )}

//           <div className="info-item">
//             <FontAwesomeIcon icon={faStar} className="info-icon" />
//             <span>Score: {candidate.similarityScore || "N/A"}</span>
//           </div>

//           {candidate.nextInterviewDate && (
//             <div className="info-item">
//               <FontAwesomeIcon icon={faCalendarAlt} className="info-icon" />
//               <span>
//                 Next Interview: {formatDate(candidate.nextInterviewDate)}
//               </span>
//             </div>
//           )}

//           <div style={{ marginTop: "20px" }}>
//             <div className="section-title">
//               <FontAwesomeIcon icon={faFile} /> Resume
//             </div>

//             {candidate.resumeFile && candidate.resumeFile.filename ? (
//               <a
//                 href={`${backend_url}/candidates/${candidate._id}/resume`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="resume-link"
//               >
//                 <FontAwesomeIcon icon={faFileDownload} />
//                 {candidate.resumeFile.filename}
//               </a>
//             ) : (
//               <div className="no-resume">No resume uploaded yet</div>
//             )}

//             <label htmlFor="resumeUpload" className="file-upload-box">
//               <FontAwesomeIcon
//                 icon={faCloudUploadAlt}
//                 style={{ fontSize: "1.5rem", marginBottom: "10px" }}
//               />
//               <div>Click to upload resume</div>
//               <input
//                 type="file"
//                 id="resumeUpload"
//                 className="file-upload-input"
//                 onChange={handleFileUpload}
//                 accept=".pdf,.doc,.docx"
//               />
//             </label>

//             {fileUploading && (
//               <div className="progress-container">
//                 <div>Uploading... {uploadProgress}%</div>
//                 <div className="progress-bar">
//                   <div
//                     className="progress-fill"
//                     style={{ width: `${uploadProgress}%` }}
//                   />
//                 </div>
//               </div>
//             )}

//             {uploadError && <div className="upload-error">{uploadError}</div>}
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="main-content">
//           {/* Summary */}
//           <div className="profile-card">
//             <div className="section-title">
//               <FontAwesomeIcon icon={faFileAlt} /> Resume Summary
//             </div>
//             <div>{candidate.resumeSummary || "No summary available"}</div>
//           </div>

//           {/* Skills */}
//           <div className="profile-card">
//             {!editMode ? (
//               <>
//                 <div className="section-title">
//                   <FontAwesomeIcon icon={faClipboardList} /> Skills
//                 </div>
//                 {candidate.keySkills && candidate.keySkills.length > 0 ? (
//                   <div className="skills-list">
//                     {candidate.commonSkills.map((skill, index) => (
//                       <div key={index} className="skill-item">
//                         {skill}
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div>No skills listed</div>
//                 )}
//               </>
//             ) : (
//               <>
//                 <div className="section-title">
//                   <FontAwesomeIcon icon={faClipboardList} /> Skills
//                 </div>
//                 <div className="skills-list">
//                   {profileData.skills.map((skill, index) => (
//                     <div key={index} className="skill-item">
//                       {skill}
//                       <button
//                         onClick={() => handleRemoveSkill(skill)}
//                         className="remove-button"
//                       >
//                         <FontAwesomeIcon icon={faTimes} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="skill-input">
//                   <input
//                     type="text"
//                     value={skillInput}
//                     onChange={(e) => setSkillInput(e.target.value)}
//                     placeholder="Add a skill"
//                     className="input"
//                     onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
//                   />
//                   <button onClick={handleAddSkill} className="add-button">
//                     <FontAwesomeIcon icon={faPlus} /> Add
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Experience */}
//           <div className="profile-card">
//             {!editMode ? (
//               <>
//                 <div className="section-title">
//                   <FontAwesomeIcon icon={faBriefcase} /> Experience
//                 </div>
//                 {candidate.companiesWorked &&
//                 candidate.companiesWorked.length > 0 ? (
//                   <div>
//                     {candidate.companiesWorked.map((exp, index) => (
//                       <div key={index} className="experience-item">
//                         <div className="experience-header">
//                           <div className="experience-title">
//                             {exp.companyName}
//                           </div>
//                         </div>
//                         <div className="experience-company">{exp.role}</div>
//                         <div className="experience-duration">
//                           {exp.duration}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div>No experience listed</div>
//                 )}
//               </>
//             ) : (
//               <>
//                 <div className="section-title-with-button">
//                   <div className="section-title">
//                     <FontAwesomeIcon icon={faBriefcase} /> Experience
//                   </div>
//                   <button onClick={handleAddExperience} className="add-button">
//                     <FontAwesomeIcon icon={faPlus} /> Add Experience
//                   </button>
//                 </div>

//                 {profileData.experience.map((exp, index) => (
//                   <div key={index} className="experience-item">
//                     <div className="experience-header">
//                       <div>Experience #{index + 1}</div>
//                       <button
//                         onClick={() => handleRemoveExperience(index)}
//                         className="remove-button"
//                       >
//                         <FontAwesomeIcon icon={faTrash} />
//                       </button>
//                     </div>

//                     <div className="form-group-grid">
//                       <div className="form-group">
//                         <label className="label">Title</label>
//                         <input
//                           type="text"
//                           value={exp.title}
//                           onChange={(e) =>
//                             handleUpdateExperience(
//                               index,
//                               "title",
//                               e.target.value
//                             )
//                           }
//                           className="text-input"
//                           placeholder="Job Title"
//                         />
//                       </div>

//                       <div className="form-group">
//                         <label className="label">Company</label>
//                         <input
//                           type="text"
//                           value={exp.company}
//                           onChange={(e) =>
//                             handleUpdateExperience(
//                               index,
//                               "company",
//                               e.target.value
//                             )
//                           }
//                           className="text-input"
//                           placeholder="Company Name"
//                         />
//                       </div>
//                     </div>

//                     <div className="form-group">
//                       <label className="label">Duration</label>
//                       <input
//                         type="text"
//                         value={exp.duration}
//                         onChange={(e) =>
//                           handleUpdateExperience(
//                             index,
//                             "duration",
//                             e.target.value
//                           )
//                         }
//                         className="text-input"
//                         placeholder="e.g. Jan 2020 - Present"
//                       />
//                     </div>

//                     <div className="form-group">
//                       <label className="label">Description</label>
//                       <textarea
//                         value={exp.description}
//                         onChange={(e) =>
//                           handleUpdateExperience(
//                             index,
//                             "description",
//                             e.target.value
//                           )
//                         }
//                         className="textarea"
//                         placeholder="Description of responsibilities and achievements"
//                       ></textarea>
//                     </div>
//                   </div>
//                 ))}

//                 {profileData.experience.length === 0 && (
//                   <div>
//                     No experience added yet. Click 'Add Experience' to add your
//                     first entry.
//                   </div>
//                 )}
//               </>
//             )}
//           </div>

//           {/* Education */}
//           <div className="profile-card">
//             {!editMode ? (
//               <>
//                 <div className="section-title">
//                   <FontAwesomeIcon icon={faGraduationCap} /> Education
//                 </div>
//                 {candidate.education && candidate.education.length > 0 ? (
//                   <div>
//                     {candidate.education.map((edu, index) => (
//                       <div key={index} className="experience-item">
//                         <div className="experience-title">{edu.degree}</div>
//                         <div className="experience-company">
//                           {edu.institution}
//                         </div>
//                         <div className="experience-duration">{edu.year}</div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div>No education listed</div>
//                 )}
//               </>
//             ) : (
//               <>
//                 <div className="section-title-with-button">
//                   <div className="section-title">
//                     <FontAwesomeIcon icon={faGraduationCap} /> Education
//                   </div>
//                   <button onClick={handleAddEducation} className="add-button">
//                     <FontAwesomeIcon icon={faPlus} /> Add Education
//                   </button>
//                 </div>

//                 {profileData.education.map((edu, index) => (
//                   <div key={index} className="experience-item">
//                     <div className="experience-header">
//                       <div>Education #{index + 1}</div>
//                       <button
//                         onClick={() => handleRemoveEducation(index)}
//                         className="remove-button"
//                       >
//                         <FontAwesomeIcon icon={faTrash} />
//                       </button>
//                     </div>

//                     <div className="form-group">
//                       <label className="label">Degree</label>
//                       <input
//                         type="text"
//                         value={edu.degree}
//                         onChange={(e) =>
//                           handleUpdateEducation(index, "degree", e.target.value)
//                         }
//                         className="text-input"
//                         placeholder="e.g. Bachelor of Science in Computer Science"
//                       />
//                     </div>

//                     <div className="form-group">
//                       <label className="label">Institution</label>
//                       <input
//                         type="text"
//                         value={edu.institution}
//                         onChange={(e) =>
//                           handleUpdateEducation(
//                             index,
//                             "institution",
//                             e.target.value
//                           )
//                         }
//                         className="text-input"
//                         placeholder="University or College Name"
//                       />
//                     </div>

//                     <div className="form-group">
//                       <label className="label">Year</label>
//                       <input
//                         type="text"
//                         value={edu.year}
//                         onChange={(e) =>
//                           handleUpdateEducation(index, "year", e.target.value)
//                         }
//                         className="text-input"
//                         placeholder="e.g. 2015-2019 or 2020"
//                       />
//                     </div>
//                   </div>
//                 ))}

//                 {profileData.education.length === 0 && (
//                   <div>
//                     No education added yet. Click 'Add Education' to add your
//                     first entry.
//                   </div>
//                 )}
//               </>
//             )}
//           </div>

//           {/* Interview Notes */}
//           <div className="profile-card">
//             <div className="section-title">
//               <FontAwesomeIcon icon={faClipboardList} /> Interview Notes
//             </div>

//             {candidate.interviewNotes && candidate.interviewNotes.length > 0 ? (
//               <div className="notes-list">
//                 {candidate.interviewNotes.map((note, index) => (
//                   <div key={index} className="note-item">
//                     <div className="note-header">
//                       <span className="note-stage">{note.stage}</span>
//                       <span className="note-date">
//                         {formatDate(note.createdAt)}
//                       </span>
//                     </div>
//                     <div>{note.note}</div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div>No interview notes yet</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CandidateProfile;

//-----------------------------------------------------------------------------------------//

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFileAlt,
//   faUser,
//   faEnvelope,
//   faPhone,
//   faMapMarkerAlt,
//   faStar,
//   faGraduationCap,
//   faBriefcase,
//   faClipboardList,
//   faChevronLeft,
//   faSpinner,
//   faExclamationTriangle,
// } from "@fortawesome/free-solid-svg-icons";
// import { backend_url } from "../config";
// import "../CandidateProfile.css";

// const stageColors = {
//   "Not Started": "#808080",
//   "Resume Screening": "#a5d6a7",
//   "Phone Interview": "#81c784",
//   "Technical Assessment": "#66bb6a",
//   "On-site Interview": "#4caf50",
//   "Reference Check": "#43a047",
//   "Offer Extended": "#2e7d32",
//   "Hired": "#1b5e20",
//   "Rejected": "#d32f2f",
// };

// function CandidateProfile() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [candidate, setCandidate] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchCandidateProfile();
//   }, [id]);

//   const fetchCandidateProfile = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${backend_url}/candidates/${id}`);

//       if (!response.ok) {
//         throw new Error(`Failed to fetch candidate: ${response.status}`);
//       }

//       const data = await response.json();
//       setCandidate(data); // Autopopulate the profile fields with the Gemini response data
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching candidate profile:", err);
//       setError("Failed to load candidate profile. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading && !candidate) {
//     return (
//       <div className="candidate-container">
//         <div className="loading-container">
//           <FontAwesomeIcon icon={faSpinner} spin className="icon" />
//           <p>Loading candidate profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error && !candidate) {
//     return (
//       <div className="candidate-container">
//         <div className="loading-container">
//           <FontAwesomeIcon
//             icon={faExclamationTriangle}
//             className="error-icon"
//           />
//           <p>{error}</p>
//           <button
//             onClick={fetchCandidateProfile}
//             className="edit-button"
//             style={{ marginTop: "15px" }}
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!candidate) {
//     return (
//       <div className="candidate-container">
//         <div className="loading-container">
//           <p>Candidate not found.</p>
//           <Link to="/candidates" className="back-link">
//             <FontAwesomeIcon icon={faChevronLeft} /> Back to Candidates
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="candidate-container">
//       <div className="candidate-header">
//         <Link to="/candidates" className="back-link">
//           <FontAwesomeIcon icon={faChevronLeft} /> Back to Candidates
//         </Link>
//       </div>

//       <div className="profile-grid">
//         {/* Sidebar */}
//         <div className="sidebar">
//           <div className="profile-image">
//             <FontAwesomeIcon icon={faUser} />
//           </div>

//           <h2 className="candidate-name">{candidate.name}</h2>
//           <br />
//           <div className="status-cellp">
//             <span
//               className="status-pillp"
//               style={{
//                 backgroundColor:
//                   stageColors[candidate.interviewStatus || "Not Started"],
//               }}
//             >
//               {candidate.interviewStatus || "Not Started"}
//             </span>
//           </div>
//           <br />
//           <div className="info-item">
//             <FontAwesomeIcon icon={faEnvelope} className="info-icon" />
//             <span>{candidate.email}</span>
//           </div>

//           {candidate.phoneNumber && (
//             <div className="info-item">
//               <FontAwesomeIcon icon={faPhone} className="info-icon" />
//               <span>{candidate.phoneNumber}</span>
//             </div>
//           )}

//           {candidate.location && (
//             <div className="info-item">
//               <FontAwesomeIcon icon={faMapMarkerAlt} className="info-icon" />
//               <span>{candidate.location}</span>
//             </div>
//           )}

//           {/* <div className="info-item">
//             <FontAwesomeIcon icon={faStar} className="info-icon" />
//             <span>Score: {candidate.similarityScore || "N/A"}</span>
//           </div> */}
//         </div>

//         {/* Main Content */}
//         <div className="main-content">
//           {/* Summary */}
//           <div className="profile-card">
//             <div className="section-title">
//               <FontAwesomeIcon icon={faFileAlt} /> Resume Summary
//             </div>
//             <div>{candidate.resumeSummary || "No summary available"}</div>
//           </div>

//           {/* Skills */}
//           <div className="profile-card">
//             <div className="section-title">
//               <FontAwesomeIcon icon={faClipboardList} /> Skills
//             </div>
//             {candidate.keySkills && candidate.keySkills.length > 0 ? (
//               <div className="skills-list">
//                 {candidate.keySkills.map((skill, index) => (
//                   <div key={index} className="skill-item">
//                     {skill}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div>No skills listed</div>
//             )}
//           </div>

//           {/* Experience */}
//           <div className="profile-card">
//             <div className="section-title">
//               <FontAwesomeIcon icon={faBriefcase} /> Years of Experience
//             </div>
//             {candidate.companiesWorked &&
//             candidate.companiesWorked.length > 0 ? (
//               <div>{candidate.totalExperienceYears}</div>
//             ) : (
//               <div>Not Applicable</div>
//             )}
//           </div>
//           <div className="profile-card">
//             <div className="section-title">
//               <FontAwesomeIcon icon={faBriefcase} /> Experience
//             </div>
//             {candidate.companiesWorked &&
//             candidate.companiesWorked.length > 0 ? (
//               <div>
//                 {candidate.companiesWorked.map((exp, index) => (
//                   <div key={index} className="experience-item">
//                     <div className="experience-title">{exp.companyName}</div>
//                     <div className="experience-role">{exp.role}</div>
//                     <div className="experience-duration">{exp.duration}</div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div>No experience listed</div>
//             )}
//           </div>

//           {/* Education */}
//           <div className="profile-card">
//             <div className="section-title">
//               <FontAwesomeIcon icon={faGraduationCap} /> Education
//             </div>
//             {candidate.education && candidate.education.length > 0 ? (
//               <div>
//                 {candidate.education.map((edu, index) => (
//                   <div key={index} className="experience-item">
//                     <div className="experience-title">{edu.institution}</div>
//                     <div className="experience-role">{edu.degree}</div>
//                     <div className="experience-duration">{edu.year}</div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div>No education listed</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CandidateProfile;

import React, { useState, useEffect, location } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faUser,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faStar,
  faGraduationCap,
  faBriefcase,
  faClipboardList,
  faChevronLeft,
  faSpinner,
  faExclamationTriangle,
  faIdBadge, // For profile icon
  faTools, // For Skills
  faHistory, // For Experience
  faBuilding, // For Company
  faClock, // For Duration/Year
  faPercentage, // For Score
  faLightbulb,
  faCalendarAlt, // For Summary/Insights
} from "@fortawesome/free-solid-svg-icons";
import { backend_url } from "../config";
import "../CandidateProfile.css"; // This will be the new themed CSS

// Stage colors consistent with SavedCandidates
const stageColors = {
  "Not Started": "var(--coreops-status-grey, #adb5bd)",
  "Resume Screening": "var(--coreops-status-light-blue, #a9def9)",
  "Phone Interview": "var(--coreops-status-sky-blue, #72d5fd)",
  "Technical Assessment": "var(--coreops-status-teal, #2ab7ca)",
  "On-site Interview": "var(--coreops-secondary, #00A4CC)",
  "Reference Check": "var(--coreops-status-dark-blue, #0077b6)",
  "Offer Extended": "var(--coreops-status-greenish-teal, #2a9d8f)",
  Hired: "var(--coreops-success-text, #28a745)",
  Rejected: "var(--coreops-error-text, #d9534f)",
  "On Hold": "var(--coreops-status-yellow, #fdc500)",
};

function CandidateProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCandidateProfile();
  }, [id]);

  const fetchCandidateProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      // Determine if fetching from /candidates or /qualified-candidates
      // This might need a more robust way if the profile page is generic
      // const baseEndpoint = location.pathname.includes('qualified') ? 'qualified-candidates' : 'candidates';
      const baseEndpoint = "candidates";
      const response = await fetch(`${backend_url}/${baseEndpoint}/${id}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to fetch candidate: ${response.status}`
        );
      }

      const data = await response.json();
      // The backend might return candidate directly or nested like { candidate: {...} }
      const candidateData = data.candidate || data;
      setCandidate(candidateData);
    } catch (err) {
      console.error("Error fetching candidate profile:", err);
      setError(
        err.message || "Failed to load candidate profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper to safely access nested properties, especially from `analysis`
  const getAnalysisData = (key, defaultValue = "N/A") => {
    // Assuming the fetched `candidate` object might have an `analysis` sub-object
    // or the properties might be at the top level from the saved structure.
    if (
      candidate &&
      candidate.analysis &&
      candidate.analysis[key] !== undefined
    ) {
      return candidate.analysis[key];
    }
    if (candidate && candidate[key] !== undefined) {
      return candidate[key];
    }
    return defaultValue;
  };

  if (loading) {
    // Simplified loading state
    return (
      <div className="coreops-page-container candidate-profile-page">
        <div className="coreops-content-wrapper">
          <div className="coreops-message-container loading">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
            <p>Loading Candidate Profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="coreops-page-container candidate-profile-page">
        <div className="coreops-content-wrapper">
          <div className="coreops-message-container error">
            <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
            <p className="error-title">Error Loading Profile</p>
            <p>{error}</p>
            <button
              onClick={fetchCandidateProfile}
              className="coreops-button coreops-button-primary"
            >
              Try Again
            </button>
            <Link
              to={"/candidates"}
              className="coreops-button coreops-button-secondary"
              style={{ marginLeft: "10px" }}
            >
              <FontAwesomeIcon icon={faChevronLeft} /> Back to List
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="coreops-page-container candidate-profile-page">
        <div className="coreops-content-wrapper">
          <div className="coreops-message-container empty">
            <FontAwesomeIcon icon={faUser} size="4x" />
            <p className="empty-title">Candidate Not Found</p>
            <p className="empty-subtitle">
              The requested candidate profile could not be located.
            </p>
            <Link
              to={"/candidates"}
              className="coreops-button coreops-button-primary"
            >
              <FontAwesomeIcon icon={faChevronLeft} /> Back to Candidate List
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Extracting data using the helper for clarity, assuming candidate object might be flat or nested
  const candidateName = getAnalysisData("name");
  const candidateEmail = getAnalysisData("email");
  const candidatePhone = getAnalysisData("phone", null); // Default to null if not critical
  const candidateLocation = getAnalysisData("location", null);
  const similarityScore = getAnalysisData("similarityScore", 0);
  const resumeSummary = getAnalysisData(
    "resumeSummary",
    "No summary available."
  );
  const keySkills = getAnalysisData("keySkills", []);
  const totalExperienceYears = getAnalysisData("totalExperienceYears", "N/A");
  const companiesWorked = getAnalysisData("companiesWorked", []);
  const educationList = getAnalysisData("education", []);
  const interviewStatus = candidate.interviewStatus || "Not Started"; // From top-level candidate object

  return (
    <div className="coreops-page-container candidate-profile-page">
      <div className="coreops-content-wrapper">
        <div className="coreops-profile-header">
          <Link to={"/candidates"} className="coreops-back-link">
            <FontAwesomeIcon icon={faChevronLeft} /> Back to Candidate List
          </Link>
          {/* More actions could go here, e.g., Edit Profile button */}
        </div>

        <div className="coreops-profile-layout">
          {/* Sidebar */}
          <aside className="coreops-profile-sidebar">
            <div className="coreops-profile-avatar-container">
              <FontAwesomeIcon
                icon={faIdBadge}
                className="coreops-profile-avatar-icon"
              />
            </div>
            <h2 className="coreops-candidate-name">{candidateName}</h2>
            <div className="coreops-candidate-status">
              <span
                className="coreops-status-pill large"
                style={{ backgroundColor: stageColors[interviewStatus] }}
              >
                {interviewStatus}
              </span>
            </div>

            <div className="coreops-contact-info">
              <div className="coreops-info-item">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="coreops-info-icon"
                />
                <a
                  href={`mailto:${candidateEmail}`}
                  title={`Email ${candidateName}`}
                >
                  {candidateEmail}
                </a>
              </div>
              {candidatePhone && candidatePhone !== "N/A" && (
                <div className="coreops-info-item">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="coreops-info-icon"
                  />
                  <span>{candidatePhone}</span>
                </div>
              )}
              {candidateLocation && candidateLocation !== "N/A" && (
                <div className="coreops-info-item">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="coreops-info-icon"
                  />
                  <span>{candidateLocation}</span>
                </div>
              )}
            </div>

            <div className="coreops-score-card">
              <div className="score-value">{similarityScore}%</div>
              <div className="score-label">Match Score</div>
              <FontAwesomeIcon icon={faStar} className="score-icon-bg" />
            </div>
          </aside>

          {/* Main Content */}
          <main className="coreops-profile-main-content">
            <section className="coreops-profile-card">
              <h3 className="coreops-card-title">
                <FontAwesomeIcon icon={faLightbulb} /> AI Resume Summary
              </h3>
              <p className="coreops-summary-text">{resumeSummary}</p>
            </section>

            <section className="coreops-profile-card">
              <h3 className="coreops-card-title">
                <FontAwesomeIcon icon={faTools} /> Key Skills
              </h3>
              {keySkills && keySkills.length > 0 ? (
                <div className="coreops-skills-list">
                  {keySkills.map((skill, index) => (
                    <span key={index} className="coreops-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="coreops-no-data-text">No key skills extracted.</p>
              )}
            </section>

            <section className="coreops-profile-card">
              <h3 className="coreops-card-title">
                <FontAwesomeIcon icon={faHistory} /> Professional Experience
              </h3>
              <p className="coreops-experience-total">
                Total Estimated Experience:{" "}
                <strong>
                  {totalExperienceYears}{" "}
                  {totalExperienceYears === 1 ? "year" : "years"}
                </strong>
              </p>
              {companiesWorked && companiesWorked.length > 0 ? (
                <div className="coreops-experience-list">
                  {companiesWorked.map((exp, index) => (
                    <div key={index} className="coreops-experience-item">
                      <div className="coreops-item-header">
                        <FontAwesomeIcon
                          icon={faBuilding}
                          className="coreops-item-icon"
                        />
                        <span className="coreops-item-main-title">
                          {exp.companyName || "N/A"}
                        </span>
                      </div>
                      <div className="coreops-item-details">
                        <p className="coreops-item-subtitle">
                          {exp.role || "N/A"}
                        </p>
                        {exp.duration && exp.duration !== "N/A" && (
                          <p className="coreops-item-meta">
                            <FontAwesomeIcon icon={faClock} /> {exp.duration}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="coreops-no-data-text">
                  No professional experience listed or extracted.
                </p>
              )}
            </section>

            <section className="coreops-profile-card">
              <h3 className="coreops-card-title">
                <FontAwesomeIcon icon={faGraduationCap} /> Education
              </h3>
              {educationList && educationList.length > 0 ? (
                <div className="coreops-experience-list">
                  {" "}
                  {/* Re-use experience list style */}
                  {educationList.map((edu, index) => (
                    <div key={index} className="coreops-experience-item">
                      <div className="coreops-item-header">
                        <FontAwesomeIcon
                          icon={faGraduationCap}
                          className="coreops-item-icon"
                        />
                        <span className="coreops-item-main-title">
                          {edu.institution || "N/A"}
                        </span>
                      </div>
                      <div className="coreops-item-details">
                        <p className="coreops-item-subtitle">
                          {edu.degree || "N/A"}
                        </p>
                        {edu.year && edu.year !== "N/A" && (
                          <p className="coreops-item-meta">
                            <FontAwesomeIcon icon={faCalendarAlt} /> {edu.year}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="coreops-no-data-text">
                  No education details listed or extracted.
                </p>
              )}
            </section>

            {/* Placeholder for Interview Notes / History if you add that feature */}
            {/* 
            <section className="coreops-profile-card">
              <h3 className="coreops-card-title">
                <FontAwesomeIcon icon={faClipboardList} /> Interview History & Notes
              </h3>
              <p className="coreops-no-data-text">No interview notes recorded yet.</p>
            </section>
            */}
          </main>
        </div>
        <footer className="coreops-footer results-sub-footer">
          <p>
            © {new Date().getFullYear()} CoreOps.ai - Candidate Profile View
          </p>
        </footer>
      </div>
    </div>
  );
}

export default CandidateProfile;

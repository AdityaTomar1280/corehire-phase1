// import React, { useState, useRef } from "react";
// import "../FileUpload.css";
// import ClipLoader from "react-spinners/ClipLoader";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFileAlt,
//   faPaperPlane,
//   faTimes,
//   faCloudUploadAlt,
//   faFolderOpen,
// } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// import { backend_url } from "../config";

// function FileUpload({ setAnalysisResults }) {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [jobDescription, setJobDescription] = useState("");
//   const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const fileInputRef = useRef(null);
//   const folderInputRef = useRef(null);
//   const jobDescriptionFileInputRef = useRef(null);
//   const navigate = useNavigate();

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     processFiles(files);
//   };

//   const handleFolderChange = (event) => {
//     const files = Array.from(event.target.files);
//     processFiles(files);
//   };

//   const processFiles = (files) => {
//     const allowedTypes = [
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     ];
//     const validFiles = files.filter((file) => allowedTypes.includes(file.type));
//     setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
//   };

//   const handleJobDescriptionFileChange = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;
//     setJobDescriptionFile(file);
//     setJobDescription("");
//   };

//   const handleRemoveFile = (index) => {
//     setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   };

//   const handleRemoveJobDescriptionFile = () => {
//     setJobDescriptionFile(null);
//   };

//   const handleFileUpload = async () => {
//     if (!selectedFiles.length || (!jobDescription && !jobDescriptionFile)) {
//       setErrorMessage(
//         "Please upload resumes and provide a job description (text or file)."
//       );
//       return;
//     }

//     setIsLoading(true);
//     const formData = new FormData();
//     selectedFiles.forEach((file) => formData.append("resumes", file));
//     if (jobDescriptionFile) {
//       formData.append("jobDescriptionFile", jobDescriptionFile);
//     } else {
//       formData.append("jobDescription", jobDescription);
//     }

//     try {
//       const response = await fetch(`${backend_url}/upload`, {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setAnalysisResults(data);
//         navigate("/results");
//       } else {
//         setErrorMessage("Failed to upload files. Please try again.");
//       }
//     } catch (error) {
//       setErrorMessage("An error occurred during file upload.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="app-container">
//       {/* Hero Section */}
//       <div className="hero-section">
//         <h1>Discover Talent with CoreHire.AI</h1>
//         <p>Analyze resumes effortlessly and find the perfect candidate.</p>
//       </div>

//       <div className="file-upload-layout">
//         {/* Resume Upload Section */}
//         <section className="upload-section resume-section">
//           <h2>Upload Resumes</h2>
//           <div
//             className="drag-drop-area"
//             onDragOver={(e) => e.preventDefault()}
//             onDrop={(e) => {
//               e.preventDefault();
//               const files = Array.from(e.dataTransfer.files);
//               processFiles(files);
//             }}
//           >
//             <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" />
//             <p>Drag & Drop your resume files here</p>
//             <p>or</p>
//             <div>
//               <button
//                 className="browse-button"
//                 onClick={() => fileInputRef.current.click()}
//               >
//                 Browse Resumes
//               </button>
//               <button
//                 className="folder-button"
//                 onClick={() => folderInputRef.current.click()}
//               >
//                 Upload Folder{" "}
//                 <FontAwesomeIcon
//                   icon={faFolderOpen}
//                   style={{ marginLeft: "5px" }}
//                 />
//               </button>
//             </div>
//             <input
//               type="file"
//               multiple
//               accept=".pdf,.doc,.docx"
//               onChange={handleFileChange}
//               style={{ display: "none" }}
//               ref={fileInputRef}
//             />
//             <input
//               type="file"
//               webkitdirectory="true"
//               directory=""
//               multiple
//               onChange={handleFolderChange}
//               style={{ display: "none" }}
//               ref={folderInputRef}
//             />
//           </div>
//           {selectedFiles.length > 0 && (
//             <div className="selected-files-list">
//               {selectedFiles.map((file, index) => (
//                 <div className="file-item" key={index}>
//                   <FontAwesomeIcon icon={faFileAlt} className="file-icon" />
//                   <span className="file-name">{file.name}</span>
//                   <button
//                     type="button"
//                     className="remove-file-button"
//                     onClick={() => handleRemoveFile(index)}
//                   >
//                     <FontAwesomeIcon icon={faTimes} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>

//         {/* Job Description Section */}
//         <section className="upload-section job-description-section">
//           <h2>Job Description</h2>
//           {/* <textarea
//               rows="6"
//               value={jobDescription}
//               onChange={(e) => setJobDescription(e.target.value)}
//               placeholder="Enter the job description here..."
//             />
//             <p>OR</p> */}
//           <div className="drag-drop-area">
//             <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" />
//             <p>Drag & Drop your job description file here</p>
//             <p>or</p>
//             <button
//               className="job-description-upload-button"
//               onClick={() => jobDescriptionFileInputRef.current.click()}
//             >
//               Upload Job Description
//             </button>
//             <input
//               type="file"
//               accept=".pdf,.doc,.docx,.txt"
//               onChange={handleJobDescriptionFileChange}
//               style={{ display: "none" }}
//               ref={jobDescriptionFileInputRef}
//             />
//           </div>
//           {jobDescriptionFile && (
//             <div className="selected-job-description">
//               <div className="file-item">
//                 <FontAwesomeIcon icon={faFileAlt} className="file-icon" />
//                 <span className="file-name">{jobDescriptionFile.name}</span>
//                 <button
//                   type="button"
//                   className="remove-file-button"
//                   onClick={handleRemoveJobDescriptionFile}
//                 >
//                   <FontAwesomeIcon icon={faTimes} />
//                 </button>
//               </div>
//             </div>
//           )}
//         </section>
//       </div>

//       {/* Analyze Button Section */}
//       <div className="upload-analyze-section">
//         {errorMessage && <div className="error-message">{errorMessage}</div>}
//         <button
//           className={`analyze-button ${isLoading ? "loading" : ""}`}
//           onClick={handleFileUpload}
//           disabled={isLoading}
//         >
//           {isLoading ? <ClipLoader color="#fff" size={20} /> : "Analyze"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default FileUpload;

// frontend/src/components/FileUpload.js

// import React, { useState, useRef, useEffect } from "react";
// import "../FileUpload.css"; // This will be heavily updated
// import ClipLoader from "react-spinners/ClipLoader";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFileAlt,
//   faPaperPlane,
//   faTimes,
//   faCloudUploadAlt,
//   faFolderOpen,
//   faBriefcase,
//   faCogs, // For AI/Ops theme
//   faUsers, // For resumes
// } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// import { backend_url } from "../config";

// // SAP Modules Data and Experience Ranges remain the same as your previous version
// // frontend/src/components/FileUpload.js

// // ... other imports ...

// // --- START: Updated SAP Modules Data ---
// const sapModulesData = {
//   // ---- Technical Modules (Basis / Development) ----
//   "SAP ABAP (Advanced Business Application Programming)": [
//     "ABAP programming",
//     "Reports (ALV)",
//     "Forms (SmartForms, Adobe)",
//     "Enhancements & User Exits",
//     "BAPIs, BADIs",
//     "OData service development",
//     "CDS Views & AMDP",
//     "SAP Gateway",
//     "Performance tuning",
//     "Object-Oriented ABAP",
//     "Module Pool (Dialog Programming)",
//     "IDocs/ALE",
//     "RFC"
//   ],
//   "SAP BASIS": [
//     "System administration",
//     "User and authorization management",
//     "Transport Management System (TMS)",
//     "Kernel upgrades & patches",
//     "Performance monitoring (ST03, ST06, etc.)",
//     "Client copies and system refreshes",
//     "SAP HANA administration (if applicable)",
//     "System Landscape Directory (SLD)",
//     "Backup and Recovery",
//     "High Availability and Disaster Recovery (HA/DR)"
//   ],
//   "SAP BTP (Business Technology Platform) / Cloud Platform": [
//     "SAP CAP (Cloud Application Programming Model)",
//     "SAP Fiori/UI5 Development (on BTP)",
//     "Cloud Foundry runtime",
//     "Kyma runtime",
//     "Destination and connectivity services",
//     "BTP Security & Identity Authentication Service (IAS)",
//     "SAP HANA Cloud",
//     "SAP Integration Suite (Cloud Integration/CPI)",
//     "SAP Build Apps (formerly AppGyver)",
//     "SAP Build Process Automation",
//     "Event Mesh",
//     "BTP Cockpit administration"
//   ],
//   "SAP NetWeaver (Traditional On-Premise Platform Components)": [
//     "Portal development (SAP Enterprise Portal)",
//     "Web Dynpro for ABAP/Java",
//     "PI/PO (Process Integration / Orchestration)",
//     "SSO & SAML configuration",
//     "Application Server (AS ABAP, AS Java) administration",
//     "Identity Management (IDM)"
//   ],

//   // ---- Functional Modules ----
//   "SAP FI (Financial Accounting)": [
//     "General Ledger (GL) Accounting",
//     "Accounts Payable (AP)",
//     "Accounts Receivable (AR)",
//     "Asset Accounting (AA)",
//     "Bank Accounting (Electronic Bank Statement, DMEE)",
//     "Taxation configuration (Input/Output Tax)",
//     "Financial reporting (via Fiori, SAP GUI, Financial Statement Versions)",
//     "New General Ledger (New G/L)",
//     "Parallel Accounting",
//     "Month-end and Year-end closing processes",
//     "Integration with MM/SD/CO"
//   ],
//   "SAP CO (Controlling)": [
//     "Cost Center Accounting (CCA)",
//     "Profit Center Accounting (PCA)",
//     "Internal Orders",
//     "Product Costing (CO-PC) - Planned Cost, Actual Cost",
//     "Profitability Analysis (CO-PA) - Costing-based, Account-based",
//     "Material Ledger (ML)",
//     "Reporting (Report Painter, Report Writer)"
//   ],
//   "SAP MM (Materials Management)": [
//     "Procurement Processes (Purchase Requisition, Purchase Order)",
//     "Inventory Management (Goods Receipt, Goods Issue, Stock Transfers)",
//     "Vendor Master Data",
//     "Material Master Data",
//     "Source Lists & Info Records",
//     "Invoice Verification (MIRO, LIV)",
//     "Subcontracting Process",
//     "Consignment Process",
//     "Physical Inventory",
//     "Material Requirements Planning (MRP) - MM aspects"
//   ],
//   "SAP SD (Sales and Distribution)": [
//     "Order-to-Cash (OTC) process",
//     "Sales Order Management (Inquiry, Quotation, Sales Order)",
//     "Pricing procedure configuration (Condition Technique)",
//     "Delivery Processing (Outbound Delivery, Picking, Packing, PGI)",
//     "Billing Processes (Invoices, Credit/Debit Memos)",
//     "Credit Management",
//     "Customer Master Data",
//     "Availability Check (ATP)",
//     "Route Determination",
//     "Revenue Account Determination"
//   ],
//   "SAP PP (Production Planning)": [
//     "Bill of Materials (BOM)",
//     "Routing",
//     "MRP (Material Requirement Planning)",
//     "Work Center Configuration",
//     "Shop Floor Control",
//     "Production Orders / Process Orders",
//     "Demand Management",
//     "Capacity Planning",
//     "Repetitive Manufacturing",
//     "Kanban"
//   ],
//   "SAP QM (Quality Management)": [
//     "Inspection Plans",
//     "Quality Notifications",
//     "Result Recording",
//     "Usage Decision (UD)",
//     "Quality Certificates",
//     "Batch Management (QM aspects)",
//     "Stability Studies"
//   ],
//   "SAP PM (Plant Maintenance)": [
//     "Maintenance Orders (Corrective, Preventive)",
//     "Task Lists & Notifications",
//     "Preventive Maintenance plans",
//     "Equipment Management (Functional Locations, Equipment Master)",
//     "Refurbishment Process",
//     "Measurement Points and Counters"
//   ],
//   "SAP HCM / HR (Human Capital Management)": [
//     "Personnel Administration (PA)",
//     "Organizational Management (OM)",
//     "Time Management (Positive/Negative, Work Schedules, Quotas)",
//     "Payroll Configuration (Country-specific)",
//     "Employee Self-Service (ESS) / Manager Self-Service (MSS)",
//     "Recruitment (E-Recruiting)",
//     "Talent Management",
//     "Learning Solution (LSO)",
//     "Compensation Management",
//     "Benefits Administration",
//     "SuccessFactors (Employee Central, Recruiting, Onboarding, etc.)"
//   ],

//   // ---- Cloud & Digital Transformation ----
//   "SAP Fiori / SAPUI5 (Frontend Development)": [
//     "JavaScript, HTML5, CSS",
//     "XML Views",
//     "OData Integration (consuming services)",
//     "Custom Fiori app development",
//     "Fiori Elements & Smart Controls",
//     "UI Theme Designer",
//     "Fiori Launchpad configuration",
//     "SAP Business Application Studio (BAS) for UI5 dev"
//   ],
//   "SAP S/4HANA (Specifics & Transformation)": [
//     "S/4HANA Finance (Simple Finance)",
//     "S/4HANA Logistics (Simple Logistics - MM, SD, PP integration)",
//     "Embedded Analytics (CDS Views, Fiori Analytical Apps)",
//     "Universal Journal (ACDOCA)",
//     "Simplified Data Models (e.g., MATDOC)",
//     "SAP Activate methodology",
//     "S/4HANA Migration Skills (Brownfield/Greenfield/Bluefield)",
//     "Business Partner Concept (CVI Integration)",
//     "Central Finance (CFIN)"
//   ],
//   "SAP Analytics Cloud (SAC)": [
//     "Story building & visualizations",
//     "Predictive analytics features (Smart Predict, Smart Insights)",
//     "Data connectivity (Live/Import to S/4HANA, BW, etc.)",
//     "Planning Models (Financial Planning, Sales Planning)",
//     "Business Intelligence (BI) features",
//     "Digital Boardroom",
//     "Application Design (for custom analytic apps)"
//   ],

//   // ---- Integration Modules ----
//   "SAP PI/PO / SAP Integration Suite (CPI)": [
//     "iFlows development (in SAP CPI)",
//     "Message Mapping (Graphical/XSLT/Groovy)",
//     "Adapters (IDoc, SOAP, REST, RFC, JDBC, File, Mail, OData, SFTP, etc.)",
//     "Error handling & monitoring (Message Monitoring, PIMON)",
//     "Groovy scripting (for CPI custom logic)",
//     "JavaScript scripting (for CPI custom logic)",
//     "API Management (within Integration Suite)",
//     "Event Mesh (within Integration Suite)",
//     "B2B Integration (EDI, AS2, Trading Partner Management)"
//   ],

//   // ---- Warehouse & Logistics ----
//   "SAP EWM (Extended Warehouse Management)": [
//     "Warehouse Structure (Storage Types, Sections, Bins)",
//     "Inbound Processing (Putaway strategies)",
//     "Outbound Processing (Stock Removal strategies, Wave Picking)",
//     "Storage Bins, Handling Units (HU Management)",
//     "RF (Radio Frequency) Framework Integration & Customization",
//     "Physical Inventory in EWM",
//     "Cross-Docking",
//     "Slotting and Rearrangement",
//     "Yard Management (optional)"
//   ],
//   "SAP TM (Transportation Management)": [
//     "Freight Order Planning & Execution",
//     "Carrier Management & Selection",
//     "Route Optimization & Determination",
//     "Freight Settlement",
//     "Integration with EWM/MM/SD",
//     "Transportation Network configuration",
//     "Charge Calculation"
//   ],

//   // ---- Industry & Niche Modules ----
//   "SAP IS-Retail (Industry Solution for Retail)": [
//     "Assortment Management (Listing, Layouts)",
//     "Store Merchandise and Inventory Management",
//     "Article Master Data (Retail specific fields)",
//     "Promotions and Pricing (Retail specific)",
//     "POS Data Management (POSDM)",
//     "Merchandise Category Management"
//   ],
//   "SAP CRM (Customer Relationship Management - On-Premise)": [
//     "Interaction Center (IC WebClient)",
//     "Campaign Management",
//     "Opportunity Management (Sales Pipeline)",
//     "Service and Support (Service Orders, Complaints)",
//     "Lead Management",
//     "Loyalty Management",
//     "Middleware (CRM data exchange with ERP)"
//   ],
//   "SAP C4C / Sales Cloud / Service Cloud (CX Suite)": [ // Modern Cloud CRM
//     "Sales Cloud (Lead, Opportunity, Quote, Order Management)",
//     "Service Cloud (Ticketing, Case Management, Field Service)",
//     "Customer Data Platform (CDP)",
//     "Marketing Cloud (Campaigns, Email Marketing)",
//     "Integration with S/4HANA"
//   ],
//   "SAP SRM (Supplier Relationship Management - On-Premise)": [
//     "Supplier Self-Service (SUS)",
//     "Sourcing and Contract Management",
//     "Procurement Catalogs (Internal, External)",
//     "Plan-Driven Procurement (PDP)",
//     "Shopping Cart (SC) processing"
//   ],
//   "SAP Ariba (Cloud Procurement)": [
//     "Ariba Sourcing",
//     "Ariba Contracts",
//     "Ariba Buying and Invoicing (P2P)",
//     "Ariba Supplier Lifecycle and Performance (SLP)",
//     "Ariba Network integration"
//   ],
//   "SAP APO / IBP (Advanced Planning & Optimization / Integrated Business Planning)": [
//     "Demand Planning (DP in APO, Demand Sensing in IBP)",
//     "Supply Network Planning (SNP in APO, S&OP in IBP)",
//     "Response and Supply Planning (IBP)",
//     "SAP IBP Time Series & Order-based Planning",
//     "Production Planning and Detailed Scheduling (PP/DS in APO/S4)",
//     "Global Available-to-Promise (gATP in APO)"
//   ],

//   // ---- Security & Governance ----
//   "SAP GRC (Governance, Risk, Compliance)": [
//     "Access Control (AC - ARA, ARM, BRM, EAM)",
//     "Risk Management (RM)",
//     "Process Control (PC)",
//     "Audit Management (AM)",
//     "Segregation of Duties (SoD) analysis",
//     "Emergency Access Management (Firefighter)"
//   ],
//   "SAP Security (General)": [
//     "Role and Authorization design/implementation",
//     "PFCG role maintenance",
//     "SU01 User Administration",
//     "Security Audit Log (SM20, SM19)",
//     "Understanding of SoD concepts",
//     "Securing RFC connections",
//     "Data encryption and masking concepts"
//   ],

//   // ---- Other/General Skills ----
//   "General Project & Soft Skills": [
//     "Project Management (Agile, Waterfall)",
//     "Business Analysis",
//     "Requirement Gathering",
//     "Solution Design",
//     "Testing (Unit, Integration, UAT)",
//     "Documentation (Functional Specs, Technical Specs, User Manuals)",
//     "Communication Skills",
//     "Problem Solving",
//     "Client Facing Experience",
//     "Change Management"
//   ],
//   "Data Migration & Management": [
//     "LSMW (Legacy System Migration Workbench)",
//     "SAP Data Services (BODS)",
//     "Migration Cockpit (S/4HANA)",
//     "Data Archiving",
//     "Master Data Governance (MDG)"
//   ]
// };

// const experienceYearsRanges = [
//   "0-1 years", "1-3 years", "3-5 years", "5-7 years",
//   "7-10 years", "10-15 years", "15+ years"
// ];

// function FileUpload({ setAnalysisResults }) {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const [selectedModule, setSelectedModule] = useState("");
//   const [availableSkills, setAvailableSkills] = useState([]);
//   const [selectedSkills, setSelectedSkills] = useState([]);
//   const [selectedExperience, setSelectedExperience] = useState("");

//   const [generatedTextPrefix, setGeneratedTextPrefix] = useState("");
//   const [additionalUserText, setAdditionalUserText] = useState("");

//   const fileInputRef = useRef(null);
//   const folderInputRef = useRef(null);
//   const jobDescriptionFileInputRef = useRef(null);
//   const navigate = useNavigate();

//   // useEffect hooks remain the same

//   useEffect(() => {
//     if (selectedModule && sapModulesData[selectedModule]) {
//       setAvailableSkills(sapModulesData[selectedModule]);
//       setSelectedSkills([]);
//     } else {
//       setAvailableSkills([]);
//       setSelectedSkills([]);
//     }
//   }, [selectedModule]);

//   useEffect(() => {
//     let prefix = "";
//     if (selectedModule) {
//       prefix += `Role/Module: ${selectedModule}\n`;
//     }
//     if (selectedSkills.length > 0) {
//       prefix += `Required Skills: ${selectedSkills.join(", ")}\n`;
//     }
//     if (selectedExperience) {
//       prefix += `Required Experience: ${selectedExperience}\n`;
//     }
//     if (prefix) {
//       prefix += "\n--- Additional Job Details (edit or add below) ---\n";
//     } else if (selectedModule || selectedSkills.length > 0 || selectedExperience) {
//       // If helpers were touched but resulted in an empty prefix (e.g., only module selected then deselected)
//       // still add the separator to guide the user for the textarea.
//       prefix = "\n--- Additional Job Details (edit or add below) ---\n";
//     }
//     setGeneratedTextPrefix(prefix);
//   }, [selectedModule, selectedSkills, selectedExperience]);

//   // Handler functions (handleFileChange, processFiles, etc.) remain the same
//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     processFiles(files);
//   };

//   const handleFolderChange = (event) => {
//     const files = Array.from(event.target.files);
//     processFiles(files);
//   };

//   const processFiles = (files) => {
//     const allowedTypes = [
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       "text/plain"
//     ];
//     const validFiles = files.filter((file) => allowedTypes.includes(file.type));
//     const invalidFiles = files.filter((file) => !allowedTypes.includes(file.type));

//     let errorMsg = "";
//     if (invalidFiles.length > 0) {
//         errorMsg = `Unsupported resume file type(s): ${invalidFiles.map(f => f.name).join(', ')}. Allowed: PDF, DOC, DOCX, TXT`;
//     }
//     setErrorMessage(errorMsg); // Set error or clear it

//     // Only add valid files, and only if no error occurred with other files in the same batch
//     // Or, decide to add valid ones even if some are invalid. For now, let's be strict.
//     if (errorMsg === "") {
//         setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles].filter((file, index, self) =>
//             index === self.findIndex((f) => f.name === file.name && f.size === file.size)
//         )); // Avoid duplicates
//     } else {
//         // If there were invalid files, don't add any from this batch to prevent confusion
//         // Or, you could choose to add only the valid ones:
//         // setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles].filter(...));
//     }
//   };

//   const handleJobDescriptionFileChange = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;
//      const allowedJdTypes = [
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       "text/plain"
//     ];
//     if (!allowedJdTypes.includes(file.type)) {
//         setErrorMessage(`Unsupported job description file type: ${file.name}. Allowed: PDF, DOC, DOCX, TXT`);
//         if (jobDescriptionFileInputRef.current) {
//             jobDescriptionFileInputRef.current.value = "";
//         }
//         setJobDescriptionFile(null);
//         return;
//     }
//     setErrorMessage("");
//     setJobDescriptionFile(file);
//      // Clear text JD helpers if file is uploaded
//     setSelectedModule("");
//     setSelectedSkills([]);
//     setSelectedExperience("");
//     setAdditionalUserText(""); // Also clear manual text
//   };

//   const handleRemoveFile = (index) => {
//     setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   };

//   const handleRemoveJobDescriptionFile = () => {
//     setJobDescriptionFile(null);
//     if (jobDescriptionFileInputRef.current) {
//         jobDescriptionFileInputRef.current.value = "";
//     }
//   };

//   const handleModuleChange = (event) => {
//     setSelectedModule(event.target.value);
//     if (event.target.value) setJobDescriptionFile(null); // Clear file if module is selected
//   };

//   const handleSkillChange = (event) => {
//     const { value, checked } = event.target;
//     setSelectedSkills((prevSkills) =>
//       checked
//         ? [...prevSkills, value]
//         : prevSkills.filter((skill) => skill !== value)
//     );
//      if (selectedSkills.length > 0 || checked) setJobDescriptionFile(null);
//   };

//   const handleExperienceChange = (event) => {
//     setSelectedExperience(event.target.value);
//      if (event.target.value) setJobDescriptionFile(null);
//   };

//   const handleCombinedJobDescriptionChange = (event) => {
//     const fullText = event.target.value;
//     if (generatedTextPrefix && fullText.startsWith(generatedTextPrefix)) {
//       setAdditionalUserText(fullText.substring(generatedTextPrefix.length));
//     } else {
//       // If user clears the prefix, or if there was no prefix, the whole thing is additional text
//       setAdditionalUserText(fullText);
//     }
//      if (fullText.trim() !== "") setJobDescriptionFile(null); // Clear file if text is typed
//   };

//   const handleFileUpload = async () => {
//     // ... (handleFileUpload logic remains the same)
//     const completeJobDescriptionText = (generatedTextPrefix + additionalUserText).trim();
//     console.log("Attempting file upload...");

//     if (!selectedFiles.length) {
//       setErrorMessage("Please upload resumes.");
//       return;
//     }
//     if (!completeJobDescriptionText && !jobDescriptionFile) {
//       setErrorMessage(
//         "Please provide a job description (using selectors, typing directly, or uploading a file)."
//       );
//       return;
//     }

//     setErrorMessage("");
//     setIsLoading(true);
//     const formData = new FormData();
//     selectedFiles.forEach((file, index) => {
//         formData.append("resumes", file, file.name);
//     });

//     if (jobDescriptionFile) { // Prioritize file if both text and file somehow exist
//       formData.append("jobDescriptionFile", jobDescriptionFile, jobDescriptionFile.name);
//     } else if (completeJobDescriptionText) {
//       formData.append("jobDescriptionText", completeJobDescriptionText);
//     }

//     try {
//       console.log(`Sending request to: ${backend_url}/upload`);
//       const response = await fetch(`${backend_url}/upload`, {
//         method: "POST",
//         body: formData,
//       });

//       console.log("Response received. Status:", response.status);

//       if (response.ok) {
//         const data = await response.json();
//         setAnalysisResults(data);
//         navigate("/results");
//       } else {
//         let errorResponseMessage = `Failed to upload files. Status: ${response.status}.`;
//         try {
//           const errorData = await response.json();
//           if (errorData && errorData.message) {
//             errorResponseMessage = errorData.message;
//           } else {
//              const textError = await response.text();
//              errorResponseMessage = textError || errorResponseMessage;
//           }
//         } catch (jsonParseError) {
//           try {
//             const textError = await response.text();
//             errorResponseMessage = textError || `Failed to upload. Server responded with status ${response.status}.`;
//           } catch (textParseError) {
//              errorResponseMessage = `Failed to upload. Server responded with status ${response.status}, and error response was unreadable.`;
//           }
//         }
//         setErrorMessage(errorResponseMessage);
//       }
//     } catch (error) {
//       console.error("Network or other error during file upload:", error);
//       setErrorMessage(`An error occurred during file upload: ${error.message || 'Network error'}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const jobDescriptionForTextarea = generatedTextPrefix + additionalUserText;

//   return (
//     <div className="coreops-app-container"> {/* Changed class name */}
//       <header className="coreops-main-header">
//         {/* You can add a logo here if you have one */}
//         {/* <img src="/path-to-your-coreops-logo.svg" alt="CoreOps.ai Logo" className="coreops-logo" /> */}
//         <h1>COREHire Talent Analyzer</h1>
//         <p className="coreops-subtitle">Streamline Your Hiring with Intelligent Resume Analysis.</p>
//       </header>

//       <div className="coreops-file-upload-layout">
//         <section className="coreops-upload-section resume-section">
//           <h2 className="coreops-section-title">
//             <FontAwesomeIcon icon={faUsers} /> Upload Candidate Resumes
//           </h2>
//           <div
//             className="coreops-drag-drop-area"
//             onDragOver={(e) => {e.preventDefault(); e.currentTarget.classList.add('drag-over');}}
//             onDragLeave={(e) => e.currentTarget.classList.remove('drag-over')}
//             onDrop={(e) => {
//               e.preventDefault();
//               e.currentTarget.classList.remove('drag-over');
//               const files = Array.from(e.dataTransfer.files);
//               processFiles(files);
//             }}
//           >
//             <FontAwesomeIcon icon={faCloudUploadAlt} className="coreops-upload-icon" />
//             <p className="drag-drop-text">Drag & Drop Resumes Here</p>
//             <p className="drag-drop-subtext">(PDF, DOC, DOCX, TXT)</p>
//             <span className="drag-drop-or">or</span>
//             <div className="coreops-button-group">
//               <button
//                 className="coreops-button coreops-button-secondary"
//                 onClick={() => fileInputRef.current && fileInputRef.current.click()}
//               >
//                 Browse Files
//               </button>
//               <button
//                 className="coreops-button coreops-button-secondary"
//                 onClick={() => folderInputRef.current && folderInputRef.current.click()}
//               >
//                 <FontAwesomeIcon icon={faFolderOpen} /> Upload Folder
//               </button>
//             </div>
//             <input type="file" multiple accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} style={{ display: "none" }} ref={fileInputRef} />
//             <input type="file" webkitdirectory="true" directory="" multiple onChange={handleFolderChange} style={{ display: "none" }} ref={folderInputRef} />
//           </div>
//           {selectedFiles.length > 0 && (
//             <div className="coreops-selected-files-list">
//               <h4>Selected Resumes:</h4>
//               {selectedFiles.map((file, index) => (
//                 <div className="coreops-file-item" key={index + '-' + file.name}>
//                   <FontAwesomeIcon icon={faFileAlt} className="coreops-file-icon" />
//                   <span className="coreops-file-name" title={file.name}>{file.name}</span>
//                   <button
//                     type="button"
//                     className="coreops-remove-file-button"
//                     onClick={() => handleRemoveFile(index)}
//                     title="Remove file"
//                   >
//                     <FontAwesomeIcon icon={faTimes} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>

//         <section className="coreops-upload-section job-description-section">
//           <h2 className="coreops-section-title">
//             <FontAwesomeIcon icon={faBriefcase} /> Provide Job Description
//           </h2>

//           <div className="coreops-jd-input-method-toggle">
//             {/* Optional: If you want tabs to switch between structured and file upload later */}
//           </div>

//           <div className="coreops-structured-jd-helpers">
//             <h4 className="coreops-subsection-title">Define with SAP Specifics:</h4>
//             <div className="coreops-jd-input-group">
//               <label htmlFor="module-select">Target SAP Module:</label>
//               <select id="module-select" value={selectedModule} onChange={handleModuleChange} className="coreops-select">
//                 <option value="">-- Select Module --</option>
//                 {Object.keys(sapModulesData).map((moduleName) => (
//                   <option key={moduleName} value={moduleName}>
//                     {moduleName}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {selectedModule && availableSkills.length > 0 && (
//               <div className="coreops-jd-input-group">
//                 <label>Key Skills for {selectedModule}:</label>
//                 <div className="coreops-skills-checkbox-group">
//                   {availableSkills.map((skill) => (
//                     <div key={skill} className="coreops-skill-checkbox-item">
//                       <input
//                         type="checkbox"
//                         id={`skill-${skill.replace(/\s+/g, '-')}`}
//                         value={skill}
//                         checked={selectedSkills.includes(skill)}
//                         onChange={handleSkillChange}
//                       />
//                       <label htmlFor={`skill-${skill.replace(/\s+/g, '-')}`}>{skill}</label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <div className="coreops-jd-input-group">
//               <label htmlFor="experience-select">Required Experience Level:</label>
//               <select id="experience-select" value={selectedExperience} onChange={handleExperienceChange} className="coreops-select">
//                 <option value="">-- Select Experience --</option>
//                 {experienceYearsRanges.map((range) => (
//                   <option key={range} value={range}>
//                     {range}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="coreops-jd-main-textbox-section">
//             <h4 className="coreops-subsection-title">Or Enter/Paste Full Job Description:</h4>
//             <textarea
//               rows="8"
//               value={jobDescriptionForTextarea}
//               onChange={handleCombinedJobDescriptionChange}
//               placeholder="Selected module, skills, and experience will appear here. You can also directly paste or write the full job description..."
//               className="coreops-textarea"
//             />
//           </div>

//           <div className="coreops-jd-separator">
//             <span>OR UPLOAD JD FILE</span>
//           </div>

//           <div className="coreops-jd-file-upload-area">
//              <div
//                 className="coreops-drag-drop-area coreops-drag-drop-area-small"
//                 onDragOver={(e) => {e.preventDefault(); e.currentTarget.classList.add('drag-over');}}
//                 onDragLeave={(e) => e.currentTarget.classList.remove('drag-over')}
//                 onDrop={(e) => {
//                     e.preventDefault();
//                     e.currentTarget.classList.remove('drag-over');
//                     if (e.dataTransfer.files.length > 0) {
//                         const file = e.dataTransfer.files[0];
//                         // Basic type check before passing to handler
//                         const allowedJdTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
//                         if (allowedJdTypes.includes(file.type)) {
//                             const mockEvent = { target: { files: [file] } };
//                             handleJobDescriptionFileChange(mockEvent);
//                         } else {
//                             setErrorMessage(`Unsupported JD file type: ${file.name}. Allowed: PDF, DOC, DOCX, TXT`);
//                         }
//                     }
//                 }}
//             >
//                 <FontAwesomeIcon icon={faCloudUploadAlt} className="coreops-upload-icon small" />
//                 <p className="drag-drop-text small">Drag & Drop JD File</p>
//                 <p className="drag-drop-subtext small">(PDF, DOC, DOCX, TXT)</p>
//                 <button
//                     className="coreops-button coreops-button-secondary coreops-button-small"
//                     onClick={() => jobDescriptionFileInputRef.current && jobDescriptionFileInputRef.current.click()}
//                 >
//                     Browse JD File
//                 </button>
//                 <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleJobDescriptionFileChange} style={{ display: "none" }} ref={jobDescriptionFileInputRef}/>
//             </div>
//             {jobDescriptionFile && (
//                 <div className="coreops-selected-files-list single-file">
//                     <h4>Selected JD File:</h4>
//                     <div className="coreops-file-item">
//                         <FontAwesomeIcon icon={faFileAlt} className="coreops-file-icon" />
//                         <span className="coreops-file-name" title={jobDescriptionFile.name}>{jobDescriptionFile.name}</span>
//                         <button
//                         type="button"
//                         className="coreops-remove-file-button"
//                         onClick={handleRemoveJobDescriptionFile}
//                         title="Remove JD file"
//                         >
//                         <FontAwesomeIcon icon={faTimes} />
//                         </button>
//                     </div>
//                 </div>
//             )}
//           </div>
//         </section>
//       </div>

//       <div className="coreops-upload-analyze-section">
//         {errorMessage && <div className="coreops-error-message">{errorMessage}</div>}
//         <button
//           className={`coreops-button coreops-button-primary analyze-button ${isLoading ? "loading" : ""}`}
//           onClick={handleFileUpload}
//           disabled={isLoading || !selectedFiles.length || (!jobDescriptionForTextarea.replace(generatedTextPrefix, '').trim() && !jobDescriptionFile && !generatedTextPrefix.includes('Role/Module:'))}
//           title={!selectedFiles.length ? "Please upload resumes first" : ((!jobDescriptionForTextarea.replace(generatedTextPrefix, '').trim() && !jobDescriptionFile && !generatedTextPrefix.includes('Role/Module:')) ? "Please provide a job description" : "Analyze Resumes")}

//         >
//           {isLoading ? (
//             <>
//               <ClipLoader color="var(--coreops-light-text)" size={20} />
//               <span>Analyzing...</span>
//             </>
//           ) : (
//             <>
//               <FontAwesomeIcon icon={faCogs} /> Analyze Resumes
//             </>
//           )}
//         </button>
//       </div>
//       <footer className="coreops-footer">
//         <p>© {new Date().getFullYear()} CoreOps.ai - Intelligent Hiring Solutions</p>
//       </footer>
//     </div>
//   );
// }

// export default FileUpload;

// import React, { useState, useRef, useEffect } from "react";
// import "../FileUpload.css";
// import ClipLoader from "react-spinners/ClipLoader";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFileAlt,
//   faPaperPlane,
//   faTimes,
//   faCloudUploadAlt,
//   faFolderOpen,
//   faBriefcase,
//   faCogs,
//   faUsers,
// } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// import { backend_url } from "../config";

// const sapModulesData = {
//   // ---- Technical Modules (Basis / Development) ----
//   "SAP ABAP (Advanced Business Application Programming)": [
//     "ABAP programming",
//     "Reports (ALV)",
//     "Forms (SmartForms, Adobe)",
//     "Enhancements & User Exits",
//     "BAPIs, BADIs",
//     "OData service development",
//     "CDS Views & AMDP",
//     "SAP Gateway",
//     "Performance tuning",
//     "Object-Oriented ABAP",
//     "Module Pool (Dialog Programming)",
//     "IDocs/ALE",
//     "RFC",
//   ],
//   "SAP BASIS": [
//     "System administration",
//     "User and authorization management",
//     "Transport Management System (TMS)",
//     "Kernel upgrades & patches",
//     "Performance monitoring (ST03, ST06, etc.)",
//     "Client copies and system refreshes",
//     "SAP HANA administration (if applicable)",
//     "System Landscape Directory (SLD)",
//     "Backup and Recovery",
//     "High Availability and Disaster Recovery (HA/DR)",
//   ],
//   "SAP BTP (Business Technology Platform) / Cloud Platform": [
//     "SAP CAP (Cloud Application Programming Model)",
//     "SAP Fiori/UI5 Development (on BTP)",
//     "Cloud Foundry runtime",
//     "Kyma runtime",
//     "Destination and connectivity services",
//     "BTP Security & Identity Authentication Service (IAS)",
//     "SAP HANA Cloud",
//     "SAP Integration Suite (Cloud Integration/CPI)",
//     "SAP Build Apps (formerly AppGyver)",
//     "SAP Build Process Automation",
//     "Event Mesh",
//     "BTP Cockpit administration",
//   ],
//   "SAP NetWeaver (Traditional On-Premise Platform Components)": [
//     "Portal development (SAP Enterprise Portal)",
//     "Web Dynpro for ABAP/Java",
//     "PI/PO (Process Integration / Orchestration)",
//     "SSO & SAML configuration",
//     "Application Server (AS ABAP, AS Java) administration",
//     "Identity Management (IDM)",
//   ],

//   // ---- Functional Modules ----
//   "SAP FI (Financial Accounting)": [
//     "General Ledger (GL) Accounting",
//     "Accounts Payable (AP)",
//     "Accounts Receivable (AR)",
//     "Asset Accounting (AA)",
//     "Bank Accounting (Electronic Bank Statement, DMEE)",
//     "Taxation configuration (Input/Output Tax)",
//     "Financial reporting (via Fiori, SAP GUI, Financial Statement Versions)",
//     "New General Ledger (New G/L)",
//     "Parallel Accounting",
//     "Month-end and Year-end closing processes",
//     "Integration with MM/SD/CO",
//   ],
//   "SAP CO (Controlling)": [
//     "Cost Center Accounting (CCA)",
//     "Profit Center Accounting (PCA)",
//     "Internal Orders",
//     "Product Costing (CO-PC) - Planned Cost, Actual Cost",
//     "Profitability Analysis (CO-PA) - Costing-based, Account-based",
//     "Material Ledger (ML)",
//     "Reporting (Report Painter, Report Writer)",
//   ],
//   "SAP MM (Materials Management)": [
//     "Procurement Processes (Purchase Requisition, Purchase Order)",
//     "Inventory Management (Goods Receipt, Goods Issue, Stock Transfers)",
//     "Vendor Master Data",
//     "Material Master Data",
//     "Source Lists & Info Records",
//     "Invoice Verification (MIRO, LIV)",
//     "Subcontracting Process",
//     "Consignment Process",
//     "Physical Inventory",
//     "Material Requirements Planning (MRP) - MM aspects",
//   ],
//   "SAP SD (Sales and Distribution)": [
//     "Order-to-Cash (OTC) process",
//     "Sales Order Management (Inquiry, Quotation, Sales Order)",
//     "Pricing procedure configuration (Condition Technique)",
//     "Delivery Processing (Outbound Delivery, Picking, Packing, PGI)",
//     "Billing Processes (Invoices, Credit/Debit Memos)",
//     "Credit Management",
//     "Customer Master Data",
//     "Availability Check (ATP)",
//     "Route Determination",
//     "Revenue Account Determination",
//   ],
//   "SAP PP (Production Planning)": [
//     "Bill of Materials (BOM)",
//     "Routing",
//     "MRP (Material Requirement Planning)",
//     "Work Center Configuration",
//     "Shop Floor Control",
//     "Production Orders / Process Orders",
//     "Demand Management",
//     "Capacity Planning",
//     "Repetitive Manufacturing",
//     "Kanban",
//   ],
//   "SAP QM (Quality Management)": [
//     "Inspection Plans",
//     "Quality Notifications",
//     "Result Recording",
//     "Usage Decision (UD)",
//     "Quality Certificates",
//     "Batch Management (QM aspects)",
//     "Stability Studies",
//   ],
//   "SAP PM (Plant Maintenance)": [
//     "Maintenance Orders (Corrective, Preventive)",
//     "Task Lists & Notifications",
//     "Preventive Maintenance plans",
//     "Equipment Management (Functional Locations, Equipment Master)",
//     "Refurbishment Process",
//     "Measurement Points and Counters",
//   ],
//   "SAP HCM / HR (Human Capital Management)": [
//     "Personnel Administration (PA)",
//     "Organizational Management (OM)",
//     "Time Management (Positive/Negative, Work Schedules, Quotas)",
//     "Payroll Configuration (Country-specific)",
//     "Employee Self-Service (ESS) / Manager Self-Service (MSS)",
//     "Recruitment (E-Recruiting)",
//     "Talent Management",
//     "Learning Solution (LSO)",
//     "Compensation Management",
//     "Benefits Administration",
//     "SuccessFactors (Employee Central, Recruiting, Onboarding, etc.)",
//   ],

//   // ---- Cloud & Digital Transformation ----
//   "SAP Fiori / SAPUI5 (Frontend Development)": [
//     "JavaScript, HTML5, CSS",
//     "XML Views",
//     "OData Integration (consuming services)",
//     "Custom Fiori app development",
//     "Fiori Elements & Smart Controls",
//     "UI Theme Designer",
//     "Fiori Launchpad configuration",
//     "SAP Business Application Studio (BAS) for UI5 dev",
//   ],
//   "SAP S/4HANA (Specifics & Transformation)": [
//     "S/4HANA Finance (Simple Finance)",
//     "S/4HANA Logistics (Simple Logistics - MM, SD, PP integration)",
//     "Embedded Analytics (CDS Views, Fiori Analytical Apps)",
//     "Universal Journal (ACDOCA)",
//     "Simplified Data Models (e.g., MATDOC)",
//     "SAP Activate methodology",
//     "S/4HANA Migration Skills (Brownfield/Greenfield/Bluefield)",
//     "Business Partner Concept (CVI Integration)",
//     "Central Finance (CFIN)",
//   ],
//   "SAP Analytics Cloud (SAC)": [
//     "Story building & visualizations",
//     "Predictive analytics features (Smart Predict, Smart Insights)",
//     "Data connectivity (Live/Import to S/4HANA, BW, etc.)",
//     "Planning Models (Financial Planning, Sales Planning)",
//     "Business Intelligence (BI) features",
//     "Digital Boardroom",
//     "Application Design (for custom analytic apps)",
//   ],

//   // ---- Integration Modules ----
//   "SAP PI/PO / SAP Integration Suite (CPI)": [
//     "iFlows development (in SAP CPI)",
//     "Message Mapping (Graphical/XSLT/Groovy)",
//     "Adapters (IDoc, SOAP, REST, RFC, JDBC, File, Mail, OData, SFTP, etc.)",
//     "Error handling & monitoring (Message Monitoring, PIMON)",
//     "Groovy scripting (for CPI custom logic)",
//     "JavaScript scripting (for CPI custom logic)",
//     "API Management (within Integration Suite)",
//     "Event Mesh (within Integration Suite)",
//     "B2B Integration (EDI, AS2, Trading Partner Management)",
//   ],

//   // ---- Warehouse & Logistics ----
//   "SAP EWM (Extended Warehouse Management)": [
//     "Warehouse Structure (Storage Types, Sections, Bins)",
//     "Inbound Processing (Putaway strategies)",
//     "Outbound Processing (Stock Removal strategies, Wave Picking)",
//     "Storage Bins, Handling Units (HU Management)",
//     "RF (Radio Frequency) Framework Integration & Customization",
//     "Physical Inventory in EWM",
//     "Cross-Docking",
//     "Slotting and Rearrangement",
//     "Yard Management (optional)",
//   ],
//   "SAP TM (Transportation Management)": [
//     "Freight Order Planning & Execution",
//     "Carrier Management & Selection",
//     "Route Optimization & Determination",
//     "Freight Settlement",
//     "Integration with EWM/MM/SD",
//     "Transportation Network configuration",
//     "Charge Calculation",
//   ],

//   // ---- Industry & Niche Modules ----
//   "SAP IS-Retail (Industry Solution for Retail)": [
//     "Assortment Management (Listing, Layouts)",
//     "Store Merchandise and Inventory Management",
//     "Article Master Data (Retail specific fields)",
//     "Promotions and Pricing (Retail specific)",
//     "POS Data Management (POSDM)",
//     "Merchandise Category Management",
//   ],
//   "SAP CRM (Customer Relationship Management - On-Premise)": [
//     "Interaction Center (IC WebClient)",
//     "Campaign Management",
//     "Opportunity Management (Sales Pipeline)",
//     "Service and Support (Service Orders, Complaints)",
//     "Lead Management",
//     "Loyalty Management",
//     "Middleware (CRM data exchange with ERP)",
//   ],
//   "SAP C4C / Sales Cloud / Service Cloud (CX Suite)": [
//     // Modern Cloud CRM
//     "Sales Cloud (Lead, Opportunity, Quote, Order Management)",
//     "Service Cloud (Ticketing, Case Management, Field Service)",
//     "Customer Data Platform (CDP)",
//     "Marketing Cloud (Campaigns, Email Marketing)",
//     "Integration with S/4HANA",
//   ],
//   "SAP SRM (Supplier Relationship Management - On-Premise)": [
//     "Supplier Self-Service (SUS)",
//     "Sourcing and Contract Management",
//     "Procurement Catalogs (Internal, External)",
//     "Plan-Driven Procurement (PDP)",
//     "Shopping Cart (SC) processing",
//   ],
//   "SAP Ariba (Cloud Procurement)": [
//     "Ariba Sourcing",
//     "Ariba Contracts",
//     "Ariba Buying and Invoicing (P2P)",
//     "Ariba Supplier Lifecycle and Performance (SLP)",
//     "Ariba Network integration",
//   ],
//   "SAP APO / IBP (Advanced Planning & Optimization / Integrated Business Planning)":
//     [
//       "Demand Planning (DP in APO, Demand Sensing in IBP)",
//       "Supply Network Planning (SNP in APO, S&OP in IBP)",
//       "Response and Supply Planning (IBP)",
//       "SAP IBP Time Series & Order-based Planning",
//       "Production Planning and Detailed Scheduling (PP/DS in APO/S4)",
//       "Global Available-to-Promise (gATP in APO)",
//     ],

//   // ---- Security & Governance ----
//   "SAP GRC (Governance, Risk, Compliance)": [
//     "Access Control (AC - ARA, ARM, BRM, EAM)",
//     "Risk Management (RM)",
//     "Process Control (PC)",
//     "Audit Management (AM)",
//     "Segregation of Duties (SoD) analysis",
//     "Emergency Access Management (Firefighter)",
//   ],
//   "SAP Security (General)": [
//     "Role and Authorization design/implementation",
//     "PFCG role maintenance",
//     "SU01 User Administration",
//     "Security Audit Log (SM20, SM19)",
//     "Understanding of SoD concepts",
//     "Securing RFC connections",
//     "Data encryption and masking concepts",
//   ],

//   // ---- Other/General Skills ----
//   "General Project & Soft Skills": [
//     "Project Management (Agile, Waterfall)",
//     "Business Analysis",
//     "Requirement Gathering",
//     "Solution Design",
//     "Testing (Unit, Integration, UAT)",
//     "Documentation (Functional Specs, Technical Specs, User Manuals)",
//     "Communication Skills",
//     "Problem Solving",
//     "Client Facing Experience",
//     "Change Management",
//   ],
//   "Data Migration & Management": [
//     "LSMW (Legacy System Migration Workbench)",
//     "SAP Data Services (BODS)",
//     "Migration Cockpit (S/4HANA)",
//     "Data Archiving",
//     "Master Data Governance (MDG)",
//   ],
// };

// const experienceYearsRanges = [
//   "0-1 years",
//   "1-3 years",
//   "3-5 years",
//   "5-7 years",
//   "7-10 years",
//   "10-15 years",
//   "15+ years",
// ];

// function FileUpload({ setAnalysisResults }) {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const [selectedModule, setSelectedModule] = useState("");
//   const [availableSkills, setAvailableSkills] = useState([]);
//   const [selectedSkills, setSelectedSkills] = useState([]);
//   const [selectedExperience, setSelectedExperience] = useState("");

//   const [generatedTextPrefix, setGeneratedTextPrefix] = useState("");
//   const [additionalUserText, setAdditionalUserText] = useState("");

//   const fileInputRef = useRef(null);
//   const folderInputRef = useRef(null);
//   const jobDescriptionFileInputRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (selectedModule && sapModulesData[selectedModule]) {
//       setAvailableSkills(sapModulesData[selectedModule]);
//       setSelectedSkills([]);
//     } else {
//       setAvailableSkills([]);
//       setSelectedSkills([]);
//     }
//   }, [selectedModule]);

//   useEffect(() => {
//     let prefix = "";
//     if (selectedModule) {
//       prefix += `Role/Module: ${selectedModule}\n`;
//     }
//     if (selectedSkills.length > 0) {
//       prefix += `Required Skills: ${selectedSkills.join(", ")}\n`;
//     }
//     if (selectedExperience) {
//       prefix += `Required Experience: ${selectedExperience}\n`;
//     }
//     if (prefix) {
//       prefix += "\n--- Additional Job Details (edit or add below) ---\n";
//     } else if (
//       selectedModule ||
//       selectedSkills.length > 0 ||
//       selectedExperience
//     ) {
//       prefix = "\n--- Additional Job Details (edit or add below) ---\n";
//     }
//     setGeneratedTextPrefix(prefix);
//   }, [selectedModule, selectedSkills, selectedExperience]);

//   const processFiles = (files) => {
//     const allowedTypes = [
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       "text/plain",
//     ];
//     const validFiles = files.filter((file) => allowedTypes.includes(file.type));
//     const invalidFiles = files.filter(
//       (file) => !allowedTypes.includes(file.type)
//     );

//     let errorMsg = "";
//     if (invalidFiles.length > 0) {
//       errorMsg = `Unsupported resume file type(s): ${invalidFiles.map((f) => f.name).join(", ")}. Allowed: PDF, DOC, DOCX, TXT`;
//     }
//     setErrorMessage(errorMsg);

//     if (errorMsg === "") {
//       // Filter out duplicates based on name and size before adding
//       const newUniqueFiles = validFiles.filter(
//         (vf) =>
//           !selectedFiles.some(
//             (sf) => sf.name === vf.name && sf.size === vf.size
//           )
//       );
//       setSelectedFiles((prevFiles) => [...prevFiles, ...newUniqueFiles]);
//     }
//   };

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     processFiles(files);
//     event.target.value = null; // Reset file input to allow selecting the same file again
//   };

//   const handleFolderChange = (event) => {
//     const files = Array.from(event.target.files);
//     processFiles(files);
//     event.target.value = null; // Reset file input
//   };

//   const handleJobDescriptionFileChange = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;
//     const allowedJdTypes = [
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       "text/plain",
//     ];
//     if (!allowedJdTypes.includes(file.type)) {
//       setErrorMessage(
//         `Unsupported job description file type: ${file.name}. Allowed: PDF, DOC, DOCX, TXT`
//       );
//       if (jobDescriptionFileInputRef.current) {
//         jobDescriptionFileInputRef.current.value = "";
//       }
//       setJobDescriptionFile(null);
//       return;
//     }
//     setErrorMessage("");
//     setJobDescriptionFile(file);
//     setSelectedModule("");
//     setSelectedSkills([]);
//     setSelectedExperience("");
//     setAdditionalUserText("");
//     event.target.value = null; // Reset file input
//   };

//   const handleRemoveFile = (index) => {
//     setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   };

//   const handleRemoveJobDescriptionFile = () => {
//     setJobDescriptionFile(null);
//     if (jobDescriptionFileInputRef.current) {
//       jobDescriptionFileInputRef.current.value = "";
//     }
//   };

//   const handleModuleChange = (event) => {
//     setSelectedModule(event.target.value);
//     if (event.target.value) {
//       setJobDescriptionFile(null);
//       if (jobDescriptionFileInputRef.current)
//         jobDescriptionFileInputRef.current.value = "";
//     }
//   };

//   const handleSkillChange = (event) => {
//     const { value, checked } = event.target;
//     const newSkills = checked
//       ? [...selectedSkills, value]
//       : selectedSkills.filter((skill) => skill !== value);
//     setSelectedSkills(newSkills);
//     if (newSkills.length > 0 || checked) {
//       // if any skill is selected or a new one is checked
//       setJobDescriptionFile(null);
//       if (jobDescriptionFileInputRef.current)
//         jobDescriptionFileInputRef.current.value = "";
//     }
//   };

//   const handleExperienceChange = (event) => {
//     setSelectedExperience(event.target.value);
//     if (event.target.value) {
//       setJobDescriptionFile(null);
//       if (jobDescriptionFileInputRef.current)
//         jobDescriptionFileInputRef.current.value = "";
//     }
//   };

//   const handleCombinedJobDescriptionChange = (event) => {
//     const fullText = event.target.value;
//     if (generatedTextPrefix && fullText.startsWith(generatedTextPrefix)) {
//       setAdditionalUserText(fullText.substring(generatedTextPrefix.length));
//     } else {
//       setAdditionalUserText(fullText);
//     }
//     if (fullText.trim() !== "") {
//       setJobDescriptionFile(null);
//       if (jobDescriptionFileInputRef.current)
//         jobDescriptionFileInputRef.current.value = "";
//     }
//   };

//   const handleFileUpload = async () => {
//     const completeJobDescriptionText = (
//       generatedTextPrefix + additionalUserText
//     ).trim();

//     if (!selectedFiles.length) {
//       setErrorMessage("Please upload resumes.");
//       return;
//     }
//     // Check if jobDescription has content beyond the auto-generated prefix, or if a file is selected,
//     // or if the prefix itself contains meaningful selections (like Role/Module)
//     const isJdProvided =
//       jobDescriptionForTextarea.replace(generatedTextPrefix, "").trim() !==
//         "" ||
//       jobDescriptionFile ||
//       generatedTextPrefix.includes("Role/Module:") ||
//       generatedTextPrefix.includes("Required Skills:") ||
//       generatedTextPrefix.includes("Required Experience:");

//     if (!isJdProvided) {
//       setErrorMessage(
//         "Please provide a job description (using selectors, typing directly, or uploading a file)."
//       );
//       return;
//     }

//     setErrorMessage("");
//     setIsLoading(true);
//     const formData = new FormData();
//     selectedFiles.forEach((file) => {
//       // Removed index as it's not used by backend
//       formData.append("resumes", file, file.name);
//     });

//     if (jobDescriptionFile) {
//       formData.append(
//         "jobDescriptionFile",
//         jobDescriptionFile,
//         jobDescriptionFile.name
//       );
//     } else if (completeJobDescriptionText) {
//       // Check if it has content
//       formData.append("jobDescriptionText", completeJobDescriptionText);
//     }

//     try {
//       const response = await fetch(`${backend_url}/upload`, {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setAnalysisResults(data);
//         navigate("/results");
//       } else {
//         let errorResponseMessage = `Failed to upload files. Status: ${response.status}.`;
//         try {
//           const errorData = await response.json();
//           errorResponseMessage = errorData.message || errorResponseMessage;
//         } catch (jsonParseError) {
//           try {
//             const textError = await response.text();
//             errorResponseMessage = textError || errorResponseMessage;
//           } catch (textParseError) {
//             /* Do nothing more */
//           }
//         }
//         setErrorMessage(errorResponseMessage);
//       }
//     } catch (error) {
//       setErrorMessage(`An error occurred: ${error.message || "Network error"}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const jobDescriptionForTextarea = generatedTextPrefix + additionalUserText;
//   const isAnalyzeButtonDisabled =
//     isLoading ||
//     !selectedFiles.length ||
//     (!jobDescriptionForTextarea.replace(generatedTextPrefix, "").trim() &&
//       !jobDescriptionFile &&
//       !generatedTextPrefix.includes("Role/Module:") &&
//       !generatedTextPrefix.includes("Required Skills:") &&
//       !generatedTextPrefix.includes("Required Experience:"));

//   return (
//     <div className="coreops-app-container">
//       <header className="coreops-main-header">
//         <h1>COREHire Talent Analyzer</h1> {/* Updated Name */}
//         <p className="coreops-subtitle">
//           Streamline Your Hiring with Intelligent Resume Analysis.
//         </p>
//       </header>
//       <main className="coreops-main-content">
//         {" "}
//         {/* Added main wrapper */}
//         <div className="coreops-file-upload-layout compact-layout">
//           <section className="coreops-upload-section resume-section">
//             <h2 className="coreops-section-title">
//               <FontAwesomeIcon icon={faUsers} /> Upload Candidate Resumes
//             </h2>
//             <div
//               className="coreops-drag-drop-area"
//               onDragOver={(e) => {
//                 e.preventDefault();
//                 e.currentTarget.classList.add("drag-over");
//               }}
//               onDragLeave={(e) => e.currentTarget.classList.remove("drag-over")}
//               onDrop={(e) => {
//                 e.preventDefault();
//                 e.currentTarget.classList.remove("drag-over");
//                 const files = Array.from(e.dataTransfer.files);
//                 processFiles(files);
//               }}
//             >
//               <FontAwesomeIcon
//                 icon={faCloudUploadAlt}
//                 className="coreops-upload-icon"
//               />
//               <p className="drag-drop-text">Drag & Drop Resumes Here</p>
//               <p className="drag-drop-subtext">(PDF, DOC, DOCX, TXT)</p>
//               <span className="drag-drop-or">or</span>
//               <div className="coreops-button-group">
//                 <button
//                   className="coreops-button coreops-button-secondary"
//                   onClick={() =>
//                     fileInputRef.current && fileInputRef.current.click()
//                   }
//                 >
//                   Browse Files
//                 </button>
//                 <button
//                   className="coreops-button coreops-button-secondary"
//                   onClick={() =>
//                     folderInputRef.current && folderInputRef.current.click()
//                   }
//                 >
//                   <FontAwesomeIcon icon={faFolderOpen} /> Upload Folder
//                 </button>
//               </div>
//               <input
//                 type="file"
//                 multiple
//                 accept=".pdf,.doc,.docx,.txt"
//                 onChange={handleFileChange}
//                 style={{ display: "none" }}
//                 ref={fileInputRef}
//               />
//               <input
//                 type="file"
//                 webkitdirectory="true"
//                 directory=""
//                 multiple
//                 onChange={handleFolderChange}
//                 style={{ display: "none" }}
//                 ref={folderInputRef}
//               />
//             </div>

//             {/* SCROLLABLE RESUME LIST */}
//             {selectedFiles.length > 0 && (
//               <div className="coreops-selected-files-container">
//                 <h4 className="coreops-selected-files-title">
//                   Selected Resumes ({selectedFiles.length}):
//                 </h4>
//                 <div className="coreops-selected-files-list scrollable">
//                   {" "}
//                   {/* Added scrollable class */}
//                   {selectedFiles.map((file, index) => (
//                     <div
//                       className="coreops-file-item"
//                       key={index + "-" + file.name + "-" + file.size}
//                     >
//                       {" "}
//                       {/* More unique key */}
//                       <FontAwesomeIcon
//                         icon={faFileAlt}
//                         className="coreops-file-icon"
//                       />
//                       <span className="coreops-file-name" title={file.name}>
//                         {file.name}
//                       </span>
//                       <button
//                         type="button"
//                         className="coreops-remove-file-button"
//                         onClick={() => handleRemoveFile(index)}
//                         title="Remove file"
//                       >
//                         <FontAwesomeIcon icon={faTimes} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </section>

//           <section className="coreops-upload-section job-description-section">
//             <h2 className="coreops-section-title">
//               <FontAwesomeIcon icon={faBriefcase} /> Provide Job Description
//             </h2>

//             <div className="coreops-structured-jd-helpers">
//               <h4 className="coreops-subsection-title">
//                 Define with SAP Specifics:
//               </h4>
//               <div className="coreops-jd-input-group">
//                 <label htmlFor="module-select">Target SAP Module:</label>
//                 <select
//                   id="module-select"
//                   value={selectedModule}
//                   onChange={handleModuleChange}
//                   className="coreops-select"
//                 >
//                   <option value="">-- Select Module --</option>
//                   {Object.keys(sapModulesData).map((moduleName) => (
//                     <option key={moduleName} value={moduleName}>
//                       {moduleName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {selectedModule && availableSkills.length > 0 && (
//                 <div className="coreops-jd-input-group">
//                   <label>Key Skills for {selectedModule}:</label>
//                   <div className="coreops-skills-checkbox-group scrollable">
//                     {" "}
//                     {/* Potentially make skills scrollable too */}
//                     {availableSkills.map((skill) => (
//                       <div key={skill} className="coreops-skill-checkbox-item">
//                         <input
//                           type="checkbox"
//                           id={`skill-${skill.replace(/\s+/g, "-")}`}
//                           value={skill}
//                           checked={selectedSkills.includes(skill)}
//                           onChange={handleSkillChange}
//                         />
//                         <label htmlFor={`skill-${skill.replace(/\s+/g, "-")}`}>
//                           {skill}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <div className="coreops-jd-input-group">
//                 <label htmlFor="experience-select">
//                   Required Experience Level:
//                 </label>
//                 <select
//                   id="experience-select"
//                   value={selectedExperience}
//                   onChange={handleExperienceChange}
//                   className="coreops-select"
//                 >
//                   <option value="">-- Select Experience --</option>
//                   {experienceYearsRanges.map((range) => (
//                     <option key={range} value={range}>
//                       {range}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="coreops-jd-main-textbox-section">
//               <h4 className="coreops-subsection-title">
//                 Or Enter/Paste Full Job Description:
//               </h4>
//               <textarea
//                 rows="6" // Reduced rows for conciseness
//                 value={jobDescriptionForTextarea}
//                 onChange={handleCombinedJobDescriptionChange}
//                 placeholder="Selected module, skills, and experience will appear here. You can also directly paste or write the full job description..."
//                 className="coreops-textarea"
//               />
//             </div>

//             <div className="coreops-jd-separator">
//               <span>OR UPLOAD JD FILE</span>
//             </div>

//             <div className="coreops-jd-file-upload-area">
//               <div
//                 className="coreops-drag-drop-area coreops-drag-drop-area-small"
//                 onDragOver={(e) => {
//                   e.preventDefault();
//                   e.currentTarget.classList.add("drag-over");
//                 }}
//                 onDragLeave={(e) =>
//                   e.currentTarget.classList.remove("drag-over")
//                 }
//                 onDrop={(e) => {
//                   e.preventDefault();
//                   e.currentTarget.classList.remove("drag-over");
//                   if (e.dataTransfer.files.length > 0) {
//                     const file = e.dataTransfer.files[0];
//                     const allowedJdTypes = [
//                       "application/pdf",
//                       "application/msword",
//                       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//                       "text/plain",
//                     ];
//                     if (allowedJdTypes.includes(file.type)) {
//                       const mockEvent = { target: { files: [file] } };
//                       handleJobDescriptionFileChange(mockEvent);
//                     } else {
//                       setErrorMessage(
//                         `Unsupported JD file type: ${file.name}. Allowed: PDF, DOC, DOCX, TXT`
//                       );
//                     }
//                   }
//                 }}
//               >
//                 <FontAwesomeIcon
//                   icon={faCloudUploadAlt}
//                   className="coreops-upload-icon small"
//                 />
//                 <p className="drag-drop-text small">Drag & Drop JD File</p>
//                 <p className="drag-drop-subtext small">(PDF, DOC, DOCX, TXT)</p>
//                 <button
//                   className="coreops-button coreops-button-secondary coreops-button-small"
//                   onClick={() =>
//                     jobDescriptionFileInputRef.current &&
//                     jobDescriptionFileInputRef.current.click()
//                   }
//                 >
//                   Browse JD File
//                 </button>
//                 <input
//                   type="file"
//                   accept=".pdf,.doc,.docx,.txt"
//                   onChange={handleJobDescriptionFileChange}
//                   style={{ display: "none" }}
//                   ref={jobDescriptionFileInputRef}
//                 />
//               </div>
//               {jobDescriptionFile && (
//                 <div className="coreops-selected-files-list single-file">
//                   <h4 className="coreops-selected-files-title">
//                     Selected JD File:
//                   </h4>{" "}
//                   {/* Consistent title class */}
//                   <div className="coreops-file-item">
//                     <FontAwesomeIcon
//                       icon={faFileAlt}
//                       className="coreops-file-icon"
//                     />
//                     <span
//                       className="coreops-file-name"
//                       title={jobDescriptionFile.name}
//                     >
//                       {jobDescriptionFile.name}
//                     </span>
//                     <button
//                       type="button"
//                       className="coreops-remove-file-button"
//                       onClick={handleRemoveJobDescriptionFile}
//                       title="Remove JD file"
//                     >
//                       <FontAwesomeIcon icon={faTimes} />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </section>
//         </div>
//       </main>{" "}
//       {/* End main wrapper */}
//       <div className="coreops-upload-analyze-section">
//         {errorMessage && (
//           <div className="coreops-error-message">{errorMessage}</div>
//         )}
//         <button
//           className={`coreops-button coreops-button-primary analyze-button ${isLoading ? "loading" : ""}`}
//           onClick={handleFileUpload}
//           disabled={isAnalyzeButtonDisabled}
//           title={
//             isAnalyzeButtonDisabled
//               ? !selectedFiles.length
//                 ? "Please upload resumes first"
//                 : "Please provide a job description"
//               : "Analyze Resumes"
//           }
//         >
//           {isLoading ? (
//             <>
//               <ClipLoader color="var(--coreops-light-text)" size={18} />{" "}
//               {/* Slightly smaller spinner */}
//               <span>Analyzing...</span>
//             </>
//           ) : (
//             <>
//               <FontAwesomeIcon icon={faCogs} /> Analyze Resumes
//             </>
//           )}
//         </button>
//       </div>
//       <footer className="coreops-footer">
//         <p>
//           © {new Date().getFullYear()} COREHire - Intelligent Hiring Solutions
//         </p>
//       </footer>
//     </div>
//   );
// }

// export default FileUpload;

// import React, { useState, useRef, useEffect } from "react";
// import "../FileUpload.css"; // Make sure this path is correct
// import ClipLoader from "react-spinners/ClipLoader";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFileAlt,
//   faPaperPlane,
//   faTimes,
//   faCloudUploadAlt,
//   faFolderOpen,
//   faBriefcase,
//   faCogs,
//   faUsers,
// } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// import { backend_url } from "../config"; // Make sure this path is correct

// const sapModulesData = {
//   // ---- Technical Modules (Basis / Development) ----
//   "SAP ABAP (Advanced Business Application Programming)": [
//     "ABAP programming",
//     "Reports (ALV)",
//     "Forms (SmartForms, Adobe)",
//     "Enhancements & User Exits",
//     "BAPIs, BADIs",
//     "OData service development",
//     "CDS Views & AMDP",
//     "SAP Gateway",
//     "Performance tuning",
//     "Object-Oriented ABAP",
//     "Module Pool (Dialog Programming)",
//     "IDocs/ALE",
//     "RFC",
//   ],
//   "SAP BASIS": [
//     "System administration",
//     "User and authorization management",
//     "Transport Management System (TMS)",
//     "Kernel upgrades & patches",
//     "Performance monitoring (ST03, ST06, etc.)",
//     "Client copies and system refreshes",
//     "SAP HANA administration (if applicable)",
//     "System Landscape Directory (SLD)",
//     "Backup and Recovery",
//     "High Availability and Disaster Recovery (HA/DR)",
//   ],
//   "SAP BTP (Business Technology Platform) / Cloud Platform": [
//     "SAP CAP (Cloud Application Programming Model)",
//     "SAP Fiori/UI5 Development (on BTP)",
//     "Cloud Foundry runtime",
//     "Kyma runtime",
//     "Destination and connectivity services",
//     "BTP Security & Identity Authentication Service (IAS)",
//     "SAP HANA Cloud",
//     "SAP Integration Suite (Cloud Integration/CPI)",
//     "SAP Build Apps (formerly AppGyver)",
//     "SAP Build Process Automation",
//     "Event Mesh",
//     "BTP Cockpit administration",
//   ],
//   "SAP NetWeaver (Traditional On-Premise Platform Components)": [
//     "Portal development (SAP Enterprise Portal)",
//     "Web Dynpro for ABAP/Java",
//     "PI/PO (Process Integration / Orchestration)",
//     "SSO & SAML configuration",
//     "Application Server (AS ABAP, AS Java) administration",
//     "Identity Management (IDM)",
//   ],

//   // ---- Functional Modules ----
//   "SAP FI (Financial Accounting)": [
//     "General Ledger (GL) Accounting",
//     "Accounts Payable (AP)",
//     "Accounts Receivable (AR)",
//     "Asset Accounting (AA)",
//     "Bank Accounting (Electronic Bank Statement, DMEE)",
//     "Taxation configuration (Input/Output Tax)",
//     "Financial reporting (via Fiori, SAP GUI, Financial Statement Versions)",
//     "New General Ledger (New G/L)",
//     "Parallel Accounting",
//     "Month-end and Year-end closing processes",
//     "Integration with MM/SD/CO",
//   ],
//   "SAP CO (Controlling)": [
//     "Cost Center Accounting (CCA)",
//     "Profit Center Accounting (PCA)",
//     "Internal Orders",
//     "Product Costing (CO-PC) - Planned Cost, Actual Cost",
//     "Profitability Analysis (CO-PA) - Costing-based, Account-based",
//     "Material Ledger (ML)",
//     "Reporting (Report Painter, Report Writer)",
//   ],
//   "SAP MM (Materials Management)": [
//     "Procurement Processes (Purchase Requisition, Purchase Order)",
//     "Inventory Management (Goods Receipt, Goods Issue, Stock Transfers)",
//     "Vendor Master Data",
//     "Material Master Data",
//     "Source Lists & Info Records",
//     "Invoice Verification (MIRO, LIV)",
//     "Subcontracting Process",
//     "Consignment Process",
//     "Physical Inventory",
//     "Material Requirements Planning (MRP) - MM aspects",
//   ],
//   "SAP SD (Sales and Distribution)": [
//     "Order-to-Cash (OTC) process",
//     "Sales Order Management (Inquiry, Quotation, Sales Order)",
//     "Pricing procedure configuration (Condition Technique)",
//     "Delivery Processing (Outbound Delivery, Picking, Packing, PGI)",
//     "Billing Processes (Invoices, Credit/Debit Memos)",
//     "Credit Management",
//     "Customer Master Data",
//     "Availability Check (ATP)",
//     "Route Determination",
//     "Revenue Account Determination",
//   ],
//   "SAP PP (Production Planning)": [
//     "Bill of Materials (BOM)",
//     "Routing",
//     "MRP (Material Requirement Planning)",
//     "Work Center Configuration",
//     "Shop Floor Control",
//     "Production Orders / Process Orders",
//     "Demand Management",
//     "Capacity Planning",
//     "Repetitive Manufacturing",
//     "Kanban",
//   ],
//   "SAP QM (Quality Management)": [
//     "Inspection Plans",
//     "Quality Notifications",
//     "Result Recording",
//     "Usage Decision (UD)",
//     "Quality Certificates",
//     "Batch Management (QM aspects)",
//     "Stability Studies",
//   ],
//   "SAP PM (Plant Maintenance)": [
//     "Maintenance Orders (Corrective, Preventive)",
//     "Task Lists & Notifications",
//     "Preventive Maintenance plans",
//     "Equipment Management (Functional Locations, Equipment Master)",
//     "Refurbishment Process",
//     "Measurement Points and Counters",
//   ],
//   "SAP HCM / HR (Human Capital Management)": [
//     "Personnel Administration (PA)",
//     "Organizational Management (OM)",
//     "Time Management (Positive/Negative, Work Schedules, Quotas)",
//     "Payroll Configuration (Country-specific)",
//     "Employee Self-Service (ESS) / Manager Self-Service (MSS)",
//     "Recruitment (E-Recruiting)",
//     "Talent Management",
//     "Learning Solution (LSO)",
//     "Compensation Management",
//     "Benefits Administration",
//     "SuccessFactors (Employee Central, Recruiting, Onboarding, etc.)",
//   ],

//   // ---- Cloud & Digital Transformation ----
//   "SAP Fiori / SAPUI5 (Frontend Development)": [
//     "JavaScript, HTML5, CSS",
//     "XML Views",
//     "OData Integration (consuming services)",
//     "Custom Fiori app development",
//     "Fiori Elements & Smart Controls",
//     "UI Theme Designer",
//     "Fiori Launchpad configuration",
//     "SAP Business Application Studio (BAS) for UI5 dev",
//   ],
//   "SAP S/4HANA (Specifics & Transformation)": [
//     "S/4HANA Finance (Simple Finance)",
//     "S/4HANA Logistics (Simple Logistics - MM, SD, PP integration)",
//     "Embedded Analytics (CDS Views, Fiori Analytical Apps)",
//     "Universal Journal (ACDOCA)",
//     "Simplified Data Models (e.g., MATDOC)",
//     "SAP Activate methodology",
//     "S/4HANA Migration Skills (Brownfield/Greenfield/Bluefield)",
//     "Business Partner Concept (CVI Integration)",
//     "Central Finance (CFIN)",
//   ],
//   "SAP Analytics Cloud (SAC)": [
//     "Story building & visualizations",
//     "Predictive analytics features (Smart Predict, Smart Insights)",
//     "Data connectivity (Live/Import to S/4HANA, BW, etc.)",
//     "Planning Models (Financial Planning, Sales Planning)",
//     "Business Intelligence (BI) features",
//     "Digital Boardroom",
//     "Application Design (for custom analytic apps)",
//   ],

//   // ---- Integration Modules ----
//   "SAP PI/PO / SAP Integration Suite (CPI)": [
//     "iFlows development (in SAP CPI)",
//     "Message Mapping (Graphical/XSLT/Groovy)",
//     "Adapters (IDoc, SOAP, REST, RFC, JDBC, File, Mail, OData, SFTP, etc.)",
//     "Error handling & monitoring (Message Monitoring, PIMON)",
//     "Groovy scripting (for CPI custom logic)",
//     "JavaScript scripting (for CPI custom logic)",
//     "API Management (within Integration Suite)",
//     "Event Mesh (within Integration Suite)",
//     "B2B Integration (EDI, AS2, Trading Partner Management)",
//   ],

//   // ---- Warehouse & Logistics ----
//   "SAP EWM (Extended Warehouse Management)": [
//     "Warehouse Structure (Storage Types, Sections, Bins)",
//     "Inbound Processing (Putaway strategies)",
//     "Outbound Processing (Stock Removal strategies, Wave Picking)",
//     "Storage Bins, Handling Units (HU Management)",
//     "RF (Radio Frequency) Framework Integration & Customization",
//     "Physical Inventory in EWM",
//     "Cross-Docking",
//     "Slotting and Rearrangement",
//     "Yard Management (optional)",
//   ],
//   "SAP TM (Transportation Management)": [
//     "Freight Order Planning & Execution",
//     "Carrier Management & Selection",
//     "Route Optimization & Determination",
//     "Freight Settlement",
//     "Integration with EWM/MM/SD",
//     "Transportation Network configuration",
//     "Charge Calculation",
//   ],

//   // ---- Industry & Niche Modules ----
//   "SAP IS-Retail (Industry Solution for Retail)": [
//     "Assortment Management (Listing, Layouts)",
//     "Store Merchandise and Inventory Management",
//     "Article Master Data (Retail specific fields)",
//     "Promotions and Pricing (Retail specific)",
//     "POS Data Management (POSDM)",
//     "Merchandise Category Management",
//   ],
//   "SAP CRM (Customer Relationship Management - On-Premise)": [
//     "Interaction Center (IC WebClient)",
//     "Campaign Management",
//     "Opportunity Management (Sales Pipeline)",
//     "Service and Support (Service Orders, Complaints)",
//     "Lead Management",
//     "Loyalty Management",
//     "Middleware (CRM data exchange with ERP)",
//   ],
//   "SAP C4C / Sales Cloud / Service Cloud (CX Suite)": [
//     // Modern Cloud CRM
//     "Sales Cloud (Lead, Opportunity, Quote, Order Management)",
//     "Service Cloud (Ticketing, Case Management, Field Service)",
//     "Customer Data Platform (CDP)",
//     "Marketing Cloud (Campaigns, Email Marketing)",
//     "Integration with S/4HANA",
//   ],
//   "SAP SRM (Supplier Relationship Management - On-Premise)": [
//     "Supplier Self-Service (SUS)",
//     "Sourcing and Contract Management",
//     "Procurement Catalogs (Internal, External)",
//     "Plan-Driven Procurement (PDP)",
//     "Shopping Cart (SC) processing",
//   ],
//   "SAP Ariba (Cloud Procurement)": [
//     "Ariba Sourcing",
//     "Ariba Contracts",
//     "Ariba Buying and Invoicing (P2P)",
//     "Ariba Supplier Lifecycle and Performance (SLP)",
//     "Ariba Network integration",
//   ],
//   "SAP APO / IBP (Advanced Planning & Optimization / Integrated Business Planning)":
//     [
//       "Demand Planning (DP in APO, Demand Sensing in IBP)",
//       "Supply Network Planning (SNP in APO, S&OP in IBP)",
//       "Response and Supply Planning (IBP)",
//       "SAP IBP Time Series & Order-based Planning",
//       "Production Planning and Detailed Scheduling (PP/DS in APO/S4)",
//       "Global Available-to-Promise (gATP in APO)",
//     ],

//   // ---- Security & Governance ----
//   "SAP GRC (Governance, Risk, Compliance)": [
//     "Access Control (AC - ARA, ARM, BRM, EAM)",
//     "Risk Management (RM)",
//     "Process Control (PC)",
//     "Audit Management (AM)",
//     "Segregation of Duties (SoD) analysis",
//     "Emergency Access Management (Firefighter)",
//   ],
//   "SAP Security (General)": [
//     "Role and Authorization design/implementation",
//     "PFCG role maintenance",
//     "SU01 User Administration",
//     "Security Audit Log (SM20, SM19)",
//     "Understanding of SoD concepts",
//     "Securing RFC connections",
//     "Data encryption and masking concepts",
//   ],

//   // ---- Other/General Skills ----
//   "General Project & Soft Skills": [
//     "Project Management (Agile, Waterfall)",
//     "Business Analysis",
//     "Requirement Gathering",
//     "Solution Design",
//     "Testing (Unit, Integration, UAT)",
//     "Documentation (Functional Specs, Technical Specs, User Manuals)",
//     "Communication Skills",
//     "Problem Solving",
//     "Client Facing Experience",
//     "Change Management",
//   ],
//   "Data Migration & Management": [
//     "LSMW (Legacy System Migration Workbench)",
//     "SAP Data Services (BODS)",
//     "Migration Cockpit (S/4HANA)",
//     "Data Archiving",
//     "Master Data Governance (MDG)",
//   ],
// };

// const experienceYearsRanges = [
//   "0-1 years",
//   "1-3 years",
//   "3-5 years",
//   "5-7 years",
//   "7-10 years",
//   "10-15 years",
//   "15+ years",
// ];

// function FileUpload({ setAnalysisResults }) {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [jobDescriptionFile, setJobDescriptionFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const [selectedModule, setSelectedModule] = useState("");
//   const [selectedSkills, setSelectedSkills] = useState([]); // Will be auto-populated
//   const [selectedExperience, setSelectedExperience] = useState("");

//   const [generatedTextPrefix, setGeneratedTextPrefix] = useState("");
//   const [additionalUserText, setAdditionalUserText] = useState("");

//   const fileInputRef = useRef(null);
//   const folderInputRef = useRef(null);
//   const jobDescriptionFileInputRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (selectedModule && sapModulesData[selectedModule]) {
//       const skillsForModule = sapModulesData[selectedModule] || [];
//       setSelectedSkills(skillsForModule); // Auto-populate all skills for the module
//     } else {
//       setSelectedSkills([]);
//     }
//   }, [selectedModule]);

//   useEffect(() => {
//     let prefix = "";
//     if (selectedModule) {
//       prefix += `Role/Module: ${selectedModule}\n`;
//     }
//     if (selectedSkills.length > 0) {
//       prefix += `Required Skills: ${selectedSkills.join(", ")}\n`;
//     }
//     if (selectedExperience) {
//       prefix += `Required Experience: ${selectedExperience}\n`;
//     }
//     if (prefix) {
//       prefix += "\n--- Additional Job Details (edit or add below) ---\n";
//     } else if (
//       selectedModule ||
//       selectedSkills.length > 0 ||
//       selectedExperience
//     ) {
//       prefix = "\n--- Additional Job Details (edit or add below) ---\n";
//     }
//     setGeneratedTextPrefix(prefix);
//   }, [selectedModule, selectedSkills, selectedExperience]);

//   const processFiles = (files) => {
//     const allowedTypes = [
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       "text/plain",
//     ];
//     const validFiles = files.filter((file) => allowedTypes.includes(file.type));
//     const invalidFiles = files.filter(
//       (file) => !allowedTypes.includes(file.type)
//     );

//     let errorMsg = "";
//     if (invalidFiles.length > 0) {
//       errorMsg = `Unsupported resume file type(s): ${invalidFiles.map((f) => f.name).join(", ")}. Allowed: PDF, DOC, DOCX, TXT`;
//     }
//     setErrorMessage(errorMsg);

//     if (errorMsg === "") {
//       const newUniqueFiles = validFiles.filter(
//         (vf) =>
//           !selectedFiles.some(
//             (sf) => sf.name === vf.name && sf.size === vf.size
//           )
//       );
//       setSelectedFiles((prevFiles) => [...prevFiles, ...newUniqueFiles]);
//     }
//   };

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     processFiles(files);
//     event.target.value = null;
//   };

//   const handleFolderChange = (event) => {
//     const files = Array.from(event.target.files);
//     processFiles(files);
//     event.target.value = null;
//   };

//   const handleJobDescriptionFileChange = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;
//     const allowedJdTypes = [
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       "text/plain",
//     ];
//     if (!allowedJdTypes.includes(file.type)) {
//       setErrorMessage(
//         `Unsupported job description file type: ${file.name}. Allowed: PDF, DOC, DOCX, TXT`
//       );
//       if (jobDescriptionFileInputRef.current) {
//         jobDescriptionFileInputRef.current.value = "";
//       }
//       setJobDescriptionFile(null);
//       return;
//     }
//     setErrorMessage("");
//     setJobDescriptionFile(file);
//     // Clear structured inputs if a JD file is uploaded
//     setSelectedModule("");
//     setSelectedSkills([]);
//     setSelectedExperience("");
//     setAdditionalUserText("");
//     event.target.value = null;
//   };

//   const handleRemoveFile = (index) => {
//     setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   };

//   const handleRemoveJobDescriptionFile = () => {
//     setJobDescriptionFile(null);
//     if (jobDescriptionFileInputRef.current) {
//       jobDescriptionFileInputRef.current.value = "";
//     }
//   };

//   const handleModuleChange = (event) => {
//     const newModule = event.target.value;
//     setSelectedModule(newModule);
//     if (newModule) {
//       // If a module is selected (even if it's an empty string initially if they re-select default)
//       setJobDescriptionFile(null); // Clear JD file if module is changed
//       if (jobDescriptionFileInputRef.current)
//         jobDescriptionFileInputRef.current.value = "";
//     }
//   };

//   const handleExperienceChange = (event) => {
//     setSelectedExperience(event.target.value);
//     if (event.target.value) {
//       setJobDescriptionFile(null);
//       if (jobDescriptionFileInputRef.current)
//         jobDescriptionFileInputRef.current.value = "";
//     }
//   };

//   const handleCombinedJobDescriptionChange = (event) => {
//     const fullText = event.target.value;
//     if (generatedTextPrefix && fullText.startsWith(generatedTextPrefix)) {
//       setAdditionalUserText(fullText.substring(generatedTextPrefix.length));
//     } else {
//       // If user deletes the prefix, or types something completely new
//       setAdditionalUserText(fullText);
//       // If they type directly, clear the structured inputs as text takes precedence
//       setSelectedModule("");
//       setSelectedSkills([]);
//       setSelectedExperience("");
//     }

//     if (fullText.trim() !== "") {
//       setJobDescriptionFile(null); // Clear JD file if text is typed
//       if (jobDescriptionFileInputRef.current)
//         jobDescriptionFileInputRef.current.value = "";
//     }
//   };

//   const handleFileUpload = async () => {
//     const completeJobDescriptionText = (
//       generatedTextPrefix + additionalUserText
//     ).trim();

//     if (!selectedFiles.length) {
//       setErrorMessage("Please upload resumes.");
//       return;
//     }

//     const isJdProvided =
//       completeJobDescriptionText.replace(generatedTextPrefix, "").trim() !==
//         "" || // User added text beyond prefix
//       jobDescriptionFile || // JD file is present
//       (selectedModule && sapModulesData[selectedModule]?.length > 0) || // Module with skills is selected
//       selectedExperience; // Experience is selected

//     if (!isJdProvided && !completeJobDescriptionText.includes("Role/Module:")) {
//       // The last condition ensures if only module (without skills) is chosen, it counts
//       setErrorMessage(
//         "Please provide a job description (using selectors, typing directly, or uploading a file)."
//       );
//       return;
//     }

//     setErrorMessage("");
//     setIsLoading(true);
//     const formData = new FormData();
//     selectedFiles.forEach((file) => {
//       formData.append("resumes", file, file.name);
//     });

//     if (jobDescriptionFile) {
//       formData.append(
//         "jobDescriptionFile",
//         jobDescriptionFile,
//         jobDescriptionFile.name
//       );
//     } else if (completeJobDescriptionText) {
//       formData.append("jobDescriptionText", completeJobDescriptionText);
//     }

//     try {
//       const response = await fetch(`${backend_url}/upload`, {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setAnalysisResults(data);
//         navigate("/results");
//       } else {
//         let errorResponseMessage = `Failed to upload files. Status: ${response.status}.`;
//         try {
//           const errorData = await response.json();
//           errorResponseMessage = errorData.message || errorResponseMessage;
//         } catch (jsonParseError) {
//           try {
//             const textError = await response.text();
//             errorResponseMessage = textError || errorResponseMessage;
//           } catch (textParseError) {
//             /* Do nothing more */
//           }
//         }
//         setErrorMessage(errorResponseMessage);
//       }
//     } catch (error) {
//       setErrorMessage(`An error occurred: ${error.message || "Network error"}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const jobDescriptionForTextarea = generatedTextPrefix + additionalUserText;

//   const isAnalyzeButtonDisabled =
//     isLoading ||
//     !selectedFiles.length ||
//     (!jobDescriptionForTextarea.replace(generatedTextPrefix, "").trim() && // No manual text
//       !jobDescriptionFile && // No JD file
//       !selectedModule && // No module selected
//       !selectedExperience); // No experience selected

//   return (
//     <div className="coreops-app-container">
//       <header className="coreops-main-header">
//         <h1>COREHire Talent Analyzer</h1>
//         <p className="coreops-subtitle">
//           Streamline Your Hiring with Intelligent Resume Analysis.
//         </p>
//       </header>
//       <main className="coreops-main-content">
//         <div className="coreops-file-upload-layout compact-layout">
//           <section className="coreops-upload-section resume-section">
//             <h2 className="coreops-section-title">
//               <FontAwesomeIcon icon={faUsers} /> Upload Candidate Resumes
//             </h2>
//             <div
//               className="coreops-drag-drop-area"
//               onDragOver={(e) => {
//                 e.preventDefault();
//                 e.currentTarget.classList.add("drag-over");
//               }}
//               onDragLeave={(e) => e.currentTarget.classList.remove("drag-over")}
//               onDrop={(e) => {
//                 e.preventDefault();
//                 e.currentTarget.classList.remove("drag-over");
//                 const files = Array.from(e.dataTransfer.files);
//                 processFiles(files);
//               }}
//             >
//               <FontAwesomeIcon
//                 icon={faCloudUploadAlt}
//                 className="coreops-upload-icon"
//               />
//               <p className="drag-drop-text">Drag & Drop Resumes Here</p>
//               <p className="drag-drop-subtext">(PDF, DOC, DOCX, TXT)</p>
//               <span className="drag-drop-or">or</span>
//               <div className="coreops-button-group">
//                 <button
//                   className="coreops-button coreops-button-secondary"
//                   onClick={() =>
//                     fileInputRef.current && fileInputRef.current.click()
//                   }
//                 >
//                   Browse Files
//                 </button>
//                 <button
//                   className="coreops-button coreops-button-secondary"
//                   onClick={() =>
//                     folderInputRef.current && folderInputRef.current.click()
//                   }
//                 >
//                   <FontAwesomeIcon icon={faFolderOpen} /> Upload Folder
//                 </button>
//               </div>
//               <input
//                 type="file"
//                 multiple
//                 accept=".pdf,.doc,.docx,.txt"
//                 onChange={handleFileChange}
//                 style={{ display: "none" }}
//                 ref={fileInputRef}
//               />
//               <input
//                 type="file"
//                 webkitdirectory="true"
//                 directory=""
//                 multiple
//                 onChange={handleFolderChange}
//                 style={{ display: "none" }}
//                 ref={folderInputRef}
//               />
//             </div>

//             {selectedFiles.length > 0 && (
//               <div className="coreops-selected-files-container">
//                 <h4 className="coreops-selected-files-title">
//                   Selected Resumes ({selectedFiles.length}):
//                 </h4>
//                 <div className="coreops-selected-files-list scrollable">
//                   {selectedFiles.map((file, index) => (
//                     <div
//                       className="coreops-file-item"
//                       key={index + "-" + file.name + "-" + file.size}
//                     >
//                       <FontAwesomeIcon
//                         icon={faFileAlt}
//                         className="coreops-file-icon"
//                       />
//                       <span className="coreops-file-name" title={file.name}>
//                         {file.name}
//                       </span>
//                       <button
//                         type="button"
//                         className="coreops-remove-file-button"
//                         onClick={() => handleRemoveFile(index)}
//                         title="Remove file"
//                       >
//                         <FontAwesomeIcon icon={faTimes} />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </section>

//           <section className="coreops-upload-section job-description-section">
//             <h2 className="coreops-section-title">
//               <FontAwesomeIcon icon={faBriefcase} /> Provide Job Description
//             </h2>

//             <div className="coreops-structured-jd-helpers">
//               <h4 className="coreops-subsection-title">
//                 Define with SAP Specifics:
//               </h4>
//               <div className="coreops-jd-input-group">
//                 <label htmlFor="module-select">Target SAP Module:</label>
//                 <select
//                   id="module-select"
//                   value={selectedModule}
//                   onChange={handleModuleChange}
//                   className="coreops-select"
//                 >
//                   <option value="">-- Select Module --</option>
//                   {Object.keys(sapModulesData).map((moduleName) => (
//                     <option key={moduleName} value={moduleName}>
//                       {moduleName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* SKILL CHECKBOXES REMOVED */}

//               <div className="coreops-jd-input-group">
//                 <label htmlFor="experience-select">
//                   Required Experience Level:
//                 </label>
//                 <select
//                   id="experience-select"
//                   value={selectedExperience}
//                   onChange={handleExperienceChange}
//                   className="coreops-select"
//                 >
//                   <option value="">-- Select Experience --</option>
//                   {experienceYearsRanges.map((range) => (
//                     <option key={range} value={range}>
//                       {range}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="coreops-jd-main-textbox-section">
//               <h4 className="coreops-subsection-title">
//                 Or Enter/Paste Full Job Description:
//               </h4>
//               <textarea
//                 rows="6"
//                 value={jobDescriptionForTextarea}
//                 onChange={handleCombinedJobDescriptionChange}
//                 placeholder="Selected module, skills (auto-populated if module is chosen), and experience will appear here. You can also directly paste or write the full job description..."
//                 className="coreops-textarea"
//               />
//             </div>

//             <div className="coreops-jd-separator">
//               <span>OR UPLOAD JD FILE</span>
//             </div>

//             <div className="coreops-jd-file-upload-area">
//               <div
//                 className="coreops-drag-drop-area coreops-drag-drop-area-small"
//                 onDragOver={(e) => {
//                   e.preventDefault();
//                   e.currentTarget.classList.add("drag-over");
//                 }}
//                 onDragLeave={(e) =>
//                   e.currentTarget.classList.remove("drag-over")
//                 }
//                 onDrop={(e) => {
//                   e.preventDefault();
//                   e.currentTarget.classList.remove("drag-over");
//                   if (e.dataTransfer.files.length > 0) {
//                     const file = e.dataTransfer.files[0];
//                     const allowedJdTypes = [
//                       "application/pdf",
//                       "application/msword",
//                       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//                       "text/plain",
//                     ];
//                     if (allowedJdTypes.includes(file.type)) {
//                       const mockEvent = { target: { files: [file] } };
//                       handleJobDescriptionFileChange(mockEvent);
//                     } else {
//                       setErrorMessage(
//                         `Unsupported JD file type: ${file.name}. Allowed: PDF, DOC, DOCX, TXT`
//                       );
//                     }
//                   }
//                 }}
//               >
//                 <FontAwesomeIcon
//                   icon={faCloudUploadAlt}
//                   className="coreops-upload-icon small"
//                 />
//                 <p className="drag-drop-text small">Drag & Drop JD File</p>
//                 <p className="drag-drop-subtext small">(PDF, DOC, DOCX, TXT)</p>
//                 <button
//                   className="coreops-button coreops-button-secondary coreops-button-small"
//                   onClick={() =>
//                     jobDescriptionFileInputRef.current &&
//                     jobDescriptionFileInputRef.current.click()
//                   }
//                 >
//                   Browse JD File
//                 </button>
//                 <input
//                   type="file"
//                   accept=".pdf,.doc,.docx,.txt"
//                   onChange={handleJobDescriptionFileChange}
//                   style={{ display: "none" }}
//                   ref={jobDescriptionFileInputRef}
//                 />
//               </div>
//               {jobDescriptionFile && (
//                 <div className="coreops-selected-files-list single-file">
//                   <h4 className="coreops-selected-files-title">
//                     Selected JD File:
//                   </h4>
//                   <div className="coreops-file-item">
//                     <FontAwesomeIcon
//                       icon={faFileAlt}
//                       className="coreops-file-icon"
//                     />
//                     <span
//                       className="coreops-file-name"
//                       title={jobDescriptionFile.name}
//                     >
//                       {jobDescriptionFile.name}
//                     </span>
//                     <button
//                       type="button"
//                       className="coreops-remove-file-button"
//                       onClick={handleRemoveJobDescriptionFile}
//                       title="Remove JD file"
//                     >
//                       <FontAwesomeIcon icon={faTimes} />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </section>
//         </div>
//       </main>
//       <div className="coreops-upload-analyze-section">
//         {errorMessage && (
//           <div className="coreops-error-message">{errorMessage}</div>
//         )}
//         <button
//           className={`coreops-button coreops-button-primary analyze-button ${isLoading ? "loading" : ""}`}
//           onClick={handleFileUpload}
//           disabled={isAnalyzeButtonDisabled}
//           title={
//             isAnalyzeButtonDisabled
//               ? !selectedFiles.length
//                 ? "Please upload resumes first"
//                 : "Please provide a job description (select module/experience, type, or upload file)"
//               : "Analyze Resumes"
//           }
//         >
//           {isLoading ? (
//             <>
//               <ClipLoader color="var(--coreops-light-text)" size={18} />
//               <span>Analyzing...</span>
//             </>
//           ) : (
//             <>
//               <FontAwesomeIcon icon={faCogs} /> Analyze Resumes
//             </>
//           )}
//         </button>
//       </div>
//       <footer className="coreops-footer">
//         <p>
//           © {new Date().getFullYear()} COREHire - Intelligent Hiring Solutions
//         </p>
//       </footer>
//     </div>
//   );
// }

// export default FileUpload;

import React, { useState, useRef, useEffect, useCallback } from "react";
import "../FileUpload.css"; // Ensure this CSS file has the CoreOps.ai theme
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faPaperPlane,
  faTimes,
  faCloudUploadAlt,
  faFolderOpen,
  faBriefcase,
  faCogs,
  faUsers,
  faBookOpen, // For JD Role selection
  faFileContract, // For specific JD selection / display
  faSpinner,
  // Icons for JD sections (can be used in formatJdDetailsToText if desired)
  faTags,
  faTasks,
  faGraduationCap,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../config";

// Experience ranges are still useful for the override dropdown
const experienceYearsRanges = [
  "0-1 years",
  "1-3 years",
  "3-5 years",
  "5-7 years",
  "7-10 years",
  "10-15 years",
  "15+ years",
  "As per JD", // Added default option
];

function FileUpload({ setAnalysisResults }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [jobDescriptionFile, setJobDescriptionFile] = useState(null); // For direct upload as an alternative
  const [isLoading, setIsLoading] = useState(false); // Main analysis loading
  const [errorMessage, setErrorMessage] = useState("");

  // States for DB-driven JD selection
  const [availableDbRoles, setAvailableDbRoles] = useState([]);
  const [selectedDbRole, setSelectedDbRole] = useState("");
  const [availableDbJDs, setAvailableDbJDs] = useState([]); // Stores { _id, originalFileName }
  const [selectedDbJDId, setSelectedDbJDId] = useState(""); // Stores the _id of the selected JD

  // Loading states for DB interactions
  const [isLoadingDbRoles, setIsLoadingDbRoles] = useState(false);
  const [isLoadingDbJDs, setIsLoadingDbJDs] = useState(false);
  const [isLoadingDbJDDetails, setIsLoadingDbJDDetails] = useState(false);

  // State for the selected experience level (to modify the JD text)
  const [selectedExperienceOverride, setSelectedExperienceOverride] =
    useState("");

  // Main Job Description Textbox Content
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  // Store the original fetched JD (object) to reconstruct text if experience is changed
  const [originalFetchedJdObject, setOriginalFetchedJdObject] = useState(null);

  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);
  const jobDescriptionFileInputRef = useRef(null);
  const navigate = useNavigate();

  // Fetch available roles from DB on component mount
  useEffect(() => {
    const fetchRolesFromDB = async () => {
      setIsLoadingDbRoles(true);
      try {
        const response = await fetch(`${backend_url}/jd-roles`); // ENSURE THIS ENDPOINT IS CORRECT
        if (!response.ok) throw new Error("Failed to fetch roles from DB");
        const data = await response.json();
        setAvailableDbRoles(data.roles || []);
      } catch (error) {
        console.error("Error fetching roles from DB:", error);
        setErrorMessage(
          "Could not load job roles. Please try refreshing or check backend."
        );
      } finally {
        setIsLoadingDbRoles(false);
      }
    };
    fetchRolesFromDB();
  }, []);

  // Fetch JDs when a DB role is selected
  useEffect(() => {
    if (selectedDbRole) {
      const fetchJDsForDbRole = async () => {
        setIsLoadingDbJDs(true);
        setAvailableDbJDs([]);
        setSelectedDbJDId(""); // Reset selected JD ID
        setJobDescriptionText(""); // Clear text area
        setOriginalFetchedJdObject(null);
        setSelectedExperienceOverride(""); // Reset experience override
        try {
          const response = await fetch(
            `${backend_url}/jds-by-role/${encodeURIComponent(selectedDbRole)}`
          );
          if (!response.ok)
            throw new Error(`Failed to fetch JDs for ${selectedDbRole}`);
          const data = await response.json();
          setAvailableDbJDs(data.jds || []);
        } catch (error) {
          console.error(`Error fetching JDs for ${selectedDbRole}:`, error);
          setErrorMessage(`Could not load JDs for ${selectedDbRole}.`);
        } finally {
          setIsLoadingDbJDs(false);
        }
      };
      fetchJDsForDbRole();
    } else {
      setAvailableDbJDs([]);
      setSelectedDbJDId("");
    }
  }, [selectedDbRole]);

  // Format JD details object into a text string
  const formatJdDetailsToText = useCallback((jdDetails, experienceToUse) => {
    if (!jdDetails) return "";

    let qualificationText = "";
    if (
      jdDetails.qualificationsAndEducation &&
      jdDetails.qualificationsAndEducation.length > 0
    ) {
      let experienceLineFoundAndReplaced = false;
      jdDetails.qualificationsAndEducation.forEach((q) => {
        // Check if this line is an experience line and if we have an override
        if (
          experienceToUse &&
          q.toLowerCase().includes("experience") &&
          q.match(/\d+.*year[s]?/i)
        ) {
          qualificationText += `• At least ${experienceToUse} of relevant experience.\n`; // Use override
          experienceLineFoundAndReplaced = true;
        } else {
          qualificationText += `• ${q}\n`; // Use original qualification line
        }
      });
      // If no experience line was found among qualifications but we have an override, add it
      if (experienceToUse && !experienceLineFoundAndReplaced) {
        qualificationText += `• At least ${experienceToUse} of relevant experience.\n`;
      }
    } else if (experienceToUse) {
      // No existing qualifications, but have an experience override
      qualificationText = `• At least ${experienceToUse} of relevant experience.\n`;
    } else {
      qualificationText = "N/A\n";
    }

    let text = `Role: ${jdDetails.role || "N/A"} - ${jdDetails.originalFileName?.replace(/\.(docx|pdf|txt)$/i, "") || "N/A"}\n\n`;
    text += `Overview:\n${jdDetails.overview || "N/A"}\n\n`;
    text += `Key Responsibilities:\n${jdDetails.keyResponsibilities && jdDetails.keyResponsibilities.length > 0 ? jdDetails.keyResponsibilities.map((r) => `• ${r}`).join("\n") : "N/A"}\n\n`;
    text += `Qualifications and Education Requirements:\n${qualificationText}\n`; // Formatted qualifications with potential experience
    text += `Preferred Skills:\n${jdDetails.preferredSkills && jdDetails.preferredSkills.length > 0 ? jdDetails.preferredSkills.map((s) => `• ${s}`).join("\n") : "N/A"}\n`;
    return text;
  }, []); // Empty dependency array as it's a pure formatting function based on args

  // Fetch full JD details when a specific DB JD is selected
  useEffect(() => {
    if (selectedDbJDId) {
      const fetchJDDetailsFromDB = async () => {
        setIsLoadingDbJDDetails(true);
        setJobDescriptionText("");
        setOriginalFetchedJdObject(null);
        setSelectedExperienceOverride(""); // Reset experience when new JD is loaded
        setJobDescriptionFile(null); // Clear direct file upload
        if (jobDescriptionFileInputRef.current)
          jobDescriptionFileInputRef.current.value = "";

        try {
          const response = await fetch(
            `${backend_url}/jd-by-id/${selectedDbJDId}`
          );
          if (!response.ok)
            throw new Error(
              `Failed to fetch details for JD ID ${selectedDbJDId}`
            );
          const data = await response.json();
          if (data.jd) {
            setOriginalFetchedJdObject(data.jd); // Store the full original object
            const formattedText = formatJdDetailsToText(data.jd, null); // Format with original experience
            setJobDescriptionText(formattedText);
          } else {
            throw new Error("JD data not found in response.");
          }
        } catch (error) {
          console.error(
            `Error fetching details for JD ID ${selectedDbJDId}:`,
            error
          );
          setErrorMessage(`Could not load details for the selected JD.`);
          setJobDescriptionText(`Failed to load details for selected JD.`);
        } finally {
          setIsLoadingDbJDDetails(false);
        }
      };
      fetchJDDetailsFromDB();
    }
  }, [selectedDbJDId, formatJdDetailsToText]); // Add formatJdDetailsToText to deps

  // Effect to update JD text when experience override changes
  useEffect(() => {
    if (
      originalFetchedJdObject &&
      selectedExperienceOverride &&
      selectedExperienceOverride !== "As per JD"
    ) {
      const updatedText = formatJdDetailsToText(
        originalFetchedJdObject,
        selectedExperienceOverride
      );
      setJobDescriptionText(updatedText);
    } else if (
      originalFetchedJdObject &&
      (!selectedExperienceOverride ||
        selectedExperienceOverride === "As per JD")
    ) {
      // Revert to original JD's experience or no specific override
      const originalText = formatJdDetailsToText(originalFetchedJdObject, null);
      setJobDescriptionText(originalText);
    }
  }, [
    selectedExperienceOverride,
    originalFetchedJdObject,
    formatJdDetailsToText,
  ]);

  const handleDbRoleChange = (event) => {
    setSelectedDbRole(event.target.value);
    setSelectedDbJDId("");
    setJobDescriptionText("");
    setOriginalFetchedJdObject(null);
    setSelectedExperienceOverride("");
    setJobDescriptionFile(null);
    if (jobDescriptionFileInputRef.current)
      jobDescriptionFileInputRef.current.value = "";
  };

  const handleDbJDChange = (event) => {
    setSelectedDbJDId(event.target.value);
    setSelectedExperienceOverride(""); // Reset override when JD changes
    setJobDescriptionFile(null);
    if (jobDescriptionFileInputRef.current)
      jobDescriptionFileInputRef.current.value = "";
  };

  const handleExperienceOverrideChange = (e) => {
    setSelectedExperienceOverride(e.target.value);
    // If experience is changed, and a DB JD was loaded, it will trigger the useEffect to reformat text.
    // No need to clear other main JD input methods here, as this is an override for the loaded JD.
  };

  const handleJobDescriptionTextChange = (event) => {
    setJobDescriptionText(event.target.value);
    // If user types directly AND the text differs from what would be generated by current selections,
    // then assume full manual override.
    const currentExperienceForComparison =
      selectedExperienceOverride ||
      (originalFetchedJdObject ? "As per JD" : "");
    const potentiallyGeneratedText = originalFetchedJdObject
      ? formatJdDetailsToText(
          originalFetchedJdObject,
          currentExperienceForComparison === "As per JD"
            ? null
            : currentExperienceForComparison
        )
      : "";

    if (
      event.target.value.trim() !== potentiallyGeneratedText.trim() &&
      event.target.value.trim() !== ""
    ) {
      console.log("Manual JD edit detected, clearing DB selections.");
      setSelectedDbRole("");
      setSelectedDbJDId("");
      setOriginalFetchedJdObject(null);
      setSelectedExperienceOverride("");
      setJobDescriptionFile(null);
      if (jobDescriptionFileInputRef.current)
        jobDescriptionFileInputRef.current.value = "";
    }
  };

  const handleDirectJDFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const allowedJdTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    if (!allowedJdTypes.includes(file.type)) {
      setErrorMessage(`Unsupported JD file type: ${file.name}.`);
      if (jobDescriptionFileInputRef.current)
        jobDescriptionFileInputRef.current.value = "";
      setJobDescriptionFile(null);
      return;
    }
    setErrorMessage("");
    setJobDescriptionFile(file);
    setSelectedDbRole("");
    setSelectedDbJDId("");
    setJobDescriptionText("");
    setOriginalFetchedJdObject(null);
    setSelectedExperienceOverride("");
    if (jobDescriptionFileInputRef.current)
      jobDescriptionFileInputRef.current.value = null;
  };
  const handleRemoveDirectJDFile = () => {
    setJobDescriptionFile(null);
    if (jobDescriptionFileInputRef.current)
      jobDescriptionFileInputRef.current.value = "";
  };

  const processFiles = (files) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));
    const invalidFiles = files.filter(
      (file) => !allowedTypes.includes(file.type)
    );
    let errorMsg = "";
    if (invalidFiles.length > 0) {
      errorMsg = `Unsupported resume file type(s): ${invalidFiles.map((f) => f.name).join(", ")}.`;
    }
    setErrorMessage(errorMsg);
    if (errorMsg === "") {
      const newUniqueFiles = validFiles.filter(
        (vf) =>
          !selectedFiles.some(
            (sf) =>
              sf.name === vf.name &&
              sf.size === vf.size &&
              sf.lastModified === vf.lastModified
          )
      );
      setSelectedFiles((prevFiles) => [...prevFiles, ...newUniqueFiles]);
    }
  };
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    processFiles(files);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };
  const handleFolderChange = (event) => {
    const files = Array.from(event.target.files);
    processFiles(files);
    if (folderInputRef.current) folderInputRef.current.value = null;
  };
  const handleRemoveFile = (fileToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter(
        (file) =>
          !(
            file.name === fileToRemove.name &&
            file.size === fileToRemove.size &&
            file.lastModified === fileToRemove.lastModified
          )
      )
    );
  };

  const handleFileUpload = async () => {
    const finalJobDescription = jobDescriptionText.trim();
    if (!selectedFiles.length) {
      setErrorMessage("Please upload resumes.");
      return;
    }
    if (!finalJobDescription && !jobDescriptionFile) {
      setErrorMessage("Please provide or select a job description.");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    const formData = new FormData();
    selectedFiles.forEach((file) =>
      formData.append("resumes", file, file.name)
    );
    if (jobDescriptionFile) {
      formData.append(
        "jobDescriptionFile",
        jobDescriptionFile,
        jobDescriptionFile.name
      );
    } else if (finalJobDescription) {
      formData.append("jobDescriptionText", finalJobDescription);
    }
    try {
      const response = await fetch(`${backend_url}/upload`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setAnalysisResults(data);
        navigate("/results");
      } else {
        const errorData = await response
          .json()
          .catch(() => ({
            message: `Upload failed with status: ${response.status}`,
          }));
        setErrorMessage(
          errorData.message || `Upload failed: ${response.status}`
        );
      }
    } catch (error) {
      setErrorMessage(
        `An error occurred: ${error.message || "Network error during upload."}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isAnalyzeButtonDisabled =
    isLoading ||
    !selectedFiles.length ||
    (!jobDescriptionText.trim() && !jobDescriptionFile);

  return (
    <div className="coreops-app-container">
      <header className="coreops-main-header">
        <h1>COREHire Talent Analyzer</h1>
        <p className="coreops-subtitle">
          Streamline Your Hiring with Intelligent Resume Analysis.
        </p>
      </header>

      <main className="coreops-main-content">
        <div className="coreops-file-upload-layout compact-layout">
          <section className="coreops-upload-section resume-section">
            <h2 className="coreops-section-title">
              <FontAwesomeIcon icon={faUsers} /> Upload Candidate Resumes
            </h2>
            <div
              className="coreops-drag-drop-area"
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add("drag-over");
              }}
              onDragLeave={(e) => e.currentTarget.classList.remove("drag-over")}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove("drag-over");
                const files = Array.from(e.dataTransfer.files);
                processFiles(files);
              }}
            >
              <FontAwesomeIcon
                icon={faCloudUploadAlt}
                className="coreops-upload-icon"
              />
              <p className="drag-drop-text">Drag & Drop Resumes Here</p>
              <p className="drag-drop-subtext">(PDF, DOC, DOCX, TXT)</p>
              <span className="drag-drop-or">or</span>
              <div className="coreops-button-group">
                <button
                  className="coreops-button coreops-button-secondary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Browse Files
                </button>
                <button
                  className="coreops-button coreops-button-secondary"
                  onClick={() => folderInputRef.current?.click()}
                >
                  <FontAwesomeIcon icon={faFolderOpen} /> Upload Folder
                </button>
              </div>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
              <input
                type="file"
                webkitdirectory="true"
                directory=""
                multiple
                onChange={handleFolderChange}
                style={{ display: "none" }}
                ref={folderInputRef}
              />
            </div>
            {selectedFiles.length > 0 && (
              <div className="coreops-selected-files-container">
                <h4 className="coreops-selected-files-title">
                  Selected Resumes ({selectedFiles.length}):
                </h4>
                <div className="coreops-selected-files-list scrollable">
                  {selectedFiles.map((file, index) => (
                    <div
                      className="coreops-file-item"
                      key={`${file.name}-${file.lastModified}-${file.size}-${index}`}
                    >
                      <FontAwesomeIcon
                        icon={faFileAlt}
                        className="coreops-file-icon"
                      />
                      <span className="coreops-file-name" title={file.name}>
                        {file.name}
                      </span>
                      <button
                        type="button"
                        className="coreops-remove-file-button"
                        onClick={() => handleRemoveFile(file)}
                        title="Remove file"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className="coreops-upload-section job-description-section">
            <h2 className="coreops-section-title">
              <FontAwesomeIcon icon={faBriefcase} /> Provide Job Description
            </h2>

            <div className="coreops-dynamic-jd-selector">
              {" "}
              {/* Renamed class for clarity */}
              <h4 className="coreops-subsection-title">
                <FontAwesomeIcon icon={faBookOpen} /> Option 1: Select JD from
                Repository
              </h4>
              <div className="coreops-jd-input-group">
                <label htmlFor="db-role-select">A. Select Role/Category:</label>
                {isLoadingDbRoles ? (
                  <div className="coreops-inline-loader">
                    <ClipLoader color="var(--coreops-secondary)" size={20} />{" "}
                    Loading Roles...
                  </div>
                ) : (
                  <select
                    id="db-role-select"
                    value={selectedDbRole}
                    onChange={handleDbRoleChange}
                    className="coreops-select"
                  >
                    <option value="">-- Select Role --</option>
                    {availableDbRoles.map((role) => (
                      <option key={role} value={role}>
                        {" "}
                        {role}{" "}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              {selectedDbRole && (
                <div className="coreops-jd-input-group">
                  <label htmlFor="db-jd-select">
                    B. Select Specific Job Description:
                  </label>
                  {isLoadingDbJDs ? (
                    <div className="coreops-inline-loader">
                      <ClipLoader color="var(--coreops-secondary)" size={20} />{" "}
                      Loading JDs for {selectedDbRole}...
                    </div>
                  ) : (
                    <select
                      id="db-jd-select"
                      value={selectedDbJDId}
                      onChange={handleDbJDChange}
                      className="coreops-select"
                      disabled={
                        availableDbJDs.length === 0 || isLoadingDbJDDetails
                      }
                    >
                      <option value="">
                        -- Select JD from {selectedDbRole} --
                      </option>
                      {availableDbJDs.map((jd) => (
                        <option key={jd._id} value={jd._id}>
                          {jd.originalFileName.replace(
                            /\.(docx|pdf|txt)$/i,
                            ""
                          )}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              )}
              {selectedDbJDId &&
                !isLoadingDbJDDetails &&
                originalFetchedJdObject && ( // Show only if a JD is loaded
                  <div className="coreops-jd-input-group">
                    <label htmlFor="jd-experience-override">
                      C. Adjust Experience Level (Optional):
                    </label>
                    <select
                      id="jd-experience-override"
                      value={selectedExperienceOverride}
                      onChange={handleExperienceOverrideChange}
                      className="coreops-select"
                    >
                      <option value="As per JD">
                        -- Use JD's Stated Experience --
                      </option>
                      {experienceYearsRanges.map(
                        (range) =>
                          range !== "As per JD" && (
                            <option key={range} value={range}>
                              {range}
                            </option>
                          )
                      )}
                    </select>
                  </div>
                )}
            </div>

            <div className="coreops-jd-separator">
              <span>OR</span>
            </div>

            <div className="coreops-jd-main-textbox-section">
              <h4 className="coreops-subsection-title">
                <FontAwesomeIcon icon={faFileContract} /> Option 2: Manual Entry
                / Paste Full JD
              </h4>
              {isLoadingDbJDDetails && ( // This loader is specific to DB JD loading
                <div className="coreops-inline-loader">
                  <ClipLoader color="var(--coreops-secondary)" size={20} />{" "}
                  Loading JD details...
                </div>
              )}
              <textarea
                rows="12"
                value={jobDescriptionText}
                onChange={handleJobDescriptionTextChange}
                placeholder={
                  isLoadingDbJDDetails
                    ? "Loading details from selected JD..."
                    : selectedDbJDId
                      ? "JD details loaded from repository. You can edit below or adjust experience above."
                      : "Select a Role & JD from repository above to auto-populate, or type/paste the full job description here, or upload a file below."
                }
                className="coreops-textarea"
                disabled={isLoadingDbJDDetails}
              />
            </div>

            <div className="coreops-jd-separator">
              <span>OR</span>
            </div>

            <div className="coreops-jd-file-upload-area">
              <h4
                className="coreops-subsection-title"
                style={{ textAlign: "center", marginBottom: "15px" }}
              >
                <FontAwesomeIcon icon={faCloudUploadAlt} /> Option 3: Upload JD
                File Directly
              </h4>
              <div
                className="coreops-drag-drop-area coreops-drag-drop-area-small"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add("drag-over");
                }}
                onDragLeave={(e) =>
                  e.currentTarget.classList.remove("drag-over")
                }
                onDrop={(e) => {
                  /* ... (drop logic from previous answer) ... */
                }}
              >
                <FontAwesomeIcon
                  icon={faCloudUploadAlt}
                  className="coreops-upload-icon small"
                />
                <p className="drag-drop-text small">Drag & Drop JD File</p>
                <p className="drag-drop-subtext small">(PDF, DOC, DOCX, TXT)</p>
                <button
                  className="coreops-button coreops-button-secondary coreops-button-small"
                  onClick={() => jobDescriptionFileInputRef.current?.click()}
                >
                  Browse JD File
                </button>
              </div>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleDirectJDFileChange}
                style={{ display: "none" }}
                ref={jobDescriptionFileInputRef}
              />
              {jobDescriptionFile && (
                <div className="coreops-selected-files-list single-file">
                  <h4 className="coreops-selected-files-title">
                    Uploaded JD File:
                  </h4>
                  <div className="coreops-file-item">
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      className="coreops-file-icon"
                    />
                    <span
                      className="coreops-file-name"
                      title={jobDescriptionFile.name}
                    >
                      {jobDescriptionFile.name}
                    </span>
                    <button
                      type="button"
                      className="coreops-remove-file-button"
                      onClick={handleRemoveDirectJDFile}
                      title="Remove JD file"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <div className="coreops-upload-analyze-section">
        {errorMessage && (
          <div className="coreops-error-message">{errorMessage}</div>
        )}
        <button
          className={`coreops-button coreops-button-primary analyze-button ${isLoading ? "loading" : ""}`}
          onClick={handleFileUpload}
          disabled={isAnalyzeButtonDisabled}
          title={
            isAnalyzeButtonDisabled
              ? "Please upload resumes and provide a job description"
              : "Analyze Resumes"
          }
        >
          {isLoading ? (
            <>
              <ClipLoader color="var(--coreops-light-text)" size={18} />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faCogs} /> Analyze Resumes
            </>
          )}
        </button>
      </div>
      <footer className="coreops-footer">
        <p>
          © {new Date().getFullYear()} CoreOps.ai - Intelligent Hiring
          Solutions
        </p>
      </footer>
    </div>
  );
}

export default FileUpload;
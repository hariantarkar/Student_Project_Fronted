// import React, { useEffect, useState } from "react";
// import { PersonCircle } from "react-bootstrap-icons";
// import { getStudentProfile } from "../services/studentService";
// import "./StudentProfile.css";

// export default function ProfilePage() {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const sid = localStorage.getItem("sid"); // logged-in student SID

//   useEffect(() => {
//   if (sid) {
//     setLoading(true);
//     getStudentProfile(sid)   // ✅ pass sid explicitly
//       .then((data) => setProfile(data))
//       .catch((err) => {
//         console.error("Error fetching profile:", err);
//         setProfile(null);
//       })
//       .finally(() => setLoading(false));
//   } else {  
//     setLoading(false); // avoid stuck spinner if no sid
//   }
// }, [sid]);


//   return (
//     <div className="profile-page">
//       <h2 className="profile-title">
//         <PersonCircle className="me-2" />
//         My Profile
//       </h2>

//       {loading ? (
//         <p className="loading-text">Loading profile...</p>
//       ) : profile ? (
//         <div className="profile-card">
//           <p><strong>Name:</strong> {profile.name}</p>
//           <p><strong>Email:</strong> {profile.email}</p>
//           <p><strong>Contact:</strong> {profile.contact}</p>
//         </div>
//       ) : (
//         <p className="error-text">Profile not found.</p>
//       )}
//     </div>
//   );
// }

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./StudentsTabs.css";  // import CSS file

// const StudentsTabs = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="students-container">
//       {/* Pending Approval Students */}
//       <div
//         className="student-box"
//         onClick={() => navigate("/unregisteredStudents")}
//       >
//         Pending Approval Students
//       </div>

//       {/* Approval & Add Student */}
//       <div
//         className="student-box"
//         onClick={() => navigate("/viewApprovedStudents")}
//       >
//         Approval & Add Student
//       </div>

//       {/* All Students */}
//       <div
//         className="student-box"
//         onClick={() => navigate("/viewAllStudents")}
//       >
//         All Students
//       </div>
//     </div>
//   );
// };

// export default StudentsTabs;


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./StudentsTabs.css";  // import CSS file

// const StudentsTabs = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="students-card">
//       <h2 className="tabs-title">Student Management</h2>
//       <div className="students-container">
//         {/* Pending Approval Students */}
//         <div
//           className="student-box"
//           onClick={() => navigate("/unregisteredStudents")}
//         >
//           Pending Approval Students
//         </div>

//         {/* Approval & Add Student */}
//         <div
//           className="student-box"
//           onClick={() => navigate("/viewApprovedStudents")}
//         >
//           Approval & Add Student
//         </div>

//         {/* All Students */}
//         <div
//           className="student-box"
//           onClick={() => navigate("/viewAllStudents")}
//         >
//           All Students
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentsTabs;


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./StudentsTabs.css"; // import CSS file

// const StudentsTabs = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="students-card">
//       <h2 className="tabs-title">Student Management</h2>
//       <div className="students-container">
//         {/* Pending Approval Students */}
//         <div
//           className="student-box"
//           onClick={() => navigate("unregisteredStudents")}  // ✅ relative path
//         >
//           Pending Approval Students
//         </div>

//         {/* Approval & Add Student */}
//         <div
//           className="student-box"
//           onClick={() => navigate("viewApprovedStudents")} // ✅ relative path
//         >
//           Approval & Add Student
//         </div>

//         {/* All Students */}
//         <div
//           className="student-box"
//           onClick={() => navigate("viewAllStudents")} // ✅ relative path
//         >
//           All Students
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentsTabs;


import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./StudentsTabs.css";

const StudentsTabs = () => {
  const { pathname } = useLocation();
  const isRoot = pathname === "/studentsTabs"; // only tabs, no content

  return (
    <div className="students-card">
      <h2 className="tabs-title">Student Management</h2>

      <div className="students-container">
        <NavLink
          to="unregisteredStudents"
          end
          className={({ isActive }) => `student-box ${isActive ? "active" : ""}`}
        >
          Pending Approval Students
        </NavLink>

        <NavLink
          to="viewApprovedStudents"
          end
          className={({ isActive }) => `student-box ${isActive ? "active" : ""}`}
        >
          Approval & Add Student
        </NavLink>

        <NavLink
          to="viewAllStudents"
          end
          className={({ isActive }) => `student-box ${isActive ? "active" : ""}`}
        >
          All Students
        </NavLink>
      </div>

      {isRoot && (
        <div className="tabs-placeholder">
          Please select a tab above.
        </div>
      )}
    </div>
  );
};

export default StudentsTabs;

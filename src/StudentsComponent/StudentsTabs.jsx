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


// import React from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import "./StudentsTabs.css";

// const StudentsTabs = () => {
//   const { pathname } = useLocation();
//   const isRoot = pathname === "/studentsTabs"; // only tabs, no content

//   return (
//     <div className="students-card">
//       <h2 className="tabs-title">Student Management</h2>

//       <div className="students-container">
//         <NavLink
//           to="unregisteredStudents"
//           end
//           className={({ isActive }) => `student-box ${isActive ? "active" : ""}`}
//         >
//           Pending Approval Students
//         </NavLink>

//         <NavLink
//           to="viewApprovedStudents"
//           end
//           className={({ isActive }) => `student-box ${isActive ? "active" : ""}`}
//         >
//            Add Approval Students
//         </NavLink>

//         <NavLink
//           to="viewAllStudents"
//           end
//           className={({ isActive }) => `student-box ${isActive ? "active" : ""}`}
//         >
//           All Students
//         </NavLink>
//       </div>

//     </div>
//   );
// };

// export default StudentsTabs;



// import React from "react";
// import { NavLink, Outlet, useLocation } from "react-router-dom";
// import "./StudentsTabs.css";

// const StudentsTabs = () => {
//   const { pathname } = useLocation();
//   const isRoot = pathname === "/admin/dashboard"; // when only tabs, no content

//   return (
//     <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//       <div className="students-card">
//         <h2 className="tabs-title">Student Management</h2>

//         <div className="students-container">
//           <NavLink
//             to="unregisteredStudents"
//             end
//             className={({ isActive }) =>
//               `student-box ${isActive ? "active" : ""}`
//             }
//           >
//             Pending Approval Students
//           </NavLink>

//           <NavLink
//             to="viewApprovedStudents"
//             end
//             className={({ isActive }) =>
//               `student-box ${isActive ? "active" : ""}`
//             }
//           >
//             Add Approval Students
//           </NavLink>

//           <NavLink
//             to="viewAllStudents"
//             end
//             className={({ isActive }) =>
//               `student-box ${isActive ? "active" : ""}`
//             }
//           >
//             All Students
//           </NavLink>
//         </div>
//       </div>

//       {/* Nested content shows here */}
//       <div style={{ flex: 1, overflowY: "auto", marginTop: "20px" }}>
//         {!isRoot && <Outlet />} {/* show child routes when not root */}
//       </div>
//     </div>
//   );
// };

// export default StudentsTabs;


// import React from "react";
// import { NavLink, Outlet, useLocation } from "react-router-dom";
// import "./StudentsTabs.css";

// const StudentsTabs = () => {
//   const { pathname } = useLocation();
//   const isRoot = pathname === "/admin/dashboard/StudentsTabs"; // ✅ only hide outlet when exactly on /students

//   return (
//     <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//       <div className="students-card">
//         <h2 className="tabs-title">Student Management</h2>

//         <div className="students-container">
//           <NavLink
//             to="/admin/dashboard/students/unregisteredStudents"
//             end
//             className={({ isActive }) =>
//               `student-box ${isActive ? "active" : ""}`
//             }
//           >
//             Pending Approval Students
//           </NavLink>

//           <NavLink
//             to="/admin/dashboard/students/viewApprovedStudents"
//             end
//             className={({ isActive }) =>
//               `student-box ${isActive ? "active" : ""}`
//             }
//           >
//             Add Approval Students
//           </NavLink>

//           <NavLink
//             to="/admin/dashboard/students/viewAllStudents"
//             end
//             className={({ isActive }) =>
//               `student-box ${isActive ? "active" : ""}`
//             }
//           >
//             All Students
//           </NavLink>
//         </div>
//       </div>

//       {/* Content area */}
//       <div style={{ flex: 1, overflowY: "auto", marginTop: "20px" }}>
//         {!isRoot && <Outlet />} {/* render child only when not root */}
//       </div>
//     </div>
//   );
// };

// export default StudentsTabs;


import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./StudentsTabs.css";

const StudentsTabs = () => {
  const { pathname } = useLocation();
  const isRoot = pathname === "/admin/dashboard/students"; // ✅ correct root

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div className="students-card">
        <h2 className="tabs-title">Student Management</h2>

        <div className="students-container">
          <NavLink to="unregisteredStudents" end className={({isActive}) => `student-box ${isActive ? "active" : ""}`}>
            Pending Approval Students
          </NavLink>

          <NavLink to="viewApprovedStudents" end className={({isActive}) => `student-box ${isActive ? "active" : ""}`}>
            Add Approval Students
          </NavLink>

          <NavLink to="viewAllStudents" end className={({isActive}) => `student-box ${isActive ? "active" : ""}`}>
            All Students
          </NavLink>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", marginTop: "20px" }}>
        {!isRoot && <Outlet />}  {/* show table only after a tab is clicked */}
      </div>
    </div>
  );
};

export default StudentsTabs;

// import React,{ useState, useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import StudentsTabs from "../StudentsComponent/StudentsTabs";
// import { Book, People,Speedometer, GraphUp, PersonBadge, BoxArrowRight } from 'react-bootstrap-icons';
// import "./adminDashboard.css"
// export default function SidebarWithDashboard() {
//   const [activeMenu, setActiveMenu] = useState("");

//   return (
    
//     <div className="d-flex" style={{ minHeight: "100vh" }}>
//       <div className="border" style={{ width: '250px' }}>
//         <h5 className="p-3 border-bottom">Admin</h5>
//         <ul className="list-unstyled ps-3">
//           <li className="mb-2 d-flex align-items-center px-2">
//             <Book className="me-2" /> Course
//           </li>
//           <li className="mb-2 d-flex align-items-center px-2"style={{ cursor: "pointer" ,color: activeMenu === "students" ? "green" : ""}}
//   onClick={() => setActiveMenu("students")}>
//             <People className="me-2" /> Students
//           </li>
//           <li className="mb-2 d-flex align-items-center px-2">
//             <Speedometer className="me-2" /> Performance
//           </li>
//           <li className="mb-2 d-flex align-items-center px-2">
//             <GraphUp className="me-2" /> Prediction
//           </li>
//           <li className="mb-2 d-flex align-items-center px-2">
//             <PersonBadge className="me-2" /> Admin
//           </li>
//           <li className="mb-2 d-flex align-items-center px-2 text-danger" style={{ cursor: 'pointer' }}>
//             <BoxArrowRight className="me-2" /> Logout
//           </li>
//         </ul>
//       </div>
//         <div className="flex-grow-1 ml-5">
//     {activeMenu === "students" && <StudentsTabs />}
//   </div>

//     </div> 
//   );
// }




// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { NavLink, Outlet } from "react-router-dom";
// import { People } from "react-bootstrap-icons";
// import "./adminDashboard.css";

// export default function SidebarWithDashboard() {
//   return (
//     <div className="d-flex admin-container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <h5 className="p-3 border-bottom">Admin</h5>
//         <ul>
//           <li>
//             <NavLink
//               to="/admin/dashboard/students"
//               className={({ isActive }) =>
//                 "sidebar-link d-flex align-items-center " +
//                 (isActive ? "active" : "")
//               }
//             >
//               <People className="me-2" /> Students
//             </NavLink>
//           </li>
//         </ul>
//       </div>

//       {/* Main area renders the current route */}
//       <div className="flex-grow-1 p-3 main-content">
//         <Outlet />
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, Outlet } from "react-router-dom";
import {Book, People, List } from "react-bootstrap-icons";
import "./adminDashboard.css";

export default function SidebarWithDashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="d-flex admin-container">
      {/* Sidebar */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <h5 className="p-3 border-bottom">Admin</h5>
        <ul>
          
            <li>
            <NavLink
              to="/admin/dashboard/Course"
              className={({ isActive }) =>
                "sidebar-link d-flex align-items-center " +
                (isActive ? "active" : "")
              }
              onClick={() => setOpen(false)} // close on click
            >
              <Book className="me-2" /> Course
            </NavLink>
          </li>


          <li>
            <NavLink
              to="/admin/dashboard/students"
              className={({ isActive }) =>
                "sidebar-link d-flex align-items-center " +
                (isActive ? "active" : "")
              }
              onClick={() => setOpen(false)} // close on click
            >
              <People className="me-2" /> Students
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Overlay when sidebar is open */}
      {open && (
        <div className="sidebar-overlay" onClick={() => setOpen(false)}></div>
      )}

      {/* Main area */}
      <div className="flex-grow-1 p-3 main-content">
        {/* Hamburger button (only mobile) */}
        <button
          className="btn btn-light d-md-none mb-3"
          onClick={() => setOpen(!open)}
        >
          <List size={24} />
        </button>

        <Outlet />
      </div>
    </div>
  );
}

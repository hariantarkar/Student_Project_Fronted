

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { NavLink, Outlet } from "react-router-dom";
// import { Book, People, List, Speedometer, BoxArrowRight } from "react-bootstrap-icons";
// import LoginService from "../services/LoginService";
// import "./adminDashboard.css";

// export default function AdminDashboard() {
//   const [open, setOpen] = useState(false);

//   const handleLogout = async () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       try {
//         await LoginService.logoutUser();
//         window.location.href = "/login/admin";
//       } catch (err) {
//         console.error("Logout failed:", err);
//       }
//     }
//   };

//   return (
//     <div className="d-flex admin-container">

//       <div className={`sidebar ${open ? "open" : ""}`}>
//         <h5 className="p-3 border-bottom">Admin</h5>
//         <ul>
//           <li>
//             <NavLink
//               to="/admin/dashboard/Course"
//               className={({ isActive }) =>
//                 "sidebar-link d-flex align-items-center " + (isActive ? "active" : "")
//               }

//               onClick={() => setOpen(false)} 

//             >
//               <Book className="me-2" /> Course
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/admin/dashboard/students"
//               className={({ isActive }) =>
//                 "sidebar-link d-flex align-items-center " + (isActive ? "active" : "")
//               }

//               onClick={() => setOpen(false)} 

//             >
//               <People className="me-2" /> Students
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/admin/dashboard/performance"
//               className={({ isActive }) =>
//                 "sidebar-link d-flex align-items-center " + (isActive ? "active" : "")
//               }
//               onClick={() => setOpen(false)}
//             >
//               <Speedometer className="me-2" /> Performance
//             </NavLink>
//           </li>
//         </ul>

//         <div className="logout-section p-3 ">
//           <li className="logout-btn" onClick={handleLogout}>
//             <BoxArrowRight className="me-2" /> Logout
//           </li>
//         </div>
//       </div>


 

//       {open && (
//         <div className="sidebar-overlay" onClick={() => setOpen(false)}></div>
//       )}


      
//       <div className="flex-grow-1 p-3 main-content">
      
//         <button
//           className="btn btn-light d-md-none mb-3"
//           onClick={() => setOpen(!open)}
//         >
//           <List size={24} />
//         </button>
//         <Outlet />
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, Outlet } from "react-router-dom";
import {
  Book,
  People,
  List,
  Speedometer,
  BoxArrowRight,
} from "react-bootstrap-icons";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, Outlet } from "react-router-dom";
import { Book, People, Speedometer, GraphUp, BoxArrowRight } from "react-bootstrap-icons";

import LoginService from "../services/LoginService";
import "./adminDashboard.css";

export default function AdminDashboard() {
  const [open, setOpen] = useState(false);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await LoginService.getAdminDashboard();
        // ✅ Expecting backend response like: { name: "Harishantarkar", ... }
        setAdminName(res?.name || "Admin");
      } catch (err) {
        console.error("Failed to fetch admin details:", err);
      }
    };

    fetchAdminData();
  }, []);

  const handleLogout = async () => {
    try {
      await LoginService.logoutUser();
      window.location.href = "/login/admin";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="d-flex admin-container">
      <div className={`sidebar ${open ? "open" : ""}`}>
        {/* ✅ Welcome message */}
        <h5 className="p-3 border-bottom">
          Welcome {adminName} ..!
        </h5>
    <div className="admin-container">
      <div className="sidebar">
        <h5 className="p-3 border-bottom">Admin</h5>
        <ul>
          <li>
            <NavLink
              to="/admin/dashboard/Course"
              className={({ isActive }) =>
                "sidebar-link d-flex align-items-center " +
                (isActive ? "active" : "")
              }
              onClick={() => setOpen(false)}
              className="sidebar-link d-flex align-items-center"

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
              onClick={() => setOpen(false)}
              className="sidebar-link d-flex align-items-center"
            >
              <People className="me-2" /> Students
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/dashboard/performance"

              className={({ isActive }) =>
                "sidebar-link d-flex align-items-center " +
                (isActive ? "active" : "")
              }
              onClick={() => setOpen(false)}

              className="sidebar-link d-flex align-items-center"

            >
              <Speedometer className="me-2" /> Performance
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/dashboard/prediction"
              className="sidebar-link d-flex align-items-center"
            >
              <GraphUp className="me-2" /> Prediction
            </NavLink>
          </li>
        </ul>
        <div className="logout-section p-3">
          <li className="logout-btn" onClick={handleLogout}>
            <BoxArrowRight className="me-2" /> Logout
          </li>
        </div>
      </div>


      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <div className="flex-grow-1 p-3 main-content">
        <button
          className="btn btn-light d-md-none mb-3"
          onClick={() => setOpen(!open)}
        >
          <List size={24} />
        </button>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

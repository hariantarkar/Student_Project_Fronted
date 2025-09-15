import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, Outlet } from "react-router-dom";
import { Book, People, Speedometer, GraphUp, BoxArrowRight, List, Person } from "react-bootstrap-icons";

import LoginService from "../services/LoginService";
import "./adminDashboard.css";

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState("");
  const [sessionError, setSessionError] = useState("");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    let interval;

    const checkAuth = async () => {
      try {
        const res = await LoginService.getAdminDashboard(); 
        setAdminName(res?.name || "Admin");
      } catch (err) {
        console.error("Failed to fetch admin details:", err);
        const status = err?.response?.status || err?.status || null;
        if (status === 401 || status === 403) {
          setSessionError("⏳ Timeout, please login again");
          clearInterval(interval); 
        }
      } finally {
        setLoading(false);
      }
    };
    checkAuth();

    interval = setInterval(checkAuth, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await LoginService.logoutUser();
      window.location.href = "/login/admin";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleCloseModal = () => {
    setSessionError("");
    window.location.href = "/login/admin"; 
  };

  if (loading) return <div className="p-5 text-center">Loading...</div>;

  return (
    <div className="d-flex admin-container">

      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <h5 className="p-3 border-bottom">Welcome {adminName}!</h5>
        <ul>
          {[
            { to: "/admin/dashboard/Course", icon: <Book />, label: "Course" },
            { to: "/admin/dashboard/students", icon: <People />, label: "Students" },
            { to: "/admin/dashboard/performance", icon: <Speedometer />, label: "Performance" },
            { to: "/admin/dashboard/prediction", icon: <GraphUp />, label: "Prediction" },
            { to: "/admin/dashboard/enquiry", icon: <People />, label: "New Enquiry" },
            { to: "/admin/dashboard/AddNewAdmin", icon: <Person />, label: "Add New Admin" },
          ].map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={({ isActive }) =>
                  "sidebar-link d-flex align-items-center " + (isActive ? "active" : "")}
                onClick={() => window.innerWidth <= 768 && setSidebarOpen(false)}
              >
                {React.cloneElement(item.icon, { className: "me-2" })} {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="logout-section p-3">
          <li className="logout-btn" onClick={handleLogout}>
            <BoxArrowRight className="me-2" /> Logout
          </li>
        </div>
      </div>

      <div className="flex-grow-1 p-3 main-content">
        
        <div className="d-md-none mb-3 mobile-menu-bar">
          <button className="btn btn-outline-secondary" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <List /> Menu
          </button>
        </div>
        <Outlet />
      </div>

      {sessionError && (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.5)" }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Session Expired</h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <p>{sessionError}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={handleCloseModal}>
                  OK, Login Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

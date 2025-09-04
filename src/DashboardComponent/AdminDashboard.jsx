import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, Outlet } from "react-router-dom";
import { Book, People, Speedometer, GraphUp, BoxArrowRight } from "react-bootstrap-icons";
import LoginService from "../services/LoginService";
import "./adminDashboard.css";

export default function AdminDashboard() {
  const handleLogout = async () => {
    try {
      await LoginService.logoutUser();
      window.location.href = "/login/admin";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h5 className="p-3 border-bottom">Admin</h5>
        <ul>
          <li>
            <NavLink
              to="/admin/dashboard/Course"
              className="sidebar-link d-flex align-items-center"
            >
              <Book className="me-2" /> Course
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/dashboard/students"
              className="sidebar-link d-flex align-items-center"
            >
              <People className="me-2" /> Students
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/dashboard/performance"
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

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

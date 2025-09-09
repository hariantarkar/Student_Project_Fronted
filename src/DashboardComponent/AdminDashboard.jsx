import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, Outlet } from "react-router-dom";
import { Book, People, Speedometer, GraphUp, BoxArrowRight, List } from "react-bootstrap-icons";
import LoginService from "../services/LoginService";
import "./adminDashboard.css";

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await LoginService.getAdminDashboard();
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
      <div className="sidebar">
        <h5 className="p-3 border-bottom">Welcome {adminName} ..!</h5>
        <ul>
          <li>
            <NavLink to="/admin/dashboard/Course" className={({ isActive }) =>
                "sidebar-link d-flex align-items-center " + (isActive ? "active" : "")}>
              <Book className="me-2" /> Course
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/dashboard/students" className={({ isActive }) =>
                "sidebar-link d-flex align-items-center " + (isActive ? "active" : "")}>
              <People className="me-2" /> Students
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/dashboard/performance" className={({ isActive }) =>
                "sidebar-link d-flex align-items-center " + (isActive ? "active" : "")}>
              <Speedometer className="me-2" /> Performance
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/dashboard/prediction" className={({ isActive }) =>
                "sidebar-link d-flex align-items-center " + (isActive ? "active" : "")}>
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

      <div className="flex-grow-1 p-3 main-content">
        <Outlet />
      </div>
    </div>
  );
}

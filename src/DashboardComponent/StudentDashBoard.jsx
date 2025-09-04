import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Book,GraphUp,Speedometer,PersonCircle,BoxArrowRight} from "react-bootstrap-icons";
import { NavLink, Outlet } from "react-router-dom";
import axios from "axios";
import "./studentDashboard.css";

export default function StudentDashboard() {
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        await axios.post("http://localhost:9999/logout", {}, { withCredentials: true });
        window.location.href = "/login/student";
      } catch (err) {
        console.error("Logout failed:", err);
      }
    }
  };

  return (
    <div className="student-dashboard d-flex">
      <div className="sidebar d-flex flex-column">
        <h5 className="p-3 border-bottom">Student</h5>
        <ul className="list-unstyled ps-3 flex-grow-1">
          <li>
            <NavLink to="/student/dashboard/profile"
              className={({ isActive }) => "d-flex align-items-center " + (isActive ? "active" : "")}
            >
              <PersonCircle className="me-2" /> Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/student/dashboard/courses"
              className={({ isActive }) => "d-flex align-items-center " + (isActive ? "active" : "")}
            >
              <Book className="me-2" /> My Courses
            </NavLink>
          </li>
          <li>
            <NavLink to="/student/dashboard/performance"
              className={({ isActive }) => "d-flex align-items-center " + (isActive ? "active" : "")}
            >
              <Speedometer className="me-2" /> Performance
            </NavLink>
          </li>
          <li>
            <NavLink to="/student/dashboard/prediction"
              className={({ isActive }) => "d-flex align-items-center " + (isActive ? "active" : "")}
            >
              <GraphUp className="me-2" /> Prediction Result
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

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Book,
  GraphUp,
  Speedometer,
  PersonCircle,
  BoxArrowRight,
} from "react-bootstrap-icons";
import "./studentDashboard.css";

export default function StudentDashboard() {
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      window.location.href = "/login"; // redirect to login page
    }
  };

  return (
    <div className="student-dashboard">
      {/* Sidebar */}
      <div className="sidebar d-flex flex-column">
        <h5 className="p-3 border-bottom">Welcome Student</h5>
        <ul className="list-unstyled ps-3 flex-grow-1">
          <li><PersonCircle className="me-2" /> Profile</li>
          <li><Book className="me-2" /> My Course</li>
          <li><Speedometer className="me-2" /> My Performance</li>
          <li><GraphUp className="me-2" /> Prediction Result</li>
        </ul>

        {/* Logout fixed at bottom */}
        <div className="logout-section p-3 border-top">
          <li
            className="logout-btn"
            onClick={handleLogout}
          >
            <BoxArrowRight className="me-2" /> Logout
          </li>
        </div>
      </div>
    </div>
  );
}

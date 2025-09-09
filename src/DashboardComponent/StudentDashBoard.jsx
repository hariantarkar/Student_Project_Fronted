
import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Book, Speedometer, GraphUp, BoxArrowRight } from "react-bootstrap-icons";
import LoginService from "../services/LoginService";
import "./studentDashboard.css";

export default function StudentDashboard() {
  const [studentName, setStudentName] = useState("");
  const [sessionError, setSessionError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval;

    const fetchStudentData = async () => {
      try {
        const res = await LoginService.getStudentDashboard();
        setStudentName(res?.user || "Student");
      } catch (err) {
        console.error("Failed to fetch student details:", err);
        const status = err?.response?.status || err?.status || null;
        if (status === 401 || status === 403) {
          setSessionError("⏳ Timeout, please login again");
          clearInterval(interval); 
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
    interval = setInterval(fetchStudentData, 15000);

    return () => clearInterval(interval); 
  }, []);

  const handleLogout = async () => {
    try {
      await LoginService.logoutUser();
      window.location.href = "/login/student";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleCloseModal = () => {
    setSessionError("");
    window.location.href = "/"; 
  };

  if (loading) {
    return <div className="p-5 text-center">Loading...</div>;
  }

  return (
    <div className="d-flex student-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h5 className="p-3 border-bottom">Welcome {studentName}</h5>
        <ul>
          <li>
            <NavLink
              to="/student/dashboard/courses"
              className={({ isActive }) =>
                "sidebar-link d-flex align-items-center " + (isActive ? "active" : "")
              }
            >
              <Book className="me-2" /> Courses
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student/dashboard/performance"
              className={({ isActive }) =>
                "sidebar-link d-flex align-items-center " + (isActive ? "active" : "")
              }
            >
              <Speedometer className="me-2" /> Performance
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student/dashboard/prediction"
              className={({ isActive }) =>
                "sidebar-link d-flex align-items-center " + (isActive ? "active" : "")
              }
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

      {/* Main content */}
      <div className="flex-grow-1 p-3 main-content">
        <Outlet />
      </div>


      {sessionError && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Session Expired</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>{sessionError}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleCloseModal}
                >
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

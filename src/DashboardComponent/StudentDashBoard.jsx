import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, Outlet } from "react-router-dom";
import { Book, Speedometer, GraphUp, PersonCircle, BoxArrowRight, List } from "react-bootstrap-icons";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import LoginService from "../services/LoginService";
import "./studentDashboard.css";

export default function StudentDashboard() {
  const [studentName, setStudentName] = useState("");
  const [sessionError, setSessionError] = useState("");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const token = Cookies.get("token");
  let studentId = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      studentId = decoded.sid;
      console.log(studentId);
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

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
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        await LoginService.logoutUser();
        window.location.href = "/login/student";
      } catch (err) {
        console.error("Logout failed:", err);
      }
    }
  };

  const handleCloseModal = () => {
    setSessionError("");
    window.location.href = "/login/student";
  };

  if (loading) return <div className="p-5 text-center">Loading...</div>;

  return (
    <div className="d-flex student-container">
      
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <h5 className="p-3 border-bottom">Welcome {studentName}</h5>
        <ul>
          {[
            { to: "/student/dashboard/profile", icon: <PersonCircle />, label: "Profile" },
            { to: "/student/dashboard/courses", icon: <Book />, label: "Courses" },
            { to: "/student/dashboard/performance", icon: <Speedometer />, label: "Performance" },
            { to: "/student/dashboard/prediction", icon: <GraphUp />, label: "Prediction Result" },
          ].map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={({ isActive }) => "sidebar-link d-flex align-items-center " + (isActive ? "active" : "")}
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
 

import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./StudentsTabs.css";

const StudentsTabs = () => {
  const { pathname } = useLocation();
  const isRoot = pathname === "/admin/dashboard/students"; 

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div className="students-card">
        <h2 className="tabs-title">Student Management</h2>

        <div className="students-container">
          <NavLink to="RegisterStudentAdminSide" end className={({isActive}) => `student-box ${isActive ? "active" : ""}`}>
            Register New Student
          </NavLink>
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
        {!isRoot && <Outlet />}  
      </div>
    </div>
  );
};

export default StudentsTabs;

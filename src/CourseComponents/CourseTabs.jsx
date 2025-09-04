
import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./CourseTabs.css";


const CourseTabs = () => {
  const { pathname } = useLocation();
  const isRoot = pathname === "/admin/dashboard/Course"; 

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div className="course-card">
        <h2 className="tabs-title">Course Management</h2>

        <div className="course-container">
          <NavLink to="addCourse" end className={({isActive}) => `course-box ${isActive ? "active" : ""}`}>
            Add New Course
          </NavLink>

          <NavLink to="viewCourses" end className={({isActive}) => `course-box ${isActive ? "active" : ""}`}>
            All Courses
          </NavLink>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", marginTop: "20px" }}>
        {!isRoot && <Outlet />}  
      </div>
    </div>
  );
};

export default CourseTabs;

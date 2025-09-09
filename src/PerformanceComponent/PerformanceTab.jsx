import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./PerformanceTab.css";

const PerformanceTabs = () => {
  const { pathname } = useLocation();
  const isRoot = pathname === "/admin/dashboard/performance";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div className="performance-card">
        <h2 className="tabs-title">Performance Management</h2>

        <div className="performance-container">
          <NavLink to="students" className={({ isActive }) =>
              `performance-box ${isActive ? "active" : ""}`}>
            Add Performance
          </NavLink>

          <NavLink to="view" className={({ isActive }) =>
              `performance-box ${isActive ? "active" : ""}`}>
            View Performance
          </NavLink>

        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", marginTop: "20px" }}>
        {!isRoot && <Outlet />}
      </div>
    </div>
  );
};

export default PerformanceTabs;

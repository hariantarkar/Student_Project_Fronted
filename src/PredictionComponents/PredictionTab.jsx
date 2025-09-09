import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./PredictionTab.css";

const PredictionTabs = () => {
  const { pathname } = useLocation();
  const isRoot = pathname === "/admin/dashboard/prediction";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div className="prediction-card">
        <h2 className="tabs-title">Prediction Management</h2>
        <div className="prediction-container">
          <NavLink to="all" className={({ isActive }) => `prediction-box ${isActive ? "active" : ""}`}>
            View Predictions
          </NavLink>
          <NavLink to="shortlisted" className={({ isActive }) => `prediction-box ${isActive ? "active" : ""}`}>
            Shortlisted
          </NavLink>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", marginTop: "20px" }}>
        {!isRoot && <Outlet />}
      </div>
    </div>
  );
};

export default PredictionTabs;

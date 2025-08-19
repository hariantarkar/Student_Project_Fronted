import React from "react";
import { Outlet } from "react-router-dom";
import AdminDashboard from "../DashboardComponent/AdminDashboard.jsx";

export default function AdminLayout() {
  return (
    <div className="d-flex">
      <AdminDashboard />

      {/* Right content changes based on route */}
      <div className="content flex-grow-1 p-3">
        <Outlet />
      </div>
    </div>
  );
}
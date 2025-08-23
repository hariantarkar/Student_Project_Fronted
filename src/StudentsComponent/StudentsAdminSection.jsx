import React from "react";
import { Outlet } from "react-router-dom";
import AdminDashboard from "../DashboardComponent/AdminDashboard.jsx";

export default function AdminLayout() {
  return (
    <div className="d-flex">
      <AdminDashboard />
      <div className="content flex-grow-1 p-3">
        <Outlet />
      </div>
    </div>
  );
}
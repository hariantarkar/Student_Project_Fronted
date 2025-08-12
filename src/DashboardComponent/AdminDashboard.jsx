import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Book, People,Speedometer, GraphUp, PersonBadge, BoxArrowRight } from 'react-bootstrap-icons';
import "./adminDashboard.css"
export default function SidebarWithDashboard() {
  

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div className="border" style={{ width: '250px' }}>
        <h5 className="p-3 border-bottom">Admin</h5>
        <ul className="list-unstyled ps-3">
          <li className="mb-2 d-flex align-items-center px-2">
            <Book className="me-2" /> Course
          </li>
          <li className="mb-2 d-flex align-items-center px-2">
            <People className="me-2" /> Student
          </li>
          <li className="mb-2 d-flex align-items-center px-2">
            <Speedometer className="me-2" /> Performance
          </li>
          <li className="mb-2 d-flex align-items-center px-2">
            <GraphUp className="me-2" /> Prediction
          </li>
          <li className="mb-2 d-flex align-items-center px-2">
            <PersonBadge className="me-2" /> Admin
          </li>
          <li className="mb-2 d-flex align-items-center px-2 text-danger" style={{ cursor: 'pointer' }}>
            <BoxArrowRight className="me-2" /> Logout
          </li>
        </ul>
      </div>

      {/* <div className="dashboard container mt-5 flex-grow-1">
        <div className="card shadow-lg p-4">
          <h2 className="text-center mb-4">Admin Dashboard</h2>
          <p className="text-muted text-center">
            Welcome, Admin! Here you can manage courses, view students, and track performance.
          </p>
          <div className="row mt-4 d-flex flex-column gap-3">
            <div className="col-md-4">
              <div className="card card-hover text-center p-3 border-primary">
                <h5>Manage Courses</h5>
                <button className="btn btn-primary mt-2">Go</button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card card-hover text-center p-3 border-success">
                <h5>Manage Students</h5>
                <button className="btn btn-success mt-2">Go</button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card card-hover text-center p-3 border-warning">
                <h5>Performance Reports</h5>
                <button className="btn btn-warning mt-2">Go</button>
              </div>
            </div>
          </div>
        </div>
      </div>*/}
    </div> 
  );
}

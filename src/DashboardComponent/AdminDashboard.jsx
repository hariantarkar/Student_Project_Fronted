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
            <People className="me-2" /> Students
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
    </div> 
  );
}

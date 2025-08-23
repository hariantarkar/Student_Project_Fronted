import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./NavBars.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand app-title">
        🎯 <span className="highlight"><i>Student</i></span> <i>Predictor</i></span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/keyfeature">Feature</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
            <li className="nav-item dropdown">
              <span className="nav-link  login-link" id="loginDropdown" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">Login</span>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="loginDropdown">
                <li>
                  <NavLink className="dropdown-item" to="/login/admin">
                    Admin Login
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/login/student">
                    Student Login
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

import React from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
export default class Home extends React.Component {
  render() {
    return (
      <div className="home-container">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <div className="container-fluid">
            <span className="navbar-brand fw-bold">Students Perfomance Prediction </span>
            <div className="ms-auto">
              <button className="btn btn-outline-primary">Login</button>
            </div>
          </div>
        </nav>

        {/* Background section */}
        <div className="background-section d-flex align-items-end">
          <div className="p-3">
            <button className="btn btn-primary btn-lg fw-bold">
              Get Starting! 
            </button>
          </div>
        </div>
      </div>
    );
  }
}

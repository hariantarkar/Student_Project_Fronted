import React from "react";
import "./HomePage.css";
import "./NavBars"
export default function HomePage() {
  return (
    <div className="app-root d-flex flex-column vh-100">
      <main className="flex-fill d-flex align-items-center justify-content-center hero">
        <div className="container">
          <div className="hero-card mx-auto">
            <h1 className="hero-title">Welcome ! <br></br>Student Performance Prediction System </h1>
            <p className="hero-sub">
              <b>Analyze student data to forecast academic performance with accuracy.</b>
            </p>
            <div className="d-flex justify-content-center">
              <a href="/overview
              " className="btn btn-cta">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer bg-dark text-white text-center py-2">
        &copy; {new Date().getFullYear()} Student Performance Predictor | All rights reserved
      </footer>
    </div>
  );
}


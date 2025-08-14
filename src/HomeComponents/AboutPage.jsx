import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold">About Our Prediction System</h1>
          <p className="lead">
            Empowering educators with AI-driven insights to improve student success.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-5">
        {/* Purpose */}
        <h2 className="fw-bold text-dark mb-3">📌 Purpose</h2>
        <p>
          The Student Performance Prediction Web Application uses a trained Linear Regression
          model to predict a student's academic readiness. By analyzing data such as attendance,
          mock interview scores, and test performance, the system helps educators identify students
          who may need additional support and provide timely interventions.
        </p>

        {/* Objectives */}
        <h2 className="fw-bold text-dark mt-5 mb-3">🎯 Objectives</h2>
        <ul>
          <li>Allow admins to input student performance-related data.</li>
          <li>Predict student’s final readiness using AI models.</li>
          <li>Visualize academic insights and performance trends.</li>
          <li>Store student and prediction data securely in MySQL.</li>
        </ul>

        {/* Architecture */}
        <h2 className="fw-bold text-dark mt-5 mb-3">🏗 Architectural Overview</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h5>Presentation Layer</h5>
              <p>Responsive React + Bootstrap interface for input and result display.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h5>Application Layer</h5>
              <p>Node.js + Express.js for API handling, ML prediction logic, and routing.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h5>Data Layer</h5>
              <p>MySQL database for storing student details, scores, and predictions.</p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <h2 className="fw-bold text-dark mt-5 mb-3">🛠 Tech Stack</h2>
        <div className="row text-center g-4">
          {[
            { title: "Frontend", desc: "React + Bootstrap" },
            { title: "Backend", desc: "Node.js + Express.js" },
            { title: "Database", desc: "MySQL" },
            { title: "Auth", desc: "JWT + Bcrypt" },
          ].map((tech, i) => (
            <div key={i} className="col-md-3">
              <div className="card shadow-sm p-3">
                <h6>{tech.title}</h6>
                <p>{tech.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <h2 className="fw-bold text-dark mt-5 mb-3">✨ Key Features</h2>
        <ul>
          <li>Role-based access for Admin and Student.</li>
          <li>Real-time predictions of student readiness.</li>
          <li>Interactive performance dashboards.</li>
          <li>Shortlisting feature for top-performing students.</li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        &copy; {new Date().getFullYear()} Student Performance Predictor | Powered by React & Node.js
      </footer>
    </div>
  );
}

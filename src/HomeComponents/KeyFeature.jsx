import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./KeyFeature.css";
import Navbar from "./NavBars";
export default function KeyFeature() {
  return (
    <div className="keyfeature-page container py-5">
      {/* About the Project */}
      <section className="about-section text-center mb-5">
        <h2 className="mb-3">About </h2>
        <p>This web application predicts student performance using a trained Linear Regression model.</p>
        <p>It allows educators to input academic and skill-based data for accurate forecasting.</p>
        <p>Designed to identify at-risk students early and enable proactive intervention.</p>
      </section>

      {/* Key Features */}
      <section>
        <h3 className="text-center mb-4">Key Features</h3>
        <div className="row g-4">
          {/* Feature 1 */}
          <div className="col-md-6 col-lg-3">
            <div className="feature-card p-4 text-center">
              <h5>Performance Tracking</h5>
              <p>Track attendance, test scores, and interview performance for each student.</p>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="col-md-6 col-lg-3">
            <div className="feature-card p-4 text-center">
              <h5>Prediction Engine</h5>
              <p>Forecast student readiness levels using a Linear Regression-based model.</p>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="col-md-6 col-lg-3">
            <div className="feature-card p-4 text-center">
              <h5>Data Visualization</h5>
              <p>View performance trends and readiness stats with intuitive dashboards.</p>
            </div>
          </div>
          {/* Feature 4 */}
          <div className="col-md-6 col-lg-3">
            <div className="feature-card p-4 text-center">
              <h5>Student Shortlisting</h5>
              <p>Identify and filter job-ready students for placement drives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Card */}
      <section className="contact-section mt-5">
        <h3 className="text-center mb-4">Contact Us</h3>
        <div className="contact-card mx-auto p-4 text-center">
          <h5>Student Performance Predictor Team</h5>
          <p>Email: ganesh@gmail.com</p>
          <p>Phone: +91-7721979361</p>
        </div>
      </section>
    </div>
  );
}

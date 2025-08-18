import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./KeyFeature.css";
import Navbar from "./NavBars";

export default function KeyFeature() {
  return (
    <div className="keyfeature-page container py-5">
      <section>
        <h3 className="text-center mb-4">Key Features</h3>
        <div className="row g-4">
          <div className="col-md-6 col-lg-4">
            <div className="feature-card p-4 text-center">
              <h5>Accurate Performance Prediction</h5>
              <p>Uses Linear Regression to forecast student academic outcomes based on key academic factors.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="feature-card p-4 text-center">
              <h5>Comprehensive Data Analysis</h5>
              <p>Considers study hours, attendance, mock interviews, MCQ scores, and internal assessments.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="feature-card p-4 text-center">
              <h5>Early Identification of Weak Students</h5>
              <p>Detects performance gaps in advance, allowing timely academic intervention.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="feature-card p-4 text-center">
              <h5>Actionable Insights for Educators</h5>
              <p>Provides teachers and administrators with meaningful reports to guide decision-making.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="feature-card p-4 text-center">
              <h5>Student Progress Tracking</h5>
              <p>Helps learners monitor their own academic growth and take responsibility for improvement.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="feature-card p-4 text-center">
              <h5>Scalable & Future-Ready Design</h5>
              <p>Built to integrate advanced machine learning models and institutional dashboards.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

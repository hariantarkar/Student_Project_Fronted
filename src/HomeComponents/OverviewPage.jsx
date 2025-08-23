import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OverviewPage.css";
import Navbar from "./NavBars";

export default function Overview() {
  return (
    <div className="keyfeature-page container py-5">
      <section className="about-section container my-3">
        <h2 className="text-center mb-4">Application Overview</h2>
        <p>
          The <strong>Student Performance Predictor</strong> is a full-stack web-based system
          designed to help students and administrators track, analyze, and predict academic
          performance. Built with <strong>React.js</strong> for the frontend,
          <strong> Node.js & Express.js</strong> for the backend, and <strong>MySQL</strong>
          for data storage, the platform provides a secure and efficient way to manage
          performance records.
        </p>

        <p>
          The system supports <strong>role-based access</strong> using JWT authentication:
          administrators can manage courses, student data, and performance scores, while
          students can log in to view their results and progress. Performance data such as
          <em> attendance percentage, machine test scores, MCQ test results, and mock interview
            performance </em> are recorded and weighted to calculate a <strong>final score</strong>
          and <strong>percentage</strong>.
        </p>

        <p>
          Using data-driven calculations, the platform provides <strong>predictive insights</strong>
          into student outcomes, enabling better academic planning. Key features include
          <strong> secure login & registration</strong>, <strong> interactive dashboards</strong>,
          <strong> performance visualization with charts</strong>, and <strong> automated reporting</strong>.
          This makes the system a powerful tool for monitoring progress, identifying weak areas,
          and supporting data-driven decision-making in education.
        </p>
      </section>

      <section className="team-section mt-5">
        <h3 className="text-center mb-4">Meet Our Team</h3>
        <div className="row g-4 justify-content-center">
          <div className="col-md-5">
            <div className="team-card p-4 text-center">
              <h4>Ganesh Jadhav</h4>
              <p><strong>Role:</strong> Full Stack Developer</p>
              <p><strong>Email:</strong> ganeshsjadhav3112@gmail.com</p>
              <p><strong>Phone:</strong> +91-7721979361</p>
            </div>
          </div>
          <div className="col-md-5">
            <div className="team-card p-4 text-center">
              <h4>Hari Antarkar</h4>
              <p><strong>Role:</strong> Full Stack Developer</p>
              <p><strong>Email:</strong> harishantarkar3738@gmail.com</p>
              <p><strong>Phone:</strong> +91-9309540376</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

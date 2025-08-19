import React from "react";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="about-root d-flex flex-column">
      <main className="flex-fill hero-about d-flex align-items-center">
        <div className="container">
          <div className="about-card mx-auto">
            <section className="about-section">
              <h2 className="section-title">Introduction</h2>
              <p className="section-text">
                The <b>Student Performance Prediction System</b> is an innovative web-based
                platform developed to forecast student academic outcomes using advanced{" "}
                <b>Linear Regression techniques</b>. By analyzing crucial factors such as study
                hours, attendance records, mock interview results, MCQ test scores, and internal
                assessments, the system provides an accurate prediction of a student’s final
                performance.
              </p>
              <p className="section-text">
                This initiative bridges the gap between <b>data analytics and education</b>,
                offering teachers, students, and institutions the ability to make informed
                academic decisions.
              </p>
            </section>

            <section className="about-section">
              <h2 className="section-title">Vision</h2>
              <p className="section-text">
                Our vision is to create a <b>data-driven academic ecosystem</b> where technology
                empowers education. We aspire to build a future where institutions can proactively
                support students, ensuring that every learner reaches their{" "}
                <b>maximum potential</b>.
              </p>
            </section>

            <section className="about-section">
              <h2 className="section-title">Mission</h2>
              <ul className="section-list">
                <li>Enable <b>early identification</b> of academically weak students.</li>
                <li>Provide <b>actionable insights</b> for teachers and administrators.</li>
                <li>Encourage students to take responsibility for their <b>academic progress</b>.</li>
                <li>
                  Support institutions with <b>real-time data analytics</b> for better
                  decision-making.
                </li>
              </ul>
            </section>

            <section className="about-section">
              <h2 className="section-title">Future Scope</h2>
              <ul className="section-list">
                <li>
                  Integrating additional machine learning models for{" "}
                  <b>higher prediction accuracy</b>.
                </li>
                <li>
                  Expanding features to include <b>personalized learning recommendations</b>.
                </li>
                <li>
                  Offering <b>institution-wide dashboards</b> to analyze trends across departments
                  and classes.
                </li>
                <li>
                  Supporting integration with <b>Learning Management Systems (LMS)</b> for seamless
                  data flow.
                </li>
                <li>
                  Leveraging <b>AI-powered interventions</b> to provide targeted support for
                  struggling students.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}


import React, { useState } from "react";
import { saveCourse } from "../services/courseService";

export default function CourseComponent() {
  const [courseName, setCourseName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!courseName.trim()) {
      setMessage("Please enter a course name.");
      return;
    }

    try {
      const backendMessage = await saveCourse(courseName);
      setMessage(backendMessage);  // <-- show message from backend
      setCourseName("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container bg-dark p-5 mt-4">
      <h2>Add Course</h2>
      {message && <div className="alert alert-info ">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="courseName" className="form-label">
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            className="form-control"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Enter course name"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Course
        </button>
      </form>
    </div>
  );
}

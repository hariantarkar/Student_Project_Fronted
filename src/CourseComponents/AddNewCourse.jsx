import React, { Component } from "react";
import { saveCourse } from "../services/courseService";
import { validateNewCourse } from "../Validations/AddNewCourseValid";
export default class AddNewCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: "",
      message: ""
    };
  }

  handleChange = (e) => {
    this.setState({ courseName: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ message: "" });

    if (!this.state.courseName.trim()) {
      this.setState({ message: "Please enter a course name." });
      return;
    }

    try {
      const backendMessage = await saveCourse(this.state.courseName);
      this.setState({ message: backendMessage, courseName: "" });
    } catch (error) {
      this.setState({ message: error.message });
    }

    setTimeout(() => {
      this.setState({ message: "" });
    }, 2000);
  };

  render() {
    return (
      <div
        className="container"
        style={{ backgroundColor: "success", color: "white", width: "50%" }}
      >
        <h3 className="text-center mb-4">Add New Course</h3>
        {this.state.message && (
          <div className="alert alert-info">{this.state.message}</div>
        )}
        <form onSubmit={this.handleSubmit}>
          <div className="mb-2">
            <label htmlFor="courseName" className="form-label">
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              className="form-control"
              value={this.state.courseName}
              onChange={this.handleChange}
              placeholder="Enter course name"
              onKeyUp={() =>validateNewCourse(this.state.courseName)}
            /><span id="s"></span>
          </div>
          <button type="submit" className="btn btn-primary">
            Add New Course
          </button>
        </form>
      </div>
    );
  }
}



import React from "react";
import { deleteCourse } from "../services/courseService";

export default class DeleteCourse extends React.Component {
  state = { deleting: false };

  handleDelete = () => {
    const { course, onClose } = this.props;
    this.setState({ deleting: true });

    deleteCourse(course.cid)
      .then((res) => {
        onClose({
          type: "success",
          text: res?.message || "Course deleted successfully",
        });
         setTimeout(() => {
      onClose(); 
    }, 1000);
        
      })
      .catch((err) => {
        onClose({
          type: "danger",
          text: err?.message || "Failed to delete course",
        });
      })
      .finally(() => {
       
        this.setState({ deleting: false });
      });
  };

  render() {
    const { course, onClose } = this.props;
    const { deleting } = this.state;

    return (
      <div className="container mt-5">
        <div className="card shadow-sm mx-auto" style={{ maxWidth: 520 }}>
          <div className="card-body">
            <h4 className="card-title text-danger text-center mb-3">
              Delete Course
            </h4>

            <p className="mb-4 text-center">
              Are you sure you want to delete{" "}
              <strong>{course?.name}</strong> (ID: {course?.cid})?
            </p>

            <div className="d-flex gap-2">
              <button
                className="btn btn-danger flex-fill"
                onClick={this.handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting…" : "Confirm Delete"}
              </button>
              <button
                className="btn btn-secondary flex-fill"
                onClick={() => onClose()}
                disabled={deleting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

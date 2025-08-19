// import React, { Component } from "react";
// import { deleteCourse } from "../services/courseService";

// export default class DeleteCourse extends Component {
//   handleDelete = () => {
//     deleteCourse(this.props.course.cid)
//       .then(() => {
//         alert("Course deleted successfully!");
//         this.props.onClose(); // back to ViewAllCourses
//       })
//       .catch((err) => console.error("Delete error:", err));
//   };

//   render() {
//     const { course } = this.props;
//     return (
//       <div className="container mt-4 border p-4" style={{ width: "50vh" }}>
//         <h4 className="text-center mb-3 text-danger">Delete Course</h4>
//         <p>Are you sure you want to delete the course:</p>
//         <h5>{course.name} (ID: {course.cid})</h5>
//         <div className="d-flex justify-content-between mt-3">
//           <button className="btn btn-danger" onClick={this.handleDelete}>
//             Confirm Delete
//           </button>
//           <button className="btn btn-secondary" onClick={this.props.onClose}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     );
//   }
// }


import React from "react";
import { deleteCourse } from "../services/courseService";

export default class DeleteCourse extends React.Component {
  state = { deleting: false, error: null };

  handleDelete = () => {
    const { course } = this.props;
    this.setState({ deleting: true, error: null });

    deleteCourse(course.cid)
      .then((res) => {
        const msg = res?.message || "Course deleted successfully";
        this.props.onClose({ type: "success", text: msg });
      })
      .catch((err) => {
        this.setState({ deleting: false, error: err.message || "Failed to delete course" });
      });
  };

  render() {
    const { course } = this.props;
    const { deleting, error } = this.state;

    return (
      <div className="container mt-5">
        <div className="card shadow-sm mx-auto" style={{ maxWidth: 520 }}>
          <div className="card-body">
            <h4 className="card-title text-danger text-center mb-3">Delete Course</h4>

            {error && <div className="alert alert-danger">{error}</div>}

            <p className="mb-4 text-center">
              Are you sure you want to delete <strong>{course?.name}</strong> (ID: {course?.cid})?
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
                onClick={() => this.props.onClose()}
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



import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllCourses } from "../services/courseService";
import UpdateCourse from "./UpdateCourse";
import DeleteCourse from "./DeleteCourse";

export default class ViewAllCourses extends React.Component {
  state = {
    courses: [],
    mode: null,              
    selectedCourse: null,   
    loading: true,
    notice: null            
  };

  componentDidMount() {
    this.loadCourses();
  }

  loadCourses = () => {
    this.setState({ loading: true });
    getAllCourses()
      .then((res) => {
        const rows = Array.isArray(res) ? res : res.data || [];
        this.setState({ courses: rows, loading: false });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          notice: { type: "danger", text: err.message || "Failed to load courses" }
        });
      });
  };

  openUpdate = (course) => this.setState({ mode: "update", selectedCourse: course });
  openDelete = (course) => this.setState({ mode: "delete", selectedCourse: course });

 
  handleClose = (notice) => {
    this.setState(
      { mode: null, selectedCourse: null, notice: notice || null },
      this.loadCourses 
    );
  };

  renderList() {
    const { courses, loading } = this.state;

    return (
      <div className="container mt-4" style={{ backgroundColor: "teal", color: "white", maxWidth: 900 }}>
        <h3 className="text-center mb-4">All Courses</h3>

        {loading && <div className="text-center py-3">Loading…</div>}

        {!loading && (
          <table className="table table-bordered table-hover"
            style={{ backgroundColor: "teal", color: "white" }}>
            <thead className="text-center align-middle">
              <tr>
                <th>ID</th>
                <th style={{ width: "40%" }}>Course Name</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="text-center align-middle">
              {courses.length === 0 && (
                <tr><td colSpan="4" className="py-4">No courses found</td></tr>
              )}
              {courses.map((c) => (
                <tr key={c.cid}>
                  <td>{c.cid}</td>
                  <td>{c.name}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      style={{ width: 80 }}
                      onClick={() => this.openUpdate(c)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      style={{ width: 80 }}
                      onClick={() => this.openDelete(c)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  render() {
    const { mode, selectedCourse, notice } = this.state;

    return (
      <>
        {notice && (
          <div className={`alert alert-${notice.type} text-center m-3`}>
            {notice.text}
          </div>
        )}

        {mode === "update" && selectedCourse ? (
          <UpdateCourse course={selectedCourse} onClose={(result) => {
            if (result?.type === "success") {
              alert(result.text);
            }
            this.handleClose(result);  
          }} />
        ) : mode === "delete" && selectedCourse ? (
          <DeleteCourse course={selectedCourse} onClose={this.handleClose} />
        ) : (
          this.renderList()
        )}
      </>
    );
  }
}



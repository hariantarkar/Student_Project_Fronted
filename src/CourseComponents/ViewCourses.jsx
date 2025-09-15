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
    notice: null,
    currentPage: 1,
    pageSize: 5,
    totalPages: 0,
    totalSelectValue: ""
  };

  componentDidMount() {
    this.loadCourses();
  }

  loadCourses = () => {
    this.setState({ loading: true });
    getAllCourses().then((res) => {
        const rows = Array.isArray(res) ? res : res.data || [];
        const totalPages = Math.max(1, Math.ceil(rows.length / this.state.pageSize));
        this.setState({ courses: rows, loading: false, totalPages, totalSelectValue: "" });
      
      }).catch((err) => {
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

  handlePageChange = (page) => {
    if (page >= 1 && page <= this.state.totalPages) {
      this.setState({ currentPage: page });
    }
  };

  handlePageSizeChange = (e) => {
    const pageSize = parseInt(e.target.value, 10) || 5;
    const totalPages = Math.max(1, Math.ceil(this.state.courses.length / pageSize));
    this.setState({ pageSize, currentPage: 1, totalPages, totalSelectValue: "" });
  };

  handleTotalSelectChange = (e) => {
    const page = parseInt(e.target.value, 10);
    if (!isNaN(page)) {
      this.handlePageChange(page);
      this.setState({ totalSelectValue: "" });
    }
  };

  generatePageSizes = (total) => {
    const steps = [5, 10, 20, 50, 100];
    let sizes = [];
    steps.forEach((size) => {
      if (size < total) sizes.push(size);
    });
    let next = steps[steps.length - 1];
    while (next < total) {
      next *= 2;
      if (next < total) sizes.push(next);
    }
    sizes.push(total);
    return sizes;
  };

  renderList() {
    const { courses, loading, currentPage, pageSize, totalPages, totalSelectValue } = this.state;
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedCourses = courses.slice(startIndex, startIndex + pageSize);

    return (
      <div className="container mt-4" style={{ backgroundColor: "teal", color: "white", maxWidth: 900 }}>
        <h3 className="text-center mb-4 text-white">All Courses</h3>

        {loading && <div className="text-center py-3">Loading…</div>}

        {!loading && (
          <>
            <table className="table table-bordered table-hover" style={{ backgroundColor: "teal", color: "white" }}>
              <thead className="text-center align-middle">
                <tr>
                  <th>S.No</th>
                  <th style={{ width: "40%" }}>Course Name</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody className="text-center align-middle">
                {paginatedCourses.length === 0 && (
                  <tr><td colSpan="4" className="py-4">No courses found</td></tr>
                )}
                {paginatedCourses.map((c, index) => (
                  <tr key={c.cid}>
                    <td>{startIndex + index + 1}</td>
                    <td>{c.name}</td>
                    <td>
                      <button className="btn btn-warning btn-sm text-center  py-1"
                        style={{ width: 80, height: 35 }} onClick={() => this.openUpdate(c)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-danger btn-sm"
                        style={{ width: 80, height: 35 }} onClick={() => this.openDelete(c)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


            <div className="d-flex justify-content-between align-items-center mt-3">

              <div className="d-flex align-items-center">
                <label className="me-2">Show</label>
                <select className="form-select form-select-sm w-auto"
                  value={pageSize} onChange={this.handlePageSizeChange}
                >
                  {this.generatePageSizes(courses.length).map((size) => (
                    <option key={size} value={size}>
                      {size === courses.length ? "All" : size}
                    </option>
                  ))}
                </select>
                <label className="ms-2">entries</label>
              </div>


              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-dark btn-sm"
                  onClick={() => this.handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ← Prev
                </button>

                <span className="border px-3 py-1 rounded bg-white text-dark fw-bold">
                  {currentPage}
                </span>

                <button className="btn btn-dark btn-sm"
                  onClick={() => this.handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>


              <div>
                <label className="me-2">Total Page</label>
                <select className="form-select form-select-sm d-inline-block w-auto"
                  onChange={this.handleTotalSelectChange} value={totalSelectValue}
                >
                  <option value="" disabled>({totalPages})</option>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
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
            }}
          />
        ) : mode === "delete" && selectedCourse ? (
          <DeleteCourse course={selectedCourse} onClose={this.handleClose} />
        ) : (
          this.renderList()
        )}
      </>
    );
  }
}

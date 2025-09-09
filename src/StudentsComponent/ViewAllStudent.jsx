
import React from "react";
import { getStudents, deleteStudent } from "../services/studentService.jsx";
import UpdateStudent from "../StudentsComponent/Updateatudent.jsx";

export default class ViewAllStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      error: "",
      currentRange: { start: 0, end: 5 },
      pageSize: 5,
      currentPage: 1,
      editingStudent: null,
    };
  }

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = async () => {
    try {
      const data = await getStudents();
      const students = data || [];
      this.setState({
        students,
        error: "",
        currentRange: { start: 0, end: Math.min(this.state.pageSize, students.length) },
        currentPage: 1,
      });
    } catch (err) {
      console.error(err);
      this.setState({ error: err.message, students: [] });
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

    sizes.push(total); // Always add "All"
    return sizes;
  };

  handleDelete = async (sid) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(sid);
        this.fetchStudents();
      } catch (err) {
        this.setState({ error: "Failed to delete student" });
      }
    }
  };

  handlePageChange = (page) => {
    const { pageSize, students } = this.state;
    const totalPages = Math.ceil(students.length / pageSize);

    if (page < 1 || page > totalPages) return;

    const start = (page - 1) * pageSize;
    const end = Math.min(start + pageSize, students.length);

    this.setState({
      currentPage: page,
      currentRange: { start, end },
    });
  };

  handlePageSizeChange = (newSize) => {
    const pageSize = parseInt(newSize, 10);
    const { students } = this.state;

    this.setState({
      pageSize,
      currentPage: 1,
      currentRange: { start: 0, end: Math.min(pageSize, students.length) },
    });
  };

  handleUpdateClick = (student) => {
    this.setState({ editingStudent: student });
  };

  handleCloseUpdate = () => {
    this.setState({ editingStudent: null });
    this.fetchStudents();
  };

  render() {
    const { students, error, currentRange, pageSize, currentPage, editingStudent } = this.state;
    const totalPages = Math.ceil(students.length / pageSize);
    const paginatedStudents = students.slice(currentRange.start, currentRange.end);

    return (
      <div className="container mt-4">
        <h2 className="text-center mb-4 p-2 rounded" style={{ backgroundColor: "#00796b", color: "white" }}>
          All Students
        </h2>

        <div className="card p-3">
          {error && <p className="text-danger">{error}</p>}

          {editingStudent ? (
            <UpdateStudent student={editingStudent} onClose={this.handleCloseUpdate} />
          ) : (
            <>
              <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
                <table className="table table-bordered text-center align-middle table-hover">
                  <thead className="table-dark" style={{ position: "sticky", top: "0", zIndex: "2" }}>
                    <tr>
                      <th>SR.No</th> 
                      <th>Name</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>Course Name</th>
                      <th>Delete</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedStudents.length > 0 ? (
                      paginatedStudents.map((s, index) => (
                        <tr key={s.sid}>
                          <td>{currentRange.start + index + 1}</td> 
                          <td>{s.name}</td>
                          <td>{s.email}</td>
                          <td>{s.contact}</td>
                          <td>{s.course_name}</td>
                          <td>
                            <button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(s.sid)}>
                              Delete
                            </button>
                          </td>
                          <td>
                            <button className="btn btn-warning btn-sm" onClick={() => this.handleUpdateClick(s)}>
                              Update
                            </button>
                          </td>
                        

                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No students data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

             
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="d-flex align-items-center">
                  <label className="text-dark fw-bold mb-0 me-2">Show</label>
                  <select
                    className="form-select w-auto"
                    value={pageSize}
                    onChange={(e) => this.handlePageSizeChange(e.target.value)}
                  >
                    {this.generatePageSizes(students.length).map((size) => (
                      <option key={size} value={size}>
                        {size === students.length ? "All" : size}
                      </option>
                    ))}
                  </select>
                  <label className="text-dark fw-bold mb-0 ms-2">entries</label>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-dark"
                    onClick={() => this.handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    ← Preview
                  </button>
                  <span className="border px-3 py-2 rounded bg-white text-dark fw-bold">
                     {currentPage}
                  </span>
                  <button
                    className="btn btn-dark"
                    onClick={() => this.handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next →
                  </button>
                </div>

                <div>
                  <label className="fw-bold text-dark me-2">Total</label>
                  <select
                    className="form-select d-inline-block w-auto"
                    onChange={(e) => this.handlePageChange(parseInt(e.target.value))}
                    value=""
                  >
                    <option value="" disabled>
                      Total Page ({totalPages})
                    </option>
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
      </div>
    );
  }
}


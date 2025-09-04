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
      ranges: [],
      pageSize: 5,
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
      this.setState((prev) => ({
        students,
        error: "",
        ranges: this.generateRanges(students.length, prev.pageSize),
        currentRange: { start: 0, end: Math.min(prev.pageSize, students.length) },
      }));
    } catch (err) {
      console.error(err);
      this.setState({ error: err.message, students: [] });
    }
  };

  generateRanges = (total, pageSize) => {
    let ranges = [];
    for (let i = 0; i < total; i += pageSize) {
      const start = i + 1;
      const end = Math.min(i + pageSize, total);
      ranges.push(`${start}-${end}`);
    }
    if (total > pageSize) {
      ranges.push(`1-${total}`);
    }
    return ranges;
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

  handlePageChange = (range) => {
    const [startStr, endStr] = range.split("-");
    let start = parseInt(startStr, 10) - 1;
    let end = parseInt(endStr, 10);

    const fullRange = `1-${this.state.students.length}`;
    if (range === fullRange) {
      this.setState({ currentRange: { start: 0, end: this.state.students.length } });
    } else {
      this.setState({ currentRange: { start, end } });
    }
  };

  handlePageSizeChange = (newSize) => {
    const pageSize = parseInt(newSize, 10);
    const { students } = this.state;

    this.setState({
      pageSize,
      ranges: this.generateRanges(students.length, pageSize),
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
    const { students, error, currentRange, ranges, pageSize, editingStudent } = this.state;
    const paginatedStudents = students.slice(currentRange.start, currentRange.end);

    return (
      <div className="container mt-4" style={{ backgroundColor: "teal", color: "white" }}>
        <h3 className="mb-3 text-center text-white">All Students</h3>

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
                      <th>SID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>User_ID</th>
                      <th>Course Name</th>
                      <th>Delete</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedStudents.length > 0 ? (
                      paginatedStudents.map((s) => (
                        <tr key={s.sid}>
                          <td>{s.sid}</td>
                          <td>{s.name}</td>
                          <td>{s.email}</td>
                          <td>{s.contact}</td>
                          <td>{s.uid}</td>
                          <td>{s.course_name}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => this.handleDelete(s.sid)}
                            >
                              Delete
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => this.handleUpdateClick(s)}
                            >
                              Update
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No students data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

    
              <div className="d-flex justify-content-end align-items-center gap-4 mt-2">
                <div className="d-flex align-items-center">
                  <label className="text-dark fw-bold mb-0 me-2">Show</label>
                  <select
                    className="form-select w-auto"
                    value={pageSize}
                    onChange={(e) => this.handlePageSizeChange(e.target.value)}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={students.length}>All</option>
                  </select>
                  <label className="text-dark fw-bold mb-0 ms-2">entries</label>
                </div>

                {pageSize !== students.length && ranges.length > 1 && (
                  <select
                    className="form-select w-auto"
                    onChange={(e) => this.handlePageChange(e.target.value)}
                  >
                    {ranges.map((r, idx) => (
                      <option key={idx} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

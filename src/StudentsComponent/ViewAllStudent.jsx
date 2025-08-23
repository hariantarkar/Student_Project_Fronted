
import React from "react";
import { getStudents, deleteStudent } from "../services/studentService.jsx";

export default class ViewAllStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      error: "",
    };
  }

  componentDidMount() {
    this.fetchStudents();
  }
  fetchStudents = async () => {
    try {
      const data = await getStudents();
      this.setState({ students: data || [], error: "" });
    } catch (err) {
      console.error(err);
      this.setState({ error: err.message, students: [] });
    }
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

  render() {
    const { students, error } = this.state;

    return (
      <div
        className="container mt-4"
        style={{ backgroundColor: "teal", color: "white" }}
      >
        <h3 className="mb-3 text-center">All Students</h3>

        <div className="card p-3">
          {error && <p className="text-danger">{error}</p>}
          <div
            className="table-responsive"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <table className="table table-bordered text-center align-middle table-hover">
              <thead
                className="table-dark"
                style={{ position: "sticky", top: "0", zIndex: "2" }}
              >
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
                {students.length > 0 ? (
                  students.map((s) => (
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
        </div>
      </div>
    );
  }
}

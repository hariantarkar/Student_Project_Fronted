import React from "react";
import { getStudents, addStudent } from "../studentServices/studentService.jsx";

export default class StudentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "add",
      name: "",
      email: "",
      contact: "",
      uid: "",
      cid: "",
      students: [],
      error: "",
    };
  }

  componentDidMount() {
    // Load students immediately if default tab is "view"
    if (this.state.activeTab === "view") {
      this.fetchStudents();
    }
  }

  // Fetch all students
  fetchStudents = async () => {
    try {
      const data = await getStudents();
      console.log("API Response:", data);
      this.setState({ students: data || [], error: "" });
    } catch (err) {
      console.error(err);
      this.setState({ error: err.message, students: [] });
    }
  };

  // Handle input change
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Add student
  handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const { name, email, contact, uid, cid } = this.state;
      await addStudent({ name, email, contact, uid, cid });
      alert("✅ Student added successfully");

      // Clear form
      this.setState({
        name: "",
        email: "",
        contact: "",
        uid: "",
        cid: "",
      });

      // If currently viewing students, refresh table
      if (this.state.activeTab === "view") {
        this.fetchStudents();
      }
    } catch (err) {
      console.error(err);
      alert(" Failed to add student");
    }
  };

  // Switch tabs
  setTab = (tab) => {
    this.setState({ activeTab: tab }, () => {
      if (tab === "view") {
        this.fetchStudents();
      }
    });
  };

  render() {
    const { activeTab, students, error } = this.state;

    return (
      <div className="container mt-4">
        {/* Tabs */}
        <div className="mb-3 d-flex">
          <button
            className={`btn me-2 ${
              activeTab === "add" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => this.setTab("add")}
          >
            Add New Student
          </button>
          <button
            className={`btn ${
              activeTab === "view" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => this.setTab("view")}
          >
             View All Students
          </button>
        </div>

        {/* Content */}
        <div className="card p-3">
          {activeTab === "add" && (
            <form onSubmit={this.handleAddStudent}>
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Contact</label>
                <input
                  type="text"
                  name="contact"
                  className="form-control"
                  value={this.state.contact}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>User ID</label>
                <input
                  type="text"
                  name="uid"
                  className="form-control"
                  value={this.state.uid}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Course ID</label>
                <input
                  type="text"
                  name="cid"
                  className="form-control"
                  value={this.state.cid}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <button className="btn btn-success">Add Student</button>
            </form>
          )}

          {activeTab === "view" && (
            <div>
              {error && <p className="text-danger">{error}</p>}
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>SID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>UID</th>
                    <th>Course Name</th>
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
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No students data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}







import React from "react";
import { getStudents } from "../studentServices/studentService.jsx";

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

  render() {
    const { students, error } = this.state;

    return (
      <div className="container mt-4"style={{ backgroundColor: "teal", color: "white" }}>
        <h3 className="mb-3 text-center">View All Students</h3>
        <div className="card p-3">
          {error && <p className="text-danger">{error}</p>}
          <table className="table table-bordered text-center align-middle">
            <thead>
              <tr>
                <th>SID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>User_ID</th>
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
      </div>
    );
  }
}

import React from "react";
import { updateStudent } from "../services/studentService";
import { getAllCourses } from "../services/courseService"; 

export default class UpdateStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sid: props.student?.sid ?? "",
      name: props.student?.name ?? "",
      email: props.student?.email ?? "",
      contact: props.student?.contact ?? "",
      uid: props.student?.uid ?? "",
      cid: props.student?.cid ?? "",
      courses: [], 
      saving: false,
      error: null,
    };
  }

  componentDidMount() {
    getAllCourses()
      .then((courses) => this.setState({ courses }))
      .catch((err) => console.error("Failed to load courses:", err));
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleUpdate = () => {
    const { sid, name, email, contact, uid, cid } = this.state;
    this.setState({ saving: true, error: null });

    updateStudent(sid, name, email, contact, uid, cid)
      .then((res) => {
        const msg = res?.message || "Student updated successfully";
        alert(msg);
        this.props.onClose();
      })
      .catch((err) => {
        this.setState({
          saving: false,
          error: err.message || "Failed to update student",
        });
      });
  };

  render() {
    const { sid, name, email, contact, uid, cid, courses, saving, error } =
      this.state;

    return (
      <div className="container mt-5">
        <div className="card shadow-sm mx-auto" style={{ maxWidth: 600 }}>
          <div className="card-body">
            <h4 className="card-title text-center mb-4">Update Student</h4>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label className="form-label">Student ID</label>
              <input className="form-control" value={sid} disabled />
            </div>

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                name="name"
                value={name}
                onChange={this.handleChange}
                onKeyUp={() => UpdateStudentValid("name", name)}
              />
              <span id="sname"></span>
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                name="email"
                value={email}
                onChange={this.handleChange}
                onKeyUp={() => UpdateStudentValid("email", email)}
              />
              <span id="semail"></span>
            </div>

            <div className="mb-3">
              <label className="form-label">Contact</label>
              <input
                className="form-control"
                name="contact"
                value={contact}
                onChange={this.handleChange}
                onKeyUp={() => UpdateStudentValid("contact", contact)}
              />
              <span id="scontact"></span>
            </div>

            <div className="mb-3">
              <label className="form-label">User ID</label>
              <input
                className="form-control"
                name="uid"
                value={uid}
                onChange={this.handleChange}
                readOnly
              />
            </div>

  
<div className="mb-4">
  <label className="form-label">Select Course</label>
  <select
    className="form-select"
    name="cid"
    value={cid} 
    onChange={this.handleChange}
  >
    {cid ? null : <option value="">-- Select Course --</option>}
    
    {courses.map((c) => (
      <option key={c.cid} value={c.cid}>
        {c.name}
      </option>
    ))}
  </select>
</div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-success flex-fill"
                onClick={this.handleUpdate}
                disabled={saving}
              >
                {saving ? "Updating…" : "Update Student"}
              </button>
              <button
                className="btn btn-secondary flex-fill"
                onClick={() => this.props.onClose()}
                disabled={saving}
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


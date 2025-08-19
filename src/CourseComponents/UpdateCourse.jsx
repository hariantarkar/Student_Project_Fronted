import React from "react";
import { updateCourse } from "../services/courseService";

export default class UpdateCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cid: props.course?.cid ?? "",
      name: props.course?.name ?? "",
      saving: false,
      error: null,
    };
  }

  handleChange = (e) => this.setState({ name: e.target.value });

  handleUpdate = () => {
    const { cid, name } = this.state;
    this.setState({ saving: true, error: null });

    updateCourse(cid, name)
      .then((res) => {
        const msg = res?.message || "Course updated successfully";
        this.props.onClose({ type: "success", text: msg });
      })
      .catch((err) => {
        this.setState({ saving: false, error: err.message || "Failed to update course" });
      });
  };

  render() {
    const { cid, name, saving, error } = this.state;

    return (
      <div className="container mt-5">
        <div className="card shadow-sm mx-auto" style={{ maxWidth: 520 }}>
          <div className="card-body">
            <h4 className="card-title text-center mb-4">Course Details</h4>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label className="form-label">Course ID</label>
              <input className="form-control" value={cid} disabled />
            </div>

            <div className="mb-4">
              <label className="form-label">Course Name</label>
              <input
                className="form-control"
                value={name}
                onChange={this.handleChange}
              />
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-success flex-fill"
                onClick={this.handleUpdate}
                disabled={saving}
              >
                {saving ? "Updating…" : "Update Course"}
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

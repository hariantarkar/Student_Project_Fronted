 import React, { useEffect, useState, useRef } from "react";
import { getApprovedUsers, addStudent } from "../services/studentService";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewApprovedStudents = () => {
  const [approvedStudents, setApprovedStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [course, setCourse] = useState("");

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const timeoutRef = useRef(null);

  const fetchApproved = async () => {
    try {
      setLoading(true);
      const data = await getApprovedUsers();   // backend already excludes students in "students" table
      setApprovedStudents(data);
    } catch (err) {
      setError(err.message || "Failed to load approved students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApproved();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!course.trim()) {
      setMessage("⚠ Please enter course ID or name");
      setIsSuccess(false);
      return;
    }

    try {
      setSubmitting(true);
      const res = await addStudent({ ...selectedStudent, cid: course.trim() });

      setMessage(res?.message || "✅ Student added successfully");
      setIsSuccess(true);
      setSubmitting(false);

      // Wait 2 seconds, then refresh list & go back to table view
      timeoutRef.current = setTimeout(async () => {
        await fetchApproved();
        setSelectedStudent(null);  // hides the form, shows list
        setCourse("");
        setMessage("");
      }, 2000);
    } catch (err) {
      setSubmitting(false);
      setMessage(err?.message || "❌ Failed to add student");
      setIsSuccess(false);
      timeoutRef.current = setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading) return <p className="text-primary">Loading approved students...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Approved Students</h2>

      {message && (
        <div className={`alert ${isSuccess ? "alert-success" : "alert-danger"}`}>
          {message}
        </div>
      )}

      {/* Show LIST only when no student is selected */}
      {!selectedStudent && (
        approvedStudents.length ? (
           <div className="table-responsive"style={{ maxHeight: "400px", overflowY: "auto" , overflowX: "auto" }}>
          <table className="table table-bordered table-striped table-hover shadow-sm sticky-header">
            <thead className="table-dark text-center"style={{ position: "sticky", top: 0, zIndex: 2 }}>
              <tr>
                <th>USER ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Add Student</th>
              </tr>
            </thead>
            <tbody>
              {approvedStudents.map((student) => (
                <tr key={student.uid}>
                  <td className=" text-center">{student.uid}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.contact}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        setSelectedStudent(student);
                        setCourse("");
                        setMessage("");
                      }}
                    >
                      Add Student
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        ) : (
          <p className="text-muted text-center">No approved students yet.</p>
        )
      )}      
      {selectedStudent && (
        <div className="card p-4 shadow">
          <h4 className="text-center mb-4">Add Student</h4>
          <form onSubmit={handleAddStudent}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input className="form-control" value={selectedStudent.name} readOnly />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input className="form-control" value={selectedStudent.email} readOnly />
            </div>

            <div className="mb-3">
              <label className="form-label">Contact</label>
              <input className="form-control" value={selectedStudent.contact} readOnly />
            </div>

            <div className="mb-3">
              <label className="form-label">USER ID</label>
              <input className="form-control" value={selectedStudent.uid} readOnly />
            </div>

            <div className="mb-3">
              <label className="form-label">Course ID </label>
              <input
                className="form-control"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="Enter course id or name"
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={submitting}
            >
              {submitting ? "Adding..." : "Submit"}
            </button>

            <button
              type="button"
              className="btn btn-secondary w-100 mt-2"
              onClick={() => {
                setSelectedStudent(null);
                setCourse("");
                setMessage("");
              }}
              disabled={submitting}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default ViewApprovedStudents; 



                             


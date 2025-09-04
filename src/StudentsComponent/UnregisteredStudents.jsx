
import React, { useEffect, useState } from "react";
import { getUnregisteredUsers, approveUser } from "../services/studentService";
import "bootstrap/dist/css/bootstrap.min.css";

const UnregisteredStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // ✅ new state

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getUnregisteredUsers();
        setStudents(data);
      } catch (err) {
        setError(err.message || "Failed to load students");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleApprove = async (student) => {
    try {
      await approveUser(student.uid);
      setStudents((prev) => prev.filter((s) => s.uid !== student.uid));

      // ✅ show success message
      setMessage(`${student.name} approved successfully`);

      // auto clear after 2s
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      alert("Error approving student: " + err.message);
    }
  };

  if (loading) return <p className="text-primary">Loading students...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center text-black">Unregistered Students</h2>

      {/* ✅ success alert */}
      {message && <div className="alert alert-success text-center">{message}</div>}

      {students.length === 0 ? (
        <p className="text-muted text-center">No unregistered students found.</p>
      ) : (
        <div
          className="table-responsive"
          style={{ maxHeight: "400px", overflowY: "auto", overflowX: "auto" }}
        >
          <table className="table table-bordered table-striped table-hover shadow-sm sticky-header">
            <thead
              className="table-dark text-center"
              style={{ position: "sticky", top: 0, zIndex: 2 }}
            >
              <tr>
                <th>USER_ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Approve</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.uid}>
                  <td className=" text-center">{student.uid}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.contact}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleApprove(student)}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UnregisteredStudents;




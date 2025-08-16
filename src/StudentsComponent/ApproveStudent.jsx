import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ApproveStudent = ({ approvedStudents }) => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Approved Students</h2>
      {approvedStudents.length === 0 ? (
        <p className="text-muted text-center">No students approved yet.</p>
      ) : (
        <table className="table table-bordered table-striped table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>USER_ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {approvedStudents.map((student) => (
              <tr key={student.uid}>
                <td>{student.uid}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default ApproveStudent;


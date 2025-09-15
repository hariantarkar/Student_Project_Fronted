import React, { useEffect, useState, useRef } from "react";
import { getApprovedUsers, addStudent } from "../services/studentService";
import { getAllCourses } from "../services/courseService"; 
import "bootstrap/dist/css/bootstrap.min.css";

const ViewApprovedStudents = () => {
  const [approvedStudents, setApprovedStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const timeoutRef = useRef(null);


  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalSelectValue, setTotalSelectValue] = useState("");

 
  const fetchApproved = async () => {
    try {
      setLoading(true);
      const data = await getApprovedUsers();
      setApprovedStudents(data);
      setTotalPages(Math.max(1, Math.ceil(data.length / pageSize)));
    } catch (err) {
      setError(err.message || "Failed to load approved students");
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await getAllCourses(); 
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    fetchApproved();
    fetchCourses(); 
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!course.trim()) {
      setMessage("⚠ Please select a course");
      setIsSuccess(false);
      return;
    }

    try {
      setSubmitting(true);
      const res = await addStudent({ ...selectedStudent, cid: course.trim() });

      setMessage(res?.message || " Student added successfully");
      setIsSuccess(true);
      setSubmitting(false);

      timeoutRef.current = setTimeout(async () => {
        await fetchApproved();
        setSelectedStudent(null);
        setCourse("");
        setMessage("");
      }, 2000);
    } catch (err) {
      setSubmitting(false);
      setMessage(err?.message || " Failed to add student");
      setIsSuccess(false);
      timeoutRef.current = setTimeout(() => setMessage(""), 3000);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handlePageSizeChange = (e) => {
    const size = parseInt(e.target.value, 10) || 5;
    setPageSize(size);
    setCurrentPage(1);
    setTotalPages(Math.max(1, Math.ceil(approvedStudents.length / size)));
    setTotalSelectValue("");
  };

  const handleTotalSelectChange = (e) => {
    const page = parseInt(e.target.value, 10);
    if (!isNaN(page)) {
      handlePageChange(page);
      setTotalSelectValue(""); 
    }
  };

  const generatePageSizes = (total) => {
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
    sizes.push(total);
    return sizes;
  };

  if (loading) return <p className="text-primary">Loading approved students...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedStudents = approvedStudents.slice(startIndex, startIndex + pageSize);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center text-black">Approved Students</h2>

      {message && (
        <div className={`alert ${isSuccess ? "alert-success" : "alert-danger"}`}>
          {message}
        </div>
      )}

      {!selectedStudent && (
        approvedStudents.length ? (
          <>
            <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto", overflowX: "auto" }}>
              <table className="table table-bordered table-striped table-hover shadow-sm sticky-header">
                <thead className="table-dark text-center" style={{ position: "sticky", top: 0, zIndex: 2 }}>
                  <tr>
                    <th>USER ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Add Student</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStudents.map((student) => (
                    <tr key={student.uid}>
                      <td className="text-center">{student.uid}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.contact}</td>
                      <td>
                        <button className="btn btn-primary btn-sm" onClick={() => {
                            setSelectedStudent(student);
                            setCourse("");
                            setMessage("");
                          }}>
                          Add Student
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="d-flex align-items-center">
                <label className="me-2">Show</label>
                <select className="form-select form-select-sm w-auto"
                  value={pageSize} onChange={handlePageSizeChange} >
                  {generatePageSizes(approvedStudents.length).map((size) => (
                    <option key={size} value={size}>
                      {size === approvedStudents.length ? "All" : size}
                    </option>
                  ))}
                </select>
                <label className="ms-2">entries</label>
              </div>

             
              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-dark btn-sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1} >
                  ← Prev
                </button>

                <span className="border px-3 py-1 rounded bg-white text-dark fw-bold">
                   {currentPage}
                </span>

                <button
                  className="btn btn-dark btn-sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>

              <div>
                <label className="me-2">Total</label>
                <select
                  className="form-select form-select-sm d-inline-block w-auto"
                  onChange={handleTotalSelectChange}
                  value={totalSelectValue}
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
              <label className="form-label">Select Course</label>
              <select
                className="form-select"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option value="">-- Select Course --</option>
                {courses.map((c) => (
                  <option key={c.cid} value={c.cid}>
                    {c.name}
                  </option>
                ))}
              </select>
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

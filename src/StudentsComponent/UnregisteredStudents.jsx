import React, { useEffect, useState } from "react";
import { getUnregisteredUsers, approveUser } from "../services/studentService";
import "bootstrap/dist/css/bootstrap.min.css";

const UnregisteredStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); 

 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSelectValue, setTotalSelectValue] = useState(""); 

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await getUnregisteredUsers();
        const rows = Array.isArray(data) ? data : data?.data || [];

        const newPageSize = rows.length > 0 && rows.length < pageSize ? rows.length : pageSize;
        setStudents(rows);
        setPageSize(newPageSize);
        setCurrentPage(1);
        setTotalPages(Math.max(1, Math.ceil(rows.length / newPageSize)));
        setTotalSelectValue("");
      } catch (err) {
        setError(err.message || "Failed to load students");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []); // run once

  const handleApprove = async (student) => {
    try {
      await approveUser(student.uid);

  
      setStudents((prev) => {
        const newList = prev.filter((s) => s.uid !== student.uid);
        const newTotalPages = Math.max(1, Math.ceil(newList.length / pageSize));
        setTotalPages(newTotalPages);
        setCurrentPage((cur) => (cur > newTotalPages ? newTotalPages : cur));
        return newList;
      });

      setMessage(`${student.name} approved successfully`);
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      alert("Error approving student: " + err.message);
    }
  };

  if (loading) return <p className="text-primary">Loading students...</p>;
  if (error) return <p className="text-danger">{error}</p>;

 
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
    sizes.push(total || 1);
  
    if (!sizes.includes(pageSize)) sizes.unshift(pageSize);
    return sizes;
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10) || 1;
    setPageSize(newSize);
    setCurrentPage(1);
    setTotalPages(Math.max(1, Math.ceil(students.length / newSize)));
    setTotalSelectValue("");
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleTotalSelectChange = (e) => {
    const page = parseInt(e.target.value, 10);
    if (!isNaN(page)) {
      handlePageChange(page);
     
      setTotalSelectValue("");
    }
  };

 
  const startIndex = (currentPage - 1) * pageSize;
  const currentStudents = students.slice(startIndex, startIndex + pageSize);
  const pageSizes = generatePageSizes(students.length);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center text-black">Registered Students</h2>

  
      {message && <div className="alert alert-success text-center">{message}</div>}

      {students.length === 0 ? (
        <p className="text-muted text-center">No registered students found.</p>
      ) : (
        <>
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
                {currentStudents.map((student) => (
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

     
          <div className="d-flex justify-content-between align-items-center mt-3">
        
            <div className="d-flex align-items-center">
              <label className="me-2">Show</label>
              <select
                className="form-select form-select-sm w-auto"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                {pageSizes.map((size) => (
                  <option key={size} value={size}>
                    {size === students.length ? "All" : size}
                  </option>
                ))}
              </select>
              <label className="ms-2">entries</label>
            </div>

        
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-dark btn-sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
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
      )}
    </div>
  );
};

export default UnregisteredStudents;

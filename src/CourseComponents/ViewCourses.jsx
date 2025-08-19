// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { getAllCourses, updateCourse, deleteCourse } from "../services/courseService";

// export default class ViewAllCourses extends React.Component {
//   state = {
//     courses: [],
//     editName: "",
//     editId: null
//   };

//   componentDidMount() {
//     this.loadCourses();
//   }

//   loadCourses = () => {
//     getAllCourses()
//       .then((res) => {
//         this.setState({ courses: res.data });
//       })
//       .catch((err) => {
//         console.error("Error loading courses:", err);
//       });
//   };

//   handleEdit = (cid, name) => {
//     this.setState({ editId: cid, editName: name });
//   };

//   handleUpdate = () => {
//     updateCourse(this.state.editId, this.state.editName)
//       .then(() => {
//         alert("Course updated successfully");
//         this.setState({ editId: null, editName: "" });
//         this.loadCourses();
//       })
//       .catch((err) => console.error("Update error:", err));
//   };

// handleDelete = (cid) => {
//   if (window.confirm("Are you sure you want to delete this course?")) {
//     deleteCourse(cid)
//       .then(() => {
//         alert("Course deleted successfully");
//         this.setState((prevState) => ({
//           courses: prevState.courses.filter((course) => course.cid !== cid),
//         }));
//       })
//       .catch((err) => console.error("Delete error:", err));
//   }
// };

//   render() { 
//     return (
//       <div className="container mt-4"style={{ backgroundColor: "teal", color: "white", width:"85vh" }}>
//           <h3 className="text-center mb-4">All Courses</h3>
//         <table className="table table-bordered table-hover "style={{ backgroundColor: "teal", color: "white", width: "80vh" }}>
//           <thead className="text-center align-middle">
//             <tr>
//               <th>ID</th>
//               <th style={{ width: "40%" }}>Course Name</th>
//               <th>Update Course</th>
//               <th>Delete Course</th>
//             </tr>
//           </thead>
//           <tbody className="text-center align-middle">
//             {this.state.courses.map((course) => (
//               <tr key={course.cid}>
//                 <td>{course.cid}</td>
//                 <td>
//                   {this.state.editId === course.cid ? (
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={this.state.editName}
//                       onChange={(e) => this.setState({ editName: e.target.value })}
//                     />
//                   ) : (
//                     course.name
//                   )}
//                 </td>
//                 <td>
//                   {this.state.editId === course.cid ? (
//                     <button
//                       className="btn btn-success btn-sm"
//                       onClick={this.handleUpdate}
//                     >
//                       Save
//                     </button>
//                   ) : (
//                     <button
//                       className="btn btn-warning btn-sm" style={{ width: "80px", padding: "5px" }}
//                       onClick={() => this.handleEdit(course.cid, course.name)}
//                     >
//                       Update
//                     </button>
//                   )}
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-danger btn-sm"style={{ width: "80px", padding: "5px" }}
//                     onClick={() => this.handleDelete(course.cid)} >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllCourses } from "../services/courseService";
import UpdateCourse from "./UpdateCourse";
import DeleteCourse from "./DeleteCourse";

export default class ViewAllCourses extends React.Component {
  state = {
    courses: [],
    mode: null,              // "update" | "delete" | null
    selectedCourse: null,    // { cid, name }
    loading: true,
    notice: null             // { type: "success"|"danger", text: string }
  };

  componentDidMount() {
    this.loadCourses();
  }

  loadCourses = () => {
    this.setState({ loading: true });
    getAllCourses()
      .then((res) => {
        // backend might return { data: [...] } or just [...]
        const rows = Array.isArray(res) ? res : res.data || [];
        this.setState({ courses: rows, loading: false });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          notice: { type: "danger", text: err.message || "Failed to load courses" }
        });
      });
  };

  openUpdate = (course) => this.setState({ mode: "update", selectedCourse: course });
  openDelete = (course) => this.setState({ mode: "delete", selectedCourse: course });

  // called by Update/Delete components
  handleClose = (notice) => {
    this.setState(
      { mode: null, selectedCourse: null, notice: notice || null },
      this.loadCourses // ✅ refresh list after coming back
    );
  };

  renderList() {
    const { courses, loading } = this.state;

    return (
      <div className="container mt-4" style={{ backgroundColor: "teal", color: "white", maxWidth: 900 }}>
        <h3 className="text-center mb-4">All Courses</h3>

        {loading && <div className="text-center py-3">Loading…</div>}

        {!loading && (
          <table className="table table-bordered table-hover"
                 style={{ backgroundColor: "teal", color: "white" }}>
            <thead className="text-center align-middle">
              <tr>
                <th>ID</th>
                <th style={{ width: "40%" }}>Course Name</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="text-center align-middle">
              {courses.length === 0 && (
                <tr><td colSpan="4" className="py-4">No courses found</td></tr>
              )}
              {courses.map((c) => (
                <tr key={c.cid}>
                  <td>{c.cid}</td>
                  <td>{c.name}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      style={{ width: 80 }}
                      onClick={() => this.openUpdate(c)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      style={{ width: 80 }}
                      onClick={() => this.openDelete(c)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  render() {
    const { mode, selectedCourse, notice } = this.state;

    if (mode === "update" && selectedCourse) {
      return <UpdateCourse course={selectedCourse} onClose={this.handleClose} />;
    }
    if (mode === "delete" && selectedCourse) {
      return <DeleteCourse course={selectedCourse} onClose={this.handleClose} />;
    }

    return (
      <>
        {notice && (
          <div className={`alert alert-${notice.type} text-center m-3`}>
            {notice.text}
          </div>
        )}
        {this.renderList()}
      </>
    );
  }
}

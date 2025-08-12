import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllCourses, updateCourse, deleteCourse } from "../services/courseService";

export default class ViewAllCourses extends React.Component {
  state = {
    courses: [],
    editName: "",
    editId: null
  };

  componentDidMount() {
    this.loadCourses();
  }

  loadCourses = () => {
    getAllCourses()
      .then((res) => {
        this.setState({ courses: res.data });
      })
      .catch((err) => {
        console.error("Error loading courses:", err);
      });
  };

  handleEdit = (cid, name) => {
    this.setState({ editId: cid, editName: name });
  };

  handleUpdate = () => {
    updateCourse(this.state.editId, this.state.editName)
      .then(() => {
        alert("Course updated successfully");
        this.setState({ editId: null, editName: "" });
        this.loadCourses();
      })
      .catch((err) => console.error("Update error:", err));
  };

//   handleDelete = (cid) => {
//     if (window.confirm("Are you sure you want to delete this course?")) {
//       deleteCourse(cid)
//         .then(() => {
//           alert("Course deleted successfully");
//           this.loadCourses();
//         })
//         .catch((err) => console.error("Delete error:", err));
//     }
//   };

handleDelete = (cid) => {
  if (window.confirm("Are you sure you want to delete this course?")) {
    deleteCourse(cid)
      .then(() => {
        alert("Course deleted successfully");
        this.setState((prevState) => ({
          courses: prevState.courses.filter((course) => course.cid !== cid),
        }));
      })
      .catch((err) => console.error("Delete error:", err));
  }
};

  render() { 
    return (
      <div className="container mt-4"style={{ backgroundColor: "teal", color: "white", width:"85vh" }}>
          <h3 className="text-center mb-4">All Courses</h3>
        <table className="table table-bordered table-hover "style={{ backgroundColor: "teal", color: "white", width: "80vh" }}>
          <thead className="text-center align-middle">
            <tr>
              <th>ID</th>
              <th style={{ width: "40%" }}>Course Name</th>
              <th>Update Course</th>
              <th>Delete Course</th>
            </tr>
          </thead>
          <tbody className="text-center align-middle">
            {this.state.courses.map((course) => (
              <tr key={course.cid}>
                <td>{course.cid}</td>
                <td>
                  {this.state.editId === course.cid ? (
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.editName}
                      onChange={(e) => this.setState({ editName: e.target.value })}
                    />
                  ) : (
                    course.name
                  )}
                </td>
                <td>
                  {this.state.editId === course.cid ? (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={this.handleUpdate}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning btn-sm" style={{ width: "80px", padding: "5px" }}
                      onClick={() => this.handleEdit(course.cid, course.name)}
                    >
                      Update
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"style={{ width: "80px", padding: "5px" }}
                    onClick={() => this.handleDelete(course.cid)} >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

// class ViewCourses extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       courses: [],
//       loading: false,
//       error: null,
//     };
//   }

//   componentDidMount() {
//     this.fetchCourses();
//   }

//   fetchCourses = async () => {
//     this.setState({ loading: true, error: null });
//     try {
//       const courses = await getAllCourses();
//       this.setState({ courses });
//     } catch (err) {
//       this.setState({ error: err.message });
//     } finally {
//       this.setState({ loading: false });
//     }
//   };

//   render() {
//     const { courses, loading, error } = this.state;

//     return (
//       <div className="container mt-4">
//         <h2 className="text-center mb-4">All Courses</h2>

//         {loading && (
//           <div className="alert alert-info text-center">Loading...</div>
//         )}
//         {error && (
//           <div className="alert alert-danger text-center">Error: {error}</div>
//         )}

//         <div className="table-responsive">
//           <table className="table table-bordered table-striped text-center">
//             <thead className="table-dark">
//               <tr>
//                 <th>ID</th>
//                 <th>Course Name</th>
//               </tr>
//             </thead>
//             <tbody>
//               {courses.length === 0 && !loading ? (
//                 <tr>
//                   <td colSpan="2">No courses found.</td>
//                 </tr>
//               ) : (
//                 courses.map((course) => (
//                   <tr key={course.cid}>
//                     <td>{course.cid}</td>
//                     <td>{course.name}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   }
// }

// export default ViewCourses;
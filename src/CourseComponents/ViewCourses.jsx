

// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { getAllCourses } from "../services/courseService";
// import UpdateCourse from "./UpdateCourse";
// import DeleteCourse from "./DeleteCourse";

// export default class ViewAllCourses extends React.Component {
//   state = {
//     courses: [],
//     mode: null,              
//     selectedCourse: null,   
//     loading: true,
//     notice: null            
//   };

//   componentDidMount() {
//     this.loadCourses();
//   }

//   loadCourses = () => {
//     this.setState({ loading: true });
//     getAllCourses()
//       .then((res) => {
//         const rows = Array.isArray(res) ? res : res.data || [];
//         this.setState({ courses: rows, loading: false });
//       })
//       .catch((err) => {
//         this.setState({
//           loading: false,
//           notice: { type: "danger", text: err.message || "Failed to load courses" }
//         });
//       });
//   };

//   openUpdate = (course) => this.setState({ mode: "update", selectedCourse: course });
//   openDelete = (course) => this.setState({ mode: "delete", selectedCourse: course });

 
//   handleClose = (notice) => {
//     this.setState(
//       { mode: null, selectedCourse: null, notice: notice || null },
//       this.loadCourses 
//     );
//   };

//   renderList() {
//     const { courses, loading } = this.state;

//     return (
//       <div className="container mt-4" style={{ backgroundColor: "teal", color: "white", maxWidth: 900 }}>
//         <h3 className="text-center mb-4">All Courses</h3>

//         {loading && <div className="text-center py-3">Loading…</div>}

//         {!loading && (
//           <table className="table table-bordered table-hover"
//             style={{ backgroundColor: "teal", color: "white" }}>
//             <thead className="text-center align-middle">
//               <tr>
//                 <th>ID</th>
//                 <th style={{ width: "40%" }}>Course Name</th>
//                 <th>Update</th>
//                 <th>Delete</th>
//               </tr>
//             </thead>
//             <tbody className="text-center align-middle">
//               {courses.length === 0 && (
//                 <tr><td colSpan="4" className="py-4">No courses found</td></tr>
//               )}
//               {courses.map((c) => (
//                 <tr key={c.cid}>
//                   <td>{c.cid}</td>
//                   <td>{c.name}</td>
//                   <td>
//                     <button
//                       className="btn btn-warning btn-sm"
//                       style={{ width: 80 }}
//                       onClick={() => this.openUpdate(c)}
//                     >
//                       Update
//                     </button>
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       style={{ width: 80 }}
//                       onClick={() => this.openDelete(c)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     );
//   }

//   render() {
//     const { mode, selectedCourse, notice } = this.state;

//     return (
//       <>
//         {notice && (
//           <div className={`alert alert-${notice.type} text-center m-3`}>
//             {notice.text}
//           </div>
//         )}

//         {mode === "update" && selectedCourse ? (
//           <UpdateCourse course={selectedCourse} onClose={(result) => {
//             if (result?.type === "success") {
//               alert(result.text);
//             }
//             this.handleClose(result);  
//           }} />
//         ) : mode === "delete" && selectedCourse ? (
//           <DeleteCourse course={selectedCourse} onClose={this.handleClose} />
//         ) : (
//           this.renderList()
//         )}
//       </>
//     );
//   }
// }




// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { getAllCourses } from "../services/courseService";
// import UpdateCourse from "./UpdateCourse";
// import DeleteCourse from "./DeleteCourse";

// export default class ViewAllCourses extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       courses: [],
//       mode: null,
//       selectedCourse: null,
//       loading: true,
//       notice: null,
//       error: "",
//       currentRange: { start: 0, end: 10 }, // ✅ default 1-10
//       ranges: [],
//     };
//   }

//   componentDidMount() {
//     this.loadCourses();
//   }

//   loadCourses = async () => {
//     try {
//       this.setState({ loading: true });
//       const res = await getAllCourses();
//       const rows = Array.isArray(res) ? res : res.data || [];
//       this.setState({
//         courses: rows,
//         loading: false,
//         error: "",
//         ranges: this.generateRanges(rows.length),
//         currentRange: { start: 0, end: Math.min(10, rows.length) }, // ✅ default first page
//       });
//     } catch (err) {
//       this.setState({
//         loading: false,
//         error: err.message || "Failed to load courses",
//       });
//     }
//   };

//   generateRanges = (total) => {
//     let ranges = [];
//     for (let i = 0; i < total; i += 10) {
//       const start = i + 1;
//       const end = Math.min(i + 10, total);
//       ranges.push(`${start}-${end}`);
//     }
//     if (total > 10) {
//       ranges.push(`1-${total}`); // ✅ show all
//     }
//     return ranges;
//   };

//   handlePageChange = (range) => {
//     const [startStr, endStr] = range.split("-");
//     let start = parseInt(startStr, 10) - 1; // 0-based index
//     let end = parseInt(endStr, 10);

//     const fullRange = `1-${this.state.courses.length}`;
//     if (range === fullRange) {
//       this.setState({ currentRange: { start: 0, end: this.state.courses.length } });
//     } else {
//       this.setState({ currentRange: { start, end } });
//     }
//   };

//   openUpdate = (course) => this.setState({ mode: "update", selectedCourse: course });
//   openDelete = (course) => this.setState({ mode: "delete", selectedCourse: course });

//   handleClose = (notice) => {
//     this.setState(
//       { mode: null, selectedCourse: null, notice: notice || null },
//       this.loadCourses
//     );
//   };

//   renderList() {
//     const { courses, loading, error, currentRange, ranges } = this.state;
//     const paginatedCourses = courses.slice(currentRange.start, currentRange.end);

//     return (
//       <div className="container mt-4" style={{ backgroundColor: "teal", color: "white", maxWidth: 900 }}>
//         <h3 className="text-center mb-4">All Courses</h3>

//         {loading && <div className="text-center py-3">Loading…</div>}
//         {error && <div className="alert alert-danger text-center">{error}</div>}

//         {!loading && !error && (
//           <>
//             <table className="table table-bordered table-hover text-center align-middle"
//               style={{ backgroundColor: "teal", color: "white" }}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th style={{ width: "40%" }}>Course Name</th>
//                   <th>Update</th>
//                   <th>Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedCourses.length === 0 && (
//                   <tr><td colSpan="4" className="py-4">No courses found</td></tr>
//                 )}
//                 {paginatedCourses.map((c) => (
//                   <tr key={c.cid}>
//                     <td>{c.cid}</td>
//                     <td>{c.name}</td>
//                     <td>
//                       <button
//                         className="btn btn-warning btn-sm"
//                         style={{ width: 80 }}
//                         onClick={() => this.openUpdate(c)}
//                       >
//                         Update
//                       </button>
//                     </td>
//                     <td>
//                       <button
//                         className="btn btn-danger btn-sm"
//                         style={{ width: 80 }}
//                         onClick={() => this.openDelete(c)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* ✅ Page selector at bottom right */}
//             {ranges.length > 1 && (
//               <div className="d-flex justify-content-end mt-2">
//                 <select
//                   className="form-select w-auto"
//                   onChange={(e) => this.handlePageChange(e.target.value)}
//                   value={`${currentRange.start + 1}-${currentRange.end}`} // ✅ show selected
//                 >
//                   {ranges.map((r, idx) => (
//                     <option key={idx} value={r}>
//                       {r}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     );
//   }

//   render() {
//     const { mode, selectedCourse, notice } = this.state;

//     return (
//       <>
//         {notice && (
//           <div className={`alert alert-${notice.type} text-center m-3`}>
//             {notice.text}
//           </div>
//         )}

//         {mode === "update" && selectedCourse ? (
//           <UpdateCourse course={selectedCourse} onClose={(result) => {
//             if (result?.type === "success") {
//               alert(result.text);
//             }
//             this.handleClose(result);
//           }} />
//         ) : mode === "delete" && selectedCourse ? (
//           <DeleteCourse course={selectedCourse} onClose={this.handleClose} />
//         ) : (
//           this.renderList()
//         )}
//       </>
//     );
//   }
// }

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllCourses } from "../services/courseService";
import UpdateCourse from "./UpdateCourse";
import DeleteCourse from "./DeleteCourse";

const PAGE_SIZE = 5;   // ✅ You can change this anytime (5, 10, 20...)

export default class ViewAllCourses extends React.Component {
  state = {
    courses: [],
    mode: null,
    selectedCourse: null,
    loading: true,
    notice: null,
    currentRange: { start: 0, end: PAGE_SIZE }, 
    ranges: []
  };

  componentDidMount() {
    this.loadCourses();
  }

  loadCourses = () => {
    this.setState({ loading: true });
    getAllCourses()
      .then((res) => {
        const rows = Array.isArray(res) ? res : res.data || [];
        this.setState({
          courses: rows,
          loading: false,
          ranges: this.generateRanges(rows.length),
          currentRange: { start: 0, end: Math.min(PAGE_SIZE, rows.length) }
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          notice: { type: "danger", text: err.message || "Failed to load courses" }
        });
      });
  };

  generateRanges = (total) => {
    let ranges = [];
    for (let i = 0; i < total; i += PAGE_SIZE) {
      const start = i + 1;
      const end = Math.min(i + PAGE_SIZE, total);
      ranges.push(`${start}-${end}`);
    }
    if (total > PAGE_SIZE) {
      ranges.push(`1-${total}`); // last option → show all
    }
    return ranges;
  };

  handlePageChange = (range) => {
    const [startStr, endStr] = range.split("-");
    let start = parseInt(startStr, 10) - 1;
    let end = parseInt(endStr, 10);

    const fullRange = `1-${this.state.courses.length}`;
    if (range === fullRange) {
      this.setState({ currentRange: { start: 0, end: this.state.courses.length } });
    } else {
      this.setState({ currentRange: { start, end } });
    }
  };

  openUpdate = (course) => this.setState({ mode: "update", selectedCourse: course });
  openDelete = (course) => this.setState({ mode: "delete", selectedCourse: course });

  handleClose = (notice) => {
    this.setState(
      { mode: null, selectedCourse: null, notice: notice || null },
      this.loadCourses
    );
  };

  renderList() {
    const { courses, loading, currentRange, ranges } = this.state;
    const paginatedCourses = courses.slice(currentRange.start, currentRange.end);

    return (
      <div
        className="container mt-4"
        style={{ backgroundColor: "teal", color: "white", maxWidth: 900 }}
      >
        <h3 className="text-center mb-4 text-white">All Courses</h3>

        {loading && <div className="text-center py-3">Loading…</div>}

        {!loading && (
          <div className="card p-3">
            <div
              className="table-responsive"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              <table className="table table-bordered table-hover text-center align-middle">
                <thead
                  className="table-dark"
                  style={{ position: "sticky", top: "0", zIndex: "2" }}
                >
                  <tr>
                    <th>ID</th>
                    <th style={{ width: "40%" }}>Course Name</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCourses.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-4">
                        No courses found
                      </td>
                    </tr>
                  )}
                  {paginatedCourses.map((c) => (
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
            </div>

            {/* ✅ Page selector */}
            {ranges.length > 1 && (
              <div className="d-flex justify-content-end mt-2">
                <select
                  className="form-select w-auto"
                  onChange={(e) => this.handlePageChange(e.target.value)}
                >
                  {ranges.map((r, idx) => (
                    <option key={idx} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  render() {
    const { mode, selectedCourse, notice } = this.state;

    return (
      <>
        {notice && (
          <div className={`alert alert-${notice.type} text-center m-3`}>
            {notice.text}
          </div>
        )}

        {mode === "update" && selectedCourse ? (
          <UpdateCourse
            course={selectedCourse}
            onClose={(result) => {
              if (result?.type === "success") {
                alert(result.text);
              }
              this.handleClose(result);
            }}
          />
        ) : mode === "delete" && selectedCourse ? (
          <DeleteCourse course={selectedCourse} onClose={this.handleClose} />
        ) : (
          this.renderList()
        )}
      </>
    );
  }
}

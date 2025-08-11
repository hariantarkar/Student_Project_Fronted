
// import React from "react";
// import { addStudent } from "../studentServices/studentService.jsx";
// import { data } from "react-router-dom";

// export default class AddStudent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "",
//       email: "",
//       contact: "",
//       uid: "",
//       cid: "",
//     };
//   }

//   handleChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   handleAddStudent = async (e) => {
//     e.preventDefault();
//     try {
//       const { name, email, contact, uid, cid } = this.state;
//      const res= await addStudent({ name, email, contact, uid, cid });
//      console.log("Frontend API response:", res);
//       //alert(" Student added successfully");
//       alert(`${res.message}`);


//       this.setState({
//         name: "",
//         email: "",
//         contact: "",
//         uid: "",
//         cid: "",
//       });

//       if (this.props.onStudentAdded) {
//         this.props.onStudentAdded();
//       }
//     } catch (err) {
//       console.error(err);
//      alert(`❌ ${err.message}`);
//     }
//   };

//   render() {
//     return (
//       <div className="container" style={{ backgroundColor: "pink", color: "white" }}>
//         <h3 className="text-center mb-4">Add New Student</h3>
//         <div className="card p-4 shadow col-md-12 mx-auto">
//           <form onSubmit={this.handleAddStudent}>
//             <div className="mb-3">
//               <label className="form-label">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 className="form-control"
//                 value={this.state.name}
//                 onChange={this.handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 className="form-control"
//                 value={this.state.email}
//                 onChange={this.handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Contact</label>
//               <input
//                 type="text"
//                 name="contact"
//                 className="form-control"
//                 value={this.state.contact}
//                 onChange={this.handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">User ID</label>
//               <input
//                 type="text"
//                 name="uid"
//                 className="form-control"
//                 value={this.state.uid}
//                 onChange={this.handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Course ID</label>
//               <input
//                 type="text"
//                 name="cid"
//                 className="form-control"
//                 value={this.state.cid}
//                 onChange={this.handleChange}
//                 required
//               />
//             </div>
//             <button className="btn btn-success w-100">
//               Add Student
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }



import React from "react";
import { addStudent } from "../studentServices/studentService.jsx";

export default class AddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      contact: "",
      uid: "",
      cid: "",
      message: "", // ✅ To store success/error message
      messageType: "" // ✅ "success" or "error" for styling
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const { name, email, contact, uid, cid } = this.state;
      const res = await addStudent({ name, email, contact, uid, cid });

      this.setState({
        name: "",
        email: "",
        contact: "",
        uid: "",
        cid: "",
        message: res.message || "✅ Student added successfully",
        messageType: "success"
      });

      if (this.props.onStudentAdded) {
        this.props.onStudentAdded();
      }
    } catch (err) {
      this.setState({
        message: `❌ ${err.message || "Error adding student"}`,
        messageType: "error"
      });
    }
    setTimeout(() => {
  this.setState({ message: "", messageType: "" });
}, 2000);
  };

  render() {
    return (
      <div className="container" style={{ backgroundColor: "pink", color: "white" }}>
        <h3 className="text-center mb-4">Add New Student</h3>
        <div className="card p-4 shadow col-md-12 mx-auto">
          <form onSubmit={this.handleAddStudent}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contact</label>
              <input
                type="text"
                name="contact"
                className="form-control"
                value={this.state.contact}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">User ID</label>
              <input
                type="text"
                name="uid"
                className="form-control"
                value={this.state.uid}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Course ID</label>
              <input
                type="text"
                name="cid"
                className="form-control"
                value={this.state.cid}
                onChange={this.handleChange}
                required
              />
            </div>


            <button className="btn btn-success w-100 mt-2">Add Student</button>
            {/* ✅ Message shown here */}
            {this.state.message && (
              <div
                className={`mt-2 ${this.state.messageType === "success" ? "text-success" : "text-danger"}`}
              >
                {this.state.message}
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

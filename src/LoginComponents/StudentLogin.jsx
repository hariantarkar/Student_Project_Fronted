// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Login.css";
// import LoginService from "../services/LoginService";

// export default class StudentLogin extends Component {
//   constructor() {
//     super();
//     this.state = {
//       email: "",
//       password: "",
//       error: "",
//       loading: false
//     };
//   }

//   handleChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value, error: "" });
//   };

//   handleSubmit = async (e) => {
//     e.preventDefault();
//     const { email, password } = this.state;

//     if (!email || !password) {
//       this.setState({ error: "All fields are required" });
//       return;
//     }

//     try {
//       this.setState({ loading: true });
//       const data = await LoginService.loginUser({ email, password, role: "student" });
//       console.log("Login success:", data);

//       if (data.user.role === "admin") {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("role", "admin");
//         window.location.href = "/admin/dashboard";
//       } else if (data.user.role === "student") {
//         // ✅ save sid along with token & role
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("role", "student");
//         localStorage.setItem("sid", data.user.sid); // <-- added line
//         window.location.href = "/student/dashboard";
//       } else {
//         window.location.href = "/";
//       }
//     } catch (err) {
//       this.setState({
//         error:
//           err.response?.data?.message || err.message || "Something went wrong",
//         loading: false
//       });
//     }
//   };

//   render() {
//     return (
//       <div className="login-container">
//         <div className="login-card">
//           <h3 className="text-center">Student Login</h3>

//           {this.state.error && (
//             <div className="alert alert-danger">{this.state.error}</div>
//           )}

//           <form onSubmit={this.handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Username</label>
//               <input
//                 type="email"
//                 name="email"
//                 className="form-control"
//                 value={this.state.email}
//                 onChange={this.handleChange}
//                 placeholder="Enter username"
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 className="form-control"
//                 value={this.state.password}
//                 onChange={this.handleChange}
//                 placeholder="Enter password"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="btn btn-primary w-100"
//               disabled={this.state.loading}
//             >
//               {this.state.loading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           <div className="register-link">
//             <Link to="/register">Don't have an account? Register</Link>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }


import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import LoginService from "../services/LoginService";

export default class StudentLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: "" });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: "All fields are required" });
      return;
    }

    try {
      this.setState({ loading: true });
      const data = await LoginService.loginUser({ email, password, role: "student" });
      console.log("Login success:", data);

      if (data.user.role === "student") {
        window.location.href = "/student/dashboard"; // ✅ No localStorage
      } else {
        this.setState({ error: "Unauthorized: Not a Student", loading: false });
      }
    } catch (err) {
      this.setState({
        error:
          err.response?.data?.message || err.message || "Something went wrong",
        loading: false
      });
    }
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-card">
          <h3 className="text-center">Student Login</h3>

          {this.state.error && (
            <div className="alert alert-danger">{this.state.error}</div>
          )}

          <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={this.state.loading}
            >
              {this.state.loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="register-link">
            <Link to="/register">Don't have an account? Register</Link>
          </div>
        </div>
      </div>
    );
  }
}

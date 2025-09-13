// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Login.css";
// import LoginService from "../services/LoginService";
// import { validateEmail, Passwordvalid } from "../Validations/StudentLoginValid"; 

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

//       if (data.user.role === "student") {
//         window.location.href = "/student/dashboard"; 
//       } else {
//         this.setState({ error: "Unauthorized: Not a Student", loading: false });
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
//                 placeholder="Enter user email"
//                 required
//                 onKeyUp={(e) => validateEmail(e)}   
//               />
//               <span id="s"></span>
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
//                 onKeyUp={(e) => Passwordvalid(e.target.value)}  
//               />
//               <span id="passwordMessage"></span>
//             </div>

//             <button type="submit" className="btn btn-primary w-100" disabled={this.state.loading}>
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



// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Login.css";
// import LoginService from "../services/LoginService";
// import { validateEmail, Passwordvalid } from "../Validations/StudentLoginValid";

// export default class StudentLogin extends Component {
//   constructor() {
//     super();
//     this.state = {
//       email: "",
//       password: "",
//       error: "",
//       loading: false,
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
//       const data = await LoginService.loginUser({
//         email,
//         password,
//         role: "student",
//       });
//       console.log("Login success:", data);

//       if (data.user.role === "student") {
//         window.location.href = "/student/dashboard";
//       } else {
//         this.setState({ error: "Unauthorized: Not a Student", loading: false });
//       }
//     } catch (err) {
//       this.setState({
//         error:
//           err.response?.data?.message || err.message || "Something went wrong",
//         loading: false,
//       });
//     }
//   };

//   render() {
//     return (
//       <div className="login-container">
//         <div className="login-card">
//           <h3 className="text-center">Student Login</h3>

//           {/* Error messages with custom handling */}
//           {this.state.error && (
//             this.state.error === "Don't have account? Register before login" ? (
//               <div className="alert alert-warning">
//                 {this.state.error}{" "}
//                 <Link to="/register" className="alert-link">
//                   Click here to Register
//                 </Link>
//               </div>
//             ) : (
//               <div className="alert alert-danger">{this.state.error}</div>
//             )
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
//                 placeholder="Enter user email"
//                 required
//                 onKeyUp={(e) => validateEmail(e)}
//               />
//               <span id="s"></span>
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
//                 onKeyUp={(e) => Passwordvalid(e.target.value)}
//               />
//               <span id="passwordMessage"></span>
//             </div>

//             <button
//               type="submit"
//               className="btn btn-primary w-100"
//               disabled={this.state.loading}
//             >
//               {this.state.loading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           <div className="register-link mt-3">
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
import { validateEmail, Passwordvalid } from "../Validations/StudentLoginValid";

export default class StudentLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false,
      success: ""
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: "", success: "" });
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
      const data = await LoginService.loginUser({
        email,
        password,
        role: "student",
      });

      if (data.success) {
        this.setState({ success: data.message, error: "", loading: false });
        if (data.user.role === "student") {
          window.location.href = "/student/dashboard";
        }
      }
    } catch (err) {
      this.setState({
        error:
          err.response?.data?.message ||
          err.message ||
          "Something went wrong",
        loading: false,
      });
    }
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-card">
          <h3 className="text-center">Student Login</h3>

          {/* 🔹 Success / Error Messages */}
          {this.state.error && (
            <div className="alert alert-danger">{this.state.error}</div>
          )}
          {this.state.success && (
            <div className="alert alert-success">{this.state.success}</div>
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
                placeholder="Enter user email"
                required
                onKeyUp={(e) => validateEmail(e)}
              />
              <span id="s"></span>
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
                onKeyUp={(e) => Passwordvalid(e.target.value)}
              />
              <span id="passwordMessage"></span>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={this.state.loading}
            >
              {this.state.loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="register-link mt-3 text-center">
            <Link to="/register">Don't have an account? Register</Link>
          </div>
        </div>
      </div>
    );
  }
}

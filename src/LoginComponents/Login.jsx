import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginService from "../services/LoginService";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
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
  const { username, password } = this.state;

  if (!username || !password) {
    this.setState({ error: "All fields are required" });
    return;
  }

  try {
    this.setState({ loading: true });
    const data = await LoginService.loginUser({ username, password });
    console.log("Login success:", data);

    if (data.user.role === "admin") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", "admin");
      window.location.href = "/admin/dashboard";
    } else if (data.user.role === "student") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", "student");
      window.location.href = "/student/dashboard";
    } else {
      window.location.href = "/";
    }
  } catch (err) {
    this.setState({
      error: err.response?.data?.message || err.message || "Something went wrong",
      loading: false
    });
  }
};


  render() {
    return (
      <div className="container mt-5" style={{ maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>
        {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}

        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={this.state.username}
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

          <button type="submit" className="btn btn-primary w-100" disabled={this.state.loading}>
            {this.state.loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-3 text-center">
          <a href="/register">Don't have an account? Register</a>
        </div>
      </div>
    );
  }
}

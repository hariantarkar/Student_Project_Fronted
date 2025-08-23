import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import LoginService from "../services/LoginService";

export default class AdminLogin extends Component {
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
      const data = await LoginService.loginUser({ email, password, role: "admin" });
      console.log("Login success:", data);

      if (data.user.role === "admin") {
        window.location.href = "/admin/dashboard"; 
      } else {
        this.setState({ error: "Unauthorized: Not an Admin", loading: false });
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
          <h3 className="text-center">Admin Login</h3>

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
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RegistrationService from "../services/RegistrationService";

import { FullNameValid, validateEmailValue, PhoneValid, Passwordvalid } from "../Validations/RegisterNewStudentValid"; 

export default class AddNewAdmin extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      contact: "",
      password: "",
      role: "admin", 
      error: "",
      success: "",
      loading: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: "", success: "" });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, contact, password, role } = this.state;

    const isNameValid = FullNameValid(name);
    const isEmailValid = validateEmailValue(email);
    const isPhoneValid = PhoneValid(contact);
    const isPasswordValid = Passwordvalid(password);

    if (!name || !email || !contact || !password) {
      this.setState({ error: "All fields are required" });
      return;
    }

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isPasswordValid) {
      this.setState({ error: "Please fix validation errors before submitting" });
      return;
    }

    try {
      this.setState({ loading: true });

      await RegistrationService.registerUser({
        name,
        email,
        contact,
        password,
        role, 
      });

      this.setState({
        name: "",
        email: "",
        contact: "",
        password: "",
        role: "admin",
        success: "Admin registered successfully!",
        error: "",
        loading: false,
      });
    } catch (err) {
      this.setState({
        error: err.response?.data?.message || "Registration failed",
        success: "",
        loading: false,
      });
    }
  };

  render() {
    return (
      <div className="register-container">
        <div className="register-card">
          <h3 className="text-center mb-4"> New Admin Details </h3>

          {this.state.error && (
            <div className="alert alert-danger">{this.state.error}</div>
          )}

          <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" name="name" className="form-control"
                value={this.state.name} onChange={this.handleChange}
                placeholder="Enter full name"required
                onKeyUp={() => FullNameValid(this.state.name)}/>
              <span id="s"></span>
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-control"
                value={this.state.email} onChange={this.handleChange}
                placeholder="Enter email" required
                onKeyUp={() => validateEmailValue(this.state.email)}/>
              <span id="s"></span>
            </div>

            <div className="mb-3">
              <label className="form-label">Contact</label>
              <input type="text" name="contact" className="form-control"
                value={this.state.contact} onChange={this.handleChange}
                placeholder="Enter contact number" required
                onKeyUp={() => PhoneValid(this.state.contact)}/>
              <span id="p"></span>
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" name="password" className="form-control"
                value={this.state.password} onChange={this.handleChange}
                placeholder="Enter password" required
                onKeyUp={() => Passwordvalid(this.state.password)}/>
              <span id="passwordMessage"></span>
            </div>

            <button type="submit" className="btn btn-primary w-100"
              disabled={this.state.loading}>
              {this.state.loading ? "Registering..." : "Add Admin"}
            </button>
          </form>
        </div>


        {this.state.success && (
          <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
            tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-success text-white">
                  <h5 className="modal-title">Success</h5>
                  <button type="button" className="btn-close btn-close-white"
                    onClick={() => this.setState({ success: "" })}></button>
                </div>
                <div className="modal-body">
                  <p>{this.state.success}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary"
                    onClick={() => this.setState({ success: "" })}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

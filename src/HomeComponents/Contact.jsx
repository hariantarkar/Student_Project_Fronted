import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";

export default class Contact extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      subject: "",
      message: "",
      error: "",
      success: ""
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: "", success: "" });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = this.state;

    if (!name || !email || !subject || !message) {
      this.setState({ error: "All fields are required" });
      return;
    }

    // ✅ Mock Success (replace with API call)
    this.setState({
      success: "Message sent successfully!",
      error: "",
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  render() {
    return (
      <div className="contact-container">
        <div className="contact-card">
          <h3 className="text-center">Contact Us</h3>

          {this.state.error && (
            <div className="alert alert-danger">{this.state.error}</div>
          )}
          {this.state.success && (
            <div className="alert alert-success">{this.state.success}</div>
          )}

          <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Subject</label>
              <input
                type="text"
                name="subject"
                className="form-control"
                value={this.state.subject}
                onChange={this.handleChange}
                placeholder="Enter subject"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                name="message"
                className="form-control"
                rows="4"
                value={this.state.message}
                onChange={this.handleChange}
                placeholder="Write your message..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    );
  }
}

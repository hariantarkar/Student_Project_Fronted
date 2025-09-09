

import React, { useState } from "react";  
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";
import { addContact } from "../services/contactService";
import { FullNameValid, validateEmail, SubjectValid, TextMessageValid } from "../Validations/ContactUsValid";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      setError("All fields are required");
      return;
    }

    const isNameValid = FullNameValid(name); 
    const isEmailValid = validateEmail({ target: { value: email, style: {} } }); 
    const isSubjectValid = SubjectValid(subject);
    const isMessageValid = TextMessageValid(message);

    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
      setError("Please fix the errors before sending");
      return;
    }

    try {
      const result = await addContact({ name, email, subject, message });

  
      if (result && result.message === "Email already exists") {
        setError("Email already exists. Please use a different email.");
        setSuccess("");
        return;
      }

    
      setSuccess("Thanks for contacting us. Team will contact you.");
      setError("");
      setFormData({ name: "", email: "", subject: "", message: "" });

    } catch (err) {
      setError(err.message || "Something went wrong");
      setSuccess("");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h3 className="text-center">Contact Us</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              onKeyUp={() => FullNameValid(formData.name)}
            />
            <span id="s"></span>
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              onKeyUp={(e) => validateEmail(e)}
            />
            <span id="s"></span>
          </div>

          <div className="mb-3">
            <label className="form-label">Subject</label>
            <input
              type="text"
              name="subject"
              className="form-control"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
              required
              onKeyUp={() => SubjectValid(formData.subject)}
            />
            <span id="sub"></span>
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              className="form-control"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              maxLength={200}
              required
              onKeyUp={(e) => TextMessageValid(e.target.value)}
            ></textarea>
            <span id="msgBox"></span>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Send Message
          </button>
        </form>
      </div>

      
      {success && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Success</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setSuccess("")}
                ></button>
              </div>
              <div className="modal-body">
                <p>{success}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSuccess("")}
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


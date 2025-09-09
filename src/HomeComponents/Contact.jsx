import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contact.css";
import { addContact } from "../services/contactService";
import { FullNameValid,validateEmail,SubjectValid ,TextMessageValid } from "../Validations/ContactUsValid";

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

    try {
      const result = await addContact({ name, email, subject, message });

      setSuccess(result.message || "Message sent successfully!");
      setError("");
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h3 className="text-center">Contact Us</h3>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" value={formData.name}
              onChange={handleChange} placeholder="Enter your name" required
            onKeyUp={() =>FullNameValid(formData.name)}  /><span id="s"></span>
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-control" value={formData.email}
              onChange={handleChange} placeholder="Enter your email" required
            onKeyUp={(e) => validateEmail(e)} /><span id="s"></span>
          </div>

          <div className="mb-3">
            <label className="form-label">Subject</label>
            <input type="text" name="subject" className="form-control" value={formData.subject}
              onChange={handleChange} placeholder="Enter subject" required
             onKeyUp={() =>SubjectValid(formData.subject)}  /><span id="sub"></span>
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea name="message" className="form-control" rows="4" value={formData.message}
              onChange={handleChange} placeholder="Write your message..." maxLength={200}
              required  onKeyUp={(e) => TextMessageValid(e.target.value)}></textarea>
            <span id="msgBox"></span>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

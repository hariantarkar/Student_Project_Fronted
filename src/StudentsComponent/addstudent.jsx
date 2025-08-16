import React, { Component } from "react";

class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.user?.name || "",
      email: props.user?.email || "",
      contact: props.user?.contact || "",
      uid: props.user?.uid || "",
      course: ""
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:9999/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Student Added Successfully");
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ width: "300px", margin: "auto" }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleChange}
        /><br/>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleChange}
        /><br/>
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={this.state.contact}
          onChange={this.handleChange}
        /><br/>
        <input
          type="text"
          name="uid"
          placeholder="UID"
          value={this.state.uid}
          onChange={this.handleChange}
          readOnly
        /><br/>
        <input
          type="text"
          name="course"
          placeholder="Add Course Name or ID"
          value={this.state.course}
          onChange={this.handleChange}
        /><br/>
        <button type="submit">Add Student</button>
      </form>
    );
  }
}

export default AddStudent;




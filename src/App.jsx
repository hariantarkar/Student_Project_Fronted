import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./HomeComponents/Home.jsx";
import CourseComponent from "./CourseComponents/CourseComponent.jsx";

import ViewCourses from "./CourseComponents/ViewCourses.jsx";
import StudentComponent from "./StudentsComponent/studentComponent.jsx";
import AddNewStudent from "./StudentsComponent/AddNewStudent.jsx";
import ViewAllStudent from "./StudentsComponent/ViewAllStudent.jsx"; 



import Login from "./LoginComponents/Login.jsx";
import Register from "./LoginComponents/Register.jsx";
import AdminDashboard from "./DashboardComponent/AdminDashboard.jsx";

export default class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addCourse" element={<CourseComponent />} />

            <Route path="/viewCourses" element={<ViewCourses />} />
            <Route path="/studentsData" element={<StudentComponent />} />
            <Route path="/addNewStudent" element={<AddNewStudent />} />
            <Route path="/viewAllStudents" element={<ViewAllStudent />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
  path="/admin/dashboard"
  element={
    localStorage.getItem("role") === "admin"
      ? <AdminDashboard />
      : <Home />
  }
/>

          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

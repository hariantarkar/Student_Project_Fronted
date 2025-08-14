import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes,NavLink } from "react-router-dom";

import HomePage from "./HomeComponents/HomePage.jsx";
 import Navbar from "./HomeComponents/NavBars.jsx";
import KeyFeature from "./HomeComponents/KeyFeature.jsx";
import AboutPage from "./HomeComponents/AboutPage.jsx";

import Login from "./LoginComponents/Login.jsx";
import Register from "./LoginComponents/Register.jsx";

import CourseComponent from "./CourseComponents/CourseComponent.jsx";
import ViewCourses from "./CourseComponents/ViewCourses.jsx";

import StudentComponent from "./StudentsComponent/studentComponent.jsx";
import AddNewStudent from "./StudentsComponent/AddNewStudent.jsx";
import ViewAllStudent from "./StudentsComponent/ViewAllStudent.jsx"; 


import AdminDashboard from "./DashboardComponent/AdminDashboard.jsx";



export default class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />}/>

            <Route path="/addCourse" element={<CourseComponent />} />
            <Route path="/viewCourses" element={<ViewCourses />} />
            <Route path="/studentsData" element={<StudentComponent />} />
            <Route path="/addNewStudent" element={<AddNewStudent />} />
            <Route path="/viewAllStudents" element={<ViewAllStudent />} />
            <Route path="/keyfeature" element={<KeyFeature />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/dashboard" element={localStorage.getItem("role") === "admin"
                ? <AdminDashboard />: <Home />}/>
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

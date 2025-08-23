import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";


import HomePage from "./HomeComponents/HomePage.jsx";
import Navbar from "./HomeComponents/NavBars.jsx";
import KeyFeature from "./HomeComponents/KeyFeature.jsx";
import AboutPage from "./HomeComponents/AboutPage.jsx";
import Contact from "./HomeComponents/Contact.jsx";

import Login from "./LoginComponents/Login.jsx";
import Register from "./LoginComponents/Register.jsx";

import ViewCourses from "./CourseComponents/ViewCourses.jsx";
import AddNewCourse from "./CourseComponents/addNewCourse.jsx";

import AddNewStudent from "./StudentsComponent/AddNewStudent.jsx";
import ViewAllStudent from "./StudentsComponent/ViewAllStudent.jsx";
import UnregisteredStudents from "./StudentsComponent/UnregisteredStudents.jsx";
//import ApproveStudent from "./StudentsComponent/ApproveStudent.jsx";
import ViewApprovedStudents from "./StudentsComponent/ViewApprovedStudents.jsx";
//import PendingStudentApproval from "./StudentsComponent/PendingStudentApproval.jsx";
import StudentsTabs from "./StudentsComponent/StudentsTabs.jsx";
import CourseTabs from "./CourseComponents/CourseTabs.jsx";

import AdminDashboard from "./DashboardComponent/AdminDashboard.jsx";
import PerformanceAdd from "./PerformanceComponent/PerformanceAdd.jsx";


export default class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>

            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<Contact />} />


            <Route path="/addCourse" element={<AddNewCourse />} />


            <Route path="/viewCourses" element={<ViewCourses />} />
            <Route path="/addNewStudent" element={<AddNewStudent />} />

            <Route path="/keyfeature" element={<KeyFeature />} />

            {/* <Route path="/approveStudent" element={<ApproveStudent />} /> */}
            {/* <Route path="/pendingStudentApproval" element={<PendingStudentApproval />} /> */}

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/dashboard" element={localStorage.getItem("role") === "admin"
              ? <AdminDashboard /> : <HomePage />} />

            <Route path="/performance/add" element={<PerformanceAdd />} />
            {/* <Route path="/studentsTabs" element={<StudentsTabs />} /> */}
            {/* <Route path="/unregisteredStudents" element={<UnregisteredStudents />} />
              <Route path="/viewApprovedStudents" element={<ViewApprovedStudents />} />
              <Route path="/viewAllStudents" element={<ViewAllStudent />} />
            */}


   <Route path="/admin/dashboard" element={<AdminDashboard />}>
        {/* Students section */}
        <Route path="Course" element={
          <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <CourseTabs />
            <div style={{ flex: 1, overflowY: "auto", marginTop: "20px" }}>
              <Outlet />
            </div>
          </div>
        }>
          <Route path="addCourse" element={<AddNewCourse />} />
          <Route path="viewCourses" element={<ViewCourses />} />
        </Route>
      </Route>











   <Route path="/admin/dashboard" element={<AdminDashboard />}>
        {/* Students section */}
        <Route path="students" element={
          <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <StudentsTabs />
            <div style={{ flex: 1, overflowY: "auto", marginTop: "20px" }}>
              <Outlet />
            </div>
          </div>
        }>
          {/* If you want only tabs first, omit the next line.
             If you want a default tab to open, UNCOMMENT it. */}
          {/* <Route index element={<Navigate to="unregisteredStudents" replace />} /> */}

          <Route path="unregisteredStudents" element={<UnregisteredStudents />} />
          <Route path="viewApprovedStudents" element={<ViewApprovedStudents />} />
          <Route path="viewAllStudents" element={<ViewAllStudent />} />
        </Route>
      </Route>




          </Routes>
        </BrowserRouter>



      </>
    );
  }
}

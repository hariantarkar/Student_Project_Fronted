import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import HomePage from "./HomeComponents/HomePage.jsx";
import Navbar from "./HomeComponents/NavBars.jsx";
import KeyFeature from "./HomeComponents/KeyFeature.jsx";
import AboutPage from "./HomeComponents/AboutPage.jsx";
import Contact from "./HomeComponents/Contact.jsx";
import Overview from "./HomeComponents/OverviewPage.jsx"
import AdminLogin from "./LoginComponents/AdminLogin.jsx";
import StudentLogin from "./LoginComponents/StudentLogin.jsx";

import Register from "./LoginComponents/Register.jsx";

import AdminDashboard from "./DashboardComponent/AdminDashboard.jsx";
import CourseTabs from "./CourseComponents/CourseTabs.jsx";
import AddNewCourse from "./CourseComponents/addNewCourse.jsx";
import ViewCourses from "./CourseComponents/ViewCourses.jsx";

import UnregisteredStudents from "./StudentsComponent/UnregisteredStudents.jsx";
import ViewApprovedStudents from "./StudentsComponent/ViewApprovedStudents.jsx";
import StudentsTabs from "./StudentsComponent/StudentsTabs.jsx";
import ViewAllStudent from "./StudentsComponent/ViewAllStudent.jsx";

import PerformanceTabs from "./PerformanceComponent/PerformanceTab.jsx";
import ViewConfirmedStudents from "./PerformanceComponent/ViewConfirmStudents.jsx";
import PerformanceAdd from "./PerformanceComponent/PerformanceAdd.jsx";
import ViewPerformance from "./PerformanceComponent/ViewPerformance.jsx";
import PerformanceUpdate from "./PerformanceComponent/PerformanceUpdate.jsx";
import PerformanceChart from "./PerformanceComponent/PerformanceChart.jsx";

import StudentDashboard from "./DashboardComponent/StudentDashBoard.jsx"
import Profile from "./DashboardComponent/Profile.jsx";
import Courses from "./DashboardComponent/Course.jsx";
import Performance from "./DashboardComponent/Performance.jsx";
import Prediction from "./DashboardComponent/Prediction.jsx";

const token = localStorage.getItem("token");
if (token) {
  const decoded = jwtDecode(token);
  if (decoded.exp * 1000 < Date.now()) {
    localStorage.clear();
    window.location.href = "/login";
  }
}

export default class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/keyfeature" element={<KeyFeature />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/overview" element={<Overview />} />

            <Route path="/register" element={<Register />} />
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard/*" element={<AdminDashboard />} />

            <Route path="/admin/dashboard" element={<AdminDashboard />}>
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
              <Route path="students" element={
                <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                  <StudentsTabs />
                  <div style={{ flex: 1, overflowY: "auto", marginTop: "20px" }}>
                    <Outlet />
                  </div>
                </div>
              }>
                <Route path="unregisteredStudents" element={<UnregisteredStudents />} />
                <Route path="viewApprovedStudents" element={<ViewApprovedStudents />} />
                <Route path="viewAllStudents" element={<ViewAllStudent />} />
              </Route>
            </Route>

            <Route path="/admin/dashboard" element={<AdminDashboard />}>
              <Route
                path="performance"
                element={
                  <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                    <PerformanceTabs />
                    <div style={{ flex: 1, overflowY: "auto", marginTop: "20px" }}>
                      <Outlet />
                    </div>
                  </div>
                }>
                <Route path="students" element={<ViewConfirmedStudents />} />
                <Route path="add/:sid" element={<PerformanceAdd />} />
                <Route path="view" element={<ViewPerformance />} />

                <Route path="update/:sid" element={<PerformanceUpdate />} />
              </Route>
            </Route>

            <Route path="chart" element={<PerformanceChart />} />
            <Route path="/student/dashboard" element={<StudentDashboard />}>
              <Route path="profile" element={<Profile />} />
              <Route path="courses" element={<Courses />} />
              <Route path="performance" element={<Performance />} />
              <Route path="prediction" element={<Prediction />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}


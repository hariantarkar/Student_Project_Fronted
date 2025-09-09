import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import HomePage from "./HomeComponents/HomePage.jsx";
import Navbar from "./HomeComponents/NavBars.jsx";
import KeyFeature from "./HomeComponents/KeyFeature.jsx";
import AboutPage from "./HomeComponents/AboutPage.jsx";
import Contact from "./HomeComponents/Contact.jsx";
import Overview from "./HomeComponents/OverviewPage.jsx"
import AdminLogin from "./LoginComponents/AdminLogin.jsx";
import StudentLogin from "./LoginComponents/StudentLogin.jsx";
import RegisterStudentAdminSide from "./StudentsComponent/RegisterStudentAdminSide.jsx"
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
import StudentProfile from "./DashboardComponent/Profile.jsx";
import StudentCourses from "./DashboardComponent/Course.jsx";
import Performance from "./DashboardComponent/Performance.jsx";
import LatestPrediction from "./DashboardComponent/Prediction.jsx";

import PredictionTabs from "./PredictionComponents/PredictionTab.jsx";
import ViewPrediction from "./PredictionComponents/ViewPrediction.jsx";


import ViewEnquiry from "./NewEnquiry/ViewEnquiry.jsx"

import AddNewAdmin from "./DashboardComponent/AddNewAdmin.jsx";

import Shortlisted from "./PredictionComponents/ShortListedStudent.jsx";


const token = Cookies.get("token");
if (token) {
  const decoded = jwtDecode(token);
  if (decoded.exp * 1000 < Date.now()) {
    Cookies.remove("token");
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
                <Route path="RegisterStudentAdminSide" element={<RegisterStudentAdminSide />} />
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
                <Route path="chart/:sid" element={<PerformanceChart />} />
              </Route>
            </Route>

            <Route path="/login/student" element={<StudentLogin />} />
            <Route path="/student/dashboard" element={<StudentDashboard />}>
              <Route path="profile" element={<StudentProfile />} />
              <Route path="courses" element={<StudentCourses />} />
              <Route path="performance" element={<Performance />} />
              <Route path="prediction" element={<LatestPrediction />} />
            </Route>

            <Route path="/admin/dashboard" element={<AdminDashboard />}>
              <Route
                path="prediction"
                element={
                  <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                    <PredictionTabs />
                    <div style={{ flex: 1, overflowY: "auto", marginTop: "20px" }}>
                      <Outlet />
                    </div>
                  </div>
                }>
                <Route path="all" element={<ViewPrediction />} />



                <Route path="shortlisted" element={<Shortlisted />} />

              </Route>
            </Route>

            <Route path="/admin/dashboard" element={<AdminDashboard />}>
              <Route
                path="enquiry"
                element={
                  <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>

                    <div style={{ flex: 1, overflowY: "auto", marginTop: "20px" }}>
                      <Outlet />
                    </div>
                  </div>
                }
              >
                <Route path="" element={<ViewEnquiry />} />
              </Route>
            </Route>
            <Route path="/admin/dashboard" element={<AdminDashboard />}>
              <Route
                path="AddNewAdmin"
                element={<AddNewAdmin />}
              />
            </Route>



          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

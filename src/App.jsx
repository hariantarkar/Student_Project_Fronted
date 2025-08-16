import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./HomeComponents/HomePage.jsx";
 import Navbar from "./HomeComponents/NavBars.jsx";
import KeyFeature from "./HomeComponents/KeyFeature.jsx";
import AboutPage from "./HomeComponents/AboutPage.jsx";

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

//import AdminDashboard from "./DashboardComponent/AdminDashboard.jsx";
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

         

            <Route path="/addCourse" element={<AddNewCourse />} />


            <Route path="/viewCourses" element={<ViewCourses />} />
            <Route path="/addNewStudent" element={<AddNewStudent />} />
            <Route path="/viewAllStudents" element={<ViewAllStudent />} />

            <Route path="/keyfeature" element={<KeyFeature />} />

            <Route path="/unregisteredStudents" element={<UnregisteredStudents />} />
            {/* <Route path="/approveStudent" element={<ApproveStudent />} /> */}
            <Route path="/viewApprovedStudents" element={<ViewApprovedStudents />} />
            {/* <Route path="/pendingStudentApproval" element={<PendingStudentApproval />} /> */}

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/dashboard" element={localStorage.getItem("role") === "admin"
                ? <AdminDashboard />: <HomePage />}/>
                
          </Routes>
        </BrowserRouter>
      
     

      </>
    );
  }
}

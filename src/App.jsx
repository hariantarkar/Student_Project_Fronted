import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./HomeComponents/Home.jsx";
import CourseComponent from "./CourseComponents/CourseComponent.jsx";

export default class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addCourse" element={<CourseComponent />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

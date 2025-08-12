import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

 export default class Slideshow extends Component {
  state = { current: 0 };
  slides = [
    "/images/slide1.jpg",
    "/images/slide2.jpg",
    "/images/slide3.jpg"
  ];

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ current: (this.state.current + 1) % this.slides.length });
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="slideshow">
        <img src={this.slides[this.state.current]} alt="Slide" className="slide-img" />
      </div>
    );
  }
}



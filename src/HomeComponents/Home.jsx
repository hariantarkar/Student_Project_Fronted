import React from "react";
//import "./style.css"; // Make sure this path is correct

export default class Home extends React.Component {
  render() {
    return (
      <>
        <div className="navbar">
          <span className="nav-left">Navbar</span>
          <span className="nav-right">login</span>
        </div>

        <div className="getstartingdiv">
          <div className="content">
            <input
              type="submit"
              className="btn btn-primary"
              value="Get starting"
            />
          </div>
        </div>
      </>
    );
  }
}

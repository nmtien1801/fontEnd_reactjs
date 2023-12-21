import React from "react";
import { NavLink, BrowserRouter } from "react-router-dom";
import "./nav.scss";
class Nav extends React.Component {
  render() {
    return (
      <div className="topnav">
        <NavLink to="/" activeClassName="active" exact={true}>
          Home
        </NavLink>
        <NavLink to="/about" activeClassName="active">
          about
        </NavLink>

        <NavLink to="/api" activeClassName="active">
          api
        </NavLink>
      </div>
    );
  }
}

export default Nav;

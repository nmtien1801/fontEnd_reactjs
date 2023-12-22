import React from "react";
import { NavLink, BrowserRouter } from "react-router-dom";
import "./nav.scss";

const Nav = () => {
  return (
    <div className="topnav">
      <NavLink to="/" exact>
        Home
      </NavLink>
      <NavLink to="/about">about</NavLink>
      <NavLink to="/api">api</NavLink>
    </div>
  );
};

export default Nav;

import React, { useState, useEffect, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./nav.scss";
import { UserContext } from "../../context/userContext";

const Nav = () => {
  // ẩn, hiện(home*) NAV khi login và thoát
  const { user } = useContext(UserContext);
  const location = useLocation(); // userLocation chỉ lấy được trong routes
  if (user && user.isAuthenticated == true || location.pathname === "/") {
    return (
      <>
        <div className="topnav">
          <NavLink to="/" exact>
            Home
          </NavLink>
          {/* <NavLink to="/users">User</NavLink> */}
          <NavLink to="/project">Project</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/api">Api</NavLink>
        </div>
      </>
    );
  }
  else{
    return <></>
  }
};

export default Nav;

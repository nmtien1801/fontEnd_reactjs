import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./nav.scss";

const Nav = () => {
  const [isShow, setIsShow] = useState(true);
  let location = useLocation();
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (location.pathname === "/login") {
      setIsShow(false);
    }
    // window.location.reload();
  }, []);
  return (
    <>
      {isShow === true && (
        <div className="topnav">
          <NavLink to="/" exact>
            Home
          </NavLink>
          {/* <NavLink to="/users">User</NavLink> */}
          <NavLink to="/project">Project</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/api">Api</NavLink>
        </div>
      )}
    </>
  );
};

export default Nav;

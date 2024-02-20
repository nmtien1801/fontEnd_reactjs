import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useLocation, useHistory } from "react-router-dom"; // Link không dùng active
import "./nav.scss";
import { UserContext } from "../../context/userContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../logo.svg";
import { logoutUser } from "../../services/userService";
import { toast } from "react-toastify";

const NavHeader = () => {
  // ẩn, hiện(home*) NAV khi login và thoát
  const { user, logoutContext } = useContext(UserContext);
  const location = useLocation(); // userLocation chỉ lấy được trong routes
  const history = useHistory();

  // khi logout thì context vẫn giữ user nên vẫn hiện header
  const handleLogout = async () => {
    localStorage.removeItem("JWT"); // clear local storage
    let data = await logoutUser(); // clear cookies
    logoutContext(); // clear user in context

    if (data && +data.EC === 0) {
      toast.success("logout success...");
      history.push("/login");
    } else {
      toast.error(data.EM);
    }
  };

  if (
    (user && user.isAuthenticated === true) ||
    location.pathname === "/about" ||
    location.pathname === "/"
  ) {
    return (
      <>
        {/* <div className="topnav">
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/users">User</NavLink>
          <NavLink to="/project">Project</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/api">Api</NavLink>
        </div> */}

        {/* code bằng tj */}
        <div className="nav-header">
          <Navbar expand="lg" className="bg-header">
            <Container>
              <Navbar.Brand href="#home">
                <img
                  alt="React Logo" // không load được logo sẽ hiện
                  src={logo}
                  width="50"
                  height="30"
                  className="d-inline-block align-top"
                />
                <span className="brand-name">React</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink to="/" className="nav-link" exact>
                    Home
                  </NavLink>
                  <NavLink to="/users" className="nav-link">
                    User
                  </NavLink>
                  <NavLink to="/roles" className="nav-link">
                    Roles
                  </NavLink>
                  <NavLink to="/group-roles" className="nav-link">
                    Group-Role
                  </NavLink>
                  <NavLink to="/project" className="nav-link">
                    Project
                  </NavLink>
                  <NavLink to="/about" className="nav-link">
                    About
                  </NavLink>
                  <NavLink to="/api" className="nav-link">
                    Api
                  </NavLink>
                </Nav>

                <Nav>
                  {user && user.isAuthenticated === true ? (
                    <>
                      <Nav.Item className="nav-link" href="#deets">
                        Welcome {user.account.userName} !
                      </Nav.Item>

                      <NavDropdown title="Settings" id="basic-nav-dropdown">
                        <NavDropdown.Item href="">
                          Change password
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="">
                          <span onClick={() => handleLogout()}>logOut</span>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default NavHeader;

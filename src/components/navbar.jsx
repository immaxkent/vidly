import React, { Component } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{ marginBottom: 9 }}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" style={{ cursor: "default" }}>
          Vidly
        </Link>

        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link
              to="/"
              className="nav-link"
              style={{ cursor: "pointer" }}
              aria-current="page"
            >
              Movies
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/customers"
              className="nav-link"
              style={{ cursor: "pointer" }}
            >
              Customers
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/rentals"
              className="nav-link"
              style={{ cursor: "pointer" }}
            >
              Rentals
            </Link>
          </li>
          {/* this seems to be storing the user object somewhere... */}
          {!user && (
            <React.Fragment>
              <li className="nav-item">
                <Link
                  to="/register"
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  Login
                </Link>
              </li>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <li className="nav-item">
                <Link
                  to="/profile"
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  {user.name}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/logout"
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

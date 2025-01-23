import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in by checking the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Update the login state based on token existence
  }, []); // This effect runs once when the component mounts

  // Handle logout
  const handleLogout = () => {
    // Remove token from localStorage to log out the user
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Update the state to reflect the logout
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-2 fixed-top">
        <a
          className="navbar-brand"
          href="/"
          style={{ fontSize: "1.2rem", fontWeight: "bold", color: "maroon" }}
        >
          Blogging <FontAwesomeIcon icon={faNewspaper} />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/posts">
                Latest Posts
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

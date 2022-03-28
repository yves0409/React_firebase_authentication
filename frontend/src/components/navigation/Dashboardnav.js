import React from "react";
import { Link } from "react-router-dom";

const Dashboardnav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/user/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/user/password" className="nav-link">
          Password
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/user/favourites" className="nav-link">
          Favourites
        </Link>
      </li>
    </ul>
  </nav>
);

export default Dashboardnav;

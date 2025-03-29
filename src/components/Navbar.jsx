import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import logo from "../assets/img/logoDev.png";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <header>
      <nav className="dashboard__nav">
        <ul className="dashboard__nav-list">
          <li className="dashboard__nav-item">
            <img
              className="dashboard__logo"
              src={logo}
              alt="Logo DevAutomate"
            />
          </li>
          <li className="dashboard__nav-item">
            <Link to={"/home"} className="dashboard__nav-link">
              Home
            </Link>
          </li>
          <li className="dashboard__nav-item">
            <Link to={"/login"} className="dashboard__nav-link">
              Login
            </Link>
          </li>
          <li className="dashboard__nav-item">
            <p>|</p>
          </li>
          <li className="dashboard__nav-item">
            <Link to={"/cadastrar"} className="dashboard__nav-link">
              Cadastrar
            </Link>
          </li>
          <li className="dashboard__nav-item">
            <button onClick={logout} className="dashboard__btn-2">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
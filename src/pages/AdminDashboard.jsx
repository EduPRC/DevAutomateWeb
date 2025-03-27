import React from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import RecentUsers from "../components/RecentUsers";
import RecentProjects from "../components/RecentProjects";
import "../assets/Dashboard.css";
import { Link } from "react-router-dom";
import logo from "../assets/img/logoDev.png";
import { useAuth } from "../AuthContext";

const AdminDashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard__container">
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

    
        <Sidebar isAdmin={true} />


        <div className="dashboard__main">
          <div className="dashboard__details">
            <RecentUsers />
            <RecentProjects />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
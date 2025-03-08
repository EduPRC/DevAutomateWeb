import React from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import RecentTutorials from "../components/RecentTutorials";
import RecentProjects from "../components/RecentProjects";
import "../assets/Dashboard.css";
import { Link } from "react-router-dom";
import logo from "../assets/img/logoDev.png";
import { useAuth } from "../AuthContext";

const UserDashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        {/* Barra de navegação superior */}
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

        {/* Sidebar */}
        <Sidebar />

        {/* Conteúdo principal */}
        <div className="dashboard__main">
          {/* Cards de métricas */}
          <div className="dashboard__card-box">
          <Card title="Projetos Ativos" value="5" icon="folder-outline" />
          <Card title="Tutoriais Favoritos" value="12" icon="bookmark-outline" />
          <Card title="Progresso Total" value="75%" icon="bar-chart-outline" />
        </div>

        <div className="details">
          <RecentProjects />
          <RecentTutorials />
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
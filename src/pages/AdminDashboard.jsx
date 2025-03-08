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
        <Sidebar isAdmin={true} />

        {/* Conteúdo principal */}
        <div className="dashboard__main">
          {/* Cards de métricas */}
          <div className="dashboard__card-box">
            <Card title="Acessos Hoje" value="1,200" icon="eye-outline" />
            <Card title="Novos Usuários" value="350" icon="people-outline" />
            <Card
              title="Projetos Submetidos"
              value="45"
              icon="folder-outline"
            />
            <Card
              title="Engajamento"
              value="85%"
              icon="trending-up-outline"
            />
          </div>

          {/* Detalhes (Usuários Recentes e Projetos Recentes) */}
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
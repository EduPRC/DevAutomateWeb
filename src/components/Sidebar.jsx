import React, { useState } from "react";
import "../assets/TopSidebar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Importe o contexto de autenticação

const Sidebar = ({ isAdmin }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const { role } = useAuth(); // Obtenha o papel do usuário do contexto

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className="topbar">
        <button className="hamburger-menu" onClick={toggleSidebar}>
          <ion-icon name="menu-outline"></ion-icon>
        </button>
      </div>
      <div className={`navigation ${isSidebarVisible ? "" : "hidden"}`}>
        <ul>
          <li>
            <Link to="/dashboard">
              <span className="icon">
                <ion-icon name="person-outline"></ion-icon>
              </span>
              <span className="title">{isAdmin ? "Admin" : "Meu Perfil"}</span>
            </Link>
          </li>

          {isAdmin ? (
            <>
              <li>
                <a href="#">
                  <span className="icon">
                    <ion-icon name="people-outline"></ion-icon>
                  </span>
                  <span className="title">Gerenciar Usuários</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon">
                    <ion-icon name="folder-outline"></ion-icon>
                  </span>
                  <span className="title">Projetos da Comunidade</span>
                </a>
              </li>
              <li>
                <Link to="/analises">
                  <span className="icon">
                    <ion-icon name="analytics-outline"></ion-icon>
                  </span>
                  <span className="title">Análises</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="#">
                  <span className="icon">
                    <ion-icon name="folder-outline"></ion-icon>
                  </span>
                  <span className="title">Meus Projetos</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon">
                    <ion-icon name="bookmark-outline"></ion-icon>
                  </span>
                  <span className="title">Tutoriais Favoritos</span>
                </a>
              </li>
              <li>
              <Link to="/progresso">
                  <span className="icon">
                    <ion-icon name="sync-outline"></ion-icon>
                  </span>
                  <span className="title">Progresso</span>
                </Link>
              </li>
            </>
          )}

          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="settings-outline"></ion-icon>
              </span>
              <span className="title">
                {isAdmin ? "Configurações do Site" : "Configurações"}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
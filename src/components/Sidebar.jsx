import React, { useState } from "react";
import "../assets/TopSidebar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext"; 
import { IonIcon } from '@ionic/react';
import { 
  menuOutline, 
  personOutline, 
  peopleOutline, 
  folderOutline, 
  analyticsOutline, 
  bookmarkOutline, 
  syncOutline, 
  settingsOutline 
} from 'ionicons/icons';

const Sidebar = ({ isAdmin }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const { role } = useAuth(); // Obtenha o papel do usuário do contexto

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className="topbar">
        <button className="topbar-menu" onClick={toggleSidebar}>
        <IonIcon icon={menuOutline} />
        </button>
      </div>
      <div className={`navigation ${isSidebarVisible ? "" : "hidden"}`}>
        <ul>
          <li>
            <Link to="/dashboard">
              <span className="icon">
              <IonIcon icon={personOutline} />
              </span>
              <span className="title">{isAdmin ? "Admin" : "Meu Perfil"}</span>
            </Link>
          </li>

          {isAdmin ? (
            <>
              <li>
                <a href="#">
                  <span className="icon">
                  <IonIcon icon={peopleOutline} />
                  </span>
                  <span className="title">Gerenciar Usuários</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon">
                  <IonIcon icon={folderOutline} />
                  </span>
                  <span className="title">Projetos da Comunidade</span>
                </a>
              </li>
              <li>
                <Link to="/analises">
                  <span className="icon">
                  <IonIcon icon={analyticsOutline} />
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
                  <IonIcon icon={folderOutline} />
                  </span>
                  <span className="title">Meus Projetos</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="icon">
                  <IonIcon icon={bookmarkOutline} />
                  </span>
                  <span className="title">Tutoriais Favoritos</span>
                </a>
              </li>
              <li>
              <Link to="/progresso">
                  <span className="icon">
                  <IonIcon icon={syncOutline} />
                  </span>
                  <span className="title">Progresso</span>
                </Link>
              </li>
            </>
          )}

          <li>
            <a href="#">
              <span className="icon">
              <IonIcon icon={settingsOutline} />
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
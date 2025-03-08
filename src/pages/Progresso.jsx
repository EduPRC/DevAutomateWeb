import "../assets/Dashboard.css";
import { Link } from "react-router-dom";
import logo from "../assets/img/logoDev.png";
import { useAuth } from "../AuthContext";
import UserGrafics from "../components/UserGrafics";
import Sidebar from "../components/Sidebar";

const Progresso = () => {
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
              <button onClick={() => { console.log("Logout button clicked"); logout(); }} className="dashboard__btn-2">
                Logout
                </button>
              </li>
            </ul>
          </nav>
        </header>
        <Sidebar />
        <UserGrafics />
        </div>
    </div>
  );
};

export default Progresso;
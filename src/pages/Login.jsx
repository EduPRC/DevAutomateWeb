// Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/Login.css";
import logo from "../assets/img/logoDev.png";
import { findUser } from "../components/mockBackend";
import { useAuth } from "../AuthContext"; // Importe o contexto de autenticação

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Use a função de login do contexto

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = findUser(username, password);

    if (user) {
      login(user.role); // Atualiza o estado de autenticação
      if (username === "admin" && password === "Admin@123") {
        navigate("/dashboard"); // Redireciona para o AdminDashboard
      } else {
        navigate("/dashboard"); // Redireciona para o UserDashboard
      }
    } else {
      setError("Usuário ou senha incorretos.");
    }
  };

  return (
    <div className="login">
      <header>
        <nav className="login__nav">
          <ul className="login__nav-list">
            <li className="login__nav-item">
              <img className="login__logo" src={logo} alt="Logo DevAutomate" />
            </li>
            <li className="login__nav-item">
              <Link to={"/home"} className="login__nav-link">Home</Link>
            </li >
            <li className="login__nav-item">
              <Link to={"/login"}className="login__nav-link">Login</Link>
            </li>
            <p>|</p>
            <li className="login__nav-item">
              <Link to={"/cadastrar"}className="login__nav-link">Cadastrar</Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="login__box">
        <h2 className="login__title">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="login__input"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login__input"
          />
          {error && <p>{error}</p>}
          <button className="login__btn" type="submit">Entrar</button>
        </form>
        <p>
          Ainda não tem conta? <Link to="/cadastrar" className="login__link">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
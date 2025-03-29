// Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/Login.css";
import logo from "../assets/img/logoDev.png";
import { findUser } from "../services/mockBackend";
import { useAuth } from "../AuthContext"; // Import the authentication context

const Login = () => {
  const [email, setEmail] = useState(""); // Changed from username to email for clarity
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from context

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = findUser(email, password);

    if (user) {
      // Store user in localStorage (without the password)
      const userToStore = { ...user };
      delete userToStore.password;
      localStorage.setItem("currentUser", JSON.stringify(userToStore));

      // Call context login with role and user object
      login(user.role, userToStore);

      // Redirect based on user role
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } else {
      setError("Email ou senha incorretos.");
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
              <Link to={"/home"} className="login__nav-link">
                Home
              </Link>
            </li>
            <li className="login__nav-item">
              <Link to={"/login"} className="login__nav-link">
                Login
              </Link>
            </li>
            <p>|</p>
            <li className="login__nav-item">
              <Link to={"/cadastrar"} className="login__nav-link">
                Cadastrar
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="login__box">
        <h2 className="login__title">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase().trim())} 
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
          {error && <p className="login__error">{error}</p>}
          <button className="login__btn" type="submit">
            Entrar
          </button>
        </form>
        <p>
          Ainda não tem conta?{" "}
          <Link to="/cadastrar" className="login__link">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

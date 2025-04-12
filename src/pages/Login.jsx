// Login.jsx (atualizado)
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/Login.css";
import logo from "../assets/img/logoDev.png";
import { useAuth } from "../AuthContext";
import { loginWithEmail, loginWithGoogle } from "../services/firebaseAuthService";
import { IonIcon } from '@ionic/react';
import { logoGoogle } from 'ionicons/icons';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await loginWithEmail(email, password);
    
    if (result.success) {
      localStorage.setItem("currentUser", JSON.stringify(result.user));
      login(result.user.role, result.user);
      // Redireciona com base no role
      navigate(result.user.role === 'admin' ? "/admin-dashboard" : "/user-dashboard");
    } else {
      setError(result.error);
    }
  };

  const handleGoogleLogin = async () => {
    const result = await loginWithGoogle();
    
    if (result.success) {
      localStorage.setItem("currentUser", JSON.stringify(result.user));
      login(result.user.role, result.user);
      // Redireciona com base no role
      navigate(result.user.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
    } else {
      setError(result.error);
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
            type="email"
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

        <div className="login__divider">ou</div>

        <button 
          className="login__btn google-btn"
          onClick={handleGoogleLogin}
        >
          <IonIcon icon={logoGoogle} style={{ marginRight: '8px' }} />
          Entrar com Google
        </button>

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
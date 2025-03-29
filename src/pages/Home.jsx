import React from "react";
import "../assets/Home.css";
import logo from "../assets/img/logoDev.png";
import icone from "../assets/img/icone.png";
import automation from "../assets/img/Automation.jpeg";
import videoFileIA from "../assets/img/IA.mp4";
import videoFileAut from "../assets/img/Aut.mp4";
import ScrollToTopButton from "../ScrollToTopButton";
import imgIA from "../assets/img/imgIA.png";
import imgAut from "../assets/img/imgAut.png";
import { Link } from "react-router-dom"
import Sidebar from "../components/Sidebar";
import { useAuth } from "../AuthContext";

const Home = () => {
  const { logout, role } = useAuth();
  return (
    <div>
      <Sidebar isAdmin={role === "admin"} />
      <header>
        <nav className="home__nav">
          <ul className="home__nav-list">
            <li className="home__nav-item">
              <img className="home__logo" src={logo} alt="Logo DevAutomate" />
            </li>
            <li className="home__nav-item">
              <a href="#home__sobre" className="home__nav-link">Sobre</a>
            </li>
            <li className="home__nav-item">
              <a href="#home__tutoriais" className="home__nav-link">Tutoriais</a>
            </li>
            <li className="home__nav-item">
              <a href="#home__projetos" className="home__nav-link">Projetos</a>
            </li>
            <li className="home__nav-item">
              <Link to={"/login"} className="home__nav-link">Login</Link>
            </li>
            <p>|</p>
            <li className="home__nav-item">
              <Link to={"/cadastrar"} className="home__nav-link">Cadastrar</Link>
            </li>
            <li className="home__nav-item">
              <button onClick={logout} className="home__btn-2">Logout</button> {/* Botão de logout */}
            </li>
          </ul>
        </nav>
      </header>

      <section className="home__hero">
        <div className="home__box-hero">
          <h1 className="home__hero-title">Automação e Inteligência Artificial</h1>
          <p className="home__hero-description">Explore tutoriais, projetos e dicas para dominar Python e IA.</p>
          <img className="home__icone" src={icone} alt="python" />
          <button
            className="home__btn"
            onClick={() =>
              document
                .getElementById("home__tutoriais")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Comece Agora
          </button>
          <p style={{ height: "2000px" }} ></p>
          <ScrollToTopButton />
        </div>
      </section>

      <section id="home__sobre">
        <div className="home__img-sobre">
          <img src={automation} alt="Imagem de Automação" className="home__sobre-img"/>
        </div>
        <div className="home__box-sobre">
          <h2 className="home__sobre-title">Sobre o DevAutomate</h2>
          <p className="home__sobre-description">
            O DevAutomate é um portal dedicado a ensinar automação e
            inteligência artificial de forma prática e acessível.
          </p>
        </div>
      </section>

      <section id="home__tutoriais">
        <h2 className="home__tutoriais-title">Tutoriais Recentes</h2>
        <div className="home__cards">
          <div className="home__card-container">
            <div className="home__card">
              <h3>Automação com Python</h3>
              <p>Aprenda a automatizar tarefas com Python.</p>
            </div>
            <video className="home__video" width="560" height="315" controls>
              <source src={videoFileAut} type="video/mp4" />
              Seu navegador não suporta a tag de vídeo.
            </video>
          </div>
          <div className="home__card-container">
            <div className="home__card">
              <h3>Inteligência Artificial Básica</h3>
              <p>Introdução aos conceitos de IA e Machine Learning.</p>
            </div>
            <video className="home__video" width="560" height="315" controls>
              <source src={videoFileIA} type="video/mp4" />
              Seu navegador não suporta a tag de vídeo.
            </video>
          </div>
        </div>
      </section>

      <section id="home__projetos">
        <h2 className="home__projetos-title">Projetos em Destaque</h2>
        <p className="home__projetos-description">
          Veja exemplos reais de automação e IA aplicados a problemas do dia a
          dia.
        </p>
        <div className="home__container-main">
          <div className="home__container-ia">
            <h2 className="home__container-ia-title">Análise de ações com Machine Learning</h2>
            <img src={imgIA} className="home__container-ia-img"></img>
            <p className="home__container-ia-description">
              Neste projeto, você utilizará dados reais da B3 (Bolsa de Valores
              brasileira), obtidos através do yfinance, e técnicas de ciência de
              dados para identificar padrões e desenvolver estratégias para o
              mercado financeiro.
            </p>
          </div>
          <div className="home__container-aut">
            <h2 className="home__container-aut-title">Gerando Relatórios PDF via Excel</h2>
            <img src={imgAut} className="home__container-aut-img"></img>
            <p className="home__container-aut-description">
              Neste projeto, você aprenderá todas as etapas para criar esta
              automação, desde o processamento inicial dos dados até a formatação
              final e geração do PDF. Processe os dados com a biblioteca pandas,
              explore como transformar esses dados em tabelas HTML atraentes
              utilizando templates de Jinja e estilização CSS, e aprenda a
              transformar o HTML em PDF e combiná-lo com layouts customizados.
            </p>
          </div>
        </div>
      </section>

      <footer className="home__footer">
        <p className="home__gradiente-texto">
          &copy; 2025 DevAutomate. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Home;
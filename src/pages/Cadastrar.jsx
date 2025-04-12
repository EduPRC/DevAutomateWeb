import "../assets/Cadastrar.css";
import logo from "../assets/img/logoDev.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addUser, checkEmailExists } from "../services/firebaseUserService";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/conectionFirebase";

const Cadastrar = () => {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");
  const [regrasSenha, setRegrasSenha] = useState({
    minimoCaracteres: false,
    letraMaiuscula: false,
    letraMinuscula: false,
    numero: false,
    caractereEspecial: false,
  });
  const [senhasIguais, setSenhasIguais] = useState(false);
  const [erroUsuario, setErroUsuario] = useState("");
  const [erroEmail, setErroEmail] = useState("");
  const navigate = useNavigate();

  const validarSenha = (senha) => {
    const padraoSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[!@#$%&*])[A-Za-z\d!@#$%&*]{8,12}$/;
    return padraoSenha.test(senha);
  };

  const validarUsuario = (usuario) => {
    return usuario.length >= 5 && usuario.length <= 15;
  };

  const validarEmail = (email) => {
    const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padraoEmail.test(email);
  };

  const handleUsuarioChange = (e) => {
    const novoUsuario = e.target.value;
    setUsuario(novoUsuario);

    if (!validarUsuario(novoUsuario)) {
      setErroUsuario("O nome de usuário deve ter entre 5 e 15 caracteres.");
    } else {
      setErroUsuario("");
    }
  };

  const handleEmailChange = (e) => {
    const novoEmail = (e.target.value.toLowerCase().replace(/\s/g, "").trim()); // Remove todos os espaços
    setEmail(novoEmail);
  
    setErroEmail("");
  
    if (!validarEmail(novoEmail)) {
      setErroEmail("Por favor, insira um email válido.");
    }
  };

  const handleSenhaChange = (e) => {
    const novaSenha = e.target.value;
    setSenha(novaSenha);
  
    const novasRegras = {
      minimoCaracteres: novaSenha.length >= 8 && novaSenha.length <= 12,
      letraMaiuscula: /[A-Z]/.test(novaSenha),
      letraMinuscula: /[a-z]/.test(novaSenha),
      numero: /[\d]/.test(novaSenha),
      caractereEspecial: /[!@#$%&*]/.test(novaSenha),
    };
  
    setRegrasSenha(novasRegras);
  
    if (repetirSenha) {
      setSenhasIguais(novaSenha === repetirSenha);
    }
  };

  const handleRepetirSenhaChange = (e) => {
    const novaRepetirSenha = e.target.value;
    setRepetirSenha(novaRepetirSenha);
    setSenhasIguais(senha === novaRepetirSenha);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarUsuario(usuario)) {
      setErroUsuario("O nome de usuário deve ter entre 5 e 15 caracteres.");
      return;
    }
    
    if (!validarEmail(email)) {
      setErroEmail("Por favor, insira um email válido.");
      return;
    }
    
    if (!validarSenha(senha)) {
      return;
    }
    
    if (!senhasIguais) {
      return;
    }

    // Verifica se o email já existe
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      setErroEmail("Este email já está cadastrado.");
      return;
    }

    try {
      // Cria o usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      
      // Adiciona os dados adicionais no Firestore
      const result = await addUser({
        username: usuario,
        email: email,
        name: email.split('@')[0],
        role: "user",
        registrationDate: new Date().toISOString()
      });

      if (result.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      if (error.code === 'auth/email-already-in-use') {
        setErroEmail("Este email já está cadastrado.");
      }
    }
  };

  return (
    <div className="cadastrar">
      <header>
        <nav className="cadastrar__nav">
          <ul className="cadastrar__nav-list">
            <li className="cadastrar__nav-item">
              <img className="cadastrar__logo" src={logo} alt="Logo DevAutomate" />
            </li>
            <li className="cadastrar__nav-item">
              <Link to={"/home"} className="cadastrar__nav-link">Home</Link>
            </li>
            <li className="cadastrar__nav-item">
              <Link to={"/login"} className="cadastrar__nav-link">Login</Link>
            </li>
            <p>|</p>
            <li className="cadastrar__nav-item">
              <Link to={"/cadastrar"} className="cadastrar__nav-link">Cadastrar</Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="cadastrar__box">
        <h2 className="cadastrar__title">Cadastrar</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="cadastrar__input"
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={handleUsuarioChange}
            required
          />
          {erroUsuario && <p style={{ color: "red" }}>{erroUsuario}</p>}
          
          <input
            className="cadastrar__input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
         
          {erroEmail && <p style={{ color: "red" }}>{erroEmail}</p>}
          
          <input
            className="cadastrar__input"
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={handleSenhaChange}
            required
          />
          <input
            className="cadastrar__input"
            type="password"
            placeholder="Repetir Senha"
            value={repetirSenha}
            onChange={handleRepetirSenhaChange}
            required
          />
          <div className="regras-senha">
            <p style={{ color: regrasSenha.minimoCaracteres ? "green" : "red" }}>
              {regrasSenha.minimoCaracteres ? "✔" : "✖"} A senha deve ter entre 8 e 12 caracteres.
            </p>
            <p style={{ color: regrasSenha.letraMaiuscula ? "green" : "red" }}>
              {regrasSenha.letraMaiuscula ? "✔" : "✖"} A senha deve conter pelo menos uma letra maiúscula.
            </p>
            <p style={{ color: regrasSenha.letraMinuscula ? "green" : "red" }}>
              {regrasSenha.letraMinuscula ? "✔" : "✖"} A senha deve conter pelo menos uma letra minúscula.
            </p>
            <p style={{ color: regrasSenha.numero ? "green" : "red" }}>
              {regrasSenha.numero ? "✔" : "✖"} A senha deve conter pelo menos um número.
            </p>
            <p style={{ color: regrasSenha.caractereEspecial ? "green" : "red" }}>
              {regrasSenha.caractereEspecial ? "✔" : "✖"} A senha deve conter pelo menos um caractere especial.
            </p>
            <p style={{ color: senhasIguais ? "green" : "red" }}>
              {senhasIguais ? "✔" : "✖"} As senhas devem ser iguais.
            </p>
          </div>
          <button type="submit" className="cadastrar__btn">Cadastrar</button>
          <p>Ja tem conta?<Link to="/login" className="cadastrar__link">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Cadastrar;
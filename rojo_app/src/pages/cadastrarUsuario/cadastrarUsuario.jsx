import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../../assets/img/logoRojo2.png";

import "./cadastroUsuario.css";

export default function CadastroUsuario() {
  
  var navigate = useNavigate();

  //States Usuario
  const [nome, setNome] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [senhasuario, setSenhaUsuario] = useState("");
  const [contato, setContato] = useState(0);
  const [cargo, setCargo] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [tipoUsuario] = useState(1);
  const [loading, setLoading] = useState(false);

  const FazerCadastroUsuario = (event) => {

    event.preventDefault();

    setLoading(true);

    let usuario = {
      tipoUsuario: tipoUsuario,
      nome: nome,
      email: emailUsuario,
      senha: senhasuario,
      contato: contato,
      cargo: cargo,
      razaoSocial: razaoSocial,
    };

    axios
      .post("http://100.26.2.205/api/Usuario/cadastro-usuario", usuario, {})

      .then((response) => {
        if (response.status === 201) {
          setLoading(false);
          console.log("Usuario Cadastrado !");
          navigate("/");
        }
      })
      .catch((erro) => console.log(erro));
  };

  return (
    <div className="container-cadastrar">
      <header className="container-header">
        <div className="logo-header">
          <nav>
            <Link to="/">
              <img src={Logo} />
            </Link>
          </nav>
        </div>
      </header>

      <div className="bg-animation-pilula" />
      <div className="bg-animation-roda" />

      <div className="box-cadastrar">
        <div className="box-cadastrar-nav">
          <nav>
            <Link id="box-cadastrar-nav-login" to="/Login">
              LOGIN
            </Link>
            <Link to="/CadastrarUsuario"> CADASTRAR</Link>
          </nav>
        </div>

        <div className="container-form-cadastrar">
          <form className="form-cadastrar" onSubmit={FazerCadastroUsuario}>
            <div className="box-form-cadastro">
              <div className="box-cadastro-1">
                <div className="box-input-cadastro">
                  <p>Nome</p>

                  <input
                    className="input-cadastro"
                    type="text"
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                    placeholder="nome completo"
                  />
                </div>
                <div className="box-input-cadastro">
                  <p>Cargo</p>
                  <input
                    className="input-cadastro"
                    type="text"
                    value={cargo}
                    onChange={(event) => setCargo(event.target.value)}
                    placeholder="posicao"
                  />
                </div>
                <div className="box-input-cadastro">
                  <p>Empresa</p>
                  <input
                    className="input-cadastro"
                    type="empresa"
                    value={razaoSocial}
                    onChange={(event) => setRazaoSocial(event.target.value)}
                    placeholder="razao social"
                  />
                </div>
              </div>

              <div className="box-cadastro-2">
                <div className="box-input-cadastro">
                  <p>Email</p>

                  <input
                    className="input-cadastro"
                    type="email"
                    name="email"
                    value={emailUsuario}
                    onChange={(event) => setEmailUsuario(event.target.value)}
                    placeholder="example@email.com"
                  />
                </div>
                <div className="box-input-cadastro">
                  <p>Senha</p>
                  <input
                    className="input-cadastro"
                    type="password"
                    value={senhasuario}
                    onChange={(event) => setSenhaUsuario(event.target.value)}
                    placeholder="* * * * *"
                  />
                </div>
                <div className="box-input-cadastro">
                  <p>Contato</p>
                  <input
                    className="input-cadastro"
                    type="tel"
                    value={contato}
                    inputmode="numeric"
                    onChange={(event) => setContato(event.target.value)}
                    placeholder="(11)00000-0000"
                  />
                </div>
              </div>
          
              <div className="container-usuario">
                <div
                  className="box-img-user"
                />                
              </div>
            </div>

            <div className="box-button-cadastrar">
              {loading === true && (
                <button
                  type="submit"
                  disabled
                  className="btn-cadastro"
                  id="btn__login"
                >
                  Loading...
                </button>
              )}

              {loading === false && (
                <button
                  className="btn-cadastro"
                  id="btn__login"
                  type="submit"
                  disabled={
                    emailUsuario === "" || senhasuario === "" ? "none" : ""
                  }
                >
                  CADASTRAR
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

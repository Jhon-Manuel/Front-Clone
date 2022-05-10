import React,{ useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import './zabbix.css';

import Grafana from '../../assets/icon/icon-grafana.png';
import DataDog from '../../assets/icon/data.png';
import Zabbix from '../../assets/icon/icon-zabbix.png';
import Logo from '../../assets/img/logoRojo2.png';
import Sair from '../../assets/icon/icon-sair.png';
import ho from '../../assets/icon/historico.png';
import la from '../../assets/icon/lista.png';
import ta from '../../assets/icon/topologia.png';
import aa from '../../assets/icon/alerta.png';

import '../../assets/css/barra-esquerda.css';
import '../../assets/css/bem-vindo.css';
import '../../assets/css/animation__input.css';
import '../../assets/css/cadastroEquipamento.css';
import '../../assets/css/style_search.css';
import { parseJwt } from "../../services/auth";
import { useMemo } from "react";
import SearchBar  from '../../component_recycling/SearchBar';

import '../../pages/zabbix/zabbix.css';

export default function BemVindo() 
{
    var navigate = useNavigate();
    
    //States Usuario
    const [nome] = useState(parseJwt().nome);
    const [cargo] = useState(parseJwt().cargo);

    //Lista
    const[listaEquipamento, setListaEquipamento] = useState([]);
    const[busca, setBusca] = useState("");
    const[meusHosts, setMeusHosts] = useState([]);

    function realizarListHost()
    {
        axios.get('./temporario')
        .then((response) => {
            setMeusHosts(response.data);
        })
    }

    useEffect(() => (realizarListHost()),[])

    function realizarListagem (){
        let usuario = parseJwt().jti;
        axios
        .get('http://100.26.2.205/api/Equipamento/listar-meus-equipamentos/' + usuario)
        .then((response ) => {
            // console.log(response.data );
            setListaEquipamento((response.data));
            // setListaEquipamento.toString();
            console.log(listaEquipamento);
        })
        .catch((erro) => console.log(erro));
    }

    useEffect(() => (realizarListagem()), [])        
    
    const equipamentoFiltrado = useMemo(() => {
        return listaEquipamento.filter( (equipamento) => equipamento.modelo.toLowerCase().includes(busca.toLowerCase()));        
    },[busca]) 
    
    const realizarLogout = async () => {
        try {
          await AsyncStorage.removeItem('usuario-login');
          console.log(cargo)
          navigate('/'); 
          
        } catch (error) {
          console.warn(error);
        }
      };


    return(   
        <div className="container-cadastro-equipamento">
            
                <div className="container-barra-esquerda">
                    <div className="barra-superior">
                        <nav  className="Logo">
                            <Link to="/"><img src={Logo} alt="Logo da Rojo"/></Link>
                        </nav>
                        <div className= "cadastro">
                            <Link to="/CadastrarEquipamento">
                                <p className="cadastro-texto">
                                    CADASTRAR EQUIPAMENTO
                                </p>
                                <div className="cadastro-box-anime"/>         
                            </Link>

                        </div>
                        <div className="box-container-link">
                            <nav className="funcao-superior">
                                <p className="fp">GESTAO DE INFRAESTRUTURA</p>
                                <Link className= "funcao" to="/ListaEquipamento">
                                    <img src={la} alt="Icone de listagem"/>
                                    <p>Listar Equipamentos</p>
                                </Link>
                                <Link className= "funcao" to="/Historico">
                                    <img src={ho} alt="Icone de histórico"/>
                                    <p>Histórico</p>
                                </Link>
                                <Link className= "funcao" to="/Topologia">
                                    <img src={ta} alt="Icone de topologia"/>
                                    <p>Topologia</p>
                                </Link>
                                <Link className= "funcao" to="/Alerta">
                                    <img src={aa} alt="Icone de topologia"/>
                                    <p>Alerta</p>
                                </Link>


                            </nav>
                            <div className="funcao-inferior">
                                <p className="fp">SERVICOS DE MONITORAMENTO</p>
                                <Link className="container-link" to="/grafana">
                                    <div className="btn-link">
                                        <img src={Grafana} alt="Logo do Grafana"></img>
                                    </div>
                                    <p>GRAFANA</p>
                                </Link>

                                <Link className="container-link" to="/graylog">
                                    <div className="btn-link">
                                        <img src={DataDog} alt="Logo da DataDog"></img>
                                    </div>
                                    <p>DATADOG</p>
                                </Link>

                                <Link className="container-link" to="/zabbix">
                                    <div className="btn-link">
                                        <img src={Zabbix} alt="Logo do Zabbix"></img>
                                    </div>
                                    <p>ZABBIX </p>
                                </Link>
                            </div>

                        </div>
                        <div className="btn-container-mode">
                                <p> MODO ESCURO</p>
                                <button className="btn-mode">
                                    <div className="btn-mode-interruptor">
                                        <div className="btn-mode-bola">
                                        </div>
                                    </div>
                                </button>
                        </div>



                    </div>
                    <div className="barra-inferior">
                            <div className="container-perfil">
                                    <div
                                        className="perfil-imagem"
                                        
                                    />
                                    <div className="perfil-texto">
                                        <p className="perfil-nome">
                                            {nome}
                                        </p>                                                           
                                        <p className="perfil-cargo">
                                            {cargo}
                                        </p>
                                        
                                    </div>
                                    <div className="perfil-logout">

                                        <button
                                            onClick={realizarLogout}
                                        >
                                            <img src={Sair} alt="icone sair"/>
                                        </button>
                                    </div>
                            </div>
                    </div>

            
                </div>
            <div className="conteudo-equipamento">

                <header>
                    <h2 className="titulo">AREA DE TRABALHO</h2>
                    <div className="search-form">
                        <SearchBar placeholder="Pesquise um modelo " data={listaEquipamento}/>
                        
                    </div>
                </header>
            
                

                <section>
                        
                    <div className="container-info-equipamento">   
                         <div className="table-host">
                            
                            <div className="head-host">TEMPLATES</div>
                            <table className="styled-table">
                                <thead>
                                    <tr>
                                        <th className="hi">ID</th>
                                        <th className="hv">Nome do host</th>
                                        <th className="hs">Status</th>
                                        <th className="hd">Descrição</th>
                                    </tr>  
                                </thead>
                                <tbody>
                                    {
                                        meusHosts.map( (host) => {
                                            return(
                                                <tr key={host.hostid}>
                                                    <td>{host.host}</td>
                                                    <td>{host.status}</td>
                                                    <td>{host.description}</td>
                                                </tr>
                                            )
                                        } )                                
                                    } 
                                </tbody>
                            </table>            

                         </div>


                        <div className="table-host">
                            
                            <div className="head-host">HOST LISTADOS</div>
                            <table className="styled-table">
                                <thead>
                                    <tr>
                                        <th className="hi">ID</th>
                                        <th className="hv">Nome do host</th>
                                        <th className="hs">Status</th>
                                        <th className="hd">Descrição</th>
                                    </tr>  
                                </thead>
                                <tbody>
                                    {
                                        meusHosts.map( (host) => {
                                            return(
                                                <tr key={host.hostid}>
                                                    <td>{host.host}</td>
                                                    <td>{host.status}</td>
                                                    <td>{host.description}</td>
                                                </tr>
                                            )
                                        } )                                
                                    } 
                                </tbody>
                            </table>            

                         </div>
                    </div>           
                </section>
    
            </div>
        </div>
    );
}
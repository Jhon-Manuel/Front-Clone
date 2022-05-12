import axios from "axios";
import React,{ useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";


import { parseJwt } from "../../services/auth";
import BarraLateral from "../../component_recycling/barraLateral/barraLateral";

// import BarWork  from '../../component_recycling/barwork/BarWork';

import '../../component_recycling/barraLateral/barraLateral.css';
import '../../assets/css/animation__input.css';
import '../cadastrarEquipamento/cadastroEquipamento.css';
import './equipamento.css';
import '../../assets/css/style_search.css';
import '../../component_recycling/barwork/BarWork.css';
import '../../component_recycling/barwork/style.css';



// import '../../assets/css/'
// import './BarWork.css';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SettingsInputHdmiIcon from '@mui/icons-material/SettingsInputHdmi';
import { Settings } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import SearchBar  from '../../component_recycling/SearchBar';



export default function CadastroEquipamento() {

    var navigate = useNavigate();

    //States Img Equipamento
    const [arquivo, setArquivo] = useState(null);
    const [img64, setImg64] = useState('');
    const [exist, setExist] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    // const [boolPut, setBoolPut] = useState(false);

    //States Usuario
    const [idUsuario, setIdUsuario] = useState(parseJwt().jti)
    const [nome, setNome] = useState(parseJwt().nome);
    const [cargo, setCargo] = useState(parseJwt().cargo);

    //States Equipamento
    const [idTipoEquipamento, setIdTipoEquipamento] = useState(null);
    const [numeroDeSerie, setNumeroDeSerie] = useState('');
    const [modelo, setModelo] = useState('');
    const [gateWay, setGateWay] = useState('');
    const [ip, setIp] = useState('');
    const [dns, setDns] = useState('');
    const [porta, setPorta] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState(new Date())
    const [condicao, setCondicao] = useState('');

    const [tipo, setTipo] = useState(null);
    const [dadoEquipamento, setDadoEquipamento] =useState([]);
    const [dadoTipoEquipamento, setDadoTipoEquipamento] = useState([]);

    const reboot = document.getElementById('btn-reboot');
    const modal_reboot = document.getElementById('reboot');
    const close = document.getElementById('close');
    
    
    const imgAtual  = document.getElementById('')

    const upload = () => {   
        const formData = new FormData();
        formData.append(
          'arquivo', 
          arquivo,
        );
    
        axios
          .post('http://100.26.2.205/api/imagem/bd', formData, {
            // headers: {
            //   Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
            // },
          })
          .catch((erro) => console.log(erro))
          .then(this.buscarImagem);
    };

    const buscarImagem = () => {
        axios('http://localhost:5000/api/perfils/imagem/bd', {
        //   headers: {
        //     Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
        //   },
        })
        .then((resposta) => {
            if (resposta.status === 200) {
                console.log(resposta);
                this.setState({ imagem64: resposta.data });
            }
        })
        .catch((erro) => console.log(erro))
      };
    

    const buscarTipoEquipamento = () =>
    {
        axios
        .get('http://100.26.2.205/api/TipoEquipamento/lista')
        
        .then(function (response) {
            setDadoTipoEquipamento(response.data)
        })
        .catch((erro)=> console.log(erro))
    }
      
      const cadastroEquipamento = (event) => 
      {
          event.preventDefault();
          
        let equipamento = {
            idUsuario: idUsuario,
            idTipoEquipamento: parseInt(idTipoEquipamento),
            numeroDeSerie: numeroDeSerie,
            modelo: modelo,
            gateWay: parseInt(gateWay),
            mask: parseInt(ip),
            dns: parseInt(dns),
            porta: parseInt(porta),
            dataEntrada : new Date(data),
            descricao: descricao,
    };
    
    axios
    .post("http://100.26.2.205/api/Equipamento/cadastro-equipamento", equipamento
    )   
    
    .then( function (response){
        setDadoEquipamento(response.data);
    })
    
    .then( function (resposta) {
            console.log(resposta);
            navigate('/ListaEquipamento')
        })
        
        .catch( function (erro) {
            console.log(erro);
        });
    }
    
    
    useEffect(() => (buscarTipoEquipamento()),[])

         
    function EventReboot(modalReboot){
        modalReboot.classList.add('show');
        // reboot.addEventListener('click', () => {
        // });
        
    }
    function EventClose(){
        close.addEventListener('click', () => {
            modal_reboot.classList.remove('show')
        });

    }
    
    
        
    
    return(   
        <div className="container-cadastro-equipamento">
                    
                
                <BarraLateral/>
                <div className="conteudo-equipamento">

                    <header>
                        <h2 className="titulo">SEU DISPOSITIVO</h2>
                        <div className="search-form">
                        <div className="lupa"/>
                            <SearchBar/>
                        </div>
                    </header>
                
                    

                    <section>
                            
                    <div className="container-info-equipamento">    
                    <div className="container-info-equipamento-h3"><h3>Dados Equipamento</h3></div>
                                        
                
                                                    <form className="form-cadastro-equipamento" onSubmit={(event) => cadastroEquipamento(event)}>
                                                        <div className="dados">
                                                            <div className="box-1">
                                                                <div className="box-1-1">
                                                                    
                                                                    <div className="form__div">
                                                                        <select
                                                                            name="idTipoEquipamento"  
                                                                            value={idTipoEquipamento}   
                                                                            id="form__input_tipoEquipamento"      
                                                                            onChange={(event) => setIdTipoEquipamento(event.target.value)}
                                                                        >
                                                                                {dadoTipoEquipamento.map((event) => {
                                                                                    return (

                                                                                        <option key={event.idTipoEquipamento} value={event.idTipoEquipamento}>{event.equipamento}
                                                                                        </option>
                                                                                    );
                                                                                })}                                 
                                                                                <option value="#">Tipo de Equipamento </option>
                                                                        </select>                        
                                                                        
                                                                    </div>
                                                                    <div className="form__div">                       
                                                                        <input 
                                                                            className="form__input"
                                                                            type="text"
                                                                            name="Modelo"
                                                                            value={modelo}
                                                                            autoComplete='off'
                                                                            placeholder=" "
                                                                            onChange={(event) => setModelo(event.target.value)}
                                                                        /> 
                                                                        <label className="form__label">
                                                                            Modelo
                                                                        </label>
                                                                    </div>
                                                                </div>


                                                                <div className="form__div">                   
                                                                    <input
                                                                        className="form__input"
                                                                        type="text"
                                                                        name="NumeroSerie"
                                                                        value={numeroDeSerie}
                                                                        placeholder=" "
                                                                        onChange={(event) => setNumeroDeSerie(event.target.value)}
                                                                    />  
                                                                    <label className="form__label">
                                                                        Numero de Série
                                                                    </label>
                                                                </div> 


                                                            </div>
                                                            <div className="divisor">
                                                                <p>Informações para consultas básicas do sistema</p>
                                                                <div className="palito-divisor"/>
                                                            </div>
                                                            <div className="box-2">
                                                                <div className="form__div">                        
                                                                    <input
                                                                        className="form__input"
                                                                        type="text"
                                                                        name="Gateway"
                                                                        value={gateWay}
                                                                        placeholder=" "
                                                                        onChange={(event) => setGateWay(event.target.value)}
                                                                    />
                                                                    <label className="form__label">
                                                                        GateWay
                                                                    </label>
                                                                </div>

                                                                <div className="form__div">                        
                                                                    <input
                                                                        className="form__input"
                                                                        type="text"
                                                                        name="IP"
                                                                        value={ip}
                                                                        placeholder=" "
                                                                        onChange={(event) => setIp(event.target.value)}
                                                                    />
                                                                    <label className="form__label">
                                                                        Mask
                                                                    </label>
                                                                </div>

                                                                <div className="form__div">                      
                                                                    <input
                                                                        className="form__input"
                                                                        type="text"
                                                                        name="DNS"
                                                                        value={dns}
                                                                        placeholder=" "
                                                                        onChange={(event) => setDns(event.target.value)}
                                                                    />
                                                                    <label className="form__label">
                                                                        DNS
                                                                    </label> 
                                                                </div> 

                                                                <div className="form__div">                        
                                                                    <input
                                                                        className="form__input"
                                                                        type="text"
                                                                        name="Porta"
                                                                        value={porta}
                                                                        placeholder=" "
                                                                        onChange={(event) => setPorta(event.target.value)}
                                                                    />
                                                                    <label className="form__label">
                                                                        Porta
                                                                    </label>
                                                                </div>

                                                                
                                                                </div>

                                                        </div>
                                                        <div className="container-img">
                                                                
                                                
                                                                <div className="box-img-equipamento" alt="imagem do equipamento"/>

                                                                <div className="form__div">    
                                                                    <textarea rows="6" cols="20" wrap="hard"
                                                                            className="form__input"
                                                                            id="form__input_descricao"
                                                                            type="text"     
                                                                            value={descricao}
                                                                            placeholder=" "                                                                        
                                                                            onChange={(event) => setDescricao(event.target.value)}
                                                                    />                   
                                        
                                                                    <label className="form__label">
                                                                        Descrição
                                                                    </label>
                                                                </div> 
                                                            
                                        
                                                                <button
                                                                    type="submit"
                                                                    className="btn__login-2"
                                                                    disabled={
                                                                        idTipoEquipamento === '' ||
                                                                        modelo === '' || 
                                                                        numeroDeSerie === '' |
                                                                        gateWay === '' ||
                                                                        dns === ''||
                                                                        ip === ''||
                                                                        porta === '' 
                                                                        ? 'none'
                                                                        : ''
                                                                    }
                                                                >    
                                                                    CADASTRAR
                                                                </button>
                                    
                                                        </div>
                                                    </form>
                                    </div>
                    </section>
        
                </div>
                <form encType="multipart/form-data">

                <input id="btn-cadastrar-img" type="file"/>
                {/* {
                    this.state.arquivo === null ?
                    <button disabled className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro" onClick={this.upload} >Enviar! </button>
                     :
                     <button  className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro" onClick={this.upload} >Enviar! </button>
                } */}
                </form>

                <div className="sidebar">
                    <div className="s-c">
                        <button id="btn-reboot" onClick={EventReboot} ><RestartAltIcon/></button>
                        <button id="#configuration"><Settings/></button>
                        <button id="#connection"><PlayCircleIcon/></button>
                        <button id="#extra"><SettingsInputHdmiIcon/></button>
                    </div>
                </div>
                <div id="reboot" className="modal_container">
                    <div id="box-modal">
                            <div className="img-modal"/>
                            <div id="info-modal">
                                <h2>INICIAR REBOOT</h2>
                                <h4>DO EQUIPAMENTO :</h4>
                                <div id="text">
                                    <p>modelo :{}</p>
                                    <p>ip :{}</p>

                                </div>
                                <p>Tem certeza que deseja continuar?</p>
                                <div id="btn">
                                <button className="btn-reboot-s">
                                    <p>sim, estou ciente</p>
                                </button>
                                <button className="btn-reboot-n">
                                    <p>não,cancelar</p>
                                </button>
                            </div>
                        </div>
                        <button id="close"><CloseIcon/></button>
                    </div>
                </div>
            
            </div>
        );
    }


              
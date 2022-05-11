import axios from "axios";
import React,{ useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";


import { Form } from 'react-bootstrap';

import '../../component_recycling/barraLateral/barraLateral.css';
import '../../assets/css/animation__input.css';
import '../cadastrarEquipamento/cadastroEquipamento.css';
import '../../assets/css/style_search.css';
import BarraLateral from "../../component_recycling/barraLateral/barraLateral";


export default function CadastroEquipamento() {

    var navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(false);
    // const [boolPut, setBoolPut] = useState(false);

    //States Usuario
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');

    //States Equipamento
    const [idTipoEquipamento, setIdTipoEquipamento] = useState(null);
    const [modelo, setModelo] = useState('');
    const [numeroSerie, setNumeroSerie] = useState('');
    const [gateWay, setGateWay] = useState('');
    const [ip, setIp] = useState('');
    const [dns, setDns] = useState('');
    const [porta, setPorta] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState(new Date())
    const [condicao, setCondicao] = useState('');

    const [dadoUsuario, setDadoUsuario] = useState([]);
    const [dadoEquipamento, setDadoEquipamento] =useState([]);
    const [dadoTipoEquipamento, setDadoTipoEquipamento] = useState([]);
    const [dadoModelo, setDadoModelo] =useState([]);

    // //States Imagem Equipamento
    // const [img64, setImg64] = useState('');
    const [arquivo, setArquivo] = useState(null);

    const buscarTipoEquipamento = () =>
    {
        axios
        .get('http://100.26.2.205/api/TipoEquipamento/lista')

        .then(function (response) {
            setDadoTipoEquipamento(response.data)
        })
        .catch((erro)=> console.log(erro))
    }

    const buscarTipoModelo = () =>
    {
        axios
        .get('http://100.26.2.205/api/TipoEquipamento/lista')

        .then(function (response) {
            setDadoModelo(response.data)
        })
        .catch((erro)=> console.log(erro))
    }

    function buscarUsuarioPorId(event)
    {
        event.preventDefault();
        
        axios
        .get('http://100.26.2.205/api/Usuario/', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

        .then((resposta) =>
            {
                setDadoUsuario(resposta.data);
                console.log(dadoUsuario);
            }
        )
        .catch(erro => console.log(erro))

    }
    
    const cadastroEquipamento = (event) => 
    {
        event.preventDefault();

        let equipamento = {
        idUsuario: 1,
        idTipoEquipamento: parseInt(idTipoEquipamento),
        modelo: modelo,
        numeroSerie: parseInt(numeroSerie),
        gateWay: parseInt(gateWay),
        mask: parseInt(ip),
        dns: parseInt(dns),
        porta: parseInt(porta),
        condicao: parseInt(condicao),
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

    return(   
            <div className="container-cadastro-equipamento">
                
                <BarraLateral/>
                
                <div className="conteudo-equipamento">

                    <header>
                        <h2 className="titulo">NOVO EQUIPAMENTO</h2>
                        <div className="search-form">
                        <div className="lupa"/>
                        <Form>
                            <input
                                name="country"
                                label=" "
                                placeholder="Procure por um equipamento"
                            />
                    
                        </Form>
                    </div>
                    </header>
                
                    

                    <section>
                            
                    <div className="container-info-equipamento">    
                    <div className="container-info-equipamento-h3"><h3>Dados {setModelo}</h3></div>
                                        
                
                                                    <form className="form-cadastro-equipamento" onSubmit={(event) => cadastroEquipamento(event)}>
                                                        <div className="dados">
                                                            <div className="box-1">
                                                                <div className="box-1-1">
                                                                    
                                                                    <div className="form__div">
                                                                        <select
                                                                            name="idTipoEquipamento"  
                                                                            value={idTipoEquipamento}   
                                                                            id="form__input_tipoEquipamento"      
                                                                            onChange={(event) => setIdTipoEquipamento(event.target.value)}>
                                                                                {dadoTipoEquipamento.map((event) => {
                                                                                    return (

                                                                                        <option key={event.idTipoEquipamento} value={event.idTipoEquipamento}>{event.equipamento}
                                                                                        </option>
                                                                                    );
                                                                                })}                                 
                                                                                <option  value="#">Tipo de Equipamento </option>
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
                                                                        type="number"
                                                                        name="NumeroSerie"
                                                                        value={numeroSerie}
                                                                        placeholder=" "
                                                                        onChange={(event) => setNumeroSerie(event.target.value)}
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
                                                            <div className="box-img" alt="imagem do perfil"/>

                                                                <div className="form__div">    
                                                                    <textarea rows="6" cols="20" wrap="hard"
                                                                            className="form__input"
                                                                            id="form__input_descricao"
                                                                            type="text"                                                                        value={descricao}
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
                                                                        numeroSerie === '' |
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
            </div>
        );
    

}

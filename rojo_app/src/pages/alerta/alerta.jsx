import axios from "axios";
import React,{ useEffect, useState} from "react";

import { Form } from 'react-bootstrap';
import { parseJwt } from "../../services/auth";

import BarraLateral from "../../component_recycling/barraLateral/barraLateral";
import '../bemVindo/bemVindo.css';
import '../../assets/css/animation__input.css';
import '../cadastrarEquipamento/cadastroEquipamento.css';
import '../../assets/css/style_search.css';
import '../listaEquipamento/listaEquipamento.css';

import './alerta.css';


export default function ListaEquipamento (){

    //States Equipamento
    const [idTipoEquipamento, setIdTipoEquipamento] = useState(0);
    const [modelo, setModelo] = useState(0);
    const [numeroSerie, setNumeroSerie] = useState(0);

    //Listas
    const [listEq, setListEq] = useState([]);

    //States status
    const [statusOn, setStatusOn] = useState(false)

    const [isLoading, setIsLoading] = useState('');
    const [ listaEquipamento, setListaEquipamento ] = useState([])



    function buscarMeusEquipamentos(){
        axios('http://100.26.2.205/api/Equipamento/listar-meus-equipamentos', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(response => {
            if (response.status === 200) {
                setListEq( response.data );
            }
        })
        .catch( erro => console.log(erro) );
    };
    
    useEffect( buscarMeusEquipamentos, [] );

    function listaTipoequipamento(){
        axios.get('http://100.26.2.205/api/Usuario/',{})

        .then(resposta => resposta.status === 201)
    }
    

    return(   
        <div className="container-cadastro-equipamento">
            
            <BarraLateral/>

            <div className="conteudo-equipamento">

                <header>
                    <h2 className="titulo">SEUS EQUIPAMENTOS</h2>
                    <div className="search-form">
                        <div className="lupa"/>
                        <Form>
                        < input
                            name="country"
                            label=" "
                            placeholder="Procure por um equipamento"
                        />
                    
                        </Form>
                    </div>
                </header>
            
                

                <section>
                        
                    <div className="container-info-equipamento">  
                    {
                        
                     
                            <div className="box-lista">
                                <div className="box-head-lista">
                                    <div><p>#{listEq.idEquipamento} </p></div>
                                </div>
                                <div className="box-body-lista">
                                        <div className="ob1-info">
                                            <div className="ob1-info-input">
                                                    <div className="form__div">                       
                                                                        <div
                                                                            className="-lista"
                                                                        >
                                                                            {idTipoEquipamento}
                                                                        </div>
                                                                        <label className="label">
                                                                            Tipo Equipamento
                                                                        </label>
                                                    </div>
                                                    <div className="form__div">                       
                                                                        <div 
                                                                            className="-lista"
                                                                        >
                                                                            {modelo}
                                                                        </div>
                                                                        <label className="label">
                                                                            Modelo
                                                                        </label>
                                                    </div>
                                            </div>
                                            <div className="ob1-info-input-2">
                                                    <div className="form__div">                       
                                                                        <div 
                                                                            className="-lista"
                                                                        >{numeroSerie}</div> 
                                                                        <label className="label">
                                                                            Numero de Serie
                                                                        </label>
                                                                        
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="ob2-status">
                                            <div className="status">

                                                STATUS 
                                                <div>
                                                    {
                                                    statusOn === true && (
                                                        <div className="on-off">
                                                            <div className="circle1"/>
                                                            <p>Ligado</p>
                                                        </div>
                                                    )}
                                                    {
                                                    statusOn === false && (
                                                        <div className="on-off">
                                                            <div className="circle2"/>
                                                            <p>Desligado</p>
                                                        </div>
                                                    )}

                                                </div>
                                            </div>
                                            <div>
                                                ALERTAS
                                                <div className="box-alerta">
                                                    <div className="alerta">
                                                        <div className="alerta1"/>
                                                        <p>0</p>
                                                        </div>
                                            
                                            
                                                    <div className="alerta">
                                                        <div className="alerta2"/>
                                                        <p>0</p>
                                                    </div>
                                                    </div>               
                                                </div> 
                                        </div>
                                        <div className="ob3-img"/>
                                </div>
                            </div>
                         
                    }  
                    </div>
                </section>
    
            </div>
        </div>
    );
}
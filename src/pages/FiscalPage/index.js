import React, { useEffect, useState, createRef } from 'react';
import Pdf from 'react-to-pdf';

import './styles.css';

import { IoArrowBackSharp } from "react-icons/io5";

import logo from '../../assets/logo-black.png'

import {  useHistory } from 'react-router-dom';

export default function FiscalPage(props){

    var date = new Date();
    var dia = String(date.getDate()).padStart(2,'0');
    var mes = String(date. getMonth() + 1).padStart(2, '0');
    var ano = date. getFullYear();
    var dataAtual = dia + '/' + mes + '/' + ano;

    const ref = createRef();
    const options = {
        // orientation: 'landscape',
        format: 'a4',
     };
   
    const history = useHistory();

    const [list, setList] = useState([]) ;
    const [valueT, setValueT] = useState();
    const [pass, setPass]= useState(false);

    useEffect(() =>{
        
        if(props.location.state === undefined ){
            history.push('/');
        }else{
            setList(props.location.state.list);
            setValueT(props.location.state.totalValue);
            setPass(true);
        }

        
    },[])

    function handleBack () {
        history.push('/');
    }

    return(
        <div className="container-fiscal">

            <div id="actions">

                <button id="back" onClick={() =>handleBack()}>
                    <IoArrowBackSharp size={25} color='#fff' />
                </button>

                    <p>Nota Fiscal</p>

                <Pdf targetRef={ref} options={options} filename='nota-fiscal.pdf' x={.5} y={.5} >
                    {({toPdf}) =>
                        <button id='download' onClick={toPdf}>Abaixar nota</button>
                    }
                </Pdf>

            </div>

          
            <div id="nota" ref={ref}>
               <div id="header-fiscal">

                    <img id='img-fiscal' src={logo} alt="Emporio" />

                    <div id="title-header-fiscal">
                        <strong>Empório Vip</strong>

                        
                        <div id="group">
                            <div >
                                <p>Avenida Elias Cruvinel 1234</p>
                                <p>Contato: <span>3313 - 9186</span></p>
                            </div>
                            
                            <div id="values">
                                    <p>Data: {dataAtual}</p>
                                    <p>Valor da compra: <span>{valueT && valueT.toFixed(2)}</span></p>
                            </div>
                        </div>

                    </div>

                    <div className="space"></div>
               </div>

               <div id="body-fiscal">

                    <table>
                    <thead>
                        <tr>
                            <td id="item-table-fiscal-name" >Produto</td>
                            <td id="item-table-fiscal" >Marca</td>
                            <td id="item-table-fiscal" >Tamanho</td>
                            <td id="item-table-fiscal" >Quantidade</td>
                            <td id="item-table-fiscal" >Valor Un.</td>
                            <td id="item-table-fiscal" >Valor Total.</td>
                        </tr>
                    </thead>
                    <tbody>
                        {pass &&  list.map(l => (
                                        <tr >
                                            <td id="item-list-name">{l.name}</td>
                                            <td id="item-list">{l.marca}</td>
                                            <td id="item-list">{l.size}</td>
                                            <td id="item-list">{l.theAmount}</td>
                                            <td id="item-list">{l.valueProduct.toFixed(2)}</td>
                                            <td id="item-list">{l.value.toFixed(2)}</td>
                                        </tr>
                                    ))}
                    </tbody>
                    </table>


               </div>
               
               
           </div>
            
            
         

        </div>
    );

}
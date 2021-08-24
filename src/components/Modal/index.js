import React from 'react';
import './styles.css';


const Props ={
    hidden: Boolean,
    text: String,
    Confirm: () =>{},
    Cancel: () => {},
};


export default function Modal (Props){

    return (
        <div hidden={Props.hidden} >
            <div className="modalBackground">
                <div className="modalCard">
                    <p className="text">{Props.text}</p>
                    <div className="divButtons">
                        <button className="cancel" onClick={Props.Cancel} >Cancelar</button>
                        <button className="confirm" onClick={Props.Confirm} >Sim</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
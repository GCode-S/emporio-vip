import React from 'react';
import './styles.css';

import { IoArrowBackOutline } from 'react-icons/io5';

const Props =  {
    onClick: ()=> {},
}

export function ButtonBack(Props){
    return (
        <button className="buttonBackComponent" onClick={Props.onClick}>
             <IoArrowBackOutline size={25} color='white' />
        </button>
    )
}

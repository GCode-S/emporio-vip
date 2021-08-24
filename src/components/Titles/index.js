import React from 'react';
import './styles.css';

const Props = {
    title: String,
}

export function Titles(Props){
    
    return(
        <div>
            <p className="titleComponent" >{Props.title}</p>
        </div>
    );
}
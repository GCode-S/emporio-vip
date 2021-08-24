import React from 'react';
import './styles.css';

const Props =  {
    class: String,
    title: String,
    onClick: ()=> {},

}

export function Button(Props, ...rest){
    return(
        <button className={Props.class} onClick={Props.onClick} >
            {Props.title}
        </button>
    );
}

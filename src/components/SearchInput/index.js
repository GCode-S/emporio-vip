import React from 'react';

import './styles.css';

import { IoSearch } from 'react-icons/io5';

const Props = {
    placeholder: String,
    value: String,
    onChange: () => {},

};

export function SearchInput(Props){
    return(
        <input className="input"
                type='text'
                placeholder={Props.placeholder} 
                value={Props.value} 
                onChange={Props.onChange} />
    )
}

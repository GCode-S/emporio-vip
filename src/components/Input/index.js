import React from 'react';
import './styles.css';

const Props ={

    placeholder: String,
    type: String,
    value: String,
    size:String,
    disabled: String,
    onChange: () => {},

}

export function Input(Props){

    // const handleRender = (Props) =>{
        if(Props.disabled !== undefined){
            // alert(Props.disabled);
            return(
                <div>
                <p>{Props.placeholder}</p>
                <input disabled minLength='3' maxLength='70' className='inputComponent' style={{width: `${Props.size}px`}} type={Props.type} value={Props.value} onChange={Props.onChange} />
                </div>
            )
        }else{

        
        return(
            <div>
                <p>{Props.placeholder}</p>
                <input className='inputComponent' minLength='3' maxLength='70' style={{width: `${Props.size}px`}} type={Props.type} value={Props.value} onChange={Props.onChange} />
            </div>
        )
        }
    // }

    // return(
        
    //         handleRender()
       
    // );
}
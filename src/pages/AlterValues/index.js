import React, { useState } from 'react';
import './styles.css';

import { Link, useHistory } from 'react-router-dom';

import { ButtonBack } from '../../components/ButtonBack';
import { Titles } from '../../components/Titles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export default function AlterValues(){

    const [name, setName] = useState();
    const [quantidade, setQuantidade] = useState();
    const [valor, setValor] = useState();
    const [codigo, setCodigo] = useState();

    const history = useHistory();

    function handleBack(){

        history.push('/estoque');

    }

    return (
        <div className="container">
            <div className="header">
                <ButtonBack onClick={handleBack} />
                <Titles title='Alterar dados' />
                <div className='space' />
            </div>

            <div className='form'>
                <form>
                    <Input disabled placeholder='Nome do produto' size={300} value={name} onChange={e => setName(e.target.value)} />
                    <div className='group-form'>
                        <Input placeholder='QT em estoque' size={100} value={quantidade} onChange={e => setQuantidade(e.target.value)} />
                        <Input placeholder='Valor unitário' size={100} value={valor} onChange={e => setValor(e.target.value)} />
                    </div>
                    
                    <div className="group-form2">
                        <Input disabled placeholder='Tamanho' size={100}  />
                        <Input disabled placeholder='Marca' size={150} />
                    </div>

                    <Input placeholder='Codigo de Barras do Produto' size={300} value={codigo} onChange={e => setCodigo(e.target.value)} />

                    <div className="buttonForm">
                        <Button  class='secondary' title='salvar' />
                    </div>
                </form>

            </div>
        </div>
    );
}
import React, { useState } from 'react';
import './styles.css';

import { Link, useHistory } from 'react-router-dom';

import { ButtonBack } from '../../components/ButtonBack';
import { Titles } from '../../components/Titles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export default function NewProduct(){

    const [name, setName] = useState();
    const [quantidade, setQuantidade] = useState();
    const [valor, setValor] = useState();
    const [tamanho, setTamanho] = useState();
    const [marca, setMarca] = useState();
    const [codigo, setCodigo] = useState();

    const history = useHistory();

    function handleBack(){

        history.push('/');

    }

    return (
        <div className="container">
            <div className="header">
                <ButtonBack onClick={handleBack} />
                <Titles title='Cadastrar Produtos' />
                <div className='space' />
            </div>

            <div className='form'>
                <form>
                    <Input placeholder='Nome do produto' size={300} value={name} onChange={e => setName(e.target.value)} />
                    <div className='group-form'>
                        <Input placeholder='QT em estoque' size={100} value={quantidade} onChange={e => setQuantidade(e.target.value)} />
                        <Input placeholder='Valor unitário' size={100} value={valor} onChange={e => setValor(e.target.value)} />
                    </div>
                    
                    <div className="group-form2">
                        <Input placeholder='Tamanho' size={100} value={tamanho} onChange={e => setTamanho(e.target.value)}  />
                        <Input placeholder='Marca' size={150} value={marca} onChange={e => setMarca(e.target.value)} />
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
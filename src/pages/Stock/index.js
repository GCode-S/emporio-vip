import React, { useState } from 'react';
import Switch from 'react-switch';
import './styles.css';

import { IoSearchOutline, IoBuild, IoTrashOutline } from 'react-icons/io5';

import { useHistory } from 'react-router-dom';

import { ButtonBack } from '../../components/ButtonBack';
import { Titles } from '../../components/Titles';
import { SearchInput } from '../../components/SearchInput';

import Modal from '../../components/Modal';

export default function Stock(){
    const history = useHistory();

    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("");
    const [checked, setChecked] = useState(false);

    const [ produtos, setProdutos ] = useState([
        {
          id: '1',
          name: 'camisa polo evolution new',
          marca: 'polo',
          size: 'GG',
          stock: 50,
          value: 40.20
        },
    
        {
          id: '2',
          name: 'camisa polo ',
          marca: 'polo',
          size: 'P',
          stock: 50,
          value: 35.20
        },
    
        {
          id: '3',
          name: 'Short Jeans femino com detalhes',
          marca: 'Pitbull',
          size: 'M',
          stock: 50,
          value: 53.50
        },
    
      ]);

    function handleBack (){
        history.push('/');
    }

    function handleDelete(){
        setShow(true);
    }

    function handleEdit(){
        history.push('/altera');
    }

    function renderList(products){

        if(checked === true){
            if( search !== "" && products.id.indexOf( search ) === -1 ){
                return null;
            }
        }else{
            if( search !== "" && products.name.toLowerCase().indexOf( search.toLowerCase() ) === -1){
                return null;
            }
        }
        

        return(
                <tr className='itemList'>
                    <td>{products.id}</td>
                    <td className='listsName'>{products.name}</td>
                    <td>{products.marca}</td>
                    <td>{products.size}</td>
                    <td>{products.stock}</td>
                    <td>{products.value}</td>
                    <td>
                        <button className='btnEdit' onClick={() => handleEdit()}><IoBuild size={22} color='yellow' /></button>
                        <button className='btnDelet' onClick={() => handleDelete()} ><IoTrashOutline size={22} color='#E84141' /></button>
                    </td>
                </tr>
        );

    }

    return (
        <div className="container-stock">

            <div className="header">
                <ButtonBack onClick={handleBack} />
                <Titles title="Controle de Estoque" />
                <div className='space' />
            </div>
            
            <div className="checked">
                <p>Pesquisar com o código do produdo. </p>
                <Switch onChange={() => setChecked(!checked)} checked={checked} />
            </div>


            <div className="body">
                <div className="search">
                    <SearchInput placeholder='Pesquise por um produto.' value={search} onChange={e => setSearch(e.target.value)} />
                    <button className='buttonSearch'>
                        <IoSearchOutline size={23} color='white' />
                    </button>    
                </div>
                <div className="lists">
                    <table>
                        <tr className='titleTab'>
                            <td className='titleTabSpacing'>codigo do produto</td>
                            <td>nome</td>
                            <td>marca</td>
                            <td>tamanho</td>
                            <td className='titleTabSpacing'>quantidade em estoque</td>
                            <td>valor un.</td>
                            <td>editar / deletar</td>
                        </tr>
                        {
                            produtos.map( products => {
                                return renderList(products)
                            })
                        }
                    </table>
                </div>
            </div>
            
            <Modal
                hidden={!show}
                text="Tem certeza que deseja Deletar este produto?"
                Confirm={()=>{}}
                Cancel={() => setShow(!show)}
            />
        </div>
    );
}
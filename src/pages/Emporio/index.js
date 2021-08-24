import React, { useState, useCallback, createRef } from 'react';
import jsPDF from 'jspdf';
import Pdf from 'react-to-pdf'
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import { IoSearch, IoBackspaceOutline, IoTrash } from 'react-icons/io5';

import { Button } from '../../components/Button';
import { SearchInput } from '../../components/SearchInput';

// import myProducts from '../../functions/Produtos';

import logo from '../../assets/logo.png';

import Modal from '../../components/Modal';

export default function Emporio() {

  const history = useHistory();

  const ref = createRef();

  const [show, setShow] = useState(false);

  const [ text, setText ] = useState('');
  const [ list, setList ] = useState([]);

  const [count, setCount] = useState(0);

  const [idList, setIdList] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const [ updateProducts, setUptadeProducts] = useState([]);


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
      name: 'camisa polo',
      marca: 'polo',
      size: 'P',
      stock: 50,
      value: 35.20
    },

    {
      id: '3',
      name: 'Short Jeans femino com detalhes de rasgado e custuras vermelhas vinhos',
      marca: 'Pitbull',
      size: 'M',
      stock: 50,
      value: 53.50
    },

  ]);


  const clearSearch = useCallback(() => {
    setText('');
  }, [])


  function handleList(codeProduct, number ){

    if(number === 0 | number === ''){
      number = 1;
    }


    if(list.length === 25){
      alert('Você atingiu o limite de venda dos produtos. Finalize a compra e comece uma nova compra. cod #1000')
      return
    }

      for(var i = 0; i < produtos.length; i++){

            if(produtos[i].id === codeProduct){


              if(produtos[i].stock < number){
                  alert(`Este produto possui apenas ${produtos[i].stock} unidades.`);
                  return
              }

              console.log(produtos);

              const newValue = produtos[i].value * number;

              const newList = 
                {
                  id: idList ,
                  idProduct: produtos[i].id,
                  name: produtos[i].name,
                  marca: produtos[i].marca,
                  size: produtos[i].size,
                  valueProduct: produtos[i].value,
                  value: newValue,
                  theAmount: Number(number)
                };

              setTotalValue(totalValue + newList.value);

              list.push(newList);
              setIdList(idList + 1);
              clearSearch();
              console.log(list);

              const updateProducts = {
                id: produtos[i].id,
                name: produtos[i].name,
                marca: produtos[i].marca,
                size: produtos[i].size,
                value: produtos[i].value,
                stock: produtos[i].stock - number,
              }

              produtos.splice(i, 1);
              produtos.push(updateProducts);
              setCount(list.length);
              return

            }

            if(i+1 == produtos.length){
              alert('PRODUTO NÃO CADASTRADO!');
              clearSearch();
            }

      }

  }


  function actionClick(e){

      e.preventDefault();
      
      if(text == ''){
        return
      }

      const mySplit = text.split("*");

      if (mySplit.length === 2){
        handleList(mySplit[1], Number(mySplit[0]));
      }

      if(mySplit.length === 1){
        handleList(text, 1);
      }
      
  }

  function actionRemove (item) {

      setTotalValue(totalValue - item.value);

      for(var i = 0; i < list.length; i++){

          if(item.id === list[i].id){

            list.splice(i, 1);
            const copy = list.slice();
            setList(copy);

            for(var o = 1; o < produtos.length; o++){

                if(item.idProduct === produtos[o].id){

                  const updateProducts = {
                    id: produtos[o].id,
                    name: produtos[o].name,
                    marca: produtos[o].marca,
                    size: produtos[o].size,
                    value: produtos[o].value,
                    stock: produtos[o].stock + item.theAmount,
                  }
      
                  console.log('id ' + produtos[o].id);
                  produtos.splice(o, 1);
                  produtos.push(updateProducts);

                  console.log(produtos);

                  setCount(list.length);
                  return 

                }
            }
    
            return 

          }

      }

  }



  function actionCancel(){

    
    

      for(var i = 0; i < list.length; i ++){

        var position ;

        for ( var o = 0; o < produtos.length; o++){
          if(produtos[o].id === list[i].idProduct){
            position = o;
            break
          }
        }

        const updateProducts = {
          id: produtos[position].id,
          name: produtos[position].name,
          marca: produtos[position].marca,
          size: produtos[position].size,
          value: produtos[position].value,
          stock: produtos[position].stock + list[i].theAmount,
        }

        produtos.splice(position, 1);
        produtos.push(updateProducts);

      }

      console.log(produtos);

      setList([]);
      setTotalValue(0);
      setIdList(0);
      setCount(0);
      handleModalClose();
  }

  const handleModalClose = (e) => {
    setShow(false);
  };
  
  const handleModalOpen = () => {

    if(list.length === 0){
      alert('A listagem dos produtos estão vazias para poder cancelar a compra!');
      return
    }
    setShow(true);
  };


 function handleFiscalPage (){
      if(list.length !== 0){
        history.push('/nota-fiscal',  {list, totalValue});
      }
 }

  return (
    <div className="container-emporio" >
 
    <div id="fixed">
        <div id="div-buttons-header">
          <Button title="Cancelar Compra" class="secondary" onClick={handleModalOpen} />

          <div id='div-links'>

            <Link to='/cadastrar' id='button-link'  >
              <button id="action">
              Cadastrar Produto
              </button>
            </Link>

            <Link to='/estoque' id='button-link'  >
              <button id="action">
                Estoque
              </button>
            </Link>

          </div>

          <div id='empty-space'>
             QT : {count}
          </div>

        </div >
          <div id="logo">
            <img src={logo} alt="Emporio"  />
          </div>
    

          <form onSubmit={actionClick}>
            <div id="group-action">

                <SearchInput placeholder="insira o codigo" value={text} onChange={e => setText(e.target.value)}  />
                
                <button type='submit' id='submit' >
                  
                  <IoSearch size={18} color="#000" />
                </button>

              </div>
          </form>
          </div>
          <div id="div-value" >
            <p id="value">valor total:  <span id="span-value">R$ {totalValue.toFixed(2)}</span></p>
              <Button onClick={() => handleFiscalPage()} title ="Finalizar Compra" class="primary"  />

          </div>
          
      <div id="tableDiv"  >
        
        <table cellPadding='10px' ref={ref}>
          <thead >
            <tr className="titleTab">
              <td id="titleTabV" >Produto</td>
              <td id="titleTabV" >Marca</td>
              <td id="titleTabV" >Valor Un.</td>
              <td id="titleTabV" >Tamanho</td>
              <td id="titleTabV" >Quantidade</td>
              <td id="titleTabV" >Valor Total</td>
              <td id="titleTabV" >Deletar</td>
            </tr>
          </thead>
        
            <tbody>
          
                  {
                    list.map(lists => (

                     <tr key={lists.id} id='tr-items' >

                          <td id='itensTabName' >{lists.name}</td>
                          <td id='itensTab' >{lists.marca}</td>
                          <td id='itensTab' >{lists.valueProduct}</td>
                          <td id='itensTab' >{lists.size}</td>
                          <td id='itensTab' >{lists.theAmount}</td>
                          <td id='itensTab' >{lists.value.toFixed(2)}</td>
                        
                          <td id='itensTab'>
                          <button  id="buttonRemove" type='button' onClick={() =>actionRemove(lists)}>
                            <IoTrash size={22} color="#CD2C2C" />
                          </button>
                          </td>
                         
                      </tr>
                    ))
                  }
          </tbody>
          </table>
        </div>

        <div id='space' />


      <Modal hidden={!show} 
             text="Tem certeza que deseja encerrar as compras?"
             Confirm={actionCancel}
             Cancel={handleModalClose}
             />

      </div>
  );
}
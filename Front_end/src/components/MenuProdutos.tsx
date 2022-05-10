import React, { useState } from 'react';
import api from "../services/api";
import { Dropdown } from 'react-bootstrap';
import generalProps, {PROPS_ECON_KEY} from './ArtPageProps';

const MenuProdutos: React.FC = () => {

    const pushData2State = (auxData) => {
    
    let auxState;
    try {
        // recupera o estado do storage, se houver
        auxState = (JSON.parse(localStorage.getItem(PROPS_ECON_KEY) || "" ) as generalProps).sharedEcommerce;

    // susbtitui o place holder
    } catch (ex) {auxState ={
    
                    data:new Array(),              
                    columns: [
        {
          label: '',
          field: 'img',
        },
        {
          label: 'Produto',
          field: 'product'
        },
        {
          label: 'Tipo',
          field: 'type'
        },
        {
          label: 'Preço',
          field: 'price'
        },
        {
          label: 'Quantidade',
          field: 'qty'
        },
        {
          label: 'Valor',
          field: 'amount'
        },      
        {
          label: '',
          field: 'button'
        }
                             ]
                            }
    };
    
    auxData.rowid = auxState.data.length;
    auxState.data.push(auxData); // acrescento o produto a array.

    let auxProps = new generalProps();
    auxProps.setStEcommerce(auxState);
    localStorage.setItem(PROPS_ECON_KEY, JSON.stringify(auxProps)); // grava novamente os cards atualizados, aparti do acrescimo do usuario. 

    window.dispatchEvent(new Event('uptCart'));
     }   

     const [itemDoMenu, setitemDoMenu] = useState (new Array());

     async function allProducts() {
        let menu;
        let prod = new Array();
  
        try {
            /*
            const token = getToken();
            if (token) api.defaults.headers.post['Authorization'] = `Bearer ${token}`;
            // DEBUG CODE:
            // alert(token);*/

            await api.post('http://localhost:8082/ecommerce', 'id=*')
              .then(async response => { 
                     //DEBUG CODE
                     //alert('resposta data é Array -> '+ Array.isArray(response.data));
  
                 if(response.data != '') {
            
                   if(!Array.isArray(response.data)) menu = new Array(response.data); 
                   else menu = response.data;
  
                   menu.forEach((value) => {
                    prod.push( 
                        <Dropdown.Item id="btnDropdown" onClick= {event => {selectProduct(value.id)} }> {value.nome + " - " + value.nome_ctg} </Dropdown.Item>               
                   )});
                  } else throw new Error('No answer');

                })
                .catch (err => {
                    prod.push(<Dropdown.Item id="btnDropdown" href="#"> Lista de produtos vazia. </Dropdown.Item>)              
                });          
            
        } catch (ex) {
                    prod.push(<Dropdown.Item id="btnDropdown"  href="#"> Erro no carregamento da Lista. </Dropdown.Item>)
                    // DEBUG CODE
                    // alert(ex.toString());          
        }
        setitemDoMenu(prod);
     }  


     async function selectProduct(idProd) {

        try {
            await api.post('http://localhost:8082/ecommerce', 'id='+ idProd)
              .then(async response => { 
  
                 if(response.data != '') {    
                    pushData2State(                     
                        {
                        rowid: response.data[0]? 0:-1,
                        src: response.data[0]? response.data[0].img :'../images/place_holder.png',
                        title: response.data[0]? response.data[0].nome  : 'Nenhum produto selecionado',
                        subTitle: response.data[0]? response.data[0].descritivo : "_".repeat(80),
                        type: "",
                        price: parseFloat(((response.data[0]? response.data[0].preço: '0') as String).replace('€','').replace(',','.').trim()), // trim() retira os espaços vazios do inicio e do fim. 
                        //price: parseFloat((response.data? response.data.preco: '0' as String).replace('€','').trim()),
                        // DEBUG CODE
                        //alert((dataGotSession.preco as String).replace('€','').replace(",",".").trim());
                        qty: 0});
                  } else throw new Error('No answer');
                })
                .catch ((err) => {/* No Action. */});     
            
        } catch (ex) {/* No Action. */}
     }
 return (
 <div id = "menuProdutos" className = "dropdown" onClick ={event => {allProducts()}}> 
        <Dropdown>
        <Dropdown.Toggle 
        variant="secondary btn-sm" 
        id="dropdown-basic">
            Todos Produtos disponiveis - Inserir 
        </Dropdown.Toggle>
        <Dropdown.Menu  style={{backgroundColor:'#73a47'}}>
             {itemDoMenu}            
        </Dropdown.Menu>
        </Dropdown>
 </div>
);
}
export default MenuProdutos;
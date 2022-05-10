import React from 'react';
import { Card, Button } from 'react-bootstrap';
import api from "../services/api";


function setSession (n,p,d,i) {
   
  let escolha = {nome:  n as String,
                 preco: p as String,
                 descritivo: d as String,
                 img: i as String
              };

  //localStorage.setItem('keyItemName', value) 
  // Responsável por guardar um novo valor. 
  localStorage.setItem('escolha', JSON.stringify(escolha));
} 

 async function initCards(catg, setState) {
      let cards;
      let prod = new Array();

      try {
        const response = await api.post('http://localhost:8082/card', 'id_categoria='+ catg);
        //DEBUG CODE
        //alert('resposta data é Array -> '+ Array.isArray(response.data));

        if(response.data != '') {
          
          if(!Array.isArray(response.data)) cards = new Array(response.data); 
          else cards = response.data;

          cards.forEach((value) => {
          prod.push(
          <Card id="cardSelect">  
            <Card.Img id="imgCard" variant="top" src={value.img} />
            <Card.Body>
              <Card.Title id="nomeCard"> {value.nome} | <span id="priceCard"> {value.preço} </span> </Card.Title>
              <Card.Text id="descritivoCard">
                {value.descritivo}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button id="btnGet" onClick= {event => {
                                            setSession(value.nome,value.preço,value.descritivo,value.img);
                                            window.location.href='./Singup';}
                                           } variant="dark"><span>Comprar</span></Button>
            </Card.Footer>
          </Card>
        )});
        } else throw new Error('No answer');
      } catch (ex) { // caso não tenha sido encontrado nenhum produto vai para o catch. 
        prod.push(      
          <Card id="cardSelect">  
          <Card.Img id="imgPlaceHolder" variant="top" src="../images/place_holder_02.jpg"/>
          <Card.Body>
            <Card.Title> Nenhum Produto Disponível | <span id="priceCard"> -- </span> </Card.Title>
            <Card.Text>
              --
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button id="btnGet" onClick= {event =>  window.location.href='./'} variant="dark"><span>Recarregar</span></Button>
          </Card.Footer>
        </Card>
        );
      }
      setState(prod);
  }


export default initCards;

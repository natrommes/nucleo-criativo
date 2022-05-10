import React, {useState} from 'react';
import { Container, Row, Col, Image, CardDeck } from 'react-bootstrap';
import  initCards  from "../components/Cards";


const AboutBtnTwo: React.FC  = () => {

 const [produtos, setProdutos] = useState (new Array()); 
 const categoria = 3; // categoria: Oficina Criativa


 return (
 <>
 <div id="AboutOfnCriativas" onLoad = {event =>initCards(categoria, setProdutos)}>
  <Container>
    <Row>
      <Col xs={14} md={4}>
        <div className="zoom"> 
          <Image id="imagemAboutOne" src={process.env.PUBLIC_URL + '/images/categoria_03.png'} rounded />
          <div id="aboutTitleImage" >Oficinas Criativas </div>
        </div>
      </Col>
      <Col xs={14} md={4}>
        <div id="aboutTextImageOfnCriativas" >
          <p><span id="textPart"> Oficinas Criativas:</span> são projetos ou atividades que podem ser individuais ou em grupos. Utilizamos varios 
            métodos e matérias afim de estimular o processo de criação e expressão que há dentro do nós. Este caminho
            nos leva ao auto conhecimento e amplia nossas sinapsis internar trazendo uma maior percepção de nós mesmo e do 
            mundo. </p> 
          </div>
      </Col>
      <br></br>
    </Row>
  </Container> 
  <br></br><br></br>
  <div id="Cards">
    <CardDeck>
      {produtos}
    </CardDeck>
  </div>
</div>  
</> 
 ) 
};


export default AboutBtnTwo;
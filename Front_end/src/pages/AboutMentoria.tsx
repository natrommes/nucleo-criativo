import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Image, CardDeck} from 'react-bootstrap';
import  initCards  from "../components/Cards";

const AboutBtnThree: React.FC  = () => {
  
 const [produtos, setProdutos] = useState (new Array()); 
 const categoria = 2; // categoria: Mentoria


 return (
 <>
 <div id="AboutMentoria" onLoad = {event =>initCards(categoria, setProdutos)}>
  <Container>
    <Row>
      <Col xs={14} md={4}>
        <div className="zoom">
          <Image id="imagemAboutOne" src={process.env.PUBLIC_URL + '/images/categoria_06.png'} rounded />
          <div id="aboutTitleImageMentoria" >Mentoria de Novos Artistas </div>
        </div>
      </Col>
      <Col xs={14} md={4}>
        <div id="aboutTextImageMentorias" >
          <p><span id="textPart"> Mentorias de Novos Artistas:</span> Temos um Espaço inteiramente para você Artista Visual!!!
          Estudos em História da Arte, técnicas artísticas e mentoria com professores habilitados e curadores.     
          A criatividade pode ser observada, legitimada e analisada através da observação do produto criativo, como uma obra de arte.
          Teoria, crítica e história da arte posicionam e desenvolvem os critérios do que é considerado criativo e inovador nas artes conforme a época em que vivemos.
          Através deste acompanhamento o Artista será convidado a apresentar seu trabalho e desenvolver a percepção do seu próprio processo de criação, através de propostas 
          de estudos de referências da História da arte e da interlocução com a sua Obra.
          </p> 
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


export default AboutBtnThree;
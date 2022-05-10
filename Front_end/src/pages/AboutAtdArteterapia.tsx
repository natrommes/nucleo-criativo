import React, {useState} from 'react';
import { Container, Row, Col, Image, CardDeck} from 'react-bootstrap';
import  initCards  from "../components/Cards";


const AboutAtdArteterapia: React.FC  = () => {
 
 const [produtos, setProdutos] = useState (new Array()); 
 const categoria = 1; // categoria: Arteterapia

 
 return (
 <div id="AboutAtdArteterapia" onLoad = {event =>initCards(categoria, setProdutos)}>
   <Container>
     <Row>
       <Col xs={14} md={4} className="zoom">
         <div className="zoom">
            <Image id="imagemAboutOne"  src={process.env.PUBLIC_URL + '/images/categoria_01.png'} rounded />
            <div id="aboutTitleImageAtdArteterapia" >Atendimento em Arteterapia </div>
         </div>
       </Col> 
       <Col xs={14} md={4}>
           <div id="aboutTextImageArteterapia" >
             <p><span id="textPart" >Arteterapia:</span> pode trabalhar com diversos materiais 
             e diferentes técnicas artisticas. Oferecer conhecimentos técnicos para que o cliente possa lidar com essas 
             técnicas expressivas.
             Não tem aplicação apenas na área de saúde, também pode ser utilizada em ambiente escolar ou empresarial.
             Serão oferecidos bloco de 2 encontros ONLINE para avaliação com 50 minutos cada. Indicado para: ADOLESCENTE - ADULTO - IDOSO
             Indicado para quem está enfrentando dificuldades emocionais e/ou comportamentais que estão prejudicando seu bem-estar e sua saúde em geral. 
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
 )
};


export default AboutAtdArteterapia;
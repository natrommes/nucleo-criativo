import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';


const About: React.FC  = () => (
<>
<div className="containerAbout">

 <Container >
 <Row id="containerPageAbout">
    <Col xs={14} md={4}>
      <div  className="zoom">
        <Image id="imagemAbout" src={process.env.PUBLIC_URL + '/images/categoria_01_peq_p.png'} rounded />
      </div>
      <Button id="btn_discover_two" onClick={event =>  window.location.href='./AboutAtdArteterapia'} variant="outline-info">Descubra</Button> 
      <div id="textImage" >Atendimento em Arteterapia </div> 
    </Col>
    <br></br>
    <Col xs={14} md={4}>
        <div  className="zoom">
          <Image id="imagemAbout" src={process.env.PUBLIC_URL + '/images/categoria_03_peq_p.png'} rounded />
        </div>
        <Button id="btn_discover_two" onClick={event =>  window.location.href='./AboutOfnCriativas'} variant="outline-info">Descubra</Button>
        <div id="textImage" >Oficinas Criativas </div>
      </Col>
      <Col xs={14} md={4}>
        <div  className="zoom">
          <Image id="imagemAbout" src={process.env.PUBLIC_URL + '/images/categoria_06_peq_p.png'} rounded />
        </div>
        <Button id="btn_discover_two" onClick={event =>  window.location.href='./AboutMentoria'} variant="outline-info">Descubra</Button>
        <div id="textImage" >Mentoria de Novos Artistas </div>
      </Col>
  </Row>
  <div>
    <br></br><br></br>
    <table id="table" >
        <tr><td>
           <p id="textOne" > Muitas pessoas se sentem ansiosas ou desanimadas por não estarem com suas rotinas organizadas, 
           realizando atividades prazerosas, criativas e/ou curativas. Promovemos momentos de experimentação, reflexão e conexão com seus potenciais criativos.</p>    
           <p id="textOne" > <span id="textNegrito">- Orientamos você de acordo com as suas necessidades:</span> </p>
           <p id="textOne" > <span id="textColor">Saúde emocional</span> | <span id="textColor">Desenvolvimento de Habilidades e Reabilitação</span> | <span id="textColor">Autoconhecimento e reflexão</span> |
           <span id="textColor">Autoestima</span> | <span id="textColor">Prática artística</span> | <span id="textColor">Repertorio de técnicas</span> | <span id="textColor">Experimentação de diferentes materiais</span> |
           <span id="textColor"> Soltar a imaginação e descobrir uma linguagem visual própria</span> | <span id="textColor"> Desenvolver o seu processo criativo como artista plástico</span> |  <span id="textColor">Conteúdo teórico acerca da História da Arte.</span></p>
           <p id="textOne" > <span id="textNegrito">- Nossos serviços:</span></p>
           <p id="textOne" > <span id="textColor"> Atedimento em Arteterapia </span>| <span id="textColor">Acompanhamento nas oficinas de livre expressão</span> | <span id="textColor">Mentoria em Arte Contemporânea com profissional habilitados.</span></p>
           <p id="textOne" > Orientação de materiais adequados para desenvolver suas potencialidades de acordo com sua faixa etária e interesse;</p>
           <p id="textOne" > Encontros <span id="textNegrito"> ON LINE!</span></p>
           <p id="textOne" > <span id="textColor">De onde você estiver</span>! Estaremos com você!!! </p>
           <p id="textOne" > <span id="textNegrito"> Horário Agendado!</span></p>
        </td></tr>
    </table>  
      
  </div>
 </Container> 
 
 </div>
</>  
);


export default About;
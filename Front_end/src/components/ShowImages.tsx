import React from 'react';
import { Carousel } from 'react-bootstrap';

const ShowImages: React.FC  = () => (
<>  
<div className="containerHome">
  <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={process.env.PUBLIC_URL + '/images/pincel_rosa.png'} 
      alt="First slide"
    />
    <Carousel.Caption id="titleCarousel">
        <h1 id="h1_Carousel">Atendimento em Arteterapia</h1>
        <p id="p_Carousel">Privacidade e Segurança - ON LINE!!!</p>
    </Carousel.Caption>  
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={process.env.PUBLIC_URL + '/images/oficinas_criativas.png'} 
      alt="Second slide"
    />

    <Carousel.Caption id="titleCarousel">
        <h1 id="h1_Carousel">Oficinas Criativas</h1>
        <p id="p_Carousel"> Pintura  |  Colagem  |  Gravura  |  Caderno Criativo </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={process.env.PUBLIC_URL + '/images/ideia.png'} 
      alt="Third slide"
    />

    <Carousel.Caption id="titleCarousel">
        <h1 id="h1_Carousel">Mentoria de Novos Artistas</h1>
        <p id="p_Carousel">Estudos Práticos e Teóricos</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

</div>  



</>  
);


export default ShowImages;
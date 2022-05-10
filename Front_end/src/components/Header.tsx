import React from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';

const Header: React.FC = () => {
 

 return ( 
<>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand id="homeMenu" href="home">Núcleo de Praticas Criativas</Navbar.Brand>
      <Nav className="mr-auto">
         <Nav.Link id="menuTitles"  href="home">Home</Nav.Link>
         <Nav.Link id="menuTitles"  href="about">Sobre</Nav.Link>
         <Nav.Link id="menuTitles"  href="contact">Contato</Nav.Link>
      </Nav>
    
      <Form inline>
         <Button id="btn_menuOne" onClick={event =>  window.location.href='./Singup'} variant="outline-info">Registrar</Button>;
         <Button id="btn_menuTwo" onClick={event =>  window.location.href='./Login'} variant="outline-info">Login</Button>;
      </Form>
  </Navbar>
</>
 )

};


export default Header;
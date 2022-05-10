import React from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { isAuthenticated, logoutSession } from "../services/auth";

const HeaderLog: React.FC = () => {

function onLogOut () {
  
   if(isAuthenticated()) logoutSession().then(() => window.location.href =  './home'); 
   else window.location.href =  './home';
};


return (  
 <>
  <div id="headerLog">
    <Navbar bg="dark" variant="dark"> 
        <Navbar.Brand id="homeMenu" href="home">Núcleo de Praticas Criativas</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link id="menuTitles"  href="home">Home</Nav.Link>
          <Nav.Link id="menuTitles"  href="about">Sobre</Nav.Link>
          <Nav.Link id="menuTitles"  href="contact">Contato</Nav.Link>
        </Nav>
    
       <Form inline  >
         <Button id="btn_menu" onClick={onLogOut} variant="outline-info">Logout</Button>
       </Form>
     </Navbar>
  </div>
 </>
 )
};


export default HeaderLog;
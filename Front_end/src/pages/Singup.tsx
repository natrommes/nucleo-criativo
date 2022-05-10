import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { isAuthenticated } from "../services/auth";

const Singup: React.FC = () => {

  //Verificação se usuario esta lagado.
  if (isAuthenticated()) window.location.href='./ecommerce';

  const [values, setvalues] = useState ('');
  const history = useHistory(); //usamos para navegação entre rotas.

 
 function onFormChange() {
   setvalues(
     'formBasicName=' 
     + encodeURI((document.getElementById('formBasicName') as HTMLInputElement).value)
     +'&formBasicEmail='
     + encodeURI((document.getElementById('formBasicEmail') as HTMLInputElement).value)
     + '&formBasicPassword='
     + encodeURI((document.getElementById('formBasicPassword') as HTMLInputElement).value)
     );
 } 

 function onSubmit(ev) {
    ev.preventDefault();
    axios.post('http://localhost:8082/register', values)
     .then((response) =>{
      history.push('./Login'); //  history.push: tem a capacidade de enviar dados através rotas para que outro componente tenha acesso!
    });
 } 

 return ( 
 <>
 <div id="singup"  >
  <Form id="formSingup" onChange={onFormChange} >
    <Form.Group controlId="formBasicName">
      <Form.Label>Nome Completo</Form.Label>
      <Form.Control type="text" placeholder="Entre Nome" />
      <Form.Text className="text-muted"></Form.Text>
    </Form.Group>

    <Form.Group controlId="formBasicEmail">
      <Form.Label>Login</Form.Label>
      <Form.Control type="email" placeholder="Entre email" />
      <Form.Text id="textForm" className="text">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
   
    <Button id="btnSingup" onClick={onSubmit} variant="dark" type="submit">Submit</Button> 
    <br></br><br></br>
    <p id="textJaSouCliente">Já sou cliente</p>
    <Button id="btnLogin" onClick={event => window.location.href='./Login'} variant="dark" >Login</Button>
  </Form>
 
 </div>  
</>  
) 
};

export default Singup;
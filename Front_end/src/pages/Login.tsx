import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';
import api from "../services/api";
import { validateToken, isAuthenticated } from "../services/auth";


const Login: React.FC = () => {
  
  //Verificação se usuario esta lagado.
  if (isAuthenticated()) window.location.href='./ecommerce';

  const [values, setvalues] = useState ('');
  const history = useHistory();
  const [requestError, setRequestError] = useState ('');
  
  function onFormChange() {
    setvalues(
      'formBasicEmail='
      + encodeURI((document.getElementById('formBasicEmail') as HTMLInputElement).value)
      + '&formBasicPassword='
      + encodeURI((document.getElementById('formBasicPassword') as HTMLInputElement).value)
      );
  } 
 
//Valida o login, caso positivo direciona para pagina ecommerce.
  async function handleSignIn (ev) {
    ev.preventDefault();

    if (((document.getElementById('formBasicEmail') as HTMLInputElement).value.length < 1) || 
        ((document.getElementById('formBasicPassword') as HTMLInputElement).value.length < 1)) {
          setRequestError("Preencha e-mail e senha para continuar!");
    } else {
        try {
           await (api.post('http://localhost:8082/login', values)
                .then(async response => {
                  if (response.status == 200 && response.data == "Login Concedido") {
                    
                    let token = (response.headers.authorization as String).replace('Bearer','').trim(); //trim limpa os espaços vazios no inicio e fim da string
                    await validateToken(token);
                    if (isAuthenticated()) {

                       history.push('./ecommerce');

                    } else setRequestError ("Não Autorizado.");

                   } else setRequestError ("Houve um problema com sua requisição de login");
                   // DEBUG CODE
                   // alert(response.data);
                })
                .catch((err: AxiosError):void => {
                  switch (err.response?.status) {
                    case 400:
                      setRequestError("Login e Password são obrigatórios.");
                    break;
    
                    case 401:
                      setRequestError("Login ou Password Inválido.");
                    break;
              
                    default:
                      setRequestError("Houve um problema com o login, verifique suas credenciais.");
                    break;
                  };   
                }));
         } catch (ex) {
              setRequestError("Houve um problema com o login, entre em contato com o administrador.");
              // DEBUG CODE
              // alert(ex);
         };
    }
 } 

return (
<>
<div id="login" >
  <Form id="formLogin" onChange={onFormChange} >
     <Form.Group controlId="formBasicEmail">
       <Form.Label>Login</Form.Label>
       <Form.Control type="email" placeholder="Entre email" />
       <Form.Text id="textFomr" className="text">
          We'll never share your email with anyone else.
       </Form.Text>
       <Form.Text id="textError" className="text">
         {requestError}
       </Form.Text>
     </Form.Group>

     <Form.Group controlId="formBasicPassword">
       <Form.Label>Password</Form.Label>
       <Form.Control type="password" placeholder="Password" />
     </Form.Group>
     <br></br>
     <Button id="btnLoginTwo" onClick={handleSignIn} variant="dark" >Login</Button>
  </Form>
</div>  
</>  
) 
};

export default Login;




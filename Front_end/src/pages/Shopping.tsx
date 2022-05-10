import React, { useState} from 'react';
import generalProps, { hcrypter }  from '../components/ArtPageProps';
import { Form, Button } from 'react-bootstrap';
import { AxiosError } from 'axios';
import api from "../services/api";
import { getToken } from '../services/auth';
import { isAuthenticated } from "../services/auth";
import {PROPS_ECON_KEY, PROPS_SHOP_KEY} from '../components/ArtPageProps';


//Class 'generalProps' componente 'ArtPageProps'.
let props = new generalProps(); 

let totalAmountShopping;
totalAmountShopping = localStorage.getItem(PROPS_SHOP_KEY);
totalAmountShopping = JSON.parse(totalAmountShopping);


const Shopping = () => {

  //Verificação se usuario esta lagado.
  if (!isAuthenticated()) window.location.href='./login'
  else if (totalAmountShopping <= 0) window.location.href='./ecommerce'

  const [values, setvalues] = useState ('');
  const [count, setCount] = useState(0);
  const [requestError, setRequestError] = useState ('');
  const crypter = new  hcrypter();


  //Recupera dados do cc já registrado anteriormente. 
  async function onFormLoadCC () {

    try {
      // DEBUG CODE
      //alert(values);
       await (api.post('http://localhost:8082/shopping','getCC=1')
            .then(async response => {

              if (response.status == 200 && response.data !== "Cartão Aceito") {

                try {
                let formFields = (await crypter.decryptMsg(response.data[0].cc) as String).split("&");

                (document.getElementById('NomeCC') as HTMLInputElement).value     = formFields[0].split("=")[1];
                (document.getElementById('NumeroCC') as HTMLInputElement).value   = formFields[1].split("=")[1];
                (document.getElementById('DadosValCC') as HTMLInputElement).value = formFields[2].split("=")[1];
                (document.getElementById('DadosCodCC') as HTMLInputElement).value = formFields[3].split("=")[1];
 
                } catch (ex) {return};   
                
               } else setRequestError ("Houve um problema com seus dados de armazenados.");
            })
            .catch((err: AxiosError):void => {
              switch (err.response?.status) {
                case 400:
                  setRequestError("Não foi possível recuperar seus dados armazenados.");
                break;

                default:
                  setRequestError("Houve um problema com o processamento, verifique seus dados.");
                break;
              };
            }));
     } catch (ex) {
          setRequestError("Houve um problema com o seu cadastro de cartão de crédito, entre em contato com o administrador.");
          // DEBUG CODE
          // alert(ex);
     };     
  } 

  function onFormChangeCC() {

    let data =  
      'NomeCC='
      + (document.getElementById('NomeCC') as HTMLInputElement).value
      + '&NumeroCC='
      + (document.getElementById('NumeroCC') as HTMLInputElement).value
      + '&DadosValCC='
      + (document.getElementById('DadosValCC') as HTMLInputElement).value
      + '&DadosCodCC='
      + (document.getElementById('DadosCodCC') as HTMLInputElement).value
      + '&email_props='
      + (JSON.parse((atob((getToken()||'').split('.')[1])))['name']);

    // DEBUG CODE
    // setvalues(encodeURI('cc=' + crypter.encryptMsg('NomeCC=Ana Costa&NumeroCC=444555333&DadosValCC=08/22&DadosCodCC=123&email_props=ana_costa@test.com')))
    setvalues(encodeURI('cc=' + crypter.encryptMsg(data)))
  } 

  //Registra os dados do cartão do usuario.
  async function handlePgCred (ev) {
    ev.preventDefault();

    if (((document.getElementById('NomeCC') as HTMLInputElement).value.length < 1) || 
        ((document.getElementById('NumeroCC') as HTMLInputElement).value.length < 1) || 
        ((document.getElementById('DadosValCC') as HTMLInputElement).value.length < 1) || 
        ((document.getElementById('DadosCodCC') as HTMLInputElement).value.length < 1)) {

        setRequestError("Preencha seus dados do cartão para continuar!");

    } else {
        try {
          // DEBUG CODE
          // alert(values);
           await (api.post('http://localhost:8082/shopping',values)
                .then(async response => {
                  if (response.status == 200 && response.data == "Cartão Aceito") {
                    // DEBUG CODE
                    // alert(response.data);
                    setRequestError ('');
                    alert("Cartão Aceito");

                   } else setRequestError ("Houve um problema com sua requisição do cartão de credito");
                    // DEBUG CODE
                    //alert(response.data);
                })
                .catch((err: AxiosError):void => {
                  switch (err.response?.status) {
                    case 400:
                      setRequestError("Todos os dados são obrigatórios.");
                    break;
    
                    case 401:
                      setRequestError("Algum doados foi Inválido.");
                    break;
              
                    default:
                      setRequestError("Houve um problema com o processamento, verifique seus dados estão corretos.");
                    break;
                  };
                }));
         } catch (ex) {
              setRequestError("Houve um problema com o seu Cartão, entre em contato com o administrador.");
         };
    }
 } 



return (
<>   
<div id="bodyShopping" >
 <div id="Shoppingcontainer" className="containerShopping">
 
  <section>
    <div id="CardsPay" className="row">
       <div className="col-lg-8">
            <div className="card mb-3">
                 <div className="card-body">
                      <h5 className="mb-4">Formas de Pagamento disponiveis:</h5>
                      <img className="mr-2" width="45px"
                       src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                       alt="Visa" />
                      <img className="mr-2" width="45px"
                       src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                       alt="American Express" />
                       <img className="mr-2" width="45px"
                       src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                       alt="Mastercard"  />
                 </div>
             </div>
             <div className="card mb-3">            
                      <h5 id="titleCC" className="mb-4">Dados do Cartão:</h5>
                      <>
                      <div id="cartão"  >
                          <Form id="formCC"  onChange={onFormChangeCC} >
                               <div id="textError" className="text">
                                  {requestError}
                               </div>
                               <Form.Group controlId="NomeCC">
                                  <Form.Label id="labelNomeCC" >Nome do Cartão</Form.Label>
                                  <Form.Control type="nome" placeholder="Entrar nome" />
                                  <Form.Text id="textCC" className="text">
                                     Seus dados não serão compartilhados com mais ninguém.
                                  </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="NumeroCC" >
                                  <Form.Label id="labelNumeroCC">Número Cartão</Form.Label>
                                  <Form.Control  type="numero" placeholder="Entrar número" />
                                </Form.Group>
                                
                                <Form.Group controlId="DadosValCC"> 
                                  <Form.Label  id="labelValCC">Validade</Form.Label>
                                  <Form.Control  type="data" placeholder="Entrar validade" />
                                </Form.Group>

                                <Form.Group controlId="DadosCodCC">
                                  <Form.Label  id="labelCodCC">Codigo</Form.Label>
                                  <Form.Control  type="numero" placeholder="Entrar codigo" />
                                </Form.Group>
                                  <br></br>
                                <Button id="btnCartao" onClick={handlePgCred} variant="dark">Enviar Dados</Button>
                           </Form>

                           {document.getElementsByTagName('body')[0].onload = onFormLoadCC}
                      </div>  
                      </>     
            </div>
       </div>
         
       <div className="col-lg-4">
            <div className="card mb-3">
                 <div className="card-body">

                     <h5 className="mb-3">Total a pagar</h5>
                     <ul className="list-group list-group-flush">
                         <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                             Total dos produtos
                             <span>€ {totalAmountShopping}</span>
                         </li>
                         <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                             Entrega em Portugal
                             <span>Gratis</span>
                         </li>
                         <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                             <div>
                                 <strong>Total</strong>
                                 <strong>
                                     <p className="mb-0">(13% IVA incluido)</p>
                                 </strong>
                             </div>
                             <span><strong>€ {totalAmountShopping/100*13+totalAmountShopping} </strong></span>
                         </li>
                     </ul>

                     <button id="btnFinalComprar" onClick={(event)=> { 

                                if (((document.getElementById('NomeCC') as HTMLInputElement).value.length < 1) || 
                                   ((document.getElementById('NumeroCC') as HTMLInputElement).value.length < 1) || 
                                   ((document.getElementById('DadosValCC') as HTMLInputElement).value.length < 1) || 
                                   ((document.getElementById('DadosCodCC') as HTMLInputElement).value.length < 1)) 

                                   setRequestError("Preencha seus dados do cartão para finalizar a compra.")

                                else if(requestError == '') {
                                   alert('Compra Efetuada com Sucesso!   Obrigada.');
                                   localStorage.removeItem(PROPS_ECON_KEY);  
                                   localStorage.removeItem(PROPS_SHOP_KEY);
                                   window.location.href='./home';
                                }
                                                                      }                                                        }
                     type="button" className="btn btn-primary btn-block waves-effect waves-light">Finalizar Compra</button>
                  </div>
             </div>
             
             <div className="card mb-3">
                  <div  className="card-body">
                         <h5 className="mb-4">Expectativa de contato para agendamento:</h5>
                         <p id="mensageAgend" className="mb-0"> Em 48hs após a confirmação do pagamento nossa equipe entrará em contato.</p>
                         <br></br>
                         <p  className="mb-0"> **As sessão poderam remarcadas até 2 vezes sem cobranças add, com no mínimo 24hs de antecêdencia.</p>
                 </div>
            </div>
       </div>
    </div>

  </section>
</div>

</div> 
</> 
)
};


export default Shopping;
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { MDBRow, MDBCard, MDBCardBody, MDBTooltip, MDBTable, MDBTableBody, MDBTableHead, MDBInput, MDBBtn } from "mdbreact";
import generalProps, {PROPS_ECON_KEY, PROPS_SHOP_KEY} from '../components/ArtPageProps';
import { isAuthenticated } from "../services/auth";


//Const listSpot nome da id da <div> que preenche a tabela.
const listSpot = "ecomContainer"; 
//Class 'generalProps' componente 'ArtPageProps'.
let props = new generalProps();   
let auxState;


//RECUPERAR OS DADOS NA LOCALSTORAGE 
let dataGotSession;
dataGotSession = localStorage.getItem('escolha');
dataGotSession = JSON.parse(dataGotSession);

//Montando estado do Card.
auxState = { 
            data: [{
             rowid:dataGotSession? 0:-1,
             src: dataGotSession? dataGotSession.img :'../images/place_holder.png',
             title: dataGotSession? dataGotSession.nome  : 'Nenhum produto selecionado',
             subTitle: dataGotSession? dataGotSession.descritivo : "_".repeat(80), 
             type: "",
             price: parseFloat((dataGotSession? dataGotSession.preco: '0' as String).replace('€','').replace(',','.').trim()),
             // DEBUG CODE
             //alert((dataGotSession.preco as String).replace('€','').replace(",",".").trim());
             qty:0
            }],
            columns: [
      {
        label: '',
        field: 'img',
      },
      {
        label: 'Produto',
        field: 'product'
      },
      {
        label: 'Tipo',
        field: 'type'
      },
      {
        label: 'Preço',
        field: 'price'
      },
      {
        label: 'Quantidade',
        field: 'qty'
      },
      {
        label: 'Valor',
        field: 'amount'
      },      
      {
        label: '',
        field: 'button'
      }
            ]
};
if (dataGotSession) {
    window.localStorage.removeItem('escolha'); // Limpa a 'escolha' da localStorage.   
    props.setStEcommerce (auxState); // variaval props é a instanciada da classe GeneralProps. 
    localStorage.setItem(PROPS_ECON_KEY, JSON.stringify(props)); 
             
} else auxState = localStorage.getItem(PROPS_ECON_KEY)?
                  JSON.parse(localStorage.getItem(PROPS_ECON_KEY)||'').sharedEcommerce 
                  :auxState;  



const Ecommerce: React.FC = () => {  

  //Verificação se usuario esta lagado.
  if (!isAuthenticated()) window.location.href='./login';

  const rows = new Array();
  const [totalAmount, settotalAmount] = useState((JSON.parse(localStorage.getItem(PROPS_SHOP_KEY)||"0") as number)||0); 
  const [ecState, setEcState] = useState(auxState);


  //Evento é disparado quando há um estado novo no localStorage atualizado pelo componente MenuProdutos. 
  window.addEventListener('uptCart', (evt) => { 

        setEcState(JSON.parse(localStorage.getItem(PROPS_ECON_KEY)||'').sharedEcommerce); 
        //ReactDOM.hydrate(renderTable(ecState), document.getElementById(listSpot)); // recarrega a tabela do componente Ecommerce com os produtos atualizados.  
        evt.stopPropagation();
  });

 //Carregar os produtos selecionados 
 function rowMapping (info: Array<any>) {

  let auxRow = new Array();

  info.map(row => {
      return auxRow.push(
        {
        'img': <img src={row.src} alt="" className="img-fluid z-depth-0" width={'100%'} height={'100%'}/>,
        'product': [<h5 className="mt-3" key={new Date().getDate() + 1}><strong>{row.title}</strong></h5>, <p key={new
          Date().getDate()} className="text-muted">{row.subTitle}</p>],
        'type': row.type,
        'price': `€${row.price}`,
        'qty': <MDBInput id={"qty"+row.rowid} type="number" value={row.qty} min="0" className="form-control" style={{ width: "100px" }}  
               onChange={()=>{ if (row.rowid > -1) {
                          let totalAmountChg = (
                              totalAmount - (ecState.data[row.rowid].qty*ecState.data[row.rowid].price) 
                              + (parseInt((document.getElementById("qty"+row.rowid) as HTMLInputElement).value)*ecState.data[row.rowid].price)
                          );
                          localStorage.setItem(PROPS_SHOP_KEY, JSON.stringify(totalAmountChg)); 
                          settotalAmount(totalAmountChg);

                          let auxStateChg = ecState;
                          auxStateChg.data[row.rowid].qty = parseInt((document.getElementById("qty"+row.rowid) as HTMLInputElement).value)||0; 
                          setEcState(auxStateChg);
                          props.setStEcommerce (auxStateChg); // variaval props é a instanciada da classe GeneralProps. 
                          localStorage.setItem(PROPS_ECON_KEY, JSON.stringify(props));
                             }      
                        }
                } />,  
        'amount': <strong>€{row.qty * row.price}</strong>,
        'button':
          <MDBTooltip placement="top">
            <MDBBtn id = "removeItem" color="primary" size="sm" //Botão retirar o produto.
                onClick={(event)=>{             
                   // DEBUG CODE
                   //console.log(ecState, row);
                   //console.log(ecState.data);
                   //console.log(row.rowid);
                   //console.log(totalAmount);
                   //console.log(ecState.data[row.rowid]);
 
                  let auxTotalAmount = 0;
                  if (row.rowid > -1) {
                      auxTotalAmount = (totalAmount - (ecState.data[row.rowid].qty*ecState.data[row.rowid].price));                   
                  }
            
                  settotalAmount(auxTotalAmount);
                  localStorage.setItem(PROPS_SHOP_KEY, JSON.stringify(totalAmount));

                  let auxState = ecState;  
                  auxState.data.splice(row.rowid,1); // uma vez retirado o produto 'splice', muda o id da lista dos produtos, p não ficar com um furo no indices.
                  let i = 0; // reoganizar os indices da lista, uma vez que um elemento foi removido.
                  auxState.data.forEach(() => {auxState.data[i].rowid = i; i++;});

                  props.setStEcommerce (auxState);
                  localStorage.setItem(PROPS_ECON_KEY, JSON.stringify(props));

                  window.dispatchEvent(new Event('uptCart'));    
                    
                  }}> 
                X
            </MDBBtn>
            <div>Remove item</div>
         </MDBTooltip>       
        }
      )
    
    });

  return auxRow;  

 }

 function renderTable(currentState:typeof ecState) {
      return (
        
           <MDBCard  className="w-100">
              <div id='cardTitle'>CARRINHO DE COMPRAS</div>
             <MDBCardBody> 
               <MDBTable className="product-table">
                 <MDBTableHead className="font-weight-bold" color="mdb-color lighten-5" columns={currentState.columns as Array<any>} />
                 <MDBTableBody id="tableBody" rows={rowMapping(currentState.data)} >
                               <td id="totalBody" colSpan={3} align={"right"}>Total</td>
                               <td colSpan={1} align={"center"}>€{totalAmount}</td>
                               <td colSpan={3} align={"center"}> 
                                 <Button id="btnCheckout" onClick={(event)=> {localStorage.setItem(PROPS_SHOP_KEY, JSON.stringify(totalAmount)); 
                                                                              window.location.href='./Shopping'}
                                                                  } variant="outline-info" size="lg" >Comprar</Button>
                               </td>
                 </MDBTableBody>
               </MDBTable>
             </MDBCardBody>
           </MDBCard>       
      ) 
 }     
 
return (
   
  <div id="bodyEcommerce">
     <MDBRow id={listSpot} className="my-2" center>
       {renderTable(ecState)}
     </MDBRow>
  </div>
 ) 

};

export default Ecommerce;
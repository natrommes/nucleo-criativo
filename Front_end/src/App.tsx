import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import HeaderLog from './components/HeaderLog';
import Singup from './pages/Singup';
import Login from './pages/Login';
import ShowImages from './components/ShowImages'; 
import About from './components/About';
import AboutAtdArteterapia from './pages/AboutAtdArteterapia';
import AboutOfnCriativas from './pages/AboutOfnCriativas';
import AboutMentoria from './pages/AboutMentoria';
import FormContact from './components/FormContact';
import Footer from './components/Footer';
import Ecommerce from './pages/Ecommerce'; 
import MenuProdutos from './components/MenuProdutos';
import Shopping from './pages/Shopping';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (

   <Route
     {...rest}
     render={props =>
      
      isAuthenticated() ? (
         <Component {...props} />
       ) : (
         <Redirect to={{ pathname: "/", state: { from: props.location } }} />
       )
     }
   />
 );

function chooseHeader() {

   if(isAuthenticated()) return <HeaderLog />
   else return <Header />

}

// limpar o estado do storage, para iniciar o carregamento da pagina. 
 
const App: React.FC = () => (
<>
   <div className="app-header">
      
   </div>

   <BrowserRouter>
      <Switch>
        <Route path="/" exact>
           {chooseHeader()}
           <ShowImages />
        </Route>

        <Route path="/home" exact>
           {chooseHeader()}
           <ShowImages />
        </Route>

        <Route path="/about" exact>
           {chooseHeader()}
           <About />
        </Route>
        
        <Route path="/contact" exact>
           {chooseHeader()}
           <FormContact />
        </Route>

        <Route path="/AboutAtdArteterapia" exact>
           {chooseHeader()}
           <AboutAtdArteterapia />
        </Route>

        <Route path="/AboutOfnCriativas" exact>
           {chooseHeader()}
           <AboutOfnCriativas />
        </Route>

        <Route path="/AboutMentoria" exact>
           {chooseHeader()}
           <AboutMentoria />
        </Route>

        <Route path="/Singup" exact>
           <Header />
           <Singup />
        </Route>
        
        <Route path="/Login" exact>
           <Header />
           <Login />
        </Route>

        <PrivateRoute path="/ecommerce" exact component={Ecommerce}>
           <HeaderLog />
           <MenuProdutos />
           <Ecommerce />
         </PrivateRoute> 

         <PrivateRoute  path="/Shopping" exact component={Shopping}>
           <HeaderLog />
           <Shopping />
         </PrivateRoute >

         <Redirect to="/home" />

      </Switch>
    </BrowserRouter>

    <div className="app-footer">
      <Footer />
    </div>

  </>
);
export default App;

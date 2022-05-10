import {PROPS_ECON_KEY, PROPS_SHOP_KEY} from '../components/ArtPageProps';
import api from "../services/api";

export const TOKEN_KEY = "nucleo_criativo_token";

//Função Hash criptografa os dados de entrada.
async function HMAC(key, message, alg){  

  const g = str => new Uint8Array([...Array.from(unescape(encodeURIComponent(str)))].map(c => c.charCodeAt(0))),
  k = g(key),
  m = g(message),
  c = await crypto.subtle.importKey('raw', k, { name: 'HMAC', hash: alg },true, ['sign']), 
  s = await crypto.subtle.sign('HMAC', c, m);
  [...Array.from(new Uint8Array(s))].map(b => b.toString(16).padStart(2, '0')).join('');  

  return btoa(String.fromCharCode(...Array.from(new Uint8Array(s)))) // btoa: converte para Base64
}

//Valida o Token.
export async function validateToken (tokenAux:string) {

  if (!tokenAux) return false;

  let splitToken = tokenAux.split('.'); // split: dividindo o Token em 3 partes.
  
  // DEBUG CODE
  // alert((response.headers.authorization as String).replace('Bearer','').trim());
  // alert(token);
  // alert(splitToken[0]);
  
  let alg = "";
  if ((JSON.parse((atob(splitToken[0])))['alg']) == 'HS256'){ // atob = base64_decode
         alg= 'SHA-256';
  } else alg= 'SHA-1';
  
  let base64 = await HMAC('rootroot',splitToken[0]+"."+splitToken[1], alg )
  
   if (base64.toString() == splitToken[2]) {
      localStorage.setItem(TOKEN_KEY, tokenAux);
      return true;
   } else return false;
  
  // usuario esta logado ou não// Gerando Hash e convertendo na base64.
  // DEBUG Code
  // document.write(response.data);
  // document.write("<BR>");
  // document.write((await base64).toString());
  // document.write("<BR>");
  // document.write(splitToken[2]);    
}


export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const isAuthenticated = () => {

  return (localStorage.getItem(TOKEN_KEY) !== null);
};

//Limpa o LocalStorage
export async function logoutSession () {
  localStorage.removeItem(TOKEN_KEY);  
  localStorage.removeItem(PROPS_ECON_KEY);  
  localStorage.removeItem(PROPS_SHOP_KEY);
  localStorage.removeItem('escolha');
  try {
    await (api.get('http://localhost:8082/logout'));
  } catch (ex) {/* No Action. */}
};
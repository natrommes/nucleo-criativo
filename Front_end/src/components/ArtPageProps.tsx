  

class generalProps  {
  //propriedades da classe # Estado acumulado dentro da classe. 
  public sharedEcommerce; 
  public sharedShopping;

  
  // metodos publico da classe (função).
  public setStEcommerce (shStateEcommerce) { 
      this.sharedEcommerce = shStateEcommerce;
   };

  public setStShopping (shStateShopping) { 
    this.sharedShopping = shStateShopping;
   };

};

export class hcrypter {

  private PROPS_CRYPT_KEY = "0123456789abcdef0123456789abcdef";
  private PROPS_CRYPT_IV  = "abcdef9876543210abcdef9876543210";
  private CryptoJS = require("crypto-js");
  private key = '';
  private iv = '';

  public constructor () {
      this.CryptoJS = require("crypto-js");
      this.key = this.CryptoJS.enc.Hex.parse(this.PROPS_CRYPT_KEY);
      this.iv =  this.CryptoJS.enc.Hex.parse(this.PROPS_CRYPT_IV);
   };

  public encryptMsg (data) {return this.CryptoJS.AES.encrypt(JSON.stringify({abc: data}), this.key, {
            iv: this.iv,
            mode: this.CryptoJS.mode.CBC,
          }).toString();};
  public decryptMsg (data) {return JSON.parse(this.CryptoJS.AES.decrypt(data, this.key, {
            iv: this.iv,
            mode: this.CryptoJS.mode.CBC,
          }).toString(this.CryptoJS.enc.Utf8)).abc;}; 
}

export default generalProps;
export const PROPS_ECON_KEY = "econ_props";  // constante que é utilizada como indice no localStorage.
export const PROPS_SHOP_KEY = "shop_props"; 

import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import * as string_decoder from "string_decoder";
import {defer} from "rxjs";

@Injectable({
  providedIn:'root'
})
export class AppUtils{


  public  getBaseUrl():string{
    return  environment.apiUrl;
  }

  private  static  _getTokenExpirationDate(token:string):Date|null{
    const  decodedToken= this._decodeToken(token)
    // Return if the decodedToken doesn't have an 'exp' field
    if ( !decodedToken.hasOwnProperty('exp') )
    {
      return null;
    }
    // Convert the expiration date
    const date = new Date(0);
    date.setUTCSeconds(decodedToken.exp);

    return date;
  }
  public static _decodeToken(token:string):any{
    if(!token){
      return null;
    }

    const parts= token.split('.');
    if(parts.length !==3){
      throw  new Error('The inspected token doesn\'t appear to be a JWT. Check to make sure it has three parts and see https://jwt.io for more.' +
        'Check')
    }


  }

  private  static  _urlBase64Decoder(str:string):string{

    let  output= str.replace(/-/g,'+').replace(/_/g,'/');
    switch (output.length %4){
      case 0:{break;}
      case 2:{
        output +='==';
        break;
      }
      case 3:{
        output +='=';
        break;
      }
      default:
      {
        throw Error('Illegal base64url string');
      }

    }

    return  this._b64DeocdeUnicode(output)

  }

  private  static  _b64DeocdeUnicode(str:any):string{
    return decodeURIComponent(
      Array.prototype.map.call(this._b64decode(str),(c:any)=>{
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join('')
    )
  }

  private static _b64decode(str: string): string
  {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';

    str = String(str).replace(/=+$/, '');

    if ( str.length % 4 === 1 )
    {
      throw new Error(
        '\'atob\' failed: The string to be decoded is not correctly encoded.'
      );
    }

    /* tslint:disable */
    for (
      // initialize result and counters
      let bc = 0, bs: any, buffer: any, idx = 0;
      // get next character
      (buffer = str.charAt(idx++));
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer &&
      (
        (bs = bc % 4 ? bs * 64 + buffer : buffer),
          // and if not first of each 4 characters,
          // convert the first 8 bits to one ascii character
        bc++ % 4
      )
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    )
    {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    /* tslint:enable */

    return output;
  }

  static  isTokenExpired(token:string,offsetSecond?:number):boolean{
    if(!token || token===''){
      return  true;
    }
    const date=this._getTokenExpirationDate(token)

    offsetSecond =offsetSecond||0;
    if(date ==null){
      return true;
    }

    return !(date.valueOf()>new Date().valueOf()+offsetSecond*1000)
  }
}

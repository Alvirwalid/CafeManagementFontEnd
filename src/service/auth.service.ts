import { Injectable } from '@angular/core';
import {LoginService} from "./login.service";
import {checkForPrivateExports} from "@angular/compiler-cli/src/ngtsc/entry_point";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private  _authenticated=false;


  constructor(private  _httpClient:HttpClient,private _cookieService:CookieService) { }
  set accessToken(token:string){
    this._cookieService.set('access_token',token);
  }
  get getToken():string{
    return  this._cookieService.get('access_token')??'';
  }
  set authenticated(value: boolean) {
    this._authenticated = value;
  }
  checkAcessToken(): boolean
  {
    return this._cookieService.check('access_token');
  }

  signOut():Observable<any>{
    this._cookieService.delete('access_token');
    localStorage.removeItem('token');
    sessionStorage.removeItem('token')
    return  of(true);
  }

}

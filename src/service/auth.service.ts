import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  url=environment.apiUrl;

  constructor(private  http:HttpClient,private  router:Router) { }





  public  isAuthenticated():boolean{

   const token=localStorage.getItem("token");
    if(!token){
      this.router.navigate(["/"])
      return  false;
    }else {
      return  true;
    }
  }
}

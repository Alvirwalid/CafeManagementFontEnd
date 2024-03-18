import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommonResponseObject} from "../app/model/common_response";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url=environment.apiUrl;

  constructor(private  httpClient:HttpClient) { }


  signUp(data:any):Observable<CommonResponseObject<any>>{
    // @ts-ignore
    return this.httpClient.post(this.url+'/signup',data,{
      headers:new  HttpHeaders().set("Content-Type","application/json")
    })
  }
}

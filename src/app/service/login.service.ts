import { Injectable } from '@angular/core';
import {AppCrudRequestService} from "./app-crud-request.service";
import {LoginResponse} from "../model/login_response";
import {HttpClient} from "@angular/common/http";
import {AppUtils} from "../utils/app-utils";
import {Observable} from "rxjs";
import {CommonResponseObject} from "../model/common_response";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends AppCrudRequestService<LoginResponse>{

  constructor(private http:HttpClient,private  appUtils:AppUtils) {
    super(http,appUtils.getBaseUrl()+'/login')
  }
  login(body:any):Observable<CommonResponseObject<any>>{
    return this.http.post<CommonResponseObject<any>>(this.baseUrl,body)
  }
}

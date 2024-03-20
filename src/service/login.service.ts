import { Injectable } from '@angular/core';
import {AppCrudRequestService} from "./app-crud-request.service";
import {LoginResponse} from "../app/model/login_response";
import {HttpClient} from "@angular/common/http";
import {AppUtils} from "../app/utils/app-utils";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends AppCrudRequestService<LoginResponse>{

  constructor(private http:HttpClient,private  appUtils:AppUtils) {
    super(http,appUtils.getBaseUrl()+'/login')
  }
}

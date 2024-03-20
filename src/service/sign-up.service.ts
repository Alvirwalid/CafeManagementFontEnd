import { Injectable } from '@angular/core';
import {AppCrudRequestService} from "./app-crud-request.service";
import {UserModel} from "../app/model/userModel";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {AppUtils} from "../app/utils/app-utils";
import {Observable} from "rxjs";
import {CommonResponseObject} from "../app/model/common_response";

@Injectable({
  providedIn: 'root'
})
export class SignUpService extends AppCrudRequestService<UserModel>{

  constructor(private  http:HttpClient,private  appUtils:AppUtils) {
    super(http,appUtils.getBaseUrl()+'/signup');
  }

  signUp(formData:UserModel):Observable<CommonResponseObject<UserModel>>{
    return this.http.post<CommonResponseObject<UserModel>>(this.baseUrl,formData)
  }


}

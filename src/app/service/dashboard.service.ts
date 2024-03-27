import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import * as http from "http";
import {environment} from "../../environments/environment";
import {CommonResponseObject} from "../model/common_response";
import {DashboardModel} from "../model/dahsboardModel";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url=environment.apiUrl;

  constructor(private  http:HttpClient) { }
  getDetails():Observable<CommonResponseObject<DashboardModel>>{
    return  this.http.get<CommonResponseObject<DashboardModel>>(this.url+'/dashboard/details')
  }


}

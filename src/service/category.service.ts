import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommonResponseObject} from "../app/model/common_response";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url=environment.apiUrl;

  constructor(private  http:HttpClient) { }


  add(data:any):Observable<CommonResponseObject<any>>{
    return  this.http.post<CommonResponseObject<any>>(this.url+'/category/add',data,
      {
        headers:new HttpHeaders().set('Content-Type','application/json')
      });
  }

  update(data:any):Observable<CommonResponseObject<any>>{
    return  this.http.post<CommonResponseObject<any>>(this.url+'/category/update',data,
      {
        headers:new HttpHeaders().set('Content-Type','application/json')
      });
  }
  getAll():Observable<CommonResponseObject<any>>{
    return  this.http.get<CommonResponseObject<any>>(this.url+'/category/all',
      {
        headers:new HttpHeaders().set('Content-Type','application/json')
      });
  }

}

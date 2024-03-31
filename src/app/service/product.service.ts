import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommonResponseObject} from "../model/common_response";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url=environment.apiUrl;

  constructor(private  http:HttpClient) { }

  getAllProduct():Observable<CommonResponseObject<any>>{
    return  this.http.get<CommonResponseObject<any>>(this.url+'/products/all');
  }
  add(data:any):Observable<CommonResponseObject<any>>{
    return this.http.post<CommonResponseObject<any>>(this.url+'/products/add',data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    })
  }


  update(data:any):Observable<CommonResponseObject<any>>{
    return this.http.put<CommonResponseObject<any>>(this.url+'/products/update',data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    })
  }

  updateStatus(data:any):Observable<CommonResponseObject<any>>{
    return this.http.put<CommonResponseObject<any>>(this.url+'/products/updateStatus',data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    })
  }

  getById(id:any):Observable<CommonResponseObject<any>>{
    return  this.http.get<CommonResponseObject<any>>(this.url+'/products/get-by-id');
  }

  getByCategoryId(id:any):Observable<CommonResponseObject<any>>{
    return  this.http.get<CommonResponseObject<any>>(this.url+`/products/get-by-category/${id}`);
  }

  deleteById(id:any):Observable<CommonResponseObject<any>>{
    return  this.http.delete<CommonResponseObject<any>>(this.url+`/products/delete/${id}`);
  }
}

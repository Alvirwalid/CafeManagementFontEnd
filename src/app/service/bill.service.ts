import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as http from "http";
import * as url from "url";
import {Observable} from "rxjs";
import {CommonResponseObject} from "../model/common_response";

@Injectable({
  providedIn: 'root'
})
export class BillService {

  url:string=environment.apiUrl

  constructor(private  http:HttpClient) { }


  headers={headers:new HttpHeaders().set('Content-Type','application/json')}

  // generateReport(data:any):Observable<CommonResponseObject<any>>{
  //
  //   console.log(`Dataaaaaaaaaaaaaaaaaaaaaaa :`)
  //   console.log( data)
  //   return this.http.post<CommonResponseObject<any>>(url+'/bill/generateReport',data,this.headers)
  // }

  generateReport(data:any):Observable<CommonResponseObject<any>>{
    return this.http.post<CommonResponseObject<any>>(this.url+'/bill/generateReport',data,{
      headers:new HttpHeaders().set('Content-Type','application/json')
    })
  }

  getAllBills():Observable<CommonResponseObject<any>>{
    return  this.http.get<CommonResponseObject<any>>(this.url+'/bill/all');
  }
  getPdf(data:any):Observable<any>{
    return this.http.post<any>(this.url+'/bill/getPdf',data,this.headers)
  }

  deleteBill(id:any):Observable<CommonResponseObject<any>>{
    return  this.http.delete<CommonResponseObject<any>>(this.url+`/bill/delete/${id}`,this.headers)
  }

}

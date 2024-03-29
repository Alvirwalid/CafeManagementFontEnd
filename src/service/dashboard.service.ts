import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as http from "http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

url =environment.apiUrl;
  constructor(private  http:HttpClient) {}
  getDetails(){
    return this.http.get(this.url+'/dashboard/details')
  }
}

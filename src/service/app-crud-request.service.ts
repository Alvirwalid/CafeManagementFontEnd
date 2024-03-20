
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {CommonResponseList, CommonResponseObject} from "../app/model/common_response";


export abstract class AppCrudRequestService<I> {




  // htttOption={
  //   header:new HttpHeaders({"Content-Type":"application:json"})
  // }

  protected constructor(protected  httpClient:HttpClient,protected baseUrl:string) { }



create(i:I):Observable<CommonResponseObject<I>>{
    return this.httpClient.post<CommonResponseObject<I>>(this.baseUrl,i);
}

  update(i:I):Observable<CommonResponseObject<I>>{
    return this.httpClient.put<CommonResponseObject<I>>(this.baseUrl,i);
  }
  delete(i: I): Observable<CommonResponseObject<I>> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: i
    };
    return this.httpClient.delete<CommonResponseObject<I>>( this.baseUrl, httpOptions);
  }
  getAllList(): Observable<CommonResponseList<I>> {
    return this.httpClient.get<CommonResponseList<I>>( this.baseUrl);
  }
  getObjectById(id: number): Observable<CommonResponseObject<I>> {
    return this.httpClient.get<CommonResponseObject<I>>( this.baseUrl + '/' + 'get-by-id' + '/' + id);
  }

}

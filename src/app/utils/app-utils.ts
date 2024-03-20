import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn:'root'
})
export class AppUtils{


  public  getBaseUrl():string{
    return  environment.apiUrl;
  }
}

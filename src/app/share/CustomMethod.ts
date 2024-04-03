import {GlobalConstant} from "./global_constant";
import {SnackbarService} from "../service/snackbar.service";

export class CustomMethod{


public  static errorResponse(error:any):string{
    if(error.error.message){
      return error.error.message;
    }else {
      return GlobalConstant.genericError;
    }

  }
}

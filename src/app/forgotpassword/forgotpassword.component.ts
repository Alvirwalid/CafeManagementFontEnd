import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GlobalConstant} from "../share/global_constant";
import {UserService} from "../../service/user.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../service/snackbar.service";
import {CommonResponseObject} from "../model/common_response";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent implements OnInit{

  forgotForm:any=FormGroup;
  responseMassage:string='';
  constructor(private  formBuilder:FormBuilder,
              private  userService:UserService,
              private  ngxUiService:NgxUiLoaderService,
              private  snackbarService:SnackbarService,
              private  dialogRef:MatDialogRef<ForgotpasswordComponent>) {
  }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      username:[null,[Validators.required,Validators.pattern(GlobalConstant.emailRegex)]]
    })
  }
  handleForgotPassword(){
    this.ngxUiService.start();
    var formData= this.forgotForm.value;
    var data = {
      "username":formData.username
    }

   this.userService.forgotPassword(data).subscribe({
     next:(res)=>{

       console.log(res.message+res.messageBn)
       this.ngxUiService.stop();
       this.dialogRef.close();
       this.snackbarService.openSnakbar(res.message,'')
     },
     error:(error:CommonResponseObject<any>)=>{
       this.ngxUiService.stop()
       // if(error.error.message){
       //   this.responseMassage=error.error.message
       // }else {
       //   this.responseMassage=error.;
       // }

       this.snackbarService.openSnakbar(error.message,GlobalConstant.error)
     }
   })
    console.log(data);
  }



}

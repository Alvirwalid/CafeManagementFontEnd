import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {SnackbarService} from "../../service/snackbar.service";
import {MatDialogRef} from "@angular/material/dialog";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {GlobalConstant} from "../share/global_constant";
import {CustomValidators} from "./validatior";
import {CommonResponseObject} from "../model/common_response";
import {SignUpService} from "../../service/sign-up.service";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{

  password=true;
  confirmPassowrd=true;
  isAdmin:boolean=false;
  signUpForm:any=FormGroup;
  responseMessage:any
  constructor(
    private  formBuilder:FormBuilder,
    private  userService:UserService,
    private snackbarService:SnackbarService,
    private dialogRef:MatDialogRef<SignupComponent>,
    private ngxService:NgxUiLoaderService,
    private service:SignUpService
              ) {
  }
  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstant.nameRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstant.emailRegex)]],
      contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstant.contactNumberRegex)]],
      password:[null,[Validators.required,]],
      confirmPassword:[null,[Validators.required]],
      role:[null,Validators.required]
    },
      { validator: CustomValidators.MatchingPasswords}

    )
  }
//   isChecked(){
//   if(this.isAdmin){
//
//     this.isAdmin=false;
//     console.log(this.isAdmin)
//   }else {
//     this.isAdmin=true;
//     console.log(this.isAdmin)
//   }
//
//
//     var formData=this.signUpForm.value;
//     var data ={
//       name:formData.name,
//       username:formData.email,
//       contactNumber:formData.contactNumber,
//       password:formData.password,
//       role: this.isAdmin?'admin':'user'
//     }
//
//     console.log(data);
// }

validator():boolean{
    if(this.signUpForm.get('password').value != this.signUpForm.get('confirmPassword').value){
      return true;
    }else {

      return  false;
    }
}
  handleSubmit(){
    this.ngxService.start();
    var formData=this.signUpForm.value;
    var data ={
      name:formData.name,
      username:formData.email,
      contactNumber:formData.contactNumber,
      password:formData.password,
      role: this.isAdmin?'admin':'user'
    }

    // console.log(data);

    this.service.signUp(data).subscribe(

      {

        next:(res)=>{
            console.log('Response : '+res.message);
            console.log('Response : '+res.status);
            console.log('Response : '+res.data.username);
            this.ngxService.stop();
            this.dialogRef.close();
            this.responseMessage=res.message;
            this.snackbarService.openSnakbar(this.responseMessage,"")

        },
        error:(error:CommonResponseObject<any>)=>{
            this.ngxService.stop();
            // if(error.error.message){
            //   this.responseMessage=error.error.message;
            // }else {
            //   this.responseMessage =GlobalConstant.genericError;
            // }

            this.snackbarService.openSnakbar(error.message,GlobalConstant.error)
        }

      }

    );

  }


}

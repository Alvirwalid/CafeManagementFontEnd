import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {SnakbarService} from "../../service/snakbar.service";
import {MatDialogRef} from "@angular/material/dialog";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {GlobalConstant} from "../share/global_constant";
import {CustomValidators} from "./validatior";
import {error} from "@angular/compiler-cli/src/transformers/util";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{

  password=true;
  confirmPassowrd=true;
  signUpForm:any=FormGroup;
  responseMessage:any
  confirmPasswordClass = 'form-control';

  constructor(
    private  formBuilder:FormBuilder,
    private  userService:UserService,
    private snackbarService:SnakbarService,
    private dialogRef:MatDialogRef<SignupComponent>,
    private ngxService:NgxUiLoaderService
              ) {
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstant.nameRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstant.emailRegex)]],
      contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstant.contactNumberRegex)]],
      password:[null,[Validators.required,]],
      confirmPassword:[null,[Validators.required]]
    },
      { validator: CustomValidators.MatchingPasswords}

    )
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {

      confirmPassword.setErrors({ mismatch: true });
    } else {

      // @ts-ignore
      confirmPassword.setErrors(null);
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
      role:'admin'
    }

    console.log(data);

    this.userService.signUp(data).subscribe(

      {

        next:(res)=>{
            console.log('Response : '+res.message);
            console.log('Response : '+res.messageBn);
            this.ngxService.stop();
            this.dialogRef.close();
            this.responseMessage=res.message;
            this.snackbarService.openSnakbar(this.responseMessage,"")

        },
        error:(error)=>{
            this.ngxService.stop();
            if(error.error.message){
              this.responseMessage=error.error.message;
            }else {
              this.responseMessage =GlobalConstant.genericError;
            }

            this.snackbarService.openSnakbar(this.responseMessage,GlobalConstant.error)
        }


        // (error)=>{
        //   this.ngxService.stop();
        //   if(error.error.message){
        //     this.responseMessage=error.error.message;
        //   }else {
        //     this.responseMessage =GlobalConstant.genericError;
        //   }
        //
        //   this.snackbarService.openSnakbar(this.responseMessage,GlobalConstant.error)
        // }
      }
    //   (response:any)=>{
    //
    //   console.log('Response : '+response.data);
    //   this.ngxService.stop();
    //   this.dialogRef.close();
    //   this.responseMessage=response.message;
    //   this.snackbarService.openSnakbar(this.responseMessage,"")
    // },
    // (error)=>{
    //   this.ngxService.stop();
    //   if(error.error.message){
    //     this.responseMessage=error.error.message;
    //   }else {
    //     this.responseMessage =GlobalConstant.genericError;
    //   }
    //
    //   this.snackbarService.openSnakbar(this.responseMessage,GlobalConstant.error)
    // }


    );



  }


}

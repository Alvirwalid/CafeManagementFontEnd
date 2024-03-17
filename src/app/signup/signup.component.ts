import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {SnakbarService} from "../../service/snakbar.service";
import {MatDialogRef} from "@angular/material/dialog";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {GlobalConstant} from "../share/global_constant";

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
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
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
    })
  }

  validateSubmit(){
    if(this.signUpForm.controls('password').value != this.signUpForm.controls('confirmPassword').value){
      return  true;
    }else {
      return false
    }
  }
  handleSubmit(){
    this.ngxService.start();
    var formData=this.signUpForm.value;
    var data ={
      name:formData.name,
      email:formData.email,
      contactNumber:formData.contactNumber,
      password:formData.password
    }

    this.userService.signUp(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage=response.message;
      this.snackbarService.openSnakbar(this.responseMessage,"")
    },
    (error)=>{
      this.ngxService.stop();
      if(error.error.message){
        this.responseMessage=error.error.message;
      }else {
        this.responseMessage =GlobalConstant.genericError;
      }

      this.snackbarService.openSnakbar(this.responseMessage,GlobalConstant.error)
    });
  }
  checkPasswords(pw: string, cpw: string) {
    this.isConfirmPasswordDirty = true;

    var  m=pw==cpw?true:false;
    console.log(m)

    console.log(pw,cpw)
    if (pw==cpw) {

      console.log('match')
      this.passwordsMatching = true;
      this.confirmPasswordClass = 'form-control is-valid';
    } else {
      console.log('dont match')
      this.passwordsMatching = false;
      this.confirmPasswordClass = 'form-control is-invalid';
    }
  }

}

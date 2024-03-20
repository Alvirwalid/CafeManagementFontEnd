import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SignupComponent} from "../signup/signup.component";
import {ForgotpasswordComponent} from "../forgotpassword/forgotpassword.component";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  token='';
  constructor(private  dialog:MatDialog) {
  }

  handleSignUpAction(){
    const  dialogConfig=new  MatDialogConfig();
    dialogConfig.width='550px';
    this.dialog.open(SignupComponent,dialogConfig)

  }

  handleForgotPasswordAction(){
    const  dialogConfig=new MatDialogConfig();
    dialogConfig.width='550px';
    this.dialog.open(ForgotpasswordComponent,dialogConfig);
  }
  handleLogin(){
 const dialogConfig=new MatDialogConfig()
    dialogConfig.width='550px';
    this.dialog.open(LoginComponent,dialogConfig)
  }
   getToken(){
    this.token=localStorage.getItem('token')??'No token found'
  }


}

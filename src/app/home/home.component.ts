import {Component, Inject, Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SignupComponent} from "../signup/signup.component";
import {ForgotpasswordComponent} from "../forgotpassword/forgotpassword.component";
import {LoginComponent} from "../login/login.component";
import {LoginService} from "../service/login.service";
import {ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  token='';

  private loginService=Inject(LoginComponent)
  // private  authService=Inject(AuthService);
  constructor(private  dialog:MatDialog,private  s:AuthService) {
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
  logout(): void {
    this.s.signOut().subscribe({
      next:(res)=>{
        console.log(res)
      }
    });
  }



}

import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SignupComponent} from "../signup/signup.component";
import {ForgotpasswordComponent} from "../forgotpassword/forgotpassword.component";
import {LoginComponent} from "../login/login.component";
import {AuthService} from "../service/auth.service";
import console from "console";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit{


  token='';

  private loginService=Inject(LoginComponent)
  // private  authService=Inject(AuthService);
  constructor(private  dialog:MatDialog,private  auth:AuthService,private  route:Router) {
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
    this.auth.signOut().subscribe({
      next:(res)=>{
        console.log(res)
      }
    });
  }

  ngOnInit(): void {
    if(this.auth.isAuthenticated()){
      var token= localStorage.getItem('token');

      var tokenPayLoad = jwtDecode(token??'');


      // @ts-ignore
      if(tokenPayLoad['role']=='user'){

        this.route.navigate(['/user'])
      }else {
        this.route.navigate(['/cafe'])
      }



    }




  }



}

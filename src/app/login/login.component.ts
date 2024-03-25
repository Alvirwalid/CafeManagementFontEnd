import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GlobalConstant} from "../share/global_constant";
import {UserService} from "../../service/user.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {SnackbarService} from "../../service/snackbar.service";
import {LoginService} from "../../service/login.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  hide=true;
  loginForm:any=FormGroup;
  private isAuthenticated = false;

  constructor(private formbuilder:FormBuilder,private userService:UserService,
              private  ngxService:NgxUiLoaderService,
              private  dialogRef:MatDialogRef<LoginComponent>,
              private  router:Router,
              private  snackbarService:SnackbarService,
              private  service:LoginService,
              private  authService:AuthService

  ) {
    this.isAuthenticated = !!localStorage.getItem('token');
    console.log( 'Authenticated : '+this.isAuthenticated);

  }
  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      username:[null,[Validators.required,Validators.pattern(GlobalConstant.emailRegex)]],
      password:[null,Validators.required]
    })
  }

  login(){

    var formData = this.loginForm.value;
    var body ={
      'username':formData.username,
      'password':formData.password
    }

    this.service.login(body).subscribe({
      next:(res)=>{
        console.log(res.data.data['token']);

        this.ngxService.stop();
        this.authService.accessToken=res.data.data['token']
        localStorage.setItem('token',res.data.data['token'])
        this.authService.authenticated=true;
        this.dialogRef.close();
        this.router.navigate(['/cafe'])
        this.snackbarService.openSnakbar(res.message,'');
        this.isAuthenticated = true;

      },

      error:(error:any)=>{
        console.log('error')
        this.ngxService.stop();
        this.isAuthenticated = false;
        this.authService.authenticated=false;

        this.snackbarService.openSnakbar(error.message,'');
      }
    })

    return this.isAuthenticated;
  }


  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }

}

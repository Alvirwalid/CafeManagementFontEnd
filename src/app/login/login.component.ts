import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GlobalConstant} from "../share/global_constant";
import {UserService} from "../../service/user.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {SnackbarService} from "../../service/snackbar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  hide=true;
  loginForm:any=FormGroup;

  constructor(private formbuilder:FormBuilder,private userService:UserService,
              private  ngxService:NgxUiLoaderService,
              private  dialogRef:MatDialogRef<LoginComponent>,
              private  router:Router,
              private  snackbarService:SnackbarService

  ) {
  }
  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      username:[null,[Validators.required,Validators.pattern(GlobalConstant.emailRegex)]],
      password:[null,Validators.required]
    })
  }

  login(){
    this.ngxService.start()
    var formData = this.loginForm.value;
    var data ={
      'username':formData.username,
      'password':formData.password
    }

    this.userService.login(data).subscribe({
      next:(res)=>{
        console.log(res.data.data['token']);
        localStorage.setItem( 'token',res.data.data['token'])
        sessionStorage.setItem('token',res.data.data['token'])
        this.ngxService.stop();
        this.dialogRef.close();
        this.router.navigate(['/cafe/dashboard'])

        this.snackbarService.openSnakbar(res.message,'');



      }
    })


  }

}

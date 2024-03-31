import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {SnackbarService} from "../../../service/snackbar.service";
import {MatDialogRef} from "@angular/material/dialog";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {CustomValidators} from "../../../signup/validatior";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent implements OnInit{

  old=true;
  password=true;
  cp=true;

  oldPassowrd:any;
  newPassword:any;
  confirmPassword:any;
  changePassForm:any= FormGroup;
  constructor( private  userService:UserService,
               private formBuilder:FormBuilder,
               private snackbarService:SnackbarService,
               private dialogRef:MatDialogRef<ChangepasswordComponent>,
               private ngxService:NgxUiLoaderService,) {
  }

  ngOnInit(): void {
    this.changePassForm=this.formBuilder.group({
      oldPassword:[null,[Validators.required]],
      password:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required]],
    },
      {validators:CustomValidators.MatchingPasswords}

    )
  }

  handleChangePassword(){
    this.ngxService.start();

    const  formData= this.changePassForm.value;

    var data={
      oldPassword:formData.oldPassword,
      newPassword:formData.password
    };

    this.userService.changePassowrd(data).subscribe({

      next:(res)=>{
        this.ngxService.stop();
        this.dialogRef.close();
        this.snackbarService.openSnakbar(res.messageBn,'');
        console.log(res)
      },
      error:(err)=>{

        console.log(err.error.message)
        this.ngxService.stop();
        this.dialogRef.close();
        this.snackbarService.openSnakbar(err.error.message,'');
        console.log(err.error.message)
      }
    })



  }

  validator():boolean{
    return this.changePassForm.get('password').value != this.changePassForm.get('confirmPassword').value;
  }

  protected readonly signUpForm = FormGroup;
}

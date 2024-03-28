import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {SnackbarService} from "../../../service/snackbar.service";
import {MatDialogRef} from "@angular/material/dialog";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent {

  oldPassowrd:any;
  newPassword:any;
  confirmPassword:any;
  changePassForm:any= FormGroup;
  constructor( private  userService:UserService,
               private snackbarService:SnackbarService,
               private dialogRef:MatDialogRef<ChangepasswordComponent>,
               private ngxService:NgxUiLoaderService,) {
  }

}

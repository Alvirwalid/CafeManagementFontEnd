import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SignupComponent} from "../signup/signup.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private  dialog:MatDialog) {
  }

  handleSignUpAction(){
    const  dialogConfig=new  MatDialogConfig();

    dialogConfig.width='550px';
    this.dialog.open(SignupComponent,dialogConfig)

  }


}

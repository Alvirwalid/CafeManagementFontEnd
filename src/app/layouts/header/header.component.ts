import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ConfirmationComponent} from "../../material-component/diolog/confirmation/confirmation.component";
import {ChangepasswordComponent} from "../../material-component/diolog/changepassword/changepassword.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  role:any;
  constructor(private  dialog:MatDialog,private  router:Router) {
  }

  logOut(){
    const config=new MatDialogConfig();
    config.width='550px'
    config.data={
      message:'Logout',
      confirmation:true

    }

const  ref=   this.dialog.open(ConfirmationComponent,config);

    const  sub = ref.componentInstance.onEmitStatusChange.subscribe((res)=>{
      ref.close();
      localStorage.clear();
      this.router.navigate(['/'])
    })
  }

  changePassword(){
    const  config=new MatDialogConfig();
    config.width='550px';
   this.dialog.open(ChangepasswordComponent,config);
  }

}

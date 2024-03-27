import {AfterViewInit, Component} from '@angular/core';
import {DashboardService} from "../service/dashboard.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {GlobalConstant} from "../share/global_constant";
import {SnackbarService} from "../service/snackbar.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit{

   color='#2196F3';
   c='';
   data:any;
   responseMassage:any;

  constructor(private service:DashboardService,private  nguiService:NgxUiLoaderService,private  snackbarService:SnackbarService) {

    nguiService.start();

 this.dashboardData()

  }

  ngAfterViewInit(): void {
        // throw new Error('Method not implemented.');

    }

  dashboardData(){

    this.service.getDetails().subscribe({
      next:(res)=>{
        this.nguiService.stop();
        this.data=res;
        this.c=this.data.data.category

        // console.log(this.data['category'])

      },
      error:(err)=>{
        this.nguiService.stop();
        if(err.error.messages){
          this.responseMassage=err.error.messages;

        }else {
          this.responseMassage=GlobalConstant.genericError;
        }

        this.snackbarService.openSnakbar(this.responseMassage,'');

      }
    })

  }




}

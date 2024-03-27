import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {DashboardService} from "../service/dashboard.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {GlobalConstant} from "../share/global_constant";
import {SnackbarService} from "../service/snackbar.service";
import {DashboardModel} from "../model/dahsboardModel";
import {MediaMatcher} from "@angular/cdk/layout";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit{

  mdq: MediaQueryList;
  mediaQueryListener:()=>void;
   data?:DashboardModel;
   responseMassage:any;

  constructor( changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,    private service:DashboardService,private  nguiService:NgxUiLoaderService,private  snackbarService:SnackbarService) {

    nguiService.start();
    this.dashboardData()
    this.mdq = media.matchMedia('(max-width: 992px)');
    this.mediaQueryListener = () => {
      changeDetectorRef.detectChanges();
      console.log("Match?: ", this.mdq.matches)
    }
    this.mdq.addListener(this.mediaQueryListener);

  }
  ngAfterViewInit(): void {
        // throw new Error('Method not implemented.');

    }
  dashboardData(){
    this.service.getDetails().subscribe({
      next:(res)=>{
        this.nguiService.stop();
        this.data=res.data;
        console.log(this.data)
        // this.c=this.data.data.category
        console.log(this.data.product)
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

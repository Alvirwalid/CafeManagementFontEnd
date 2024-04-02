import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {ProductService} from "../../../service/product.service";
import {CommonResponseObject} from "../../../model/common_response";
import {DashboardService} from "../../../service/dashboard.service";

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.scss'
})
export class MainDashboardComponent implements OnInit{



  details: CommonResponseObject<any> | undefined;
  constructor(private  service:DashboardService) {
  }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct(){
    this.service.getDetails().subscribe({
      next:(res)=>{
        console.log(res);
        this.details=res;
      }
    })
  }

}

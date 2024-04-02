import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../service/product.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {MatTableDataSource} from "@angular/material/table";
import {GlobalConstant} from "../../../share/global_constant";
import {SnackbarService} from "../../../service/snackbar.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements  OnInit{
  columnsName:string[]=['name','categoryName','description','price'];
  dataSource:any;
  responseMessage:any;
  constructor(private  service:ProductService,private  loader:NgxUiLoaderService,private snackbar:SnackbarService) {
  }

  ngOnInit(): void {
    this.loader.start();
    this.tableData();
  }
  tableData(){
    this.service.getAllProduct().subscribe({
      next:(res)=>{

        console.log(res)
        this.loader.stop();
        this.dataSource=new MatTableDataSource(res.data);
      },
      error:(err)=>{   this.loader.stop();

        if(err.error.message){
          this.responseMessage=err.error.message;
        }else {
          this.responseMessage=GlobalConstant.genericError
        }

        this.snackbar.openSnakbar(this.responseMessage,'');
      }


    })
  }

}

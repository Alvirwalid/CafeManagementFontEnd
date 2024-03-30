import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {MatDialog} from "@angular/material/dialog";
import {SnackbarService} from "../../service/snackbar.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {GlobalConstant} from "../../share/global_constant";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.scss'
})
export class ManageProductComponent implements  OnInit{
  displayNameColumns:string[]=['name','categoryName','description','price','edit']
  dataSource:any;
  responseMessage:any;
  constructor(private  service:ProductService,
              private  dialog:MatDialog,
              private  snackbar:SnackbarService,
              private  ngxService:NgxUiLoaderService) {
  };

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData()  ;
  }
    tableData(){

    this.service.getAllProduct().subscribe({
      next:(res)=>{
         this.ngxService.stop();
        console.log(res)
        this.dataSource=new  MatTableDataSource(res.data);
      },
      error:(err)=>{

        if(err.error.message){
          this.responseMessage=err.error.message;
        }else {
          this.responseMessage=GlobalConstant.error;
        }
        this.snackbar.openSnakbar(this.responseMessage,'');
      }
    })
    }

    appllyFilter(event:Event){
   console.log((event.target as HTMLInputElement).value)
    const  filtervalue=(event.target as HTMLInputElement).value
      this.dataSource.filter=filtervalue.trim().toLowerCase();
    }
  applyFilter(event:Event){

    // console.log((event.target as HTMLInputElement).value)
    const filterValue =(event.target as HTMLInputElement).value
    this.dataSource.filter =filterValue.trim().toLowerCase();
  }



}

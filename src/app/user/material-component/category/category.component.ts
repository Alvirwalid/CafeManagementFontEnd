import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../service/category.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {MatTableDataSource} from "@angular/material/table";
import {SnackbarService} from "../../../service/snackbar.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements  OnInit{

  columnName:string[]=['id','name']
  dataSource:any
  responseMessage:any;

  constructor(private  service:CategoryService,private  loader:NgxUiLoaderService,
              private snackbar:SnackbarService) {
  }
  ngOnInit(): void {
   this.loader.start();
   this.tableData();
  }

  tableData(){

    this.service.getAll().subscribe({
      next:(res)=>{
        this.loader.stop();
        this.dataSource=new MatTableDataSource(res.data);
        console.log(res.data[0]['productName'])

      },
      error:(err)=>{
        this.loader.stop();
        if(err.error.message){
          this.responseMessage=err.error.message;
        }else{
          this.responseMessage=err.error.message;
        }
        this.snackbar.openSnakbar(this.responseMessage,'');


      }
    })


  }



}

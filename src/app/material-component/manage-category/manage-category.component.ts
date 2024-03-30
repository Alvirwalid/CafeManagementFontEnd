import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../service/category.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {SnackbarService} from "../../service/snackbar.service";
import {Router, Routes} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {CommonResponseObject} from "../../model/common_response";
import {GlobalConstant} from "../../share/global_constant";
import {CategoryComponent} from "../diolog/category/category.component";

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.scss'
})
export class ManageCategoryComponent implements OnInit{

  displayedColumns:string[]=['name','edit'];
  dataSource:any;
  responseMessage:any;
  constructor(
    private service:CategoryService,private dialog:MatDialog,private ngxService:NgxUiLoaderService,
    private  snackbar:SnackbarService,private route:Router
  ) {
  }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData(){

    this.service.getAll().subscribe({
      next:(res:CommonResponseObject<any>)=>{
        this.ngxService.stop();
        // console.log(res.data)
        // @ts-ignore
        this.dataSource=new MatTableDataSource(res.data);
      },
      error:(err)=>{
        this.ngxService.stop();
        if(err.error.message){
          this.responseMessage=err.error.message;
        }else {
          this.responseMessage=GlobalConstant.error;
        }

        console.log(this.responseMessage)

        this.snackbar.openSnakbar(this.responseMessage,GlobalConstant.genericError);
      }
    })
  }


  handleAddAction(){
    const  config=new MatDialogConfig();

    config.data={
      action:'Add',
    }
    config.width='550px';
   const  ref =this.dialog.open(CategoryComponent,config);
   this.route.events.subscribe(()=>{
     ref.close();
   })

    ref.componentInstance.onAddCategory.subscribe((res)=>{
      this.tableData()
    })


  }

  handleEditAction(data:any){
    const  config=new  MatDialogConfig();

    config.width='550px';
    config.data={
      action:'Edit',
      data:data
    };

  const  ref= this.dialog.open(CategoryComponent,config)

    this.route.events.subscribe(()=>{
      ref.close();
    })

    ref.componentInstance.onEditCategory.subscribe((res)=>{
      this.tableData();
    })
  }

  applyFilter(event:Event){

    // console.log((event.target as HTMLInputElement).value)
    const filterValue =(event.target as HTMLInputElement).value
    this.dataSource.filter =filterValue.trim().toLowerCase();
  }






}

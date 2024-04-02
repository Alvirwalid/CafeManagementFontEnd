import {Component, EventEmitter, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SnackbarService} from "../../service/snackbar.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {GlobalConstant} from "../../share/global_constant";
import {MatTableDataSource} from "@angular/material/table";
import {ProductComponent} from "../diolog/product/product.component";
import {Router} from "@angular/router";
import {ConfirmationComponent} from "../diolog/confirmation/confirmation.component";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.scss'
})
export class ManageProductComponent implements  OnInit{
  onDeleteEmit=new EventEmitter();
  onStatusEmit=new EventEmitter();
  displayNameColumns:string[]=['name','categoryName','description','price','edit']
  displayNameColumnsForUser:string[]=['name','categoryName','description','price']
  dataSource:any;
  responseMessage:any;
  isUser:boolean=false;
   token:string =localStorage.getItem('token')??'';

  constructor(private  service:ProductService,
              private  dialog:MatDialog,
              private  snackbar:SnackbarService,
              private  route:Router,
              private  ngxService:NgxUiLoaderService) {

    this.ngxService.start();
    this.tableData()  ;
  };

  ngOnInit(): void {

  }
    tableData(){

    this.service.getAllProduct().subscribe({
      next:(res)=>{
         this.ngxService.stop();
        console.log(res.data[0]['categoryName'])
        this.dataSource=new  MatTableDataSource(res.data);
      },
      error:(err)=>{
        this.ngxService.stop();
        if(err.error.message){
          this.responseMessage=err.error.message;
        }else {
          this.responseMessage=GlobalConstant.genericError;
        }
        this.snackbar.openSnakbar(this.responseMessage,'');
      }
    })
    }

    handleAddAction(){
    const config=new MatDialogConfig();

    config.width='550px';
    config.data={
      action:'Add'
    }

  const  ref = this.dialog.open(ProductComponent,config);

      this.route.events.subscribe(()=>{
        ref.close();
      })

      ref.componentInstance.onAddProduct.subscribe((res)=>{
        this.tableData()
      })

    }
    handleEditAction(element:any){
    const config=new MatDialogConfig();

    config.width='550px';
    config.data={
      action:'Edit',
      data:element
    }

  const  ref = this.dialog.open(ProductComponent,config);

      this.route.events.subscribe(()=>{
        ref.close();
      })

      ref.componentInstance.onEditProduct.subscribe((res)=>{
        this.tableData()
      })

    }
    handleDeleteAction(element:any){
      const config=new MatDialogConfig();

      config.width='400px';

      config.data={
        message:'Delete',
        confirmation:true
      }

      const  ref = this.dialog.open(ConfirmationComponent,config);
      ref.componentInstance.onEmitStatusChange.subscribe((res)=>{
        this.ngxService.start();
        this.service.deleteById(element.id).subscribe({
          next:(res)=>{
            this.onDeleteEmit.emit();
            this.ngxService.stop();

            this.responseMessage = res.messageBn;

            this.snackbar.openSnakbar(this.responseMessage,'')
          },
          error:(err)=>{
            this.ngxService.stop();
            if(err.error.message){
              this.responseMessage=err.error.message;
            }else {
              this.responseMessage=GlobalConstant.error;
            }
            this.snackbar.openSnakbar(this.responseMessage,'');
          }
        })
        ref.close();
      });

      this.onDeleteEmit.subscribe((res)=>{
        this.tableData();
      })

    }

   onChange(event:Event,id:any){

    // console.log((event.target as HTMLInputElement).checked,id);
    var data={
      id:id,
      status: (event.target as HTMLInputElement).checked
    }
    // console.log(data)

     this.service.updateStatus(data).subscribe({
       next:(res)=>{
         this.onStatusEmit.emit();

         console.log('responseBody : '+res)
         this.responseMessage=res.messageBn;

         // this.snackbar.openSnakbar(this.responseMessage,'')
       },
       error:(err)=>{
         if(err.error.message){
           this.responseMessage=err.error.message;
         }else {
           this.responseMessage=GlobalConstant.error;
         }
         // this.snackbar.openSnakbar(this.responseMessage,GlobalConstant.genericError)
       }
     })

     this.onStatusEmit.subscribe((res)=>{
       this.tableData();
     })


   }






  applyFilter(event:Event){
    const filterValue =(event.target as HTMLInputElement).value
    this.dataSource.filter =filterValue.trim().toLowerCase();
  }



}

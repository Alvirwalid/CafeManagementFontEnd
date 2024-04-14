import {Component, EventEmitter} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CustomMethod} from "../../share/CustomMethod";
import {BillService} from "../../service/bill.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SnackbarService} from "../../service/snackbar.service";
import {ViewBillProductsComponent} from "../diolog/view-bill-products/view-bill-products.component";
import {ConfirmationComponent} from "../diolog/confirmation/confirmation.component";
import {GlobalConstant} from "../../share/global_constant";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-bill-view',
  templateUrl: './bill-view.component.html',
  styleUrl: './bill-view.component.scss'
})
export class BillViewComponent {
  onDeleteEmit=new EventEmitter();

  columnsName=['name','email','contactNumber','paymentMethod','total','view']
  dataSource:any;
  responseMessage:any;

  constructor(private  service:BillService,private  loader:NgxUiLoaderService,private router:Router,
              private dialog:MatDialog,private  snackBar:SnackbarService) {

    this.loader.start();
    this.table();


  }
  table(){
    console.log('Table')
    this.service.getAllBills().subscribe({
      next:(res)=>{
        this.loader.stop();
        this.dataSource=new  MatTableDataSource(res.data);
      },
      error:(err)=>{
        this.loader.stop();
        this.responseMessage = CustomMethod.errorResponse(err)
        this.snackBar.openSnakbar(this.responseMessage,'')
      }
    })
  }

  handleViewAction(value:any){
    const  config=new MatDialogConfig();

    config.width='550px'
    config.data={
      data:value
    };

    const ref = this.dialog.open(ViewBillProductsComponent,config)
    this.router.events.subscribe(()=>{
          ref.close();
    })

  }


  downloadReportAction(value:any){
    this.loader.start();
    // var data={
    //   name:value.name,
    //   email:value.email,
    //   uuid:value.uuid,
    //   contactNumber:value.contactNumber,
    //   paymentMethod:value.paymentMethod,
    //   totalAmount: value.total.toString(),
    //   productDetails: JSON.stringify(value.productDetails).toString()
    // }
    var data={
      "name":value.name,
      "email":value.email,
      "uuid":value.uuid,
      "contactNumber": value.contactNumber,
      "paymentMethod":value.paymentMethod,
      "totalAmount":value.total.toString(),
      "productDetails":JSON.stringify(value.productDetails).toString()
    }

    this.downloadFile(value.uuid,data)
  }
  downloadFile(_fileName:string,data:any){

    this.service.getPdf(data).subscribe({

      next:(res)=>{

        console.log(res)
        this.loader.stop();
        // saveAs(res,_fileName+'.pdf');

        // console.log(res)
      },
      error:(err)=>{
        console.log('Erorrrrrrrrrrrr')
        this.loader.stop();
        // this.responseMessage=CustomMethod.errorResponse(err)
        // this.snackBar.openSnakbar(this.responseMessage,'')
      }
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
      this.loader.start();
      this.service.deleteBill(element.id).subscribe({
        next:(res)=>{
          this.onDeleteEmit.emit();
          this.loader.stop();

          this.responseMessage = res.messageBn;

          this.snackBar.openSnakbar(this.responseMessage,'')
        },
        error:(err)=>{
          this.loader.stop();
          if(err.error.message){
            this.responseMessage=err.error.message;
          }else {
            this.responseMessage=GlobalConstant.error;
          }
          this.snackBar.openSnakbar(this.responseMessage,'');
        }
      })
      ref.close();
    });

    this.onDeleteEmit.subscribe((res)=>{
      this.table();
    })

  }




  applyFilter(event:Event){
    const filterValue =(event.target as HTMLInputElement).value
    this.dataSource.filter =filterValue.trim().toLowerCase();


  }
}

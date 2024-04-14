import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-view-bill-products',
  templateUrl: './view-bill-products.component.html',
  styleUrl: './view-bill-products.component.scss'
})
export class ViewBillProductsComponent implements OnInit{

  columnsName=['name','category','price','quantity','total']
  dataSource:any;
  data:any



  constructor(@Inject(MAT_DIALOG_DATA) public  dialogdata:any,private  dialogRef:MatDialogRef<ViewBillProductsComponent>) {
  }

  ngOnInit(): void {
    this.dataSource = JSON.parse(this.dialogdata.data.productDetails);
    this.data= this.dialogdata.data;

    console.log(this.dataSource)
    console.log(this.data)
  }
}

import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ProductService} from "../../../service/product.service";
import {GlobalConstant} from "../../../share/global_constant";
import {SnackbarService} from "../../../service/snackbar.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
   onAddProduct=new EventEmitter();
   onEditProduct=new EventEmitter();
   onUpdateProduct=new EventEmitter();
   onDeleteProduct=new EventEmitter();

  productForm:any= FormGroup;
responseMessage:any;
  dialogAction='Add';
  action='Add';


  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any, private formBuilder:FormBuilder,private  ngxService:NgxUiLoaderService,
              private  service:ProductService,private  snackbar:SnackbarService,
              private ref:MatDialogRef<ProductComponent>) {
  }
  ngOnInit(): void {


    this.productForm = this.formBuilder.group({
      categoryId:[null,[Validators.required]],
      name:[null,[Validators.required]],
      description:['',[Validators.required]],
      price:['',[Validators.required]],
    });
    if(this.dialogData.action==='Edit'){
      this.dialogAction='Edit';
      this.action='Edit';
      this.productForm.patchValue(this.dialogData.data)
    }


  }

  handleSubmit(){
    this.ngxService.start();

    if(this.dialogAction==='Add'){
      this.add();
    }else{
      this.edit();
    }
  }


  add(){


    var formData= this.productForm.value;

    var data={
      categoryId:formData.categoryId,
      name:formData.name,
      description:formData.description,
      price:formData.price

    }

    // console.log(data)
  this.service.add(data).subscribe({
    next:(res)=>{
      this.onAddProduct.emit();
      this.ngxService.stop();
      this.ref.close();

      this.responseMessage=res.messageBn;
      this.snackbar.openSnakbar(this.responseMessage,'');

    },
    error:(err)=>{
      this.ngxService.stop();
      this.ref.close();

      console.log(err.error.message)
      if(err.error.message){

        this.responseMessage=err.error.message;
      }else {
        this.responseMessage=GlobalConstant.error;
      }
      this.snackbar.openSnakbar(this.responseMessage,'');
    }
  })

}
  edit(){


    var formData= this.productForm.value;

    var data={
      categoryId:formData.categoryId,
      id:this.dialogData.data.id,
      name:formData.name,
      description:formData.description,
      price:formData.price
    }

    // console.log(data)

    this.service.update(data).subscribe({
      next:(res)=>{


        this.onEditProduct.emit();
        this.ngxService.stop();
        this.ref.close();

        this.responseMessage=res.messageBn;
        this.snackbar.openSnakbar(this.responseMessage,'');

      },
      error:(err)=>{
        this.ngxService.stop();
        this.ref.close();

        console.log(err.error.message)
        if(err.error.message){

          this.responseMessage=err.error.message;
        }else {
          this.responseMessage=GlobalConstant.error;
        }
        this.snackbar.openSnakbar(this.responseMessage,'');
      }
    })
  }



}

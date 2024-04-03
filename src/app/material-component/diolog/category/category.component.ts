import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../service/category.service";
import {SnackbarService} from "../../../service/snackbar.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {GlobalConstant} from "../../../share/global_constant";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{

  onAddCategory=new EventEmitter();
  onEditCategory=new EventEmitter();
  dataSource:any;
  dialogAction='Add';
  action='Add';

  categoryForm:any=FormGroup;

  responseMessage:any
  constructor(@Inject(MAT_DIALOG_DATA) public  dialogData:any,private  formBuilder:FormBuilder,
              private  service:CategoryService,private snackbar:SnackbarService,private  dialogRef:MatDialogRef<CategoryComponent>,
              private  ngxService:NgxUiLoaderService
              ) {
  }

  ngOnInit(): void {
    console.log(this.dialogData.action);
    this.categoryForm =this.formBuilder.group({
      name:[null,[Validators.required]]
    });

    if(this.dialogData.action==='Edit'){
      this.dialogAction='Edit';
      this.action='Update';
      // console.log(this.action)
      // console.log(this.dialogAction)
      this.categoryForm.patchValue(this.dialogData.data)
    }


  }

  handleSubmit(){
    this.ngxService.start();
    if(this.dialogAction==='Edit'){
      this.edit();
    }else {
      this.add();
    }
  }

  add(){

    var formData=this.categoryForm.value;

    var data={
      name:formData.name
    };
    this.dialogRef.close();

    this.service.add(data).subscribe({
      next:(res)=>{

        this.onAddCategory.emit();
        this.ngxService.stop();
        this.dialogRef.close();

        this.responseMessage=res.messageBn
        this.snackbar.openSnakbar(this.responseMessage,'');
      },
      error:(err)=>{
        this.ngxService.stop();
        this.dialogRef.close();
        if(err.error.message){
          this.responseMessage=err.error.message;
        }else{
          this.responseMessage=GlobalConstant.error;
        }


        this.snackbar.openSnakbar(this.responseMessage,GlobalConstant.genericError)
      }
    })


  };
  edit(){

    var formData= this.categoryForm.value;

    var data={
      id:this.dialogData.data.id,
      name:formData.name
    };

    console.log(data)

    this.service.update(data).subscribe({
      next:(res)=>{

        this.onEditCategory.emit();
        this.ngxService.stop();
        this.dialogRef.close();
        this.responseMessage=res.message;
        this.snackbar.openSnakbar(this.responseMessage,'');
      },
      error:(err)=>{
        this.ngxService.stop();
        this.dialogRef.close();
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

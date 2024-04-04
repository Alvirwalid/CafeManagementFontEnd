import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../service/category.service";
import {ProductService} from "../../service/product.service";
import {SnackbarService} from "../../service/snackbar.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {BillService} from "../../service/bill.service";
import {GlobalConstant} from "../../share/global_constant";
import {CustomMethod} from "../../share/CustomMethod";
import {load} from "@angular-devkit/build-angular/src/utils/server-rendering/esm-in-memory-loader/loader-hooks";
import {saveAs} from "file-saver";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.scss'
})
export class ManageOrderComponent implements OnInit{

  columnName=['name','category','price','quantity','total','edit'];

  dataSource: any[] = [];
  orderForm:any=FormGroup;
  categoryList:any;
  productList:any;
  price:any;
  responseMessage:any;
  totalAmount:number=0;

  constructor(private  categoryService:CategoryService,
              private  productService:ProductService,
              private snackbar:SnackbarService,
              private  loader:NgxUiLoaderService,
              private  billService:BillService,
              private  form:FormBuilder) {
  }

  ngOnInit(): void {
    this.loader.start();
    this.orderForm=this.form.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstant.nameRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstant.emailRegex)]],
      contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstant.contactNumberRegex)]],
      paymentMethod:[null,[Validators.required]],
      product:[null,[Validators.required]],
      category:[null,[Validators.required]],
      quantity:[null,[Validators.required]],
      price:[null,[Validators.required]],
      total:[0,[Validators.required]],
    });

    this.getCategory();

  }

  getCategory(){
    this.categoryService.getCategoryByFilter().subscribe({
      next:(res)=>{
        // console.log( 'Category : '+res)
        this.loader.stop();
        this.categoryList = res.data;
        // console.log(res)
      },
      error:(err)=>{
        this.loader.stop();
        this.responseMessage = CustomMethod.errorResponse(err);
        this.snackbar.openSnakbar(this.responseMessage,'');
      }
    })
  }

  getProductByCategory(value:any){


    console.log(`Value ${value.value.id}`)
    console.log(`Value ${value.value.name}`)

    this.productService.getByCategoryId(value.value.id).subscribe({
      next:(res)=>{

        this.loader.stop();
        this.productList=res.data;
        this.orderForm.controls['price'].setValue('');
        this.orderForm.controls['quantity'].setValue('');
        this.orderForm.controls['total'].setValue(0);
      },
      error:(err)=>{
        this.loader.stop();
        this.responseMessage = CustomMethod.errorResponse(err);
        this.snackbar.openSnakbar(this.responseMessage,'');
      }
    })
  }

  getProductDetails(event:any){

    this.productService.getById(event.value.id).subscribe({
      next:(res)=>{
        console.log(res)
        this.loader.stop();
        this.price = res.data['price'];
        this.orderForm.controls['price'].setValue(this.price);
        this.orderForm.controls['quantity'].setValue('1');
        this.orderForm.controls['total'].setValue(this.price*1);

        console.log(`Total by details ${this.orderForm.controls['total'].value}`)

      } ,
      error:(err:any)=>{

        this.responseMessage=CustomMethod.errorResponse(err)
      }
    })
  }

  setQuantity(q:any){
    var temp = this.orderForm.controls['quantity'].value;

    console.log(`Temp : ${temp}`)
    if(temp>0){
      console.log('Grater than 0');
      var total = this.orderForm.controls['price'].value*this.orderForm.controls['quantity'].value;
      this.orderForm.controls['total'].setValue(total);

      console.log(`Total : ${total}`)

    }else if(temp !=''){
      console.log('Less than 0')
      this.orderForm.controls['quantity'].setValue('1');
      this.orderForm.controls['total'].setValue(this.orderForm.controls['price'].value*this.orderForm.controls['quantity'].value)
    }
  }
  validateProductAdd():boolean{

    if(this.orderForm.controls['total'].value ==0 || this.orderForm.controls['quantity'].value<=0){
      return  true;
    }else {
      return  false;
    }
  }
  validateSubmit(){
    if(this.totalAmount ==0|| this.orderForm.controls['name'].value==null || this.orderForm.controls['email'].value==null ||
      this.orderForm.controls['contactNumber'].value==null ||  this.orderForm.controls['paymentMethod'].value==null){
      return true;
    }
    else return  false;
  }

  add(){

    // this.totalAmount=0;

    var formData = this.orderForm.value;

    var productId = formData.product.id;
    // console.log(`Product ID ${productId}`)
    const product = this.dataSource.find((element: any) => element.id === productId);

    //
    // if(this.dataSource.length==0){
    //   this.totalAmount =this.totalAmount +formData.total;
    //
    //
    //
    //   this.dataSource.push({
    //     id:formData.product.id,
    //     name:formData.product,
    //     category:formData.category,
    //     quantity:formData.quantity,
    //     price:formData.price,
    //     total:formData.total
    //   });
    //
    //
    //
    //
    //   this.dataSource =[...this.dataSource];
    //   console.log(this.dataSource)
    //     this.snackbar.openSnakbar('Product Added','Success')
    //
    // }else {
    //   this.snackbar.openSnakbar('Product Already Exist',GlobalConstant.error)
    // }

    if(product === undefined){
      this.totalAmount =this.totalAmount +formData.total;
      this.dataSource.push(
        {
          id:formData.product.id,
          name:formData.product.name,
          category:formData.category.name,
          quantity:formData.quantity,
          price:formData.price,
          total:formData.total
        }
      );
      this.dataSource =[...this.dataSource];
      console.log(this.dataSource)
      // console.log(this.dataSource.length)
      this.snackbar.openSnakbar('Product Added','Success')
    }else {
      this.snackbar.openSnakbar('Product Already Exist',GlobalConstant.error)
    }


  }

  handleDeleteAction(index:any,element:any){

    this.totalAmount=this.totalAmount-element.total;
    this.dataSource.splice(index,1);
    this.dataSource=[...this.dataSource];
  }
  submitAction(){
    // this.loader.start();
    console.log('Submit Action')
    var formData= this.orderForm.value;
   var data={
     name:formData.name,
     email:formData.email,
     contactNumber: formData.contactNumber,
     paymentMethod:formData.paymentMethod,
     totalAmount:this.totalAmount.toString(),
     // productDetails:JSON.stringify(this.dataSource)
   }
   console.log(data)
   //
   this.billService.generateReport(data).subscribe({
     next:(res:any)=>{
       this.loader.stop();
       // console.log(res)
       // this.downloadFile(res.data.uuid)
     },
     error:(err)=>{
       this.loader.stop();
       this.responseMessage=CustomMethod.errorResponse(err);this.snackbar.openSnakbar(this.responseMessage,'')}


   })

  }

  downloadFile(fileName:string){
    var data={
      uuid:fileName
    }
    this.billService.getPdf(data).subscribe({
      next:(res)=>{
        console.log('Get PDF')
        console.log(res)
        saveAs(res,fileName+'.pdf');
        this.loader.stop();
      },
      error:(err)=>{this.responseMessage=CustomMethod.errorResponse(err);this.snackbar.openSnakbar(this.responseMessage,'')}
    })
  }


}

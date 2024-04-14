import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../share/material.module";
import {RouterModule} from "@angular/router";
import {MaterialRoutes} from "./material.routing";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CdkTableModule} from "@angular/cdk/table";
import { ViewBillProductsComponent } from './diolog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from './diolog/confirmation/confirmation.component';
import { ChangepasswordComponent } from './diolog/changepassword/changepassword.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { CategoryComponent } from './diolog/category/category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ProductComponent } from './diolog/product/product.component';
import {MatTooltip} from "@angular/material/tooltip";
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BillViewComponent } from './bill-view/bill-view.component';



@NgModule({
  declarations: [
    ViewBillProductsComponent,
    ConfirmationComponent,
    ChangepasswordComponent,
    ManageCategoryComponent,
    CategoryComponent,
    ManageProductComponent,
    ManageProductComponent,
    ProductComponent,
    ManageOrderComponent,
    PageNotFoundComponent,
    BillViewComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(MaterialRoutes),
        MaterialModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        CdkTableModule,
        MatTooltip
    ],
  exports: [
    ManageCategoryComponent,
    ManageProductComponent
  ]
})
export class MaterialComponentModule { }

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



@NgModule({
  declarations: [
    ViewBillProductsComponent,
    ConfirmationComponent,
    ChangepasswordComponent,
    ManageCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  exports: [
    ManageCategoryComponent
  ]
})
export class MaterialComponentModule { }

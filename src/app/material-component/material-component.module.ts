import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../share/material/material.module";
import {RouterModule} from "@angular/router";
import {MaterialRoutes} from "./material.routing";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CdkTableModule} from "@angular/cdk/table";
import { ViewBillProductsComponent } from './diolog/view-bill-products/view-bill-products.component';



@NgModule({
  declarations: [
    ViewBillProductsComponent
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
})
export class MaterialComponentModule { }

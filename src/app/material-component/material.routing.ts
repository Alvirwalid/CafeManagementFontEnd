import { Routes } from '@angular/router';
import {ViewBillProductsComponent} from "./diolog/view-bill-products/view-bill-products.component";
import {ManageCategoryComponent} from "./manage-category/manage-category.component";
import {routeGuard} from "../service/route.guard";


export const MaterialRoutes: Routes = [
  {
    path:'',
    component:ManageCategoryComponent,


  }
];

import { Routes } from '@angular/router';
import {ViewBillProductsComponent} from "./diolog/view-bill-products/view-bill-products.component";
import {ManageCategoryComponent} from "./manage-category/manage-category.component";
import {routeGuard} from "../service/route.guard";
import {ManageProductComponent} from "./manage-product/manage-product.component";


export const MaterialRoutes: Routes = [
  {
    path:'category',
    component:ManageCategoryComponent,
  },

  {
    path:'product',
    component:ManageProductComponent,
  }
];

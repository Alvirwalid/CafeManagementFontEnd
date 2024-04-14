import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {FullComponent} from "./layouts/full.component";
import {routeGuard} from "./service/route.guard";
import {UserDashboardComponent} from "./user/user-dashboard/user-dashboard.component";
import {MainDashboardComponent} from "./user/material-component/main-dashboard/main-dashboard.component";
import {CategoryComponent} from "./user/material-component/category/category.component";
import {ProductComponent} from "./user/material-component/product/product.component";
import {ManageOrderComponent} from "./material-component/manage-order/manage-order.component";
import {PageNotFoundComponent} from "./material-component/page-not-found/page-not-found.component";
import {ViewBillProductsComponent} from "./material-component/diolog/view-bill-products/view-bill-products.component";
import {BillViewComponent} from "./material-component/bill-view/bill-view.component";




const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'home'
  },


  {
    path:'cafe',
    component:FullComponent,
    children:[
      {
        path:'',
        pathMatch:'full',
        redirectTo:'dashboard'
      },

      {
        path:'',
        loadChildren:
          () => import(

            './material-component/material-component.module'
            ).then(m=>m.MaterialComponentModule),
        data:{
          expectedRole:['admin']
        }
      },

      {
        path:'',
        loadChildren:
          () => import(

            './material-component/material-component.module'
            ).then(m=>m.MaterialComponentModule),
        data:{
          expectedRole:['admin','user']
        }
      },


      {
        path:'dashboard',
        loadChildren:() => import('./dashboard/dashboard.module').then(
          m=>m.DashboardModule
        ),
        canActivate:[routeGuard],
        data:{
          expectedRole:['admin','user']
        }

      },


    ],
  },

  {
    path:'user',
    component:UserDashboardComponent,
    children:[

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },


      {
        path: 'category',
        component:CategoryComponent,
        canActivate: [routeGuard],
        data:{
          expectedRole:['user']
        }
      },

      {
        path: 'product',
        component:ProductComponent,
        canActivate: [routeGuard],
        data:{
          expectedRole:['user']
        }
      },
      {
      path: 'order',
      component:ManageOrderComponent,
        canActivate: [routeGuard],
        data:{
          expectedRole:['user','admin']
        }
      },

      {
        path: 'dashboard',
        component:MainDashboardComponent,
        canActivate: [routeGuard],
        data:{
          expectedRole:['user']
        }

      },
      {
        path: 'bill',
        component:BillViewComponent,
        canActivate: [routeGuard],
        data:{
          expectedRole:['user']
        }

      }
    ]

  },

  {
    path:'home',
    component:HomeComponent,
    // canActivate:[routeGuard]
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

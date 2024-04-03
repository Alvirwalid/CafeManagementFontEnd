import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {FullComponent} from "./layouts/full.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {routeGuard} from "./service/route.guard";
import {ManageCategoryComponent} from "./material-component/manage-category/manage-category.component";
import {MaterialComponentModule} from "./material-component/material-component.module";
import {UserDashboardComponent} from "./user/user-dashboard/user-dashboard.component";
import {MainDashboardComponent} from "./user/material-component/main-dashboard/main-dashboard.component";
import {CategoryComponent} from "./user/material-component/category/category.component";
import {ProductComponent} from "./user/material-component/product/product.component";
import {ManageOrderComponent} from "./material-component/manage-order/manage-order.component";




const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'home'
    // canActivate:[routeGuard]
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
        component:CategoryComponent
      },

      {
        path: 'product',
        component:ProductComponent
      },{
      path: 'order',
      component:ManageOrderComponent
      },


      {
        path: 'dashboard',
        component:MainDashboardComponent
      }
    ]

  },

  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'**',
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

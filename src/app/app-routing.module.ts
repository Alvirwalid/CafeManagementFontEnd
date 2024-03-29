import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {FullComponent} from "./layouts/full.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {routeGuard} from "./service/route.guard";
import {ManageCategoryComponent} from "./material-component/manage-category/manage-category.component";
import {MaterialComponentModule} from "./material-component/material-component.module";




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
        path:'category',
        loadChildren:
          () => import(

            './material-component/material-component.module'
            ).then(m=>m.MaterialComponentModule),
        data:{
          expectedRole:['admin']
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

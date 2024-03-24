import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {FullComponent} from "./layouts/full.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RouteGuard} from "../service/route.guard";

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'cafe',
    component:FullComponent,
    children:[

      {
        path:'',
        // redirectTo:'/cafe/dashboard',
        pathMatch:'full',
        component:DashboardComponent,
        canActivate:[RouteGuard]

      },

      {
        path:'',
        loadChildren:
          () => import(

            './material-component/material-component.module'
            ).then(m=>m.MaterialComponentModule)
      },
      {
        path:'dashboard',
        loadChildren:() => import('./dashboard/dashboard.module').then(
          m=>m.DashboardModule
        ),

      },
      {
        path:'**',
        component:HomeComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

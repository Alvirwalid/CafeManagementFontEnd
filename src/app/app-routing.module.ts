import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {FullComponent} from "./layouts/full.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {routeGuard} from "../service/route.guard";




const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    // canActivate:[routeGuard]
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
        canActivate:[routeGuard],
        data:{
          'role':['user','admin']
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
        data:{
          expectedRole:['admin','user']
        }


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

import { CanActivateFn,} from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Router } from '@angular/router';
import {LoginComponent} from "../app/login/login.component";


export const routeGuard: CanActivateFn = (route, state) => {



  return true;
};

@Injectable({
  providedIn: 'root'
})
export  class  RouteGuard implements CanActivate,CanActivateChild,CanLoad{

  constructor(private  route:Router,private loginService:LoginComponent) {
  }
  canActivate(): boolean {
    return this.checkAuth();
  }

  canActivateChild(): boolean {
    return this.checkAuth();
  }
  canLoad(): boolean {
    return this.checkAuth();
  }
  private checkAuth(): boolean {
    if (this.loginService.isAuthenticatedUser()) {
      return true;
    } else {
      // Redirect to the login page if the user is not authenticated
      this.route.navigate(['/login']);
      return false;
    }
  }
}



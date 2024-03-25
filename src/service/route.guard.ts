import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot,} from '@angular/router';
import { inject } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Router } from '@angular/router';
import {LoginComponent} from "../app/login/login.component";
import {AuthService} from "./auth.service";
import {jwtDecode} from 'jwt-decode';
import {Token} from "@angular/compiler";
import {SnackbarService} from "./snackbar.service";
import {GlobalConstant} from "../app/share/global_constant";




export const routeGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean => {



  const  router=inject(Router);
  const  authService=inject(AuthService);


  const  snackbarService=inject(SnackbarService);
  console.log(authService.isAuthenticated())

  let  expectedRoleArray = route.routeConfig?.data
  expectedRoleArray= expectedRoleArray?.['role']
  let token = "........";
  token =localStorage.getItem('token')??"";
   var tokenPayLoad;
  console.log('Token : '+token)

  try {
    tokenPayLoad = jwtDecode(token);
    console.log(tokenPayLoad);
  }catch (e){
    localStorage.clear();
    router.navigate(['/'])
  }
var expectedRole='';

   for(var i=0;i<expectedRoleArray?.['length'];i++){
  // @ts-ignore
    if(expectedRoleArray?.[i]==tokenPayLoad['role']){

      expectedRole=expectedRoleArray?.[i];

    }
  }

  // @ts-ignore
  if(tokenPayLoad['role'] === 'user' || tokenPayLoad['role']==='admin'){
    // @ts-ignore
    if(authService.isAuthenticated() && expectedRole == tokenPayLoad['role']){
      return true;
    }

    snackbarService.openSnakbar(GlobalConstant.unautorized,GlobalConstant.error)

    return  false;

  }else {

    router.navigate(['/'])
    localStorage.clear();
    return false;
  }


///////////////////
 //  console.log('ActivatedRouteSnapshot : '+route.routeConfig?.data);
 //  console.log('RouterStateSnapshot : '+state.url);
 //  const _router=inject(Router);
 //
 // const isAuth:boolean | null= localStorage.getItem('token') !== null;
 //
 //  console.log('isAuth : '+isAuth);
 //
 //
 //  if(!isAuth){
 //  console.log('Not Authorized')
 //    _router.navigate([''])
 //    return false;
 //  }
 //  console.log(' Authorized')

                    ///////////////////////////////////////////////




};
//
// @Injectable({
//   providedIn: 'root'
// })
// export  class  RouteGuard implements CanActivate,CanActivateChild,CanLoad{
//   constructor(private  route:Router,private loginService:LoginComponent) {
//   }
//
//
//
//
//
//   canActivate(): boolean {
//     return this.checkAuth();
//   }
//
//   canActivateChild(): boolean {
//     return this.checkAuth();
//   }
//   canLoad(): boolean {
//     return this.checkAuth();
//   }
//   private checkAuth(): boolean {
//     if (this.loginService.isAuthenticatedUser()) {
//       return true;
//     } else {
//       // Redirect to the login page if the user is not authenticated
//       this.route.navigate(['/']);
//       return false;
//     }
//   }
// }
//
//

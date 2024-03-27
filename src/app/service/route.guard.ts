import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot,} from '@angular/router';
import { inject } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Router } from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {AuthService} from "./auth.service";
import {jwtDecode} from 'jwt-decode';
import {Token} from "@angular/compiler";
import {SnackbarService} from "./snackbar.service";
import {GlobalConstant} from "../share/global_constant";




export const routeGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean => {



  const  router=inject(Router);
  const  authService=inject(AuthService);


  const  snackbarService=inject(SnackbarService);
  // console.log(authService.isAuthenticated())

  let  expectedRoleArray = route.routeConfig?.data
  expectedRoleArray= expectedRoleArray?.['expectedRole']
  let token = "........";
  token =localStorage.getItem('token')??"";
   var tokenPayLoad;
  // console.log('Token : '+token)

  try {

    if(token){
      tokenPayLoad = jwtDecode(token);
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
        router.navigate(['/'])

        return  false;

      }else {
        snackbarService.openSnakbar(GlobalConstant.unautorized,GlobalConstant.error)
        localStorage.clear();
        router.navigate(['/'])
        return false;
      }


    }else{
      snackbarService.openSnakbar(GlobalConstant.unautorized,GlobalConstant.error)
      localStorage.clear()
      router.navigate(['/'])
      return  false;
    }

    console.log(tokenPayLoad);
  }catch (e){
    localStorage.clear();
    router.navigate(['/'])
    return  false;
  }





};


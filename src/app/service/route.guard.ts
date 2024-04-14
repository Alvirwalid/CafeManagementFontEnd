import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot,} from '@angular/router';
import { inject } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Router } from '@angular/router';

import {AuthService} from "./auth.service";
import {jwtDecode} from 'jwt-decode';
import {SnackbarService} from "./snackbar.service";
import {GlobalConstant} from "../share/global_constant";




export const routeGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean => {

  // console.log('Router Guard')



  const  router=inject(Router);
  const  authService=inject(AuthService);
  const  snackbarService=inject(SnackbarService);
  let  expectedRoleArray = route.routeConfig?.data
  let token: string;
  var tokenPayLoad:any;


  expectedRoleArray= expectedRoleArray?.['expectedRole']
  token =localStorage.getItem('token')??"";


  try {

    if(token){

      console.log('token is true')
      tokenPayLoad = jwtDecode(token);
      let expectedRole = '';

      for(let i=0; i<expectedRoleArray?.['length']; i++){

        if(expectedRoleArray?.[i]==tokenPayLoad['role']){

          expectedRole=expectedRoleArray?.[i];

        }
      }

      if(tokenPayLoad['role'] === 'user' || tokenPayLoad['role']==='admin'){


        if(authService.isAuthenticated() && expectedRole == tokenPayLoad['role']){



          // if(expectedRole=='user'){
          //
          //   router.navigate(['/user/'])
          //
          // }else {
          //   router.navigate(['/cafe/'])
          // }


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


    }



    else{
      snackbarService.openSnakbar(GlobalConstant.unautorized,GlobalConstant.error)

      localStorage.clear()
      router.navigate(['/'])
      return  false;
    }

  }catch (e){
    localStorage.clear();
    router.navigate(['/'])
    return  false;
  }





};


import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { SnackBarService } from '../services/snackbar/snack-bar.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  let result : boolean;
  if(inject(AuthService).isLoggedIn()){
    result = true;
  }else{
    inject(SnackBarService).openSnackBarCenter("Please sign in to continue!","Close",false)
    result = false;
  }
  //return inject(AuthService).isLoggedIn()? true : (inject(SnackBarService).openSnackBar("","",false) && router.navigate(["/home"]));
  return result? true : router.navigate(["/login"]);
};

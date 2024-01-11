import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  if(inject(AuthService).isLoggedIn()){
    return inject(Router).navigate(['/home']);
  }
  return true;
};

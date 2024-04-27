import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '../enum';
import { AuthenService } from '../services/common/authen.service';
export const publicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.authenticated) {
    router.navigateByUrl('/carer');
    return false;
  }

  // if (authService.authStatus() === AuthStatus.checking) {
  //   return false;
  // }
  return true;
};

import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthStatus } from '../enum';
import { AuthenService } from '../services/common/authen.service';
export const privateGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenService);

  if (authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }

  return false;
};

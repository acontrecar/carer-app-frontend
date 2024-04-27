import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenService } from '../services/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenService);
  const token = localStorage.getItem('token');
  return next(
    (req = req.clone({
      headers: token
        ? req.headers.set('Authorization', `Bearer ${token}`)
        : req.headers,
    }))
  );
};

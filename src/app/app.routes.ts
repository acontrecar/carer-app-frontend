import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth/layout/auth-layout/auth-layout.component';
import { HomeLayoutComponent } from './carer/layout/home-layout/home-layout.component';
import { privateGuard } from './core/guards/private.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./auth/auth.routes').then((r) => r.AUTH_ROUTES),
      },
    ],
  },
  {
    path: 'carer',
    component: HomeLayoutComponent,
    canActivate: [privateGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./carer/carer.routes').then((r) => r.CARER_ROUTES),
      },
    ],
  },
];

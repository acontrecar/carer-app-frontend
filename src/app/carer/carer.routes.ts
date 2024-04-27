import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MedicamentosPageComponent } from './pages/medicamentos-page/medicamentos-page.component';
import { CitasPageComponent } from './pages/citas-page/citas-page.component';
import { PerfilPageComponent } from './pages/perfil-page/perfil-page.component';

export const CARER_ROUTES: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'medicamentos',
    component: MedicamentosPageComponent,
  },
  {
    path: 'citas',
    component: CitasPageComponent,
  },
  {
    path: 'perfil',
    component: PerfilPageComponent,
  },
];

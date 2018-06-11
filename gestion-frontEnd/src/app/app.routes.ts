import { RouterModule, Routes } from '@angular/router';

import { HomeComponent,MantenedorRestaurantComponent,GestionRestaurantComponent,ActivarUsuarioComponent } from './components/index.components';

const APP_ROUTES: Routes = [
   
    
    { path: 'home', component: HomeComponent },
    { path: 'restaurant', component: MantenedorRestaurantComponent },
    { path: 'gestionRestaurant/:parameter', component: GestionRestaurantComponent },
    { path: 'activarUsuario/:parameter', component: ActivarUsuarioComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
  ];
  
  export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
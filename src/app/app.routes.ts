import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Manual } from './pages/manual/manual';
import { Comprar } from './pages/comprar/comprar';
import { Datos } from './pages/datos/datos';
import { Contacto } from './pages/contacto/contacto';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'manual', component: Manual },
    { path: 'comprar', component: Comprar },
    { path: 'datos', component: Datos },
    { path: 'contacto', component: Contacto },
    { path: '**', redirectTo: '' }
    
];

import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

//Guards
import { AdminGuard, VerificaTokenGuard } from '../services/service.index';

//Mantenimientos
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { VehiculoComponent } from './vehiculos/vehiculo.component';
import { RepuestosComponent } from './repuestos/repuestos.component';
import { RepuestoComponent } from './repuestos/repuesto.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const pagesRoutes: Routes = [

    //Inicio

    { 
    path: 'graficos', 
    component: DashboardComponent, 
    canActivate: [VerificaTokenGuard], 
    data: { titulo: 'Gráficos' } 
    },
    { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil del Usuario' } },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },

    //Mantenimientos

    { 
    path: 'usuarios', 
    component: UsuariosComponent, 
    canActivate: [AdminGuard], 
    data: { titulo: 'Mantenimiento de Usuarios' } 
    },
    { path: 'vehiculos', component: VehiculosComponent, data: { titulo: 'Mantenimiento de Vehículos' } },
    { path: 'vehiculo/:id', component: VehiculoComponent, data: { titulo: 'Agregar o Actualizar de Vehículo' } },
    { path: 'repuestos', component: RepuestosComponent, data: { titulo: 'Mantenimiento de Repuestos' } },
    { path: 'repuesto/:id', component: RepuestoComponent, data: { titulo: 'Agregar o Actualizar Repuesto' } },
    { path: '', redirectTo: '/graficos', pathMatch: 'full' },
]
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
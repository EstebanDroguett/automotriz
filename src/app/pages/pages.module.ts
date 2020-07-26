import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';

//Pipes modulos
import { PipesModule } from '../pipes/pipes.module';

import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { VehiculoComponent } from './vehiculos/vehiculo.component';
import { RepuestosComponent } from './repuestos/repuestos.component';
import { RepuestoComponent } from './repuestos/repuesto.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

//Charts
import { ChartsModule } from 'ng2-charts';

//import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ProfileComponent,
        UsuariosComponent,
        BusquedaComponent,
        VehiculosComponent,
        RepuestosComponent,
        RepuestoComponent,
        VehiculoComponent
    ],
    exports: [
        DashboardComponent,
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        MDBBootstrapModule.forRoot(),
        FormsModule,
        //ChartsModule,
        PipesModule,
        CommonModule,
        ChartsModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class PagesModule { }
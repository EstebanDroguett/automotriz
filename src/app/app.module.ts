import { BrowserModule } from '@angular/platform-browser';

//MDB
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

//Rutas
import { APP_ROUTES } from './app.routes';

//Modulos
import { SharedModule } from './shared/shared.module';

//temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Servicios
import { ServiceModule } from './services/service.module';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
    
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    APP_ROUTES,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

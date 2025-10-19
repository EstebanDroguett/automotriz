import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { PipesModule } from '../pipes/pipes.module';

import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

import { DropdownModule, IconsModule, MDBBootstrapModule, NavbarModule, WavesModule } from 'angular-bootstrap-md';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        ModalUploadComponent,
        FooterComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        PipesModule,
        MDBBootstrapModule.forRoot(),
        IconsModule,
        WavesModule,
        DropdownModule,
        NavbarModule
    ],
    exports: [
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        FooterComponent,
        ModalUploadComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})

export class SharedModule { }
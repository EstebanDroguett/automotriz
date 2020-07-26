import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];

  /*menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Dashboard', url: '/graficos'},
      ]
    },
    {
    titulo: 'Mantenimientos',
    icono: 'mdi mdi-folder-lock-open',
    submenu: [
      {titulo: 'Usuarios', url: '/usuarios'},
      {titulo: 'Vehículos', url: '/vehiculos'},
      {titulo: 'Repuestos', url: '/repuestos'}
    ]
  }
  ];*/

  constructor(
    public _usuarioService: UsuarioService
  ) { 
  }
  
  cargarMenu(){
    this.menu = this._usuarioService.menu;
  }
}

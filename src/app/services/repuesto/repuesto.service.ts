import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert2';
import { Repuesto } from 'src/app/models/repuesto.model';


@Injectable({
  providedIn: 'root'
})
export class RepuestoService {

  totalRepuestos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarRepuestos(desde: number = 0){
    let url = URL_SERVICIOS + '/repuesto?desde=' + desde;

    return this.http.get(url)
      .pipe(map((resp: any) => {
        this.totalRepuestos = resp.total;
        return resp.repuestos;
      }));
  }

  buscarRepuestos(termino: string){

    let url = URL_SERVICIOS + '/busqueda/coleccion/repuestos/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.repuestos));
  }

  borrarRepuesto(id: string){

    let url = URL_SERVICIOS + '/repuesto/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
      .pipe(map(resp => {
        swal.fire('¡REPUESTO ELIMINADO!', 'Repuesto eliminado correctamente.', 'success');
        return resp;
      }));
  }

  guardarRepuesto(repuesto: Repuesto){

    let url = URL_SERVICIOS + '/repuesto';

    if(repuesto._id){

      //Actualizando

      url += '/' + repuesto._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put(url, repuesto)
        .pipe(map((resp: any) => {
        swal.fire('¡REPUESTO ACTUALIZADO!', repuesto.nombre, 'success');
        return resp.repuesto;
        }));
        
    }else{

      //Creando

      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, repuesto)
        .pipe(map((resp:any) => {
          swal.fire('¡REPUESTO CREADO!', repuesto.nombre, 'success');
          return resp.repuesto;
        }));
    }

  }

  cargarRepuesto(id: string){

    let url = URL_SERVICIOS + '/repuesto/' + id;

    return this.http.get(url)
      .pipe(map((resp: any) => resp.repuesto))
  }
}

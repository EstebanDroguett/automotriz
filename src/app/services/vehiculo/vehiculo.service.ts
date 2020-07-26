import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert2';
import { Vehiculo } from 'src/app/models/vehiculo.model';


@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  totalVehiculos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarVehiculos(desde: number = 0){
    let url = URL_SERVICIOS + '/vehiculo?desde=' + desde;

    return this.http.get(url)
      .pipe(map((resp: any) => {
        this.totalVehiculos = resp.total;
        return resp.vehiculos;
      }));
  }

  buscarVehiculos(termino: string){

    let url = URL_SERVICIOS + '/busqueda/coleccion/vehiculos/' + termino;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.vehiculos));
  }

  borrarVehiculo(id: string){

    let url = URL_SERVICIOS + '/vehiculo/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
      .pipe(map(resp => {
        swal.fire('¡VEHÍCULO ELIMINADO!', 'Vehículo eliminado correctamente.', 'success');
        return resp;
      }));
  }

  guardarVehiculo(vehiculo: Vehiculo){

    let url = URL_SERVICIOS + '/vehiculo';

    if(vehiculo._id){

      //Actualizando

      url += '/' + vehiculo._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put(url, vehiculo)
        .pipe(map((resp: any) => {
        swal.fire('¡REPUESTO ACTUALIZADO!', vehiculo.propietario, 'success');
        return resp.vehiculo;
        }));
        
    }else{

      //Creando

      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, vehiculo)
        .pipe(map((resp:any) => {
          swal.fire('¡VEHÍCULO CREADO!', vehiculo.propietario, 'success');
          return resp.vehiculo;
        }));
    }

  }

  cargarVehiculo(id: string){

    let url = URL_SERVICIOS + '/vehiculo/' + id;

    return this.http.get(url)
      .pipe(map((resp: any) => resp.vehiculo))
  }
}

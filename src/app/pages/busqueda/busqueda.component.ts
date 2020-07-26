import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Repuesto } from 'src/app/models/repuesto.model';
import { Vehiculo } from 'src/app/models/vehiculo.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  repuestos: Repuesto[] = [];
  vehiculos: Vehiculo[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) { 
    activatedRoute.params
      .subscribe(params =>{
        let termino = params['termino'];
        this.buscar(termino);
      });
  }

  ngOnInit() {
  }

  buscar(termino: string){

    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url).subscribe((resp: any) => { 
      console.log(resp);
      this.usuarios = resp.usuarios;
      this.repuestos = resp.repuestos;
      this.vehiculos = resp.vehiculos;
    });
  }

}

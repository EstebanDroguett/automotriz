import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VehiculoService } from 'src/app/services/service.index';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styles: []
})
export class VehiculoComponent implements OnInit {

  vehiculos: Vehiculo[] = [];
  vehiculo: Vehiculo = new Vehiculo('','','','','','','','','');

  constructor(
    public _vehiculoService: VehiculoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if(id !== 'nuevo'){
        this.cargarVehiculo(id);
      }
    })
  }

  ngOnInit() {

    this._modalUploadService.notificacion
      .subscribe(resp => {
        
        this.vehiculo.img = resp.vehiculo.img;

      });
  }

  cargarVehiculo(id: string){
    this._vehiculoService.cargarVehiculo(id)
      .subscribe(vehiculo => {
        console.log(vehiculo);
        this.vehiculo = vehiculo
      });
  }

  guardarVehiculo(f: NgForm){
    console.log(f.valid);
    console.log(f.value);

    if(f.invalid){
      return;
    }

    this._vehiculoService.guardarVehiculo(this.vehiculo)
      .subscribe(vehiculo => {

        this.vehiculo._id = vehiculo._id;

        this.router.navigate(['/vehiculo', vehiculo._id]);
      });
  }

  cambiarFoto(){
    this._modalUploadService.mostrarModal('vehiculos', this.vehiculo._id);
  }

}

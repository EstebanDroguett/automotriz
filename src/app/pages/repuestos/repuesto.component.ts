import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RepuestoService, VehiculoService } from 'src/app/services/service.index';
import { Repuesto } from 'src/app/models/repuesto.model';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-repuesto',
  templateUrl: './repuesto.component.html',
  styleUrls: ['./repuesto.component.scss']
})
export class RepuestoComponent implements OnInit {

  vehiculos: Vehiculo[] = [];
  repuesto: Repuesto = new Repuesto('','','','','');
  vehiculo: Vehiculo = new Vehiculo('','','','','','','');

  constructor(
    public _repuestoService: RepuestoService,
    public _vehiculoService: VehiculoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if(id !== 'nuevo'){
        this.cargarRepuesto(id);
      }
    })
  }

  ngOnInit() {
    this._vehiculoService.cargarVehiculos()
      .subscribe(vehiculos => this.vehiculos = vehiculos);

    this._modalUploadService.notificacion
      .subscribe(resp => {
        
        this.repuesto.img = resp.repuesto.img;

      });
  }

  cargarRepuesto(id: string){
    this._repuestoService.cargarRepuesto(id)
      .subscribe(repuesto => {
        console.log(repuesto);
        this.repuesto = repuesto
        this.repuesto.vehiculo = repuesto.vehiculo._id;
        this.cambioVehiculo(this.repuesto.vehiculo);
      });
  }

  guardarRepuesto(f: NgForm){
    console.log(f.valid);
    console.log(f.value);

    if(f.invalid){
      return;
    }

    this._repuestoService.guardarRepuesto(this.repuesto)
      .subscribe(repuesto => {

        this.repuesto._id = repuesto._id;

        this.router.navigate(['/repuesto', repuesto._id]);
      });
  }

  cambioVehiculo(id: string){

    this._vehiculoService.cargarVehiculo(id)
      .subscribe(vehiculo => this.vehiculo = vehiculo);
  }

  cambiarFoto(){
    this._modalUploadService.mostrarModal('repuestos', this.repuesto._id);
  }

}

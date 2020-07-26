import { Component, OnInit } from '@angular/core';
import { VehiculoService } from 'src/app/services/service.index';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import swal from 'sweetalert2';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.scss']
})
export class VehiculosComponent implements OnInit {

  vehiculos: Vehiculo[] = [];
  desde: number = 0;
  totalRegistros: number = 1;
  cargando: boolean = true;

  constructor(
    public _vehiculoService: VehiculoService,
    public _modalUploadService: ModalUploadService
  ) { }

  public downloadPdfgeneral(vehiculo:Vehiculo):void{
    //console.log(vehiculo.propietario);
    const doc = new jsPDF();
    autoTable(doc, { html: '#tabla' })
    doc.save('Vehículos.pdf');
  }

  public downloadPdf(vehiculo:Vehiculo):void{
    //console.log(vehiculo.propietario);
    const doc = new jsPDF();
    doc.setFontSize(8);
    doc.text(95, 5,"Tabla Vehículo");
    doc.line(5, 8, 205, 8);
    doc.text(10, 14,"Propietario");
    doc.text(50, 14,"Correo");
    doc.text(100, 14,"Vehículo");
    doc.text(130, 14,"Patente");
    doc.text(150, 14,"Color");
    doc.text(170, 14,"Trabajador");
    doc.line(5, 18, 205, 18);
    doc.text(10, 28,vehiculo.propietario);
    doc.text(50, 28,vehiculo.correo);
    doc.text(100, 28,vehiculo.vehiculo);
    doc.text(130, 28,vehiculo.patente);
    doc.text(150, 28,vehiculo.color);
    doc.text(170, 28,vehiculo.usuario.nombre);
    doc.line(5, 35, 205, 35);
    
    doc.save('Vehículo.pdf');
  }

  ngOnInit() {
    this.cargarVehiculos();

    this._modalUploadService.notificacion
      .subscribe(() => this.cargarVehiculos());
  }

  cargarVehiculos() {

    this.cargando = true;

    this._vehiculoService.cargarVehiculos(this.desde)
      .subscribe(vehiculos => (
        this.vehiculos = vehiculos,
        this.totalRegistros = vehiculos.total,
        this.cargando = false
        ));
  }

  cambiarDesde(valor: number) {

    let desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarVehiculos();
  }

  buscarVehiculo(termino: string) {

    if (termino.length <= 0) {
      this.cargarVehiculos();
      return;
    }

    this.cargando = true;

    this._vehiculoService.buscarVehiculos(termino)
      .subscribe(vehiculos => (
        this.vehiculos = vehiculos,
        this.cargando = false
        ));
  }

  borrarVehiculo(vehiculo: Vehiculo) {

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '!!ATENCIÓN¡¡',
      text: 'Esta a punto de borrar el Vehículo de ' + vehiculo.propietario + '.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    })
      .then((borrar) => {
        if (borrar.value) {
          this._vehiculoService.borrarVehiculo(vehiculo._id)
            .subscribe(borrado => {
              console.log(borrado);
              this.cargarVehiculos();
            });
        } else if (
          /* Read more about handling dismissals below */
          borrar.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Su acción no ha sido concretada.',
            'error'
          )
        }
      })
  }

  actualizarImagen(vehiculo: Vehiculo) {
    this._modalUploadService.mostrarModal('vehiculos', vehiculo._id)
  }
}


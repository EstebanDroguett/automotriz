import { Component, OnInit } from '@angular/core';
import { Repuesto } from 'src/app/models/repuesto.model';
import { RepuestoService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import swal from 'sweetalert2';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.component.html',
  styleUrls: ['./repuestos.component.scss']
})
export class RepuestosComponent implements OnInit {

  repuestos: Repuesto[] = [];
  desde: number = 0;
  totalRegistros: number = 1;
  cargando: boolean = true;


  constructor(
    public _repuestoService: RepuestoService,
    public _modalUploadService: ModalUploadService
  ) { }

  public downloadPdfgeneral(repuesto:Repuesto):void{
    console.log(repuesto.nombre);
    const doc = new jsPDF();
    autoTable(doc, { html: '#tabla' })
    doc.save('Repuestos.pdf');
  }

  public downloadPdf(repuesto:Repuesto):void{
    console.log(repuesto.nombre);
    const doc = new jsPDF();
    doc.setFontSize(8);
    doc.text(95, 5,"Tabla Repuesto");
    doc.line(5, 8, 205, 8);
    doc.text(20, 14,"Repuesto");
    doc.text(55, 14,"Cantidad");
    doc.text(90, 14,"Propietario");
    doc.text(150, 14,"Trabajador");
    doc.line(5, 18, 205, 18);
    doc.text(20, 28, repuesto.nombre);
    doc.text(55, 28, repuesto.cantidad);
    doc.text(90, 28, repuesto.vehiculo.propietario);
    doc.text(150, 28, repuesto.usuario.nombre);
    doc.line(5, 35, 205, 35);
    
    doc.save('Repuesto.pdf');
  }


  ngOnInit() {
    this.cargarRepuestos();

    this._modalUploadService.notificacion
      .subscribe(() => this.cargarRepuestos());
  }

  cargarRepuestos() {

    this.cargando = true;

    this._repuestoService.cargarRepuestos(this.desde)
      .subscribe(repuestos => (
        this.repuestos = repuestos,
        this.totalRegistros = repuestos.total,
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
    this.cargarRepuestos();
  }

  buscarRepuesto(termino: string) {

    if (termino.length <= 0) {
      this.cargarRepuestos();
      return;
    }

    this.cargando = true;

    this._repuestoService.buscarRepuestos(termino)
      .subscribe(repuestos => (
        this.repuestos = repuestos,
        this.cargando = false
        ));
  }

  borrarRepuesto(repuesto: Repuesto) {

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '!!ATENCIÓN¡¡',
      text: 'Esta a punto de borrar a ' + repuesto.nombre + '.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    })
      .then((borrar) => {
        if (borrar.value) {
          this._repuestoService.borrarRepuesto(repuesto._id)
            .subscribe(borrado => {
              console.log(borrado);
              this.cargarRepuestos();
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

  actualizarImagen(repuesto: Repuesto) {
    this._modalUploadService.mostrarModal('repuestos', repuesto._id)
  }
}

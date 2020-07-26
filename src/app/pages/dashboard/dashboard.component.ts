import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
/*import { VehiculoService } from 'src/app/services/service.index';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';*/

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //vehiculos: Vehiculo[] = [];

  // Doughnut
  public doughnutChartLabels: Label[] = ['Vehículo', 'N° de Puertas', 'Propietario'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    /*public _vehiculoService: VehiculoService,
    private httpService: HttpClient*/
  ) { }

  ngOnInit() {
   /*this.httpService.get('mongodb://localhost:27017/automotrizDB', {responseType: 'json'}).subscribe(
      data => {
          this.doughnutChartData = data as any [];	 // FILL THE CHART ARRAY WITH DATA.
      },
      (err: HttpErrorResponse) => {
          console.log (err.message);
      }
      );*/
  }

  /*cargarVehiculos() {

    this._vehiculoService.cargarVehiculos()
      .subscribe(vehiculos => (
        this.vehiculos = vehiculos
        ));
  }*/

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
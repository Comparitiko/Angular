import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: ``
})
export class Grafica1Component {
	public labels1 = ['Venta1', 'Venta2', 'Venta3', 'Venta4'];
	public data1 = [10, 20, 30, 40];

	public labels2 = ['Compra1', 'Compra2', 'Compra3', 'Compra4'];
	public data2 = [10, 20, 30, 40];

	public labels3 = ['Cambio1', 'Cambio2', 'Cambio3', 'Cambio4'];
	public data3 = [10, 20, 30, 40];

	public labels4 = ['Compra21', 'Compra22', 'Compra23'];
	public data4 = [10, 20, 200];
}

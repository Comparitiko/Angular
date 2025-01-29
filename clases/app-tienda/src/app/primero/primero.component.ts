import { Component, input, output } from '@angular/core';
import { SegundoComponent } from '../segundo/segundo.component';

@Component({
  selector: 'app-primero',
  imports: [SegundoComponent],
  templateUrl: './primero.component.html',
  styleUrl: './primero.component.css',
})
export class PrimeroComponent {
  username = input.required<string>();
  productoSeleccionadoOutput = output<string>();
  productoSeleccionado = '';

  productos = [
    { id: 1, nombre: 'Pera', precio: 0.4 },
    { id: 2, nombre: 'Manzana', precio: 0.5 },
    { id: 3, nombre: 'Plátano', precio: 0.6 },
    { id: 4, nombre: 'Naranja', precio: 0.7 },
    { id: 5, nombre: 'Limón', precio: 0.8 },
    { id: 6, nombre: 'Mango', precio: 0.9 },
    { id: 7, nombre: 'Melón', precio: 1.2 },
    { id: 8, nombre: 'Sandía', precio: 10.05 },
  ];

  productoPulsado(producto: string) {
    this.productoSeleccionado = producto;
    this.productoSeleccionadoOutput.emit(producto);
  }
}

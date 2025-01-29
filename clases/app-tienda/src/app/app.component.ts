import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeroComponent } from './primero/primero.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PrimeroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  productoSeleccionado = '';

  imprimir(producto: string) {
    this.productoSeleccionado = producto;
  }
  username = 'Gabriel';
}

import { Component, input } from '@angular/core';

@Component({
  selector: 'app-segundo',
  imports: [],
  templateUrl: './segundo.component.html',
  styleUrl: './segundo.component.css',
})
export class SegundoComponent {
  productoPulsado = input<string>();
}

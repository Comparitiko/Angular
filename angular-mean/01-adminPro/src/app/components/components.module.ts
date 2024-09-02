import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncrementerComponent } from './incrementer/incrementer.component';
import { FormsModule } from '@angular/forms';
import { DonutGrafComponent } from './donut-graf/donut-graf.component';



@NgModule({
  declarations: [
    IncrementerComponent,
    DonutGrafComponent
  ],
	exports: [
		IncrementerComponent,
    DonutGrafComponent
	],
  imports: [
    CommonModule,
		FormsModule
  ]
})
export class ComponentsModule { }

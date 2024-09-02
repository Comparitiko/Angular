import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import Chart, { ChartType } from 'chart.js/auto';
import {v4 as uuid} from 'uuid'

@Component({
  selector: 'app-donut-graf',
  templateUrl: './donut-graf.component.html',
  styles: ``
})
export class DonutGrafComponent implements OnInit, AfterViewInit {
	@Input() title: string = 'Sin titulo';
	@Input() labels: string[] = ['Label1', 'Label2', 'Label3', 'Label4'];
	@Input() data: number[] = [10, 20, 30, 40];

	id!: string;

	@ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  public chart: Chart | undefined;

  ngOnInit(): void {
		this.id = uuid()
	}

	ngAfterViewInit(): void {
		Promise.resolve().then(() => this.generateChart());
	}

  generateChart(): void {
    const data = {
      labels: this.labels.map(label => label.charAt(0).toUpperCase() + label.slice(1)),

      datasets: [{
        labels: [...this.labels.map(label => label.charAt(0).toUpperCase() + label.slice(1))],
        data: [...this.data],
        backgroundColor: [
            '#6857E6',
            '#009EEE',
            '#F02059',
						'#00BF00',
						'#00BFFF',
						'#FF00BF',
						'#FFB300',
        ],

        hoverOffset: 4
      }]
    };

		const ctx = this.canvasRef.nativeElement.getContext('2d');

		if (!ctx) {
			throw new Error('No se ha encontrado el contexto del canvas');
		}

    this.chart = new Chart(ctx, { // Use a random ID for each chart
      type: 'pie' as ChartType,
      data
    })

  }
}

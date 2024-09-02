import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
	progress1: number = 50;
	progress2: number = 0;

	public getProgress1(): string {
		return this.progress1 + '%';
	}

	public getProgress2(): string {
		return this.progress2 + '%';
	}
}

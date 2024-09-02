import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: ``
})
export class IncrementerComponent implements OnInit{
	@Input('progressValue') progress: number = 50
	// @Input() progress: number = 50
	@Input() btnClass: string = 'btn-primary'

	@Output() progressOutput: EventEmitter<number> = new EventEmitter();

	ngOnInit(): void {
		this.btnClass = `btn ${this.btnClass}`;
	}

	public changeProgress(value: number): void {

		if (this.progress >= 100 && value > 0) return;
		if (this.progress <= 0 && value < 0) return;

		this.progress = this.progress + value;
		this.progressOutput.emit(this.progress);
	}

	public onChange(newValue: number): void {
		if (newValue > 100) this.progress = 100;
		else if (newValue < 0) this.progress = 0;
		else this.progress = newValue;
		
		this.progressOutput.emit(this.progress);
	}

}

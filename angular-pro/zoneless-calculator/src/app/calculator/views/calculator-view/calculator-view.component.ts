import { CalculatorButtonComponent } from '@/calculator/components/calculator-button/calculator-button.component';
import { CalculatorComponent } from '@/calculator/components/calculator/calculator.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'calculator-view',
  standalone: true,
  imports: [CalculatorComponent, CalculatorButtonComponent],
  templateUrl: './calculator-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorViewComponent {}

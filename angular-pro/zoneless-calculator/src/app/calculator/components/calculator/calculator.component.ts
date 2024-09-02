import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // styles: `
  //   .is-command {
  //     @apply bg-indigo-700 bg-opacity-20
  //   }
  // `
  host: {
    '(document:keyup)': 'handleKeywordEvent($event)',
  },
})
export class CalculatorComponent {
  handleClick(key: string) {
    console.log({ key });
  }

  // @HostListener('document:keyup', ['$event'])
  handleKeywordEvent(event: KeyboardEvent) {
    this.handleClick(event.key);
  }
}
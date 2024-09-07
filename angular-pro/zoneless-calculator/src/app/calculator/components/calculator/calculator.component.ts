import { CalculatorService } from '@/calculator/services/calculator.service';
import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
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
	private readonly calculatorService = inject(CalculatorService)

	public calculatorButtons = viewChildren(CalculatorButtonComponent)

	public resultText = computed(() => this.calculatorService.resultText())
	public subResultText = computed(() => this.calculatorService.subResultText())
	public lastOperator = computed(() => this.calculatorService.lastOperator()) // Crear una señal con el metodo computed a parte de la señal del servicio

	// get resulText() {
	//   return this.calculatorService.resultText
	// }

	handleClick(key: string) {
		// console.log({ key });
		this.calculatorService.constructNumber(key)
	}

	// @HostListener('document:keyup', ['$event'])
	handleKeywordEvent(event: KeyboardEvent) {
		const { key } = event

		const keyEquivalents: Record<string, string> = {
			'Escape': 'C',
			'Clear': 'C',
			'c': 'C',
			'X': '⨉',
			'x': '⨉',
			'*': '⨉',
			'/': '÷',
			'Enter': '='
		}

		const keyValue = keyEquivalents[key] ?? key

		console.log(keyValue)

		this.handleClick(keyValue);

		this.calculatorButtons().forEach(button => {
			button.keywordPressedStyle(keyValue)
		})
	}
}

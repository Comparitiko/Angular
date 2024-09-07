import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const operators = ['+', '-', '⨉', '÷', '%']
const specialOperators = ['+/-', '.', '=', 'C', 'Backspace']

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  public resultText = signal('0')
  public subResultText = signal('0')
  public lastOperator = signal('+')

  public constructNumber(value: string): void {
    // Validar input
    if (![...numbers, ...operators, ...specialOperators].includes(value)) return

    // Comparar =
    if (value === '=') {
      this.calculateResult()
      return
    }

    // Limpiar calculadora
    if (value === 'C') {
      this.resultText.set('0')
      this.subResultText.set('0')
      this.lastOperator.set('+')
      return
    }

    // Borrar ultimo digito
    if (value === 'Backspace') {
      if (this.resultText() === '0') return
      if (this.resultText() === '-0') this.resultText.set('0')

      if (this.resultText().length === 1) {
        this.resultText.set('0')
        return
      }

      this.resultText.update(currentValue => currentValue.slice(0, currentValue.length - 1))
      return
    }

    // Aplicar operador
    if (operators.includes(value)) {
      this.calculateResult()
      this.lastOperator.set(value)
      this.subResultText.set(this.resultText())
      this.resultText.set('0')
      return
    }

    // Limitar caracteres
    if (this.resultText().length >= 10) {
      console.error("Max length reacher")
      return
    }

    // Validar punto de decimal
    if (value === '.') {
      if (this.resultText().includes('.')) return
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.')
        return
      }
      this.resultText.update(currentValue => currentValue + '.')
      return
    }

    // Cambiar signo
    if (value === '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update(currentValue => currentValue.slice(1))
        return
      }
      this.resultText.update(currentValue => '-' + currentValue)
      return
    }

    // Si empiza por cero eliminar el 0 por el valor insertado
    if (this.resultText() === '0' && (this.resultText() === '0' || this.resultText() === '-0')) {
      this.resultText.set(value)
      return
    }

    if (numbers.includes(value)) {
      if (this.resultText() === '0') {
        this.resultText.set(value)
        return
      }
      if (this.resultText() === ('-0')) {
        this.resultText.set('-' + value)
        return
      }
    }

    this.resultText.update(currentValue => currentValue + value)
    return
  }

  private calculateResult() {
    const number1 = parseFloat(this.subResultText())
    const number2 = parseFloat(this.resultText())

    let result = 0

    switch (this.lastOperator()) {
      case '+':
        result = number1 + number2
        break
      case '-':
        result = number1 - number2
        break
      case '⨉':
        result = number1 * number2
        break
      case '÷':
        result = number1 / number2
        break
      case '%':
        result = number1 % number2
        break
    }

    this.resultText.set(result.toString())
    this.subResultText.set('0')
  }

}

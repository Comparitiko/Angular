import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });
  beforeAll(() => { })
  afterEach(() => { })
  afterAll(() => { })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with dafault values', () => {
    expect(service.resultText()).toBe('0')
    expect(service.subResultText()).toBe('0')
    expect(service.lastOperator()).toBe('+')
  })

  it('should set resultText, subResultText to "0" when C is pressed', () => {
    service.resultText.set('123')
    service.subResultText.set('97')
    service.lastOperator.set('-')
    service.constructNumber('C')

    expect(service.resultText()).toBe('0')
    expect(service.subResultText()).toBe('0')
    expect(service.lastOperator()).toBe('+')
  })

  it('should update resultText with number input', () => {
    service.constructNumber('1')
    expect(service.resultText()).toBe('1')

    service.constructNumber('2')
    expect(service.resultText()).toBe('12')
  })

  it('should handle operators correctly', () => {
    service.constructNumber('1')
    service.constructNumber('-')

    expect(service.resultText()).toBe('0')
    expect(service.subResultText()).toBe('1')
    expect(service.lastOperator()).toBe('-')
  })

  it('should calculate result correctly for addition', () => {
    service.constructNumber('1')
    service.constructNumber('2')
    service.constructNumber('+')
    service.constructNumber('4')
    service.constructNumber('=')

    expect(service.resultText()).toBe('16')
  })

  it('should calculate result correctly for substraction', () => {
    service.constructNumber('1')
    service.constructNumber('2')
    service.constructNumber('-')
    service.constructNumber('1')
    service.constructNumber('0')
    service.constructNumber('=')

    expect(service.resultText()).toBe('2')
  })

  it('should calculate result correctly for multiplication', () => {
    service.constructNumber('5')
    service.constructNumber('⨉')
    service.constructNumber('2')
    service.constructNumber('=')

    expect(service.resultText()).toBe('10')
  })

  it('should calculate result correctly for division', () => {
    service.constructNumber('6')
    service.constructNumber('÷')
    service.constructNumber('2')
    service.constructNumber('=')

    expect(service.resultText()).toBe('3')
  })

  it('should calculate result correctly for module', () => {
    service.constructNumber('3')
    service.constructNumber('%')
    service.constructNumber('2')
    service.constructNumber('=')

    expect(service.resultText()).toBe('1')
  })

  it('should handle decimal point correctly starting with zero', () => {
    service.constructNumber('0')
    service.constructNumber('.')
    service.constructNumber('5')

    service.constructNumber('.')

    expect(service.resultText()).toBe('0.5')

    service.constructNumber('.')

    expect(service.resultText()).toBe('0.5')
  })

  it('should handle decimal point correctly', () => {
    service.constructNumber('2')
    service.constructNumber('.')
    service.constructNumber('.')

    service.constructNumber('5')

    expect(service.resultText()).toBe('2.5')

    service.constructNumber('.')

    expect(service.resultText()).toBe('2.5')
  })

  it('should handle sign change correctly', () => {
    service.constructNumber('2')
    service.constructNumber('+/-')

    expect(service.resultText()).toBe('-2')

    service.constructNumber('+/-')
    expect(service.resultText()).toBe('2')

  })

  it('should handle sign change correctly with 0', () => {
    service.constructNumber('+/-')

    expect(service.resultText()).toBe('-0')

    service.constructNumber('+/-')
    expect(service.resultText()).toBe('0')

    service.constructNumber('.')
    service.constructNumber('1')

    expect(service.resultText()).toBe('0.1')

    service.constructNumber('+/-')

    expect(service.resultText()).toBe('-0.1')
  })

  it('should handle backspace correctly', () => {
    service.resultText.set('123')
    service.constructNumber('Backspace')

    expect(service.resultText()).toBe('12')

    service.constructNumber('Backspace')

    expect(service.resultText()).toBe('1')

    service.constructNumber('Backspace')

    expect(service.resultText()).toBe('0')
  })

  it('should handle max length correctly', () => {
    for (let i = 0; i < 10; i++) {
      service.constructNumber('1')
    }

    expect(service.resultText().length).toBe(10)

    service.constructNumber('1')

    expect(service.resultText().length).toBe(10)
  })

});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorService } from '@/calculator/services/calculator.service';
import { CalculatorComponent } from './calculator.component';


class MockCalculatorService {
  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00')
  public subResultText = jasmine.createSpy('subResultText').and.returnValue('20')
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('-')

  public constructNumber = jasmine.createSpy('constructNumber')
}

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement
  let mockCalculatorService: MockCalculatorService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: CalculatorService,
          useClass: MockCalculatorService
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement
    // fixture.detectChanges();
    mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the current values', () => {
    expect(component.resultText()).toBe('100.00')
    expect(component.subResultText()).toBe('20')
    expect(component.lastOperator()).toBe('-')
  })

  it('should display propers values', () => {
    mockCalculatorService.resultText.and.returnValue('123')
    mockCalculatorService.subResultText.and.returnValue('456')
    mockCalculatorService.lastOperator.and.returnValue('%')

    fixture.detectChanges()

    const resulTextSpan = compiled.querySelector('.result-text') as HTMLSpanElement
    const subResultOperatorSpan = compiled.querySelector('span')

    expect(subResultOperatorSpan?.innerText).toBe('456 %')
    expect(resulTextSpan.innerText).toBe('123')

    expect(component.resultText()).toBe('123')
    expect(component.subResultText()).toBe('456')
    expect(component.lastOperator()).toBe('%')
  })

  it('should have 19 calculator button component', () => {
    expect(component.calculatorButtons()).toBeTruthy()
    expect(component.calculatorButtons().length).toBe(19)
  })

  it('should have 19 calculator button component with content projection', () => {
    // const buttonsByDirective = fixture.debugElement.queryAll(
    //   By.directive(CalculatorButtonComponent)
    // )

    const calculatorButtons = compiled.querySelectorAll('calculator-button') as NodeListOf<HTMLButtonElement>

    expect(calculatorButtons[0].textContent?.trim()).toBe('C')
    expect(calculatorButtons[1].textContent?.trim()).toBe('+/-')
    expect(calculatorButtons[2].textContent?.trim()).toBe('%')
    expect(calculatorButtons[3].textContent?.trim()).toBe('÷')
  })

  it('should keyword events correctly', () => {
    const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' })
    document.dispatchEvent(enterEvent)

    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=')

    const escapeEvent = new KeyboardEvent('keyup', { key: 'Escape' })
    document.dispatchEvent(escapeEvent)

    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C')
  })

  it('should display result text correctly', () => {
    mockCalculatorService.resultText.and.returnValue('123')
    mockCalculatorService.subResultText.and.returnValue('2')
    mockCalculatorService.lastOperator.and.returnValue('-')

    fixture.detectChanges()

    expect(component.resultText()).toBe('123')

    const subResultTextHtml = compiled.querySelector('#sub-result') as HTMLSpanElement

    expect(subResultTextHtml?.textContent).toContain('2 -')
  })
});

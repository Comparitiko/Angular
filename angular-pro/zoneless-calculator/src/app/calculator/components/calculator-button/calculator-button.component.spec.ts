import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { CalculatorButtonComponent } from './calculator-button.component';

@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  template: `
    <calculator-button>
      <span class="projected-content underline">Test Content</span>
    </calculator-button>
  `
})
class TestHostComponent { }

describe('CalculatorButtonComponent', () => {
  let component: CalculatorButtonComponent;
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 if isEqual is false', () => {
    const hostCssClasses = compiled.classList.value.split(' ')

    expect(hostCssClasses).toContain('w-1/4');
    expect(component.isEqual()).toBeFalse();
  })

  it('should apply w-2/4 if isEqual is true', () => {
    fixture.componentRef.setInput('isEqual', true)
    fixture.detectChanges()

    const hostCssClasses = compiled.classList.value.split(' ')

    expect(hostCssClasses).toContain('w-2/4');
    expect(component.isEqual()).toBeTrue();
  })

  it('should emit onClick when handle click is called', () => {
    // Espias
    spyOn(component.onClick, 'emit');

    component.handleClick()

    expect(component.onClick.emit).toHaveBeenCalled();
    // expect(component.onClick.emit).toHaveBeenCalledWith('1');
  })

  it('should set isPressed to true and then false when keyboardPressStyle is called ', (done) => {
    component.contentValue()!.nativeElement.innerText = '1'

    component.keywordPressedStyle('1')

    expect(component.isPressed()).toBeTrue()

    setTimeout(() => {
      expect(component.isPressed()).toBeFalse()
      // Espera a que se llame done, hay 5000 ms para llamarlo, si no, da error
      done()
    }, 201)
  })

  it('should not set isPressed to true if key is not matching', () => {
    component.contentValue()!.nativeElement.innerText = '1'

    component.keywordPressedStyle('2')

    expect(component.isPressed()).toBeFalse()
  })

  it('should display projected content', () => {
    const testHostFixture = TestBed.createComponent(TestHostComponent)

    const compiled = testHostFixture.nativeElement as HTMLDivElement
    const projectedContent = compiled.querySelector('.projected-content')

    expect(projectedContent).not.toBeNull()
    expect(projectedContent?.classList.contains('underline')).toBeTrue()
  })
});

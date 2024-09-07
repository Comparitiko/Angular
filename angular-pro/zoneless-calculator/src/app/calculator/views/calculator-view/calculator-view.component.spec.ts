import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorViewComponent } from './calculator-view.component';

describe('CalculatorViewComponent', () => {
  let component: CalculatorViewComponent;
  let fixture: ComponentFixture<CalculatorViewComponent>;
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorViewComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain calculator components', () => {
    expect(compiled.querySelector('calculator')).not.toBeNull()
  })

  it ('should contain basic css classes', () => {
    const divElement = compiled.querySelector('div');
    const divClasses = divElement?.classList.value.split(' ')

    const shouldHaveClasses = "w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden".split(' ')


    shouldHaveClasses.forEach(className => {
      expect(divClasses).toContain(className)
    })
  })
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent)
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should be 3', () => {
    // A = Arrange === Arreglar
    const num1 = 1
    const num2 = 2

    // A = Act === Actuar
    const result = num1 + num2

    // A = Assert === Afirmar
    expect(result).toBe(3)

  })

  it(`should have the 'zoneless-calculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render buy me a beer logo', () => {
    expect(compiled.querySelector('img')?.getAttribute('src')).toContain('https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg');
  });

  // Esta obsoleta por la prueba de abajo ya que comprueba si existe el router-outlet de nuevo.
  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull()
  })

  it('should render router-outlet wrapped with css classes', () => {
    const divElement = compiled.querySelector('div')

    const mustHaveClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(' ')

    const divClasses = divElement?.classList.value.split(' ')

    expect(divElement?.classList.value).not.toBeNull()

    // Este test comprobaria si las classes que tiene el div estan dentro de las permitidas pero no siendo obligatorias
    // divElement?.classList.forEach(className => {
    //   expect(mustHaveClasses).toContain(className)
    // })

    // Este test comprobaria que las clases permitidas sean obligatorias y puedas añadir otras
    mustHaveClasses.forEach(className => {
      expect(divClasses).toContain(className)
    })
  })

  it('should contain the "buy me a beer" link', () => {
    const anchor = compiled.querySelector('a')

    expect(anchor).not.toBeNull()

    const mustHaveTitle = 'Buy me a beer'
    const mustHaveHref = 'https://www.buymeacoffee.com/scottwindon'

    expect(anchor?.title).toBe(mustHaveTitle)
    expect(anchor?.href).toBe(mustHaveHref)
  })

});

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './calculator-button.component.css',
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-2/4]': 'this.isEqual()',
    '[class.w-1/4]': '!this.isEqual()'
    // 'data-size': 'xl',
  },
  // encapsulation: ViewEncapsulation.None,
})
export class CalculatorButtonComponent {
  public isPressed = signal(false);
  public onClick = output<string>();

  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('boton');

  public isCommand = input(false, {
    transform: (value: string | boolean) =>
      typeof value === 'string' ? value === '' : value,
  });

  public isEqual = input(false, {
    transform: (value: string | boolean) =>
      typeof value === 'string' ? value === '' : value,
  });

  // @HostBinding('class.is-command')
  // get commandStyle() {
  //   return this.isEqual();
  // }

  // @HostBinding('class.w-2/4')
  // get equalStyle() {
  //   return this.isEqual();
  // }

  handleClick() {
    if (!this.contentValue()!.nativeElement) return;
    const value = this.contentValue()!.nativeElement.innerText;
    this.onClick.emit(value.trim());
  }

  public keywordPressedStyle(key: string) {
    if (!this.contentValue()) return
    const value = this.contentValue()!.nativeElement.innerText

    if (value !== key) return
    this.isPressed.set(true)

    setTimeout(() => {
      this.isPressed.set(false)
    }, 200)
  }
}

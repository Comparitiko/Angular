import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricingPageComponent implements OnInit {
  private readonly title = inject(Title)
  private meta = inject(Meta)
  private platform = inject(PLATFORM_ID)

  ngOnInit(): void {
    // if (!isPlatformBrowser(this.platform)) {
    // 	document.title = 'Pricing Page'
    // }
    this.title.setTitle('Pricing page')
    this.meta.updateTag({ name: 'description', content: 'Este es mi Pricing Page' })
    this.meta.updateTag({ name: 'og:title', content: 'Pricing Page' })
    this.meta.updateTag({ name: 'keywords', content: 'Hola,Mundo,Comparitiko,Angular' })
  }
}

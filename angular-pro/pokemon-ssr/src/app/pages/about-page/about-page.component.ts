import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'about-page',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPageComponent implements OnInit {
  private readonly title = inject(Title)
  private meta = inject(Meta)

  ngOnInit(): void {
    this.title.setTitle('About page')
    this.meta.updateTag({ name: 'description', content: 'Este es mi About Page' })
    this.meta.updateTag({ name: 'og:title', content: 'About Page' })
    this.meta.updateTag({ name: 'keywords', content: 'Hola,Mundo,Comparitiko,Angular' })
  }
}

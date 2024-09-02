import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

	private themeLink = document.querySelector('#theme') as HTMLLinkElement;
	private theme!: string;
	private links !: NodeListOf<HTMLElement>;

  constructor() {
		this.theme = window.localStorage.getItem('theme') ?? 'default';
		const url  = `css/colors/${this.theme}.css`

		this.themeLink.setAttribute('href', url);
	}

	setLinks(links: NodeListOf<HTMLElement>) {
		this.links = links;
	}

	changeTheme(theme: string) {
		const url  = `css/colors/${theme}.css`

		this.themeLink.setAttribute('href', url);
		this.theme = theme;
		window.localStorage.setItem('theme', theme);
		this.checkCurrentTheme();
	}



	checkCurrentTheme() {
		this.links.forEach(link => {
			link.classList.remove('working');
			const btnTheme = link.getAttribute('data-theme');
			if (btnTheme === this.theme) {
				link.classList.add('working');
			}
		})
	}
}

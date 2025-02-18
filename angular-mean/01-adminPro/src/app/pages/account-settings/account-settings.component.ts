import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: ``
})
export class AccountSettingsComponent implements OnInit {
	constructor(private settingsService: SettingsService) {

	}

	changeTheme(theme: string) {
		this.settingsService.changeTheme(theme);
	}

	ngOnInit(): void {
		this.settingsService.setLinks(document.querySelectorAll('.selector'));
		this.settingsService.checkCurrentTheme();
	}
}

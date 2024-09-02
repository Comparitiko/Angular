/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styles: ``,
})
export class SidebarComponent {
	public menuItems: any[];
	public imgUrl = 'images/users/profile.png';
	public name = '';
	public lastName = '';

	constructor(
		private sidebarService: SidebarService,
		private userService: UserService
	) {
		this.menuItems = sidebarService.menu;
		if (this.userService.user) {
			this.imgUrl = this.userService.user.getImageUrl();
			this.name = this.userService.user.name;
			this.lastName = this.userService.user.lastName;
		}
	}

	logout() {
		this.userService.logout();
	}
}

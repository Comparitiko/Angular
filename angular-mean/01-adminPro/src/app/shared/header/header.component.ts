import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styles: ``,
})
export class HeaderComponent {
	public imgUrl = 'images/users/1.jpg';
	public name = '';
	public lastName = '';
	public email = '';

	constructor(private userService: UserService) {
		if (this.userService.user) {
			this.imgUrl = this.userService.user.getImageUrl();
			this.name = this.userService.user.name;
			this.lastName = this.userService.user.lastName;
			this.email = this.userService.user.email;
		}
	}

	logout() {
		this.userService.logout();
	}
}

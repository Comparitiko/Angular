import { environment } from '../../environments/environment';

const BASE_URL = environment.base_url;

export class User {
	constructor(
		public name: string,
		public lastName: string,
		public email: string,
		public google: boolean,
		public password?: string,
		public role?: string,
		public uuid?: string,
		public img?: string
	) {}

	getImageUrl() {
		if (this.img) {
			if (this.img.startsWith('https')) {
				return this.img;
			}
			return `${BASE_URL}/v1/upload/usuarios/${this.img}`;
		} else {
			return `${BASE_URL}/v1/upload/usuarios/not-found`;
		}
	}
}

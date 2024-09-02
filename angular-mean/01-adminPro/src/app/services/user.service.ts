import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment.development';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, of, tap } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response';
import { RegisterResponse } from '../interfaces/register-response.interface';
import { LoginGoogle } from '../interfaces/login-google.interface';
import { RenewTokenResponse } from '../interfaces/renew-token-response.interface';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

const baseUrl = environment.base_url;

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private http = inject(HttpClient);
	private router = inject(Router);
	public user: User | null = null;

	logout() {
		localStorage.removeItem('token');

		this.router.navigateByUrl('/login');
	}

	validarToken() {
		return this.http
			.get<RenewTokenResponse>(`${baseUrl}/v1/auth/renew`, {
				headers: {
					'x-token': this.getToken(),
				},
			})
			.pipe(
				map((res) => {
					const {
						email,
						name,
						google,
						lastName,
						img = '',
						role,
						uuid,
					} = res.user;

					this.user = new User(
						name,
						lastName,
						email,
						google,
						'',
						role,
						uuid,
						img
					);
					localStorage.setItem('token', res.token);
					return true;
				}),
				catchError(() => of(false))
			);
	}

	createUser(formData: RegisterForm) {
		return this.http
			.post<RegisterResponse>(`${baseUrl}/v1/users`, formData)
			.pipe(
				tap((res) => {
					localStorage.setItem('token', res.token);
				})
			);
	}

	getToken(): string {
		return localStorage.getItem('token') || '';
	}

	loginUser(formData: LoginForm) {
		return this.http
			.post<LoginResponse>(`${baseUrl}/v1/auth/login`, formData)
			.pipe(
				tap((res) => {
					localStorage.setItem('token', res.token);
				})
			);
	}

	loginGoogle(token: string) {
		return this.http
			.post<LoginGoogle>(`${baseUrl}/v1/auth/login/google`, { token })
			.pipe(
				tap((res) => {
					localStorage.setItem('token', res.token);
				})
			);
	}

	getUUID() {
		return this.user?.uuid ?? '';
	}

	updateProfile(data: { email: string; name: string }) {
		const updatedData = {
			...data,
			role: this.user?.role ?? '',
		};
		return this.http.put(`${baseUrl}/v1/users/${this.getUUID()}`, updatedData, {
			headers: {
				'x-token': this.getToken(),
			},
		});
	}
}

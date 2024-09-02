/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { LoginForm } from '../../interfaces/login-form.interface';

declare const google: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent implements AfterViewInit {
	@ViewChild('googleBtn') googleBtn!: ElementRef<HTMLButtonElement>;

	public loginForm = this.fb.group({
		email: [
			localStorage.getItem('email') || '',
			[Validators.required, Validators.email],
		],
		password: ['', [Validators.required]],
		remember: [false],
	});

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private userService: UserService
	) {}

	ngAfterViewInit(): void {
		this.googleInit();
	}

	googleInit() {
		google.accounts.id.initialize({
			client_id:
				'783369764559-6ij8n90vm25mtkhcqi5p1s0lsnckj5si.apps.googleusercontent.com',
			callback: (response: any) => this.handleCredentialResponse(response),
		});
		google.accounts.id.renderButton(
			this.googleBtn.nativeElement,
			{ theme: 'outline', size: 'large' } // customization attributes
		);
	}

	handleCredentialResponse(response: any) {
		this.userService.loginGoogle(response.credential).subscribe({
			next: () => {
				this.router.navigateByUrl('/');
			},
			error: (err) => {
				Swal.fire('Error', err.error.message, 'error');
			},
			complete: () => {
				console.log('Complete');
			},
		});
	}

	login() {
		const email = this.loginForm.get('email')?.value;
		const remember = this.loginForm.get('remember')?.value;

		this.userService.loginUser(this.loginForm.value as LoginForm).subscribe({
			next: () => {
				if (remember && email) {
					localStorage.setItem('email', email);
				} else {
					localStorage.removeItem('email');
				}
				this.router.navigateByUrl('/');
			},
			error: (err) => {
				Swal.fire('Error', err.error.message, 'error');
			},
			complete: () => {
				console.log('Complete');
			},
		});
	}
}

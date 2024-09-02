import { Component } from '@angular/core';
import {
	AbstractControlOptions,
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { RegisterForm } from '../../interfaces/register-form.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrl: './register.component.css',
})
export class RegisterComponent {
	public formSubmitted = false;

	public registerForm = this.fb.group(
		{
			name: ['Gabriel', [Validators.required, Validators.minLength(3)]],
			lastName: ['Collado', [Validators.required, Validators.minLength(3)]],
			email: ['gabigcy@gmail.com', [Validators.required, Validators.email]],
			password: ['12345678', [Validators.required, Validators.minLength(6)]],
			confirmPassword: [
				'12345678',
				[Validators.required, Validators.minLength(6)],
			],
			terms: [true, [Validators.requiredTrue]],
		},
		{
			validators: this.passwordsMatch('password', 'confirmPassword'),
		} as AbstractControlOptions
	);

	constructor(
		private fb: FormBuilder,
		private userService: UserService,
		private router: Router
	) {}

	createUser() {
		this.formSubmitted = true;

		if (this.registerForm.invalid) {
			return;
		} else {
			this.userService
				.createUser(this.registerForm.value as RegisterForm)
				.subscribe({
					next: (data) => {
						console.log(data);
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

	noValidField(field: string): boolean {
		if (this.registerForm.get(field)?.invalid && this.formSubmitted)
			return true;
		return false;
	}

	validPasswords(): boolean {
		const password = this.registerForm.get('password')?.value;
		const confirmPassword = this.registerForm.get('confirmPassword')?.value;

		if (!this.formSubmitted) return true;

		if (
			password &&
			confirmPassword &&
			password === confirmPassword &&
			this.formSubmitted
		) {
			return true;
		}
		return false;
	}

	passwordsMatch(pass1Name: string, pass2Name: string) {
		return (formGroup: FormGroup) => {
			const pass1Control = formGroup.get(pass1Name);
			const pass2Control = formGroup.get(pass2Name);

			if (pass1Control?.value === pass2Control?.value) {
				pass2Control?.setErrors(null);
			} else {
				pass2Control?.setErrors({ passwordsMatch: false });
			}
		};
	}
}

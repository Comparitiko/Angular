import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-perfil',
	templateUrl: './perfil.component.html',
	styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
	public profileForm!: FormGroup;

	constructor(private fb: FormBuilder, private userService: UserService) {}

	ngOnInit(): void {
		this.profileForm = this.fb.group({
			name: ['123', [Validators.required]],
			email: ['abc', [Validators.required, Validators.email]],
		});
	}

	actualizarProfile() {
		this.userService.updateProfile(this.profileForm.value).subscribe({
			next: () => {
				Swal.fire('Perfil actualizado correctamente', '', 'success');
			},
			error: () => {
				Swal.fire('Error al actualizar perfil', 'Intente mas tarde', 'error');
			},
		});
	}
}

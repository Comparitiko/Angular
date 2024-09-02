import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = () => {
	const router = inject(Router);
	const userService = inject(UserService);

	return userService.validarToken().pipe(
		tap((isAuthenticated) => {
			if (!isAuthenticated) {
				router.navigateByUrl('/login');
			}
		})
	);
};

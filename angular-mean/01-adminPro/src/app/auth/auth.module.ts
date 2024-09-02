import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {
	provideHttpClient,
	withInterceptorsFromDi,
} from '@angular/common/http';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	providers: [provideHttpClient(withInterceptorsFromDi())],
	exports: [LoginComponent, RegisterComponent],
	imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
})
export class AuthModule {}

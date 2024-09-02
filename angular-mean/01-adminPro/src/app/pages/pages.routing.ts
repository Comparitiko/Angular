import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { authGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
	{
		path: 'dashboard',
		component: PagesComponent,
		canActivate: [authGuard],
		children: [
			{ path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
			{
				path: 'progress',
				component: ProgressComponent,
				data: { title: 'ProgressBar' },
			},
			{
				path: 'grafica1',
				component: Grafica1Component,
				data: { title: 'Grafica 1' },
			},
			{
				path: 'profile',
				component: PerfilComponent,
				data: { title: 'Perfil' },
			},
			{
				path: 'account-settings',
				component: AccountSettingsComponent,
				data: { title: 'Ajustes de cuenta' },
			},
			{
				path: 'promesas',
				component: PromesasComponent,
				data: { title: 'Promesas' },
			},
			{ path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PagesRoutingModule {}

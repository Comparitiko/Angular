import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
	declarations: [
		DashboardComponent,
		ProgressComponent,
		Grafica1Component,
		PagesComponent,
		AccountSettingsComponent,
		PromesasComponent,
		RxjsComponent,
		PerfilComponent,
	],
	exports: [
		DashboardComponent,
		ProgressComponent,
		Grafica1Component,
		PagesComponent,
		AccountSettingsComponent,
		RxjsComponent,
		PromesasComponent,
		PerfilComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		SharedModule,
		ComponentsModule,
		ReactiveFormsModule,
	],
	providers: [provideCharts(withDefaultRegisterables())],
})
export class PagesModule {}

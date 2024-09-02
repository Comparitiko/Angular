import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
	selector: 'app-breadcrumb',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './breadcrumb.component.html',
	styles: ``,
})
export class BreadcrumbComponent implements OnDestroy {
	public title!: string;
	public titleSubs$!: Subscription;

	constructor(private router: Router) {
		this.titleSubs$ = this.getRouteArgs().subscribe(({ title }) => {
			this.title = title;
		});
	}
	ngOnDestroy(): void {
		this.titleSubs$.unsubscribe();
	}

	getRouteArgs() {
		return this.router.events.pipe(
			filter(
				(event) =>
					event instanceof ActivationEnd && event.snapshot.firstChild === null
			),
			map((event: any) => event.snapshot.data as any)
		);
	}
}

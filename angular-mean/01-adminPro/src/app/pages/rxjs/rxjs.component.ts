import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: ``
})
export class RxjsComponent implements OnDestroy {

	public intervalSub!: Subscription

	constructor() {
		// this.returnObservable()
		// .pipe(
		// 	retry(2)
		// )
		// .subscribe({
		// 	next(value) {
		// 		console.log('got value ' + value);
		// 	},
		// 	error(err) {
		// 		console.error('something wrong occurred: ' + err);
		// 	},
		// 	complete() {
		// 		console.log('done');
		// 	},
		// });
		this.intervalSub = this.returnInterval()
		.subscribe(console.log);
	}

	ngOnDestroy(): void {
		this.intervalSub.unsubscribe();
	}

	returnInterval(): Observable<number> {
		return interval(100)
		.pipe(
			map(x => x + 1),
			filter(x => x % 2 === 0),
			// take(10)
		);
	}

	returnObservable() {
		let i = 0;

		const obs$ = new Observable<number>( observer => {
			const interval = setInterval(() => {
				i++;
				observer.next(i)
				if (i === 4) {
					clearInterval(interval);
					observer.complete();
				}

				if (i === 2) {
					observer.error('Error');
				}
			}, 1000)
		});

		return obs$;
	}
}

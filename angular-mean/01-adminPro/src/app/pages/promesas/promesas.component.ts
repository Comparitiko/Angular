import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: ``
})
export class PromesasComponent implements OnInit {

	private booleano = false

	ngOnInit(): void {

		this.getUsuarios().then((usuarios => console.log(usuarios)))
		// const promesa = new Promise((resolve, reject) => {
		// 	if (this.booleano) {
		// 		resolve('Hello World');
		// 	} else {
		// 		reject('Error');
		// 	}
		// });

		// promesa
		// .then((message) => {
		// 	console.log(message);
		// })
		// .catch((error) => {
		// 	console.log(error);
		// });

		// console.log('Fin init');
	}
	async getUsuarios() {
		return new Promise((resolve, reject) => {
		fetch('https://reqres.in/api/users')
			.then(response => response.json())
			.then(data => resolve(data.data))
			.catch(error => reject(error));
		})
	}
}

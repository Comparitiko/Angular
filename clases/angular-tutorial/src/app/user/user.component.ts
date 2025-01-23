import { Component } from '@angular/core';
import { GamesComponent } from '../games/games.component';

@Component({
  selector: 'app-user',
  imports: [GamesComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  username = 'comparitiko';
  isLoggedIn = true;
  favGame = '';

  greet() {
    alert('Hola, soy ' + this.username);
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

  getFavoriteGame(favGame: string) {
    this.favGame = favGame;
  }
}

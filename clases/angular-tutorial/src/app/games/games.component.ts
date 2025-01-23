import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-games',
  imports: [],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css',
})
export class GamesComponent {
  username = input.required<string>();
  addFavoriteEvent = output<string>();

  games = [
    {
      id: 1,
      name: 'Minecraft',
    },
    {
      id: 2,
      name: 'League of Legends',
    },
    {
      id: 3,
      name: 'Fortnite',
    },
    {
      id: 4,
      name: 'Call of Duty',
    },
    {
      id: 5,
      name: 'Overwatch',
    },
    {
      id: 6,
      name: 'Apex Legends',
    },
  ];

  fav(gameName: string) {
    this.addFavoriteEvent.emit(gameName);
  }
}

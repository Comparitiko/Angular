import { Component } from '@angular/core';
import { UserComponent } from './user/user.component';
import { CommentsComponent } from "./comments/comments.component";

@Component({
  selector: 'app-root',
  imports: [UserComponent, CommentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  city = 'Antas';
}

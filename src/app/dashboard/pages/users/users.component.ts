import { Component, inject, signal } from '@angular/core';
import { UsersService } from '@services/users.service';
import { TitleComponent } from '../../../shared/title/title.component';
import { RouterModule } from '@angular/router';
import { User } from '@interfaces/req-response';

@Component({
  standalone: true,
  imports: [TitleComponent, RouterModule],
  templateUrl: './users.component.html',
  styles: ``
})
export default class UsersComponent {
  public userService = inject( UsersService );

}

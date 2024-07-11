import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { User } from '@interfaces/req-response';
import { UsersService } from '@services/users.service';
import { TitleComponent } from '@shared/title/title.component';
import { map, switchMap } from 'rxjs';

@Component({
  standalone: true,
  imports: [TitleComponent, CommonModule],
  templateUrl: './user.component.html',
  styles: ``
})
export default class UserComponent {

  private route = inject( ActivatedRoute );
  private usersService = inject( UsersService );

  // public titleLabel = toSignal(
  //   this.route.params.pipe(
  //     switchMap( ({ id }) => this.usersService.getUserById( id )),
  //     map( user => `${user.first_name} ${user.last_name}` ),
  //   ) || 'Cargando Información'
  // )


  // public user = signal<User | undefined>(undefined);
  public user = toSignal(
    this.route.params.pipe(
      switchMap( ({ id }) => this.usersService.getUserById( id )),
    )
  )

  public titleLabel = computed( () => {
    if( this.user() ){
      return `Información del usuario: ${this.user()!.first_name} ${this.user()!.last_name} `
    }
    return 'Información del usuario';
  })

  // constructor () {
  //   this.route.params.subscribe( params => {
  //     console.log({params})
  //   })
  //   console.log(this.route.params);
  // }

}

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

    constructor(
      private authService: AuthService,
      private router: Router
    ) { }

  login():void{
    this.authService.login('test', 'test')
    .subscribe(user => {
      if(user){
        this.router.navigate(['/']);
      }
    });
  }

}

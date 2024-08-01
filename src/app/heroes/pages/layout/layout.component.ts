import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [
  ]
})
export class LayoutComponent {

  

  public sidebarItems = [
    { label: 'Listado', icon:'label', link: './list' },
    { label: 'Agregar', icon:'add', link: './new' },
    { label: 'Buscar', icon:'search', link: './search' },
  ]

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  

  get user():User | undefined {
    return this.authService.currentUser;

  }

 

  logout():void{
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}

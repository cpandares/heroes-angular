import { Injectable } from '@angular/core';

import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})

export class AuthGuard {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  private  checkAuthServiceStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuth().pipe(
        tap( isAuthenticated => console.log('isAuthenticated', isAuthenticated)),
        tap( isAuthenticated => {
            if(!isAuthenticated) {
                this.router.navigate(['auth/login']);
            }
        })
    )
  }

  public canMatch: CanMatchFn = (route, segments) => {

    console.log('canMatch', { route, segments });

    return this.checkAuthServiceStatus();

  };

  public canActivate: CanActivateFn = (route, state) => {

    console.log('canActivate', { route, state });

    return this.checkAuthServiceStatus();

  };

}
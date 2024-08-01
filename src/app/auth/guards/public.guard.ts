

import { Injectable } from '@angular/core';
import { envioroments } from 'src/envioroments/environments';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { Router, CanMatchFn, CanActivateFn } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class PublicGuard {
    private baseUrl = envioroments.baseUrl;
    private user?:User;

    constructor(
        private authService: AuthService,
        private router: Router

    ) { }

    private  checkAuthServiceStatus(): boolean | Observable<boolean> {
        return this.authService.checkAuth().pipe(
            tap( isAuthenticated => console.log('isAuthenticated', isAuthenticated)),
            tap( isAuthenticated => {
                if(isAuthenticated) {
                    this.router.navigate(['/']);
                }
            }),
            map(isAuthenticated => !isAuthenticated)
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
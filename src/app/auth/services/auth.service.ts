
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { envioroments } from 'src/envioroments/environments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

    private baseUrl = envioroments.baseUrl;
    private user?:User;

    constructor(private http: HttpClient) { }

    get currentUser():User | undefined {
        if(!this.user) return undefined;

        //return {...this.user};
        return structuredClone(this.user);
    }

    login(email:string, password:string):Observable<User> {
        //return this.http.post<User>(`${this.baseUrl}/auth/login`, user);

      return  this.http.get<User>(`${this.baseUrl}/users/1`)
        .pipe(
            tap(user => this.user = user),
            tap(user => localStorage.setItem('token', user.id.toString()))
        );
         
    }

    checkAuth():Observable<boolean> {
        if(!localStorage.getItem('token')) return of (false);
        const token = localStorage.getItem('token');
        return this.http.get<User>(`${this.baseUrl}/users/1`)
        .pipe(
            tap(user => this.user = user),
            map(user => !!user),
            catchError(error => of(false))
            
        );
    }


    logout():void{
        this.user = undefined;
        localStorage.removeItem('token');
    }

    
}
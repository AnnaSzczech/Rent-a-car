import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, TimeoutError } from 'rxjs';

@Injectable()
export class UserService {
  
  tokenTimer : any;

  isAdmin = new Subject();
  authenticated = new BehaviorSubject(false);
  selectedCars = new Subject();

  constructor(private http: HttpClient, private router: Router) { }

  createUser(email: string, password: string) {
    const authData = {email: email, password: password};
    return this.http.post('http://localhost:3000/api/user/signup', authData);
  }

  changeAdmin(data: any) {
    this.isAdmin.next(data);
  }

  loginUser(email: string, password: string) {
    const authData = {email: email, password: password};
    return this.http.post<{token: string, expiresIn: any, admin: any}>('http://localhost:3000/api/user/login', authData);
  }

  saveUserData(token: string, expirationDate: Date, admin: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toString());
    localStorage.setItem('admin', admin);
  }

  setTimer(duration: any) {
    this.tokenTimer = setTimeout(() => this.onLogout(), duration * 1000);
  }

  onLogout() {
    this.authenticated.next(false);
    clearTimeout(this.tokenTimer);
    this.changeAdmin(0);
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('admin');    
    this.router.navigate(['/']);
  }

  getUserData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const admin = localStorage.getItem('admin');

    if (!token || !expiration) {
      return;
    }

    return {
      token: token,
      expirationDate: new Date(expiration),
      admin: admin
    };
  }
}

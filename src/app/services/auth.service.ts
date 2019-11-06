import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:4000/api/auth/login';
  constructor(private http: HttpClient) { }

  isLoggedIn() {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    const isExpired = jwtHelper.isTokenExpired(token);
    return !isExpired;
  }

  login(credentials) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url, credentials, { headers })
      .pipe(map(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          return true;
        }
        return false;
      }));
  }

  logout() {
    localStorage.removeItem('token');
  }

  get currentUser() {
    const token = localStorage.getItem('token');
    if(!token) {
      return null;
    }
    return new JwtHelperService().decodeToken(token);
  }

}

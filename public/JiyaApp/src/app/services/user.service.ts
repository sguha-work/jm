import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {_LoginData} from './../interfaces/login-data';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * This function checks for any active session
   */
  public isLoggedIn(): boolean {
    if (window.localStorage.getItem('token') == "null" || window.localStorage.getItem('token') == null) {
      return false;
    } else {
      return true;
    }
  }

  public logout() {
    window.localStorage.removeItem('token');
  }

  public login(loginData: _LoginData): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('/api/authenticate', loginData).subscribe((data: any) => {
        if (data.data.token) {
          this.setToken(data.data.token);
          resolve(data.data.token);
        } else {
          reject();
        }
      }, (error) => {
        reject();
      })
    });

  }
  public setToken(token: string): boolean {
    if (token) {
      window.localStorage.setItem('token', token);
      return true;
    } else {
      return false;
    }
  }
}

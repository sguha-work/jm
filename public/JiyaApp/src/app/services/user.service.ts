import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public isLoggedIn(): boolean {
    if (window.localStorage.getItem('token') == "null" || window.localStorage.getItem('token') == null) {
      return false;
    } else {
      return true;
    }
  }
}

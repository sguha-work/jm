import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { ConfigService } from './config.service';
import { _LoginData } from './../interfaces/login-data';
import { _Signupdata } from './../interfaces/signup-data';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  /**
   * This function checks for any active session
   */
  public isLoggedIn(): boolean {
    if (window.localStorage.getItem('token') == "" || window.localStorage.getItem('token') == null) {
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
      this.http.post(this.config.getBaseURL() + 'authenticate', loginData).subscribe((data: any) => {
        if (typeof data.success !="undefined" && data.success && data.token != "undefined") {
          this.setToken(data.token);
          resolve(data.token);
        } else {
          reject(data);
        }
      }, (error) => {
        reject(error);
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

  /**
   * 
   * @param email 
   * @desc call api to send the password reset otp
   */
  public sendPasswordResetOTP(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.config.getBaseURL() + 'sendResetPasswordOTP', { "email": email }).subscribe((response) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  };

  /**
   * 
   * @param email 
   * @param otp 
   * @param password
   * @desc call the api to reset the password 
   */
  public resetPassword(email: string, otp: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.config.getBaseURL() + 'resetpassword', { "email": email, "otp": otp, "password": password }).subscribe((response) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  /**
   * 
   * @param firstName 
   * @param lastName 
   * @param password 
   * @param email 
   * @param phoneNumber 
   * @desc Call the sign up api
   */
  public signup(firstName: string, lastName: string, password: string, email: string, phoneNumber: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let userData: _Signupdata;
      userData = {} as _Signupdata;
      userData.firstName = firstName;
      userData.lastName = lastName;
      userData.password = password;
      userData.email = email;
      userData.phoneNumber = phoneNumber;
      this.http.post(this.config.getBaseURL() + "signup", userData).subscribe((success: any) => {
        resolve(success);
      }, (error: any) => {
        reject(error);
      });
    });
  }
}

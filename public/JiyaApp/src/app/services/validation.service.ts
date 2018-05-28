import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() {

  }

  /**
   * 
   * @param email 
   * @desc Verify email address for correct format
   */
  public verifyEmail(email: string): boolean {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(email)) {
      return true;
    }
    return false;
  }

  /**
   * 
   * @param password 
   * @desc Verify password for given criterial
   */
  public verifyPassword(password: string): boolean {
    if (password.length > 6) {
      return true;
    }
    return false;
  }

  /**
   * 
   * @param name 
   * @desc Verify name for given criterial
   */
  public verifyName(name: string): boolean {
    if (name.length > 3) {
      return true;
    }
    return false;
  }

  /**
   * 
   * @param phoneNumber 
   * @desc Verify the user given phone number
   */
  public verifyPhoneNumber(phoneNumber: string): boolean {
    if (phoneNumber.length === 10 && parseInt(phoneNumber) !== NaN) {
      return true;
    }
    return false;
  }
}

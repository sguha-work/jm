import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { 

  }

  /**
   * This method returns the api base url by checking the environment
   */
  public getBaseURL(): string {
    let location: string = window.location.href;
    let apiBaseURL: string = "";
    if (typeof window.localStorage.apiBaseUrl === "undefined" || window.localStorage.apiBaseUrl === "") {
      if (location.indexOf("jiyatech.au-syd.mybluemix.net") !== -1) {
        apiBaseURL = "https://jiyatech.au-syd.mybluemix.net/api/";
      } else {
        apiBaseURL = "http://192.168.56.102:4200/api/";
      }
      window.localStorage.apiBaseUrl = apiBaseURL;
    }
    return window.localStorage.apiBaseUrl;
  }
}

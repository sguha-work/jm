import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// importing user defined services
import { UserService } from './services/user.service';

const publicRoutes = [
  'login',
  'signup'
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(private userService: UserService, private router: Router) {
    this.checkLoginStatusAndRedirect();
  }

  private checkLoginStatusAndRedirect(): void {
    let currentLocation: string;
    currentLocation = (window.location).toString().split("/").pop();
    if (publicRoutes.indexOf(currentLocation) === -1) {
      if (this.userService.isLoggedIn()) {
        if(currentLocation === "login") {
          currentLocation = "home";
        }
        this.router.navigate(["/"+currentLocation]);
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
}

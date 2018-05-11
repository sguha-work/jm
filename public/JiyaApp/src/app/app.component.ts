import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// importing user defined services
import { UserService } from './services/user.service';

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
    if (this.userService.isLoggedIn()) {
      alert("logged in");
    } else {
      this.router.navigate(['/login']);
    }
  }
}

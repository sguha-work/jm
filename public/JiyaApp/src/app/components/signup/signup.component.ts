import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// importing user defined services
import {UserService} from './../../services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {
    
  }

  ngOnInit() {
    this.userService.signup("angshu", "guha", "mypassword", "sguha1988.life@gmail.com", "9830612244");
  }
  public goToLoginPage() {
    this.router.navigate(['/login']);
    return false;
  }
}

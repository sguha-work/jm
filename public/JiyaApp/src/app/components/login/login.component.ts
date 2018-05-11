import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// importing user defined components


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) {

  }
  public goToSignUpPage() {
    this.router.navigate(['/signup']);
    return false;
  }
  ngOnInit() {
  }

}

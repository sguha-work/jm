import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// importing user defined interfaces
import {_LoginData} from './../../interfaces/login-data';
// importing user defined components
import {LoaderComponent} from './../loader/loader.component';
// importing user defined services
import {UserService} from './../../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public model: any;
  constructor(private router: Router, private toastr: ToastrService, private userService: UserService) {
    this.model = {};
    this.model.showLoader = false;
  }
  public login() {
    if(this.model.showLoader) {
      this.model.showLoader = false;
      this.toastr.success('Hello world!', 'Toastr fun!');
      this.toastr.error('Hello world!', 'Toastr fun!');
    } else {
      this.model.showLoader = true;
    }
  }
  public goToSignUpPage() {
    this.router.navigate(['/signup']);
    return false;
  }
  ngOnInit() {
  }

}

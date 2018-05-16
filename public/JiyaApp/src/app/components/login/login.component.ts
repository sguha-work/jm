import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as $ from "jquery";

// importing user defined interfaces
import {_LoginData} from './../../interfaces/login-data';
// importing user defined components
import {LoaderComponent} from './../loader/loader.component';
// importing user defined services
import {UserService} from './../../services/user.service';
import {ValidationService} from './../../services/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public model: any;
  constructor(private router: Router, private toastr: ToastrService, private userService: UserService, private validate: ValidationService) {
    this.model = {};
    this.model.showLoader = false;
    this.model.userEmail = "";
    this.model.userPassword = "";
  }
  public login() {
    if(!this.validate.verifyEmail(this.model.userEmail)) {
      this.toastr.error('Not a valid email address');
      $("#txt_userEmail").focus();
      return false;
    }
    if(!this.validate.verifyPassword(this.model.userPassword)) {
      this.toastr.error('Not a valid password');
      $("#txt_userPassword").focus();
      return false;
    }
    this.model.showLoader = true;
    let loginData:_LoginData;
    loginData = {} as _LoginData;
    loginData.email = this.model.userEmail;
    loginData.password = this.model.userPassword;
    this.userService.login(loginData).then(() => {
      this.model.showLoader = false;
      this.router.navigate(['/home']);
    }).catch((error) => {
      this.model.showLoader = false;
      this.toastr.error("Email Id password mismatch");
    });
  }
  public goToSignUpPage() {
    this.router.navigate(['/signup']);
    return false;
  }
  ngOnInit() {
  }

}

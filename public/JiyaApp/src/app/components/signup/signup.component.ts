import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as $ from "jquery";

// importing user defined interfaces
import { _Signupdata } from './../../interfaces/signup-data';
// importing user defined components
import { LoaderComponent } from './../loader/loader.component';
// importing user defined services
import { UserService } from './../../services/user.service';
import { ValidationService } from './../../services/validation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public model: any;
  constructor(private router: Router, private toastr: ToastrService, private userService: UserService, private validate: ValidationService) {
    this.model = {};
    this.model.showLoader = false;

    this.model.firstName = "";
    this.model.lastName = "";
    this.model.password = "";
    this.model.password2 = "";
    this.model.email = "";
    this.model.phoneNumber = "";
  }

  ngOnInit() {
    //this.userService.signup("angshu", "guha", "mypassword", "sguha1988.life@gmail.com", "9830612244");
  }
  public goToLoginPage() {
    this.router.navigate(['/login']);
    return false;
  }
  public signup() {
    if (!this.validate.verifyName(this.model.firstName)) {
      this.toastr.error('Not a valid first name');
      $("#txt_firstName").focus();
      return false;
    }
    if (!this.validate.verifyName(this.model.lastName)) {
      this.toastr.error('Not a valid last name');
      $("#txt_lastName").focus();
      return false;
    }
    if (!this.validate.verifyEmail(this.model.email)) {
      this.toastr.error('Not a valid email address');
      $("#txt_email").focus();
      return false;
    }
    if (!this.validate.verifyPhoneNumber(this.model.phoneNumber)) {
      this.toastr.error('Not a valid phone number');
      $("#txt_phoneNumber").focus();
      return false;
    }
    if (!this.validate.verifyPassword(this.model.password)) {
      this.toastr.error('Not a valid password');
      $("#txt_password").focus();
      return false;
    }
    if (!this.validate.verifyPassword(this.model.password2)) {
      this.toastr.error('Please confirm password');
      $("#txt_password2").focus();
      return false;
    }
    if (this.model.password2 != this.model.password) {
      this.toastr.error('Password and confirm should match');
      $("#txt_password2").focus();
      return false;
    }
    this.model.showLoader = true;
    let signupData: _Signupdata;
    signupData = {} as _Signupdata;
    signupData.firstName = this.model.firstName;
    signupData.lastName = this.model.lastName;
    signupData.email = this.model.email;
    signupData.phoneNumber = this.model.phoneNumber;
    signupData.password = this.model.password;
    this.userService.signup(signupData).then(() => {
      this.model.showLoader = false;
      this.toastr.success("Sign up success. Please check your email (" + this.model.email + ") for account activation");
    }).catch((error) => {
      this.model.showLoader = false;
      this.toastr.error("Email Id password mismatch");
    });
  }
}

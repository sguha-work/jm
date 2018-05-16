import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

import { ValidationService } from './../../services/validation.service';
@Component({
  selector: 'app-forgetpasswordmodal',
  templateUrl: './forgetpasswordmodal.component.html',
  styleUrls: ['./forgetpasswordmodal.component.scss']
})
export class ForgetpasswordmodalComponent implements OnInit {

  public model: any;
  constructor(public validate: ValidationService) {
    this.model = {};
    this.model.forgetPasswordEmail = "";
    this.model.forgetPasswordEmailFieldVerificationError = "";
    this.model.forgetPasswordEmailFieldInvalid = false;
    this.model.forgetPasswordConfirmPasswordText = "";
    this.model.forgetPasswordPasswordText = "";
    this.model.forgetPasswordOTP = "";
  }
  public show() {
    $("#div_forgetPassword1").show();
    $("#btn_sendOTP").show();
    $("#div_forgetPassword2").hide();
    $("#btn_resetPassword").hide();
    $("#myModal").modal();
  }
  public hide() {

  }

  public checkValue() {

    if (this.validate.verifyEmail(this.model.forgetPasswordEmail)) {
      this.model.forgetPasswordEmailFieldVerificationError = "";
      this.model.forgetPasswordEmailFieldInvalid = false;
      // need to check wheather the email exists in db

    } else {
      this.model.forgetPasswordEmailFieldVerificationError = "Given email id is not valid";
      this.model.forgetPasswordEmailFieldInvalid = true;
    }
  }

  public resetPassword(event: any) {

  }

  public sendOTPAsMail(event: any) {

  }

  ngOnInit() {
  }

}

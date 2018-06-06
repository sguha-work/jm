import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../services/user.service';

import * as $ from 'jquery';

import { ValidationService } from './../../services/validation.service';
@Component({
  selector: 'app-forgetpasswordmodal',
  templateUrl: './forgetpasswordmodal.component.html',
  styleUrls: ['./forgetpasswordmodal.component.scss']
})
export class ForgetpasswordmodalComponent implements OnInit {

  public model: any;
  constructor(public validate: ValidationService, public userService: UserService, public toastr: ToastrService) {
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

  public checkEmail() {

    if (this.validate.verifyEmail(this.model.forgetPasswordEmail)) {
      this.model.forgetPasswordEmailFieldVerificationError = "";
      this.model.forgetPasswordEmailFieldInvalid = false;
      return true;
      // need to check wheather the email exists in db

    } else {
      this.model.forgetPasswordEmailFieldVerificationError = "Given email id is not valid";
      this.model.forgetPasswordEmailFieldInvalid = true;
      return false;
    }
  }

  public resetPassword(event: any) {

  }

  public sendOTPAsMail(event: any) {
    event.preventDefault();
    $("#btn_sendOTP").css({
      "pointer-events": "none",
      "opacity": 0.5
    });
    if (this.checkEmail()) {
      this.userService.sendPasswordResetOTP(this.model.forgetPasswordEmail).then(() => {
        $("#btn_sendOTP").removeAttr("style");
        $('#stepOne').css('display', 'none');
	     	$('#stepTwo').css('display', 'block');
      }).catch(() => {
        this.toastr.error("Unable to send password resend OTP. Please try again latter.");
        $("#btn_sendOTP").removeAttr("style");
      });
    } else {
      $("#btn_sendOTP").removeAttr("style");
    }
    return false;
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.css']
})
export class AppSettingsComponent implements OnInit {
  faChevronRight = faChevronRight;
  faChevronDown = faChevronDown;
  public isCollapsedPassword = false;
  public isCollapsed2FA = false;
  changePasswordForm: FormGroup;
  public errorMessage: string = '';
  public showError: boolean = false;
  public showSuccess: boolean = false;
  public twoFAEnable: boolean = false;
  public show2FAMessage: boolean = false;
  public twoFAMessage: string = '';
  twoFAResult: any;

  constructor(private accountService: AccountService) {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[@$!%*#?&]).{6,}$/)
        ]),
      newPassword: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[@$!%*#?&]).{6,}$/)
        ]),
      confirmNewPassword: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getTwoFactorAuthentication();
  }

  changePassword() {
    this.showSuccess = false;
    this.showError = false;

    if (!this.changePasswordForm.valid) {
      this.showError = true;
      this.errorMessage = "Please fill our all information above!";
      return
    }

    this.accountService.changePassword(this.changePasswordForm.value).subscribe(_ => {
      this.showSuccess = true;
      this.changePasswordForm.reset();
    }, error => {
      // console.log(error);
      this.errorMessage = error.error.result;
      this.showError = true;
    })
  }

  getTwoFactorAuthentication() {
    this.accountService.getTwoFactorAuthentication().subscribe(result => {
      if (result == false)
        this.twoFAEnable = false;

      if (result == true)
        this.twoFAEnable = true;
    })
  }

  change2FA() {
    this.show2FAMessage = false;

    this.accountService.changeTwoFactorAuthentication().subscribe((result: any) => {
      this.getTwoFactorAuthentication();
      this.show2FAMessage = true;
      this.twoFAMessage = result.result;
    })
  }

}

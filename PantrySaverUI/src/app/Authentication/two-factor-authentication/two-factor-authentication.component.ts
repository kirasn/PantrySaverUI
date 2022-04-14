import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-two-factor-authentication',
  templateUrl: './two-factor-authentication.component.html',
  styleUrls: ['./two-factor-authentication.component.css']
})
export class TwoFactorAuthenticationComponent implements OnInit {
  public twoStepForm: FormGroup;
  public showError: boolean = false;
  public errorMessage: string = '';
  private email: string = '';

  constructor(private accountService: AccountService,
    private activateRoute: ActivatedRoute,
    private route: Router) {
    this.twoStepForm = new FormGroup({
      twoFactorCode: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.email = this.activateRoute.snapshot.queryParams['email'];
  }

  validateControl = (controlName: string) => {
    return this.twoStepForm.controls[controlName].invalid && this.twoStepForm.controls[controlName].touched
  }

  hasError = (controlName: string, errorName: string) => {
    return this.twoStepForm.controls[controlName].hasError(errorName)
  }

  verify = (twoStepFromValue: any) => {
    this.showError = false;

    const formValue = { ...twoStepFromValue };
    let twoFactorDto = {
      email: this.email,
      provider: "Email",
      token: formValue.twoFactorCode
    }

    console.log(twoFactorDto);

    this.accountService.twoStepLogin(twoFactorDto)
      .subscribe(result => {
        alert("Verify successful! Press Close to go to Home");
        this.route.navigateByUrl('/home');
      },
        error => {
          this.errorMessage = error.error.result;
          this.showError = true;
        })
  }
}

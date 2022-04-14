import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public errorMessage: string = '';
  public showError: boolean = false;

  constructor(private accountService: AccountService,
    private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[@$!%*#?&]).{6,}$/)
        ])
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.showError = false;
    // console.log(this.loginForm.value);

    this.accountService.login(this.loginForm.value).subscribe(response => {
      alert("Please check your email for the 2 factor Authentication code");
      this.router.navigate(['/authentication/twofactorauthentication'], { queryParams: { email: this.loginForm.value.username } });
    }, error => {
      // console.log(error);
      this.errorMessage = error.error.result;
      this.showError = true;
    })
  }

  generateNewEmailConfirmation(username: string) {
    this.accountService.generateNewEmailConfirmation(username).subscribe(response => {
      alert("Please check your email for the new email confirmation. Make sure that you check your Spam folder too.");
    }, error => {
      // console.log(error);
      alert(error.error.result);
    })
  }

}

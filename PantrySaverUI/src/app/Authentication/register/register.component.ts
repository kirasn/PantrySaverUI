import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  public errorMessage: string = '';
  public showError: boolean = false;

  constructor(private accountService: AccountService,
    private router: Router) {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[@$!%*#?&]).{6,}$/)
        ]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  register() {
    this.showError = false;
    // console.log(this.registerForm.value);

    this.accountService.register(this.registerForm.value).subscribe(response => {
      alert("Register Successful! Please verify your email confirmation!");
      this.router.navigateByUrl('')
      // console.log(response);
    }, error => {
      // console.log(error);
      this.errorMessage = error.error.result;
      this.showError = true;
    })
  }
}
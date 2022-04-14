import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { TwoFactorAuthenticationComponent } from './two-factor-authentication/two-factor-authentication.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    EmailConfirmationComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    TwoFactorAuthenticationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'emailconfirmation', component: EmailConfirmationComponent },
      { path: 'resetpassword', component: ResetPasswordComponent },
      { path: 'forgotpassword', component: ForgotPasswordComponent },
      { path: 'twofactorauthentication', component: TwoFactorAuthenticationComponent },
    ])
  ]
})
export class AuthenticationModule { }

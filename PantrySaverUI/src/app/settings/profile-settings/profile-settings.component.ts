import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, tap } from 'rxjs';
import { UserProfile } from 'src/app/_models/userProfile';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'],
})
export class ProfileSettingsComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({
    userName: new FormControl({ value: '', disabled: true }),
    email: new FormControl({ value: '', disabled: true }),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dateOfBirth: new FormControl('')
  });
  public errorMessage: string = '';
  public showError: boolean = false;
  public showSuccess: boolean = false;
  userProfile!: Observable<UserProfile>;
  maxDate = { year: new Date().getUTCFullYear(), month: 12, day: 31 }
  minDate = { year: new Date().getUTCFullYear() - 100, month: 12, day: 31 }

  constructor(private accountService: AccountService,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.userProfile = this.accountService.getUserProfile().pipe(tap(
      user => {
        let userDOB = new Date(user.dateOfBirth);

        this.profileForm.patchValue({
          userName: user.userName,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          dateOfBirth: { year: userDOB.getFullYear(), month: userDOB.getMonth() + 1, day: userDOB.getDate() }
        });
      }
    ));

    this.spinner.show();
  }

  save(profileForm: FormGroup) {
    this.showSuccess = false;
    this.showError = false;

    let userDOB = new Date(`${profileForm.value.dateOfBirth.month} ${profileForm.value.dateOfBirth.day} ${profileForm.value.dateOfBirth.year}`);
    // console.log(userDOB);

    this.accountService.updateUserProfile({
      firstName: profileForm.value.firstName,
      lastName: profileForm.value.lastName,
      dateOfBirth: userDOB
    }).subscribe(result => {
      this.showSuccess = true;
      console.log(result);
    }, error => {
      console.log(error.error.result);
    });
  }

}

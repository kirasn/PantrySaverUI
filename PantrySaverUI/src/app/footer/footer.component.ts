import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { AccountService } from '../_services/account.service';
import { UserProfile } from '../_models/userProfile';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  webUrl = environment.webUrl;
  faFacebook = faFacebook;
  faGithub = faGithub;
  contactForm: FormGroup = new FormGroup({
    emailFrom: new FormControl(''),
    content: new FormControl('', Validators.required)
  });
  userProfile!: UserProfile;
  public showError: boolean = false;
  public errorMessage: string = '';
  public showSuccess: boolean = false;
  public successMessage: string = '';

  constructor(public accountService: AccountService) {

  }

  ngOnInit(): void {
    this.accountService.getUserProfile().subscribe(result => {
      this.userProfile = result;
      this.contactForm.value.emailFrom = result.email;
    })
  }

  send(contactForm: FormGroup) {
    this.showError = false;
    this.showSuccess = false;

    if (this.userProfile) {
      this.contactForm.value.emailFrom = this.userProfile.email;
    }

    if (this.contactForm.valid) {
      this.showError = false;
      this.accountService.sendEmail(contactForm.value).subscribe((result: any) => {
        console.log(result);
        this.showSuccess = true;
        this.successMessage = result.result;
      }, error => {
        console.log(error);
      });
      console.log(this.contactForm.value);
    } else {
      this.showError = true;
      this.errorMessage = 'Please fill out all the content before Send the message!';
    }

  }

}

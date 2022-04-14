import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  public showSuccess: boolean = false;
  public showError: boolean = false;
  public errorMessage: string = '';

  constructor(private accountSerivce: AccountService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.confirmEmail();
  }

  private confirmEmail = () => {
    this.showError = this.showSuccess = false;
    const token = this.activateRoute.snapshot.queryParams['token'];
    const email = this.activateRoute.snapshot.queryParams['email'];

    this.accountSerivce.confirmEmail(token, email).subscribe(
      _ => {
        this.showSuccess = true;
      },
      error => {
        this.showError = true;
        this.errorMessage = error.error.results;
      }
    )
  }
}

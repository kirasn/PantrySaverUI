import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public isCollapsed = true;
  model: any = {}

  constructor(private router: Router, public accountService: AccountService) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigateByUrl('/authentication/login');
  }

  logout() {
    this.accountService.logout();
    alert('Successful logout!');
    this.router.navigateByUrl('');
  }
}

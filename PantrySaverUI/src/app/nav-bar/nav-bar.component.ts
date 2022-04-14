import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public isCollapsed = false;
  model: any = {}

  constructor(private router: Router, public accountSerivce: AccountService) { }

  ngOnInit(): void {
  }

  login() {
    this.router.navigateByUrl('/authentication/login');
  }

  logout() {
    this.accountSerivce.logout();
    alert('Successful logout!');
    this.router.navigateByUrl('');
  }
}

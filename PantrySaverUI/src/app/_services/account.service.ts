import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { CustomEncoder } from './encoder';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  apiUrl = environment.apiUrl;
  webUrl = environment.webUrl;
  private currentUserSource = new ReplaySubject<User | null>(1);
  $currentUser = this.currentUserSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  login(model: any) {
    return this.httpClient.post(this.apiUrl + 'Authentication/Login', model, { responseType: 'json' });
  }

  register(model: any) {
    model.clientURI = this.webUrl + 'authentication/emailconfirmation';
    return this.httpClient.post(this.apiUrl + 'Authentication/Register', model, { responseType: 'json' });
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  confirmEmail = (token: string, email: string) => {
    let params = new HttpParams({ encoder: new CustomEncoder() })
    params = params.append('email', email);
    params = params.append('token', token);

    return this.httpClient.get(this.apiUrl + 'Authentication/EmailConfirmation', { params: params });
  }

  twoStepLogin(model: any) {
    return this.httpClient.post<User>(this.apiUrl + 'Authentication/TwoFactorAuthentication', model, { responseType: 'json' }).pipe(
      map((response) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify({ username: user.username, token: user.token }));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  generateNewEmailConfirmation = (username: string) => {
    let clientURI = this.webUrl + 'authentication/emailconfirmation';
    return this.httpClient.get(this.apiUrl + `Authentication/GenerateNewEmailConfirmation?username=${username}&clientURI=${clientURI}`);
  }

  setCurrentUser(user: User) {
    const token = this.getDecodeToken(user.token);
    this.currentUserSource.next(user);
  }

  getDecodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}

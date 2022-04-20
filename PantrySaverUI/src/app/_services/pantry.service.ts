import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pantry } from '../_models/pantry';
import { PantryOwn } from '../_models/pantryOwn';

@Injectable({
  providedIn: 'root'
})
export class PantryService {
  apiUrl = environment.apiUrl;
  private subject = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  getPantries() {
    return this.httpClient.get<PantryOwn[]>(this.apiUrl + 'Pantry/Pantries');
  }

  sendNew() {
    this.subject.next(null);
  }

  getNew(): Observable<any> {
    return this.subject.asObservable();
  }

  createNewPantry(newPantry: any) {
    return this.httpClient.post(this.apiUrl + 'Pantry/Pantries', newPantry, { responseType: 'json' });
  }

  getPantry(pantryId: string) {
    return this.httpClient.get<Pantry>(this.apiUrl + `Pantry/Pantries/${pantryId}`);
  }
}

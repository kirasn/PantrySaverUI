import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PantryOwn } from 'src/app/_models/pantryOwn';
import { PantryService } from 'src/app/_services/pantry.service';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css']
})
export class PantryComponent implements OnInit {
  pantryList: PantryOwn[] = [];
  pantryListPag: PantryOwn[] = [];
  getNew: Subscription;

  constructor(private pantryService: PantryService) {
    this.getNew = this.pantryService.getNew().subscribe(() => {
      this.getPantries();
    })
  }

  ngOnInit(): void {
    this.getPantries();
  }

  getPantries() {
    this.pantryService.getPantries().subscribe(result => {
      this.pantryList = result;
      console.log(result);
    },
      error => {
        console.log(error);
      })
  }
}

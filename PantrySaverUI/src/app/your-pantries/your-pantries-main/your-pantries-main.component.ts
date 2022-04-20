import { Component, OnInit } from '@angular/core';
import { PantryOwn } from 'src/app/_models/pantryOwn';
import { PantryService } from 'src/app/_services/pantry.service';

@Component({
  selector: 'app-your-pantries-main',
  templateUrl: './your-pantries-main.component.html',
  styleUrls: ['./your-pantries-main.component.css']
})
export class YourPantriesMainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

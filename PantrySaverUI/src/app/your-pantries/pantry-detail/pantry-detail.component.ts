import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouteConfigLoadEnd, Router } from '@angular/router';
import { Pantry } from 'src/app/_models/pantry';
import { PantryService } from 'src/app/_services/pantry.service';

@Component({
  selector: 'app-pantry-detail',
  templateUrl: './pantry-detail.component.html',
  styleUrls: ['./pantry-detail.component.css']
})
export class PantryDetailComponent implements OnInit {
  pantryId: string | null;
  pantryDetail!: Pantry;

  constructor(private pantryService: PantryService,
    private activatedRoute: ActivatedRoute,
    private route: Router) {
    this.pantryId = this.activatedRoute.snapshot.paramMap.get("pantryId");
    if (this.pantryId) {
      console.log(this.pantryId);
      this.pantryService.getPantry(this.pantryId).subscribe(result => {
        this.pantryDetail = result;
        console.log(result);
      }, error => {
        console.log(error);
        this.route.navigateByUrl('/404');
      })
    }
  }

  ngOnInit(): void {
  }

}

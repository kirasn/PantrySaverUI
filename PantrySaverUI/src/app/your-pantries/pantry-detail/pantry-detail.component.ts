import { Component, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/_models/item';
import { Pantry } from 'src/app/_models/pantry';
import { PantryItem } from 'src/app/_models/pantryItem';
import { PantryService } from 'src/app/_services/pantry.service';

export type SortColumn = keyof PantryItem | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };

const compare = (v1: string | number | Date | Item, v2: string | number | Date | Item) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})

export class SortTableHeader {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: 'app-pantry-detail',
  templateUrl: './pantry-detail.component.html',
  styleUrls: ['./pantry-detail.component.css']
})
export class PantryDetailComponent {
  pantryId: string | null;
  pantryDetail!: Pantry;
  pantryItems: PantryItem[] = [];

  @ViewChildren(SortTableHeader) headers!: QueryList<SortTableHeader>;

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable != column) {
        header.direction = '';
      }
    })

    if (direction === '' || column === '') {
      this.pantryItems = this.pantryDetail.pantryItems;
    } else {
      this.pantryItems = [...this.pantryDetail.pantryItems].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }


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

}

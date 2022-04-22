import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, delay, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemSortColumn, ItemSortDirection } from '../_helpers/itemSortable.directive';
import { Item } from '../_models/item';

interface SearchResult {
  items: Item[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: ItemSortColumn;
  sortDirection: ItemSortDirection;
}

const compare = (v1: string | boolean | null, v2: string | boolean | null) => v1! < v2! ? - 1 : v1! > v2! ? 1 : 0;

function sort(items: Item[], column: ItemSortColumn, direction: string): Item[] {
  if (direction === '' || column === '') {
    return items;
  } else {
    return [...items].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    })
  }
}

function matches(item: Item, term: string) {
  return item.name.toLowerCase().includes(term.toLowerCase())
    || item.description?.toLowerCase().includes(term.toLowerCase())
    || item.category?.toLowerCase().includes(term.toLowerCase());
}

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  apiUrl = environment.apiUrl;
  private _loading = new BehaviorSubject<boolean>(true);
  private _search = new Subject<void>();
  private _items = new BehaviorSubject<Item[]>([]);
  private _total = new BehaviorSubject<number>(0);
  ITEMS: Item[] = [];

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private httpClient: HttpClient) {
    this._search.pipe(
      tap(() => this._loading.next(true)),
      debounceTime(200),
      switchMap(() => this.search(this.ITEMS)),
      delay(200),
      tap(() => this._loading.next(false))
    ).subscribe(
      result => {
        this._items.next(result.items);
        this._total.next(result.total);
      }
    );

    this._search.next();

    this.getItems().subscribe(result => {
      this.ITEMS = result;
    })
  }

  get items() {
    return this._items.asObservable();
  }

  get total() {
    return this._total.asObservable();
  }

  get loading() {
    return this._loading.asObservable();
  }

  get page() {
    return this._state.page;
  }

  get pageSize() {
    return this._state.pageSize;
  }

  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }

  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }

  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }

  set sortColumn(sortColumn: ItemSortColumn) {
    this._set({ sortColumn });
  }

  set sortDirection(sortDirection: ItemSortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search.next();
  }

  private search(itemsList: Item[]): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    let items = sort(itemsList, sortColumn, sortDirection);

    items = items.filter(item => matches(item, searchTerm));
    const total = items.length;

    items = items.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ items, total });
  }

  addNewItem(item: Item) {
    return this.httpClient.post(this.apiUrl + 'Item/Items', item);
  }

  getItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.apiUrl + 'Item/Items');
  }
}

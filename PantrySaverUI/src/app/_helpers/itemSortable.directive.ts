import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../_models/item';

export type ItemSortColumn = keyof Item | '';
export type ItemSortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: ItemSortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface ItemSortEvent {
    column: ItemSortColumn;
    direction: ItemSortDirection;
}

@Directive({
    selector: 'th[sortable]',
    host: {
        '[class.asc]': 'direction === "asc"',
        '[class.desc]': 'direction === "desc"',
        '(click)': 'rotate()'
    }
})

export class NgbdItemSortableHeader11111 {

    @Input() sortable: ItemSortColumn = '';
    @Input() direction: ItemSortDirection = '';
    @Output() sort = new EventEmitter<ItemSortEvent>();

    rotate() {
        this.direction = rotate[this.direction];
        this.sort.emit({ column: this.sortable, direction: this.direction });
    }
}
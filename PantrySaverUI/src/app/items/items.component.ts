import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Item } from '../_models/item';
import { ItemsService } from '../_services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  public showError: boolean = false;
  public errorMessage: string = '';
  public showSuccess: boolean = false;
  public successMessage: string = '';
  newItemForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    barcodeFormats: new FormControl(''),
    category: new FormControl(''),
    manufacturer: new FormControl(''),
    imageUrl: new FormControl(''),
    description: new FormControl(''),
  });
  items: Observable<Item[]>;
  total: Observable<number>;
  selectedItem!: Item;

  constructor(public itemService: ItemsService) {
    this.items = itemService.items;
    this.total = itemService.total;
  }

  ngOnInit(): void {
  }

  addNewItem(item: FormGroup) {
    this.showError = false;
    this.showSuccess = false;

    if (!item.valid) {
      this.showError = true;
      this.errorMessage = "Name of item is requirement!";
      return
    }

    let _newItem: Item = {
      itemId: '',
      name: item.value.name,
      barcodeFormats: (item.value.barcodeFormats ? item.value.barcodeFormats : null),
      category: (item.value.category ? item.value.category : null),
      manufacturer: (item.value.manufacturer ? item.value.manufacturer : null),
      imageUrl: (item.value.imageUrl ? item.value.imageUrl : null),
      description: (item.value.description ? item.value.description : null),
      isCustom: true,
      userId: ''
    };

    this.itemService.addNewItem(_newItem).subscribe((result: any) => {
      console.log(result);
      this.showSuccess = true;
      this.successMessage = result.result;
      this.itemService.getItems().subscribe(result => this.itemService.ITEMS = result);
      this.items = this.itemService.items;

      this.newItemForm.reset();
    }, error => {
      this.showError = true;
      this.errorMessage = error.error.result;
    })
  }
}

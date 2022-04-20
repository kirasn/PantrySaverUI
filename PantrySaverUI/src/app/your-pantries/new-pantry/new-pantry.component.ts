import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pantry } from 'src/app/_models/pantry';
import { PantryService } from 'src/app/_services/pantry.service';

@Component({
  selector: 'app-new-pantry',
  templateUrl: './new-pantry.component.html',
  styleUrls: ['./new-pantry.component.css']
})
export class NewPantryComponent implements OnInit {
  newPantryForm: FormGroup = new FormGroup({
    pantryName: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required)
  });
  public showError: boolean = false;
  public errorMessage: string = '';
  public showSuccess: boolean = false;
  public successMessage: string = '';

  constructor(private pantryService: PantryService) { }

  ngOnInit(): void {
  }

  createNewPantry(newPantry: FormGroup) {
    this.showError = false;
    this.showSuccess = false;

    if (!newPantry.valid) {
      this.showError = true;
      this.errorMessage = "Please fill our all information above!";
      return
    }

    this.pantryService.createNewPantry(newPantry.value).subscribe((result: any) => {
      this.showSuccess = true;
      this.successMessage = result.result;
      this.pantryService.sendNew();
      this.newPantryForm.reset();
    }, error => {
      this.showError = true;
      this.errorMessage = error.error.result;
    })
  }
}

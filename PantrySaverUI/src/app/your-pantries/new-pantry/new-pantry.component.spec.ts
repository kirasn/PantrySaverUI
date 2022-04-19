import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPantryComponent } from './new-pantry.component';

describe('NewPantryComponent', () => {
  let component: NewPantryComponent;
  let fixture: ComponentFixture<NewPantryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPantryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPantryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

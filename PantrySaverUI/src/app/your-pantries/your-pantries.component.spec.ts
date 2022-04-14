import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourPantriesComponent } from './your-pantries.component';

describe('YourPantriesComponent', () => {
  let component: YourPantriesComponent;
  let fixture: ComponentFixture<YourPantriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourPantriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourPantriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

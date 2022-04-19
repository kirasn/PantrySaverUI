import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourPantriesMainComponent } from './your-pantries-main.component';

describe('YourPantriesMainComponent', () => {
  let component: YourPantriesMainComponent;
  let fixture: ComponentFixture<YourPantriesMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourPantriesMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourPantriesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

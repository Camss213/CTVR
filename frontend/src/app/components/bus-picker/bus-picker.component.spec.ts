import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusPickerComponent } from './bus-picker.component';

describe('BusPickerComponent', () => {
  let component: BusPickerComponent;
  let fixture: ComponentFixture<BusPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentPickerComponent } from './accident-picker.component';

describe('AccidentPickerComponent', () => {
  let component: AccidentPickerComponent;
  let fixture: ComponentFixture<AccidentPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccidentPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccidentPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBusCardComponent } from './add-bus-card.component';

describe('AddBusCardComponent', () => {
  let component: AddBusCardComponent;
  let fixture: ComponentFixture<AddBusCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBusCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBusCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

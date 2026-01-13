import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyPickerComponent } from './third-party-picker.component';

describe('ThirdPartyPickerComponent', () => {
  let component: ThirdPartyPickerComponent;
  let fixture: ComponentFixture<ThirdPartyPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThirdPartyPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdPartyPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

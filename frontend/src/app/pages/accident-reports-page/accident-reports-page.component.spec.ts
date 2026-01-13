import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentReportsPageComponent } from './accident-reports-page.component';

describe('AccidentReportsPageComponent', () => {
  let component: AccidentReportsPageComponent;
  let fixture: ComponentFixture<AccidentReportsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccidentReportsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccidentReportsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentReportPreviewComponent } from './accident-report-preview.component';

describe('AccidentReportPreviewComponent', () => {
  let component: AccidentReportPreviewComponent;
  let fixture: ComponentFixture<AccidentReportPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccidentReportPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccidentReportPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

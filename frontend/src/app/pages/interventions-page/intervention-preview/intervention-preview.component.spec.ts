import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionPreviewComponent } from './intervention-preview.component';

describe('InterventionPreviewComponent', () => {
  let component: InterventionPreviewComponent;
  let fixture: ComponentFixture<InterventionPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterventionPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

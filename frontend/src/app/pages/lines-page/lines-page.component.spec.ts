import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesPageComponent } from './lines-page.component';

describe('LinesPageComponent', () => {
  let component: LinesPageComponent;
  let fixture: ComponentFixture<LinesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

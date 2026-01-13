import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionsPageComponent } from './interventions-page.component';

describe('QuotesPageComponent', () => {
    let component: InterventionsPageComponent;
    let fixture: ComponentFixture<InterventionsPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InterventionsPageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(InterventionsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThirdCardComponent } from './add-third-party-card.component';

describe('AddThirdCardComponent', () => {
    let component: AddThirdCardComponent;
    let fixture: ComponentFixture<AddThirdCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AddThirdCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AddThirdCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverPickerComponent } from './driver-picker.component';

describe('DriverPickerComponent', () => {
    let component: DriverPickerComponent;
    let fixture: ComponentFixture<DriverPickerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DriverPickerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DriverPickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

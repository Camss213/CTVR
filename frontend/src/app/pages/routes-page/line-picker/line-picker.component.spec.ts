import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinePickerComponent } from './line-picker.component';

describe('LinePickerComponent', () => {
    let component: LinePickerComponent;
    let fixture: ComponentFixture<LinePickerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LinePickerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LinePickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import { TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SidebarComponent],
        }).compileComponents();
    });

    it('should be created', () => {
        const fixture = TestBed.createComponent(SidebarComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});

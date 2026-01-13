import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageComponent } from './login-page.component';
import { AuthService } from '../auth.service';
import { of, throwError } from 'rxjs';

describe('LoginPageComponent', () => {
    let component: LoginPageComponent;
    let fixture: ComponentFixture<LoginPageComponent>;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        const authSpy = jasmine.createSpyObj('AuthService', [
            'login',
            'isLogged',
        ]);
        const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, LoginPageComponent], // Importation du composant standalone ici
            providers: [
                { provide: AuthService, useValue: authSpy },
                { provide: Router, useValue: routerMock },
            ],
        }).compileComponents();

        authServiceSpy = TestBed.inject(
            AuthService
        ) as jasmine.SpyObj<AuthService>;
        routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

        fixture = TestBed.createComponent(LoginPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not submit if form is invalid', () => {
        component.loginForm.setValue({ username: '', password: '' });
        component.onSubmit();
        expect(authServiceSpy.login).not.toHaveBeenCalled();
    });

    it('should call login and navigate on success', () => {
        const mockResponse = 'fake-jwt-token';
        authServiceSpy.login.and.returnValue(of(mockResponse));

        component.loginForm.setValue({
            username: 'testuser',
            password: 'password123',
        });
        component.onSubmit();

        expect(authServiceSpy.login).toHaveBeenCalledWith(
            'testuser',
            'password123'
        );
        expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/app');
        expect(component.isLoading).toBeFalse();
    });

    it('should handle login error', () => {
        const mockError = 'Invalid credentials';
        authServiceSpy.login.and.returnValue(
            throwError(() => ({ error: mockError }))
        );

        component.loginForm.setValue({
            username: 'testuser',
            password: 'wrongpassword',
        });
        component.onSubmit();

        expect(authServiceSpy.login).toHaveBeenCalledWith(
            'testuser',
            'wrongpassword'
        );
        expect(component.errorMessage).toBe('Erreur de connexion');
        expect(component.isLoading).toBeFalse();
    });
});

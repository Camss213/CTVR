import { TestBed } from '@angular/core/testing';
import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';

describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
        });

        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should send a POST request to login', () => {
        const mockResponse = 'fake-jwt-token';
        const username = 'testuser';
        const password = 'password123';

        service.login(username, password).subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('/api/login');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ username, password });

        req.flush(mockResponse);
    });

    it('should handle login errors', () => {
        const mockError = 'Invalid credentials';
        const username = 'testuser';
        const password = 'wrongpassword';

        service.login(username, password).subscribe({
            next() {
                fail('Expected an error, but got a success response');
            },
            error(e) {
                expect(e.error).toEqual(mockError);
            },
        });

        const req = httpMock.expectOne('/api/login');
        req.flush(mockError, { status: 401, statusText: 'Unauthorized' });
    });
});

import {
    HTTP_INTERCEPTORS,
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { APIInterceptor } from './api.interceptor';

describe('APIInterceptor', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClientTesting(),
                provideHttpClient(withInterceptorsFromDi()),
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: APIInterceptor,
                    multi: true,
                },
            ],
        });
    });

    it('should be created', () => {});
});

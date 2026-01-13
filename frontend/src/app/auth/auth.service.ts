import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';
import { Role } from '../pages/users-page/user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private static readonly TOKEN_STORAGE_KEY = 'token';

    private storage = typeof localStorage !== 'undefined' ? localStorage : null;

    private token: string | null = null;

    private data: { role?: Role; sub?: string; exp?: number } | null = null;

    constructor(private http: HttpClient, private router: Router) {}

    public login(username: string, password: string): Observable<string> {
        return this.http
            .post(
                '/api/login',
                { username, password },
                { responseType: 'text' }
            )
            .pipe(tap((e) => this.setSession(e)));
    }

    public logout(redirect = this.router.url) {
        this.storage?.removeItem(AuthService.TOKEN_STORAGE_KEY);
        this.token = null;
        this.data = null;

        this.router.navigate([''], {
            queryParams: { redirect },
        });
    }

    public getRedirectUrl() {
        const data = this.getData();

        switch (data?.role) {
            case 'ADMIN':
                return '/users';
            case 'S_ADMIN':
                return '/app';
            case 'S_TECH':
                return '/interventions';
            case 'DRIVER':
                return '/accident-reports';
            default:
                return '/app';
        }
    }

    public loginRedirect(param?: string) {
        if (param && param !== '/') {
            this.router.navigateByUrl(param);
        } else {
            this.router.navigateByUrl(this.getRedirectUrl());
        }
    }

    public hasRequiredRole(roles: Role[]) {
        const data = this.getData();

        if (!data || !data.role) {
            return false;
        }

        return roles.includes(data.role);
    }

    public getAuthToken() {
        if (!this.token) {
            this.token =
                this.storage?.getItem(AuthService.TOKEN_STORAGE_KEY) ?? null;
        }
        return this.token;
    }

    get isLogged() {
        const data = this.getData();
        return data?.exp ? data.exp * 1000 > Date.now() : false;
    }

    get username() {
        const data = this.getData();
        return data?.sub;
    }

    private getData() {
        if (!this.data) {
            const token = this.getAuthToken();
            if (token === null) {
                this.data = null;
            } else {
                try {
                    this.data = jwtDecode(token);
                } catch {
                    this.data = null;
                }
            }
        }
        return this.data;
    }

    public setSession(token: string) {
        this.storage?.setItem(AuthService.TOKEN_STORAGE_KEY, token);
        this.token = token;
    }
}

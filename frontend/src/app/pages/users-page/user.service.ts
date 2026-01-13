import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}

    public getList() {
        return this.http.get<User[]>('/api/users');
    }

    public save(user: User) {
        return this.http.post('/api/users', user, { responseType: 'text' });
    }

    public delete(id: number) {
        return this.http.delete(`/api/users/${id}`, { responseType: 'text' });
    }

    public updateUsername(user: { username: string }) {
        return this.http.patch('/api/account/username', user, {
            responseType: 'text',
        });
    }

    public updatePassword(user: { oldPassword: string; password: string }) {
        return this.http.patch('/api/account/password', user, {
            responseType: 'text',
        });
    }
}

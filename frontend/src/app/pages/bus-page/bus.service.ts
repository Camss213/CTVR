import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bus, BusIdentity } from './bus';

@Injectable({
    providedIn: 'root',
})
export class BusService {
    constructor(private http: HttpClient) {}

    public getList() {
        return this.http.get<Bus[]>('/api/bus');
    }

    public create(bus: Bus) {
        return this.http.post('/api/bus', bus, { responseType: 'text' });
    }

    public update(bus: Bus, registration: string) {
        return this.http.put(`/api/bus/${registration}`, bus, {
            responseType: 'text',
        });
    }

    public delete(registration: string) {
        return this.http.delete(
            `/api/bus/${encodeURIComponent(registration)}`,
            { responseType: 'text' }
        );
    }

    public getIdentities() {
        return this.http.get<BusIdentity[]>('/api/bus/identities');
    }

    public getIdentity(registration: string) {
        return this.http.get<BusIdentity>(
            `/api/bus/${encodeURIComponent(registration)}/identity`
        );
    }
}

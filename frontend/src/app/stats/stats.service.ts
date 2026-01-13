import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stats } from './stats';

@Injectable({
    providedIn: 'root',
})
export class StatsService {
    constructor(private http: HttpClient) {}

    public getStats() {
        return this.http.get<Stats>('/api/stats');
    }
}

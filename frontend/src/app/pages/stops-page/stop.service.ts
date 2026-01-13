import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Line } from '../lines-page/line';
import { Stop } from './stop';

@Injectable({
    providedIn: 'root',
})
export class StopService {
    constructor(private http: HttpClient) {}

    getStops() {
        return this.http.get<Stop[]>('/api/stops');
    }

    getLines(name: string) {
        return this.http.get<Line[]>(`/api/stops/${name}/lines`);
    }

    create(stop: Stop) {
        return this.http.post('/api/stops', stop, {
            responseType: 'text',
        });
    }

    update(name: string, stop: Stop) {
        return this.http.put(`/api/stops/${name}`, stop, {
            responseType: 'text',
        });
    }

    delete(name: string) {
        return this.http.delete(`/api/stops/${name}`, { responseType: 'text' });
    }
}

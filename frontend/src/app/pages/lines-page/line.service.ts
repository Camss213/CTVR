import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stop } from '../stops-page/stop';
import { Line, LineSummary, Pass } from './line';

@Injectable({
    providedIn: 'root',
})
export class LineService {
    constructor(private http: HttpClient) {}

    public getList() {
        return this.http.get<LineSummary[]>('/api/lines');
    }

    public getStops(number: number) {
        return this.http.get<Stop[]>(`/api/lines/${number}/stops`);
    }

    public create(line: Line) {
        return this.http.post('/api/lines', line, { responseType: 'text' });
    }

    public update(line: Line, number: number) {
        return this.http.put(`/api/lines/${number}`, line, {
            responseType: 'text',
        });
    }

    public delete(number: number) {
        return this.http.delete(`/api/lines/${number}`, {
            responseType: 'text',
        });
    }

    public addPass(pass: Pass) {
        return this.http.post('/api/lines/pass', pass, {
            responseType: 'text',
        });
    }

    public removePass(number: number, name: string) {
        return this.http.delete(
            `/api/lines/${number}/pass/${encodeURIComponent(name)}`,
            { responseType: 'text' }
        );
    }
}

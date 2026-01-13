import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThirdParty } from './third-party';

@Injectable({
    providedIn: 'root',
})
export class ThirdPartyService {
    constructor(private http: HttpClient) {}

    public getAll() {
        return this.http.get<ThirdParty[]>('/api/third-parties');
    }

    public save(thirdParty: ThirdParty) {
        return this.http.post('/api/third-parties', thirdParty, {
            responseType: 'text',
        });
    }

    public delete(id: number) {
        return this.http.delete(`/api/third-parties/${id}`, {
            responseType: 'text',
        });
    }
}

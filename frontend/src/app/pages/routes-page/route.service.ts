import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, RouteSummary } from './route';

@Injectable({
    providedIn: 'root',
})
export class RouteService {
    constructor(private http: HttpClient) {}

    public getList() {
        return this.http.get<RouteSummary[]>('/api/routes');
    }

    public delete(drivingLicenceNumber: string, serviceSchedule: string) {
        return this.http.delete(
            `/api/routes/${encodeURIComponent(
                drivingLicenceNumber
            )}/${encodeURIComponent(serviceSchedule)}`,
            { responseType: 'text' }
        );
    }

    public create(route: Route) {
        return this.http.post('/api/routes', route, {
            responseType: 'text',
        });
    }

    public update(
        route: Route,
        drivingLicenceNumber: string,
        serviceSchedule: string
    ) {
        return this.http.put(
            `/api/routes/${encodeURIComponent(
                drivingLicenceNumber
            )}/${encodeURIComponent(serviceSchedule)}`,
            route,
            { responseType: 'text' }
        );
    }
}

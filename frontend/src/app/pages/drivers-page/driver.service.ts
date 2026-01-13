import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Driver, DriverSummary } from './driver';

@Injectable({
    providedIn: 'root',
})
export class DriverService {
    constructor(private http: HttpClient) {}

    getList() {
        return this.http.get<DriverSummary[]>('/api/drivers');
    }

    get(licence: string) {
        return this.http.get<Driver>(
            `/api/drivers/${encodeURIComponent(licence)}`
        );
    }

    create(driver: Driver) {
        return this.http.post('/api/drivers', driver, { responseType: 'text' });
    }

    update(driver: Driver, oldDrivingLicenceNumber: string) {
        return this.http.put(
            `/api/drivers/${oldDrivingLicenceNumber}`,
            driver,
            { responseType: 'text' }
        );
    }

    delete(drivingLicenceNumber: string) {
        return this.http.delete(
            `/api/drivers/${encodeURIComponent(drivingLicenceNumber)}`,
            {
                responseType: 'text',
            }
        );
    }
}

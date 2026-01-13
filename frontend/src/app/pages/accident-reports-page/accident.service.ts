import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { RouteSummary } from '../routes-page/route';
import {
    Accident,
    AccidentId,
    Report,
    AccidentSummary as Summary,
    Validation,
} from './accident';

@Injectable({
    providedIn: 'root',
})
export class AccidentService {
    constructor(private http: HttpClient, private router: Router) {}

    public getAccidentIds() {
        return this.http.get<AccidentId[]>('/api/accidents/ids');
    }

    public getReports() {
        return this.http.get<Summary[]>('/api/accidents');
    }

    public getReport(year: number, noSeq: number) {
        return this.http.get<Accident>(`/api/accidents/${year}/${noSeq}`).pipe(
            tap({
                error: (e: HttpErrorResponse) => {
                    if ([400, 403, 404].includes(e.status)) {
                        this.router.navigate(['accident-reports']);
                    }
                },
            })
        );
    }

    public sendReport(report: Report) {
        return this.http.post<AccidentId>('/api/accidents/new', report).pipe(
            tap((id) => {
                this.router.navigate(['accident-reports', id.year, id.noSeq]);
            })
        );
    }

    public updateReport(report: Report, accidentId: AccidentId) {
        return this.http.put(
            `/api/accidents/${accidentId.year}/${accidentId.noSeq}`,
            report,
            { responseType: 'text' }
        );
    }

    public delete(year: number, noSeq: number) {
        return this.http.delete(`/api/accidents/${year}/${noSeq}`, {
            responseType: 'text',
        });
    }

    public close(accidentId: AccidentId) {
        return this.http.patch('/api/accidents/close', accidentId, {
            responseType: 'text',
        });
    }

    public send(accidentId: AccidentId) {
        return this.http.patch('/api/accidents/send', accidentId, {
            responseType: 'text',
        });
    }

    public validate(accidentId: AccidentId, data: Validation) {
        return this.http.patch(
            `/api/accidents/${accidentId.year}/${accidentId.noSeq}/validate`,
            data,
            {
                responseType: 'text',
            }
        );
    }

    public getRoutes() {
        return this.http.get<RouteSummary[]>('/api/routes/accident');
    }
}

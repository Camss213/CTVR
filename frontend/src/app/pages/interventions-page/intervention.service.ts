import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import {
    Intervention,
    InterventionSummary,
    Quote,
    QuoteComponent,
} from './intervention';

@Injectable({
    providedIn: 'root',
})
export class InterventionService {
    constructor(private http: HttpClient, private router: Router) {}

    public getIntervention(id: number) {
        return this.http.get<Intervention>(`/api/interventions/${id}`).pipe(
            tap({
                error: (e: HttpErrorResponse) => {
                    if ([403, 404].includes(e.status)) {
                        this.router.navigate(['interventions']);
                    }
                },
            })
        );
    }

    public getInterventions() {
        return this.http.get<InterventionSummary[]>('/api/interventions');
    }

    public updateIntervention(intervention: Intervention) {
        return this.http.patch(
            `/api/interventions/${intervention.id}`,
            intervention,
            {
                responseType: 'text',
            }
        );
    }

    public delete(id: number) {
        return this.http.delete(`/api/interventions/${id}`, {
            responseType: 'text',
        });
    }

    public getComponents() {
        return this.http.get<QuoteComponent[]>(
            '/api/interventions/quote-components'
        );
    }

    public getQuote(id: number) {
        return this.http.get<Quote>(`/api/interventions/${id}/quote`).pipe(
            tap({
                error: (e: HttpErrorResponse) => {
                    if ([403, 404].includes(e.status)) {
                        this.router.navigate(['interventions']);
                    }
                },
            })
        );
    }

    public sendQuote(quote: Quote) {
        return this.http
            .post('/api/interventions/new', quote, {
                responseType: 'text',
            })
            .pipe(
                tap((id) => {
                    this.router.navigate(['interventions', id, 'quote']);
                })
            );
    }

    public updateQuote(quote: Quote, interventionId: number) {
        return this.http.put(
            `/api/interventions/${interventionId}/quote`,
            quote,
            { responseType: 'text' }
        );
    }
}

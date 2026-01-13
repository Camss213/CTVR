import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AddCardComponent } from '../../components/add-card/add-card.component';
import { CardSkeletonComponent } from '../../components/card-skeleton/card-skeleton.component';
import { ToastService } from '../../components/toast/toast.service';
import { AccidentSummary } from './accident';
import { AccidentReportPreviewComponent } from './accident-report-preview/accident-report-preview.component';
import { AccidentService } from './accident.service';

@Component({
    selector: 'app-accident-reports-page',
    imports: [
        AccidentReportPreviewComponent,
        AsyncPipe,
        NgFor,
        AddCardComponent,
        CardSkeletonComponent,
    ],
    templateUrl: './accident-reports-page.component.html',
    styleUrl: './accident-reports-page.component.css',
})
export class AccidentReportsPageComponent {
    reports$!: Observable<AccidentSummary[]>;

    constructor(private service: AccidentService, private toast: ToastService) {
        this.reload();
    }

    reload() {
        this.reports$ = this.service.getReports().pipe(
            tap({
                error: (e) => {
                    console.error(e);
                    this.toast.show(
                        "Impossible de charger les déclarations d'accident",
                        'error'
                    );
                },
            })
        );
    }
}

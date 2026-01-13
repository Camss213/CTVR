import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AddCardComponent } from '../../components/add-card/add-card.component';
import { CardSkeletonComponent } from '../../components/card-skeleton/card-skeleton.component';
import { ToastService } from '../../components/toast/toast.service';
import { InterventionSummary } from './intervention';
import { InterventionPreviewComponent } from './intervention-preview/intervention-preview.component';
import { InterventionService } from './intervention.service';

@Component({
    selector: 'app-interventions-page',
    imports: [
        CardSkeletonComponent,
        AddCardComponent,
        InterventionPreviewComponent,
        AsyncPipe,
        NgFor,
    ],
    templateUrl: './interventions-page.component.html',
    styleUrl: './interventions-page.component.css',
})
export class InterventionsPageComponent {
    interventions$!: Observable<InterventionSummary[]>;

    constructor(
        private service: InterventionService,
        private toast: ToastService
    ) {
        this.reload();
    }

    reload() {
        this.interventions$ = this.service.getInterventions().pipe(
            tap({
                error: (e) => {
                    console.error(e);
                    this.toast.show(
                        'Impossible de charger les interventions',
                        'error'
                    );
                },
            })
        );
    }
}

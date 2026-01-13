import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { FieldComponent } from '../../../components/field/field.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { ToastService } from '../../../components/toast/toast.service';
import { AccidentId } from '../../accident-reports-page/accident';
import { AccidentService } from '../../accident-reports-page/accident.service';
import { BusIdentity } from '../../bus-page/bus';
import { BusService } from '../../bus-page/bus.service';
import { InterventionService } from '../intervention.service';

@Component({
    selector: 'app-intervention-page',
    imports: [ReactiveFormsModule, FieldComponent, HeaderComponent, AsyncPipe],
    templateUrl: './intervention-page.component.html',
    styleUrl: './intervention-page.component.css',
})
export class InterventionPageComponent {
    form = new FormGroup({
        accident: new FormControl('', { nonNullable: true }),
        bus: new FormControl('', { nonNullable: true }),
        description: new FormControl('', { nonNullable: true }),
        quoteDate: new FormControl('', { nonNullable: true }),
        busEntranceDate: new FormControl('', { nonNullable: false }),
        startRepairDate: new FormControl('', { nonNullable: false }),
        endRepairDate: new FormControl('', { nonNullable: false }),
    });

    internalId: number | null = null;

    accidentIds$!: Observable<AccidentId[]>;
    buses$!: Observable<BusIdentity[]>;

    errorMessage: string | null = null;

    constructor(
        private interventionService: InterventionService,
        private accidentService: AccidentService,
        private busesService: BusService,
        private toastService: ToastService,
        private router: Router
    ) {
        this.accidentIds$ = this.accidentService.getAccidentIds().pipe(
            tap({
                error: (e) => {
                    console.error(e);
                    this.toastService.show(
                        'Impossible de charger les accidents',
                        'error'
                    );
                },
            })
        );
        this.buses$ = this.busesService.getIdentities().pipe(
            tap({
                error: (e) => {
                    console.error(e);
                    this.toastService.show(
                        'Impossible de charger les bus',
                        'error'
                    );
                },
            })
        );
    }

    @Input()
    get id(): number | null {
        return this.internalId;
    }

    set id(interventionId: string) {
        // TODO: Show 404 page on conversion or 404 status error and remove null type on internalId
        const id = Number(interventionId);
        if (id) {
            this.internalId = id;
            this.interventionService.getIntervention(id).subscribe({
                next: ({ id, accident, bus, ...intervention }) => {
                    // TODO: Remove needs, uses and accident/bus other fields then use setValue
                    this.form.patchValue({
                        ...intervention,
                        accident: accident
                            ? accident.year + '#' + accident.noSeq
                            : 'Aucun',
                        bus: bus.number + ' - ' + bus.registration,
                    });
                },
                error: (e) => {
                    console.error(e);
                    this.toastService.show(
                        "Impossible de charger l'intervention",
                        'error'
                    );
                },
            });
        }
    }

    onSubmit() {
        if (this.form.invalid) {
            this.errorMessage =
                'Veuillez remplir tous les champs obligatoires.';
            return;
        }

        this.errorMessage = null;

        const accident = this.getCurrentAccident();
        const bus = this.getCurrentBus();

        if (!this.internalId) {
            // TODO: Show 404 page instead of this
            this.toastService.show('Une erreur est survenue', 'error');
            return;
        }

        this.interventionService
            .updateIntervention({
                id: this.internalId,
                ...this.form.getRawValue(),
                accident: accident,
                bus: bus,
            })
            .subscribe({
                next: () => {
                    this.toastService.show(
                        'Intervention enregistrée avec succès',
                        'success'
                    );
                },
                error: (e: HttpErrorResponse) => {
                    if (e.status !== 404 && typeof e.error === 'string') {
                        this.errorMessage = e.error;
                    } else {
                        this.errorMessage =
                            "Une erreur est survenue lors de l'enregistrement de l'intervention.";
                    }

                    console.error(
                        "Erreur lors de l'enregistrement de l'intervention :",
                        e
                    );
                },
            });
    }

    private getCurrentAccident(): AccidentId | null {
        const value = this.form.controls.accident.value;
        if (value !== 'Aucun') {
            const [year, noSeq] = value.split('#').map(Number);
            return { year, noSeq };
        }
        return null;
    }

    private getCurrentBus() {
        const [number, registration] =
            this.form.controls.bus.value.split(' - ');
        return { number: Number(number), registration };
    }

    delete(id: number) {
        if (!confirm('Voulez-vous vraiment supprimer cette intervention ?')) {
            return;
        }
        this.interventionService.delete(id).subscribe({
            next: () => {
                this.router.navigate(['interventions']);
            },
            error: (e) => {
                console.error(e);
                this.toastService.show(
                    "Impossible de supprimer l'intervention",
                    'error'
                );
            },
        });
    }
}

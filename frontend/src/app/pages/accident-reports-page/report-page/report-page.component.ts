import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
    FormArray,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldComponent } from '../../../components/field/field.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { ToastService } from '../../../components/toast/toast.service';
import { RouteSummary } from '../../routes-page/route';
import { ExistingThirdParty } from '../../third-parties-page/third-party';
import { AccidentId, Validation, Weather } from '../accident';
import { AccidentService } from '../accident.service';
import { ActionButtonComponent } from './action-button/action-button.component';
import { RoutePickerComponent } from './route-picker/route-picker.component';
import { ThirdPartyPickerComponent } from './third-party-picker/third-party-picker.component';
import { ValidationFormComponent } from './validation-form/validation-form.component';

@Component({
    selector: 'app-report-page',
    imports: [
        ReactiveFormsModule,
        FieldComponent,
        HeaderComponent,
        ActionButtonComponent,
        RoutePickerComponent,
        ThirdPartyPickerComponent,
        ValidationFormComponent,
    ],
    templateUrl: './report-page.component.html',
    styleUrls: ['./report-page.component.css'],
})
export class ReportPageComponent {
    reportForm = new FormGroup({
        date: new FormControl(new Date().toJSON().slice(0, 10), {
            nonNullable: true,
        }),
        time: new FormControl(new Date().toJSON().slice(11, 16), {
            nonNullable: true,
        }),
        weather: new FormControl<Weather>('SUN', { nonNullable: true }),
        street: new FormControl('', { nonNullable: true }),
        postalCode: new FormControl('', { nonNullable: true }),
        city: new FormControl('', { nonNullable: true }),
        circumstancesSummary: new FormControl('', { nonNullable: true }),
        involves: new FormArray<
            FormGroup<{
                thirdPartyId: FormControl<number>;
                injuriesNature: FormControl<string>;
                materialDamage: FormControl<string>;
                amountPaid: FormControl<number | null>;
            }>
        >([]),
        occurs: new FormArray<
            FormGroup<{
                routeDrivingLicenceNumber: FormControl<string>;
                routeServiceSchedule: FormControl<string>;
                busDamages: FormControl<string>;
                driverDamages: FormControl<string>;
                driverSignature: FormControl<boolean>;
                controllerSignature: FormControl<boolean>;
            }>
        >([]),
    });

    thirdParties: ExistingThirdParty[] = [];
    routes: RouteSummary[] = [];
    moneyReceived: number | null = null;

    id: AccidentId | null = null;

    insuranceTransmissionDate: string | null = null;
    insuranceValidationDate: string | null = null;
    fileClosingDate: string | null = null;

    isLoading = false;
    errorMessage: string | null = null;

    weatherOptions = [
        { value: 'SUN', label: 'Soleil' },
        { value: 'SNOW', label: 'Neige' },
        { value: 'RAIN', label: 'Pluie' },
        { value: 'FOG', label: 'Brouillard' },
    ];

    get involves() {
        return this.reportForm.controls.involves;
    }

    get occurs() {
        return this.reportForm.controls.occurs;
    }

    constructor(
        private service: AccidentService,
        private route: ActivatedRoute,
        private router: Router,
        private toast: ToastService
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            // TODO: Detect if it's new page and show 404 page on conversion or 404 status error
            const year = Number(params.get('year'));
            const noSeq = Number(params.get('noSeq'));
            if (year && noSeq) {
                this.id = { year, noSeq };
                this.service.getReport(year, noSeq).subscribe({
                    next: (accident) => {
                        this.involves.clear();
                        this.thirdParties = [];
                        for (const involve of accident.involves) {
                            this.involves.push(
                                new FormGroup({
                                    thirdPartyId: new FormControl(0, {
                                        nonNullable: true,
                                    }),
                                    injuriesNature: new FormControl('', {
                                        nonNullable: true,
                                    }),
                                    materialDamage: new FormControl('', {
                                        nonNullable: true,
                                    }),
                                    amountPaid: new FormControl<number | null>(
                                        null
                                    ),
                                })
                            );
                            this.thirdParties.push(involve.thirdParty);
                        }
                        this.occurs.clear();
                        this.routes = [];
                        for (const occur of accident.occurs) {
                            this.occurs.push(
                                new FormGroup({
                                    routeDrivingLicenceNumber: new FormControl(
                                        '',
                                        {
                                            nonNullable: true,
                                        }
                                    ),
                                    routeServiceSchedule: new FormControl('', {
                                        nonNullable: true,
                                    }),
                                    busDamages: new FormControl('', {
                                        nonNullable: true,
                                    }),
                                    driverDamages: new FormControl('', {
                                        nonNullable: true,
                                    }),
                                    driverSignature: new FormControl(false, {
                                        nonNullable: true,
                                    }),
                                    controllerSignature: new FormControl(
                                        false,
                                        { nonNullable: true }
                                    ),
                                })
                            );
                            this.routes.push({
                                busNumber: occur.route.bus.number,
                                busRegistration: occur.route.bus.registration,
                                lineNumber: occur.route.line.number,
                                lineColor: occur.route.line.color,
                                driverName:
                                    occur.route.driver.firstName +
                                    ' ' +
                                    occur.route.driver.lastName,
                                drivingLicenceNumber:
                                    occur.route.driver.drivingLicenceNumber,
                                serviceSchedule: occur.route.serviceSchedule,
                            });
                        }

                        this.reportForm.patchValue(accident);

                        this.insuranceTransmissionDate =
                            accident.insuranceTransmissionDate;
                        this.insuranceValidationDate =
                            accident.insuranceValidationDate;
                        this.fileClosingDate = accident.fileClosingDate;
                        this.moneyReceived = accident.moneyReceived;

                        if (
                            this.insuranceTransmissionDate ||
                            this.insuranceValidationDate ||
                            this.fileClosingDate
                        ) {
                            this.reportForm.disable();
                        }
                    },
                    error: (e) => {
                        console.error(e);
                        this.toast.show(
                            "Impossible de charger la déclaration d'accident",
                            'error'
                        );
                    },
                });
            }
        });
    }

    onSubmit(): void {
        if (this.reportForm.invalid) {
            this.errorMessage = 'Veuillez remplir tous les champs requis.';
            return;
        }

        this.isLoading = true;
        this.errorMessage = null;

        const sub = {
            next: () => {
                this.isLoading = false;
                this.toast.show(
                    "Déclaration d'accident envoyée avec succès",
                    'success'
                );
            },
            error: (e: HttpErrorResponse) => {
                this.isLoading = false;

                if (e.status !== 404 && typeof e.error === 'string') {
                    this.errorMessage = e.error;
                } else {
                    this.errorMessage =
                        "Une erreur est survenue lors de l'envoi.";
                }

                console.error("Erreur lors de l'envoi de la déclaration :", e);
            },
        };

        if (this.id) {
            this.service
                .updateReport(this.reportForm.getRawValue(), this.id)
                .subscribe(sub);
        } else {
            this.service
                .sendReport(this.reportForm.getRawValue())
                .subscribe(sub);
        }
    }

    remove(id: AccidentId) {
        if (!confirm('Voulez-vous vraiment supprimer cette déclaration ?')) {
            return;
        }
        this.service.delete(id.year, id.noSeq).subscribe({
            next: () => {
                this.router.navigate(['accident-reports']);
            },
            error: (e) => {
                console.error(e);
                this.toast.show(
                    "Impossible de supprimer la déclaration d'accident",
                    'error'
                );
            },
        });
    }

    send(id: AccidentId) {
        this.service.send(id).subscribe({
            next: () => {
                this.insuranceTransmissionDate = new Date().toISOString();
            },
            error: (e) => {
                console.error(e);
                this.toast.show(
                    "Impossible d'envoyer la déclaration d'accident à l'assurance",
                    'error'
                );
            },
        });
    }

    validate(validation: Validation) {
        this.moneyReceived = validation.moneyReceived;
        for (let i = 0; i < validation.involves.length; i++) {
            this.involves.controls[i].controls.amountPaid.setValue(
                validation.involves[i].amountPaid
            );
        }
        this.insuranceValidationDate = new Date().toISOString();
    }

    close(id: AccidentId) {
        this.service.close(id).subscribe({
            next: () => {
                this.fileClosingDate = new Date().toISOString();
            },
            error: (e) => {
                console.error(e);
                this.toast.show(
                    "Impossible de clore la déclaration d'accident",
                    'error'
                );
            },
        });
    }

    toLocalDate(date: string) {
        return new Date(date).toLocaleDateString();
    }

    toLocalDateTime(date: string) {
        return new Date(date).toLocaleString(undefined, {
            dateStyle: 'long',
            timeStyle: 'short',
        });
    }

    getCurrency(value: number) {
        return value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'EUR',
        });
    }

    linkRoute(route: RouteSummary) {
        this.occurs.push(
            new FormGroup({
                routeDrivingLicenceNumber: new FormControl(
                    route.drivingLicenceNumber,
                    { nonNullable: true }
                ),
                routeServiceSchedule: new FormControl(route.serviceSchedule, {
                    nonNullable: true,
                }),
                busDamages: new FormControl('', { nonNullable: true }),
                driverDamages: new FormControl('', { nonNullable: true }),
                driverSignature: new FormControl(false, { nonNullable: true }),
                controllerSignature: new FormControl(false, {
                    nonNullable: true,
                }),
            })
        );
        this.routes.push(route);
    }

    linkThirdParty(thirdParty: ExistingThirdParty) {
        this.involves.push(
            new FormGroup({
                thirdPartyId: new FormControl(thirdParty.id, {
                    nonNullable: true,
                }),
                injuriesNature: new FormControl('', { nonNullable: true }),
                materialDamage: new FormControl('', { nonNullable: true }),
                amountPaid: new FormControl<number | null>(null),
            })
        );
        this.thirdParties.push(thirdParty);
    }
}

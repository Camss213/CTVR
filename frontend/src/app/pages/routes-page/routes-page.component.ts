import { AsyncPipe } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { BusPickerComponent } from '../../components/bus-picker/bus-picker.component';
import { ToastService } from '../../components/toast/toast.service';
import { DriverPickerComponent } from './driver-picker/driver-picker.component';
import { LinePickerComponent } from './line-picker/line-picker.component';
import { RouteSummary, SelectedRoute } from './route';
import { RouteService } from './route.service';

@Component({
    selector: 'app-routes-page',
    imports: [
        BusPickerComponent,
        FormsModule,
        AsyncPipe,
        LinePickerComponent,
        DriverPickerComponent,
    ],
    templateUrl: './routes-page.component.html',
    styleUrl: './routes-page.component.css',
})
export class RoutesPageComponent {
    routes$?: Observable<RouteSummary[]>;
    opened = false;

    selected = this.newBus();

    constructor(private service: RouteService, private toast: ToastService) {
        this.refresh();
    }

    private newBus(): SelectedRoute {
        return {
            serviceSchedule: '',
            driver: null,
            line: null,
            bus: null,
        };
    }

    refresh() {
        this.routes$ = this.service.getList().pipe(
            tap({
                error: (e) => {
                    console.error(e);

                    this.toast.show(
                        'Impossible de charger les arrêts',
                        'error'
                    );
                },
            })
        );
    }

    @HostListener('window:keyup.escape')
    handleKeyUp() {
        this.opened = false;
    }

    select(route: RouteSummary) {
        this.selected = {
            old: {
                drivingLicenceNumber: route.drivingLicenceNumber,
                serviceSchedule: route.serviceSchedule,
            },
            serviceSchedule: route.serviceSchedule,
            bus: {
                number: route.busNumber,
                registration: route.busRegistration,
            },
            driver: {
                drivingLicenceNumber: route.drivingLicenceNumber,
                name: route.driverName,
            },
            line: {
                color: route.lineColor,
                number: route.lineNumber,
            },
        };
        this.opened = true;
    }

    new() {
        this.selected = this.newBus();
        this.opened = true;
    }

    onSubmit() {
        const { driver, bus, line, serviceSchedule, old } = this.selected;

        if (!driver || !bus || !line || !serviceSchedule) {
            this.toast.show('Veuillez remplir tous les champs', 'error');
            return;
        }

        const route = {
            bus,
            line,
            serviceSchedule,
            drivingLicenceNumber: driver.drivingLicenceNumber,
        };

        if (old) {
            this.service
                .update(route, old.drivingLicenceNumber, old.serviceSchedule)
                .subscribe({
                    next: () => {
                        this.toast.show(
                            'Parcours modifié avec succès',
                            'success'
                        );
                        this.selected.old = {
                            drivingLicenceNumber: driver.drivingLicenceNumber,
                            serviceSchedule,
                        };
                        this.refresh();
                        this.opened = false;
                    },
                    error: (e) => {
                        console.error(e);

                        this.toast.show(
                            'Impossible de modifier ce parcours',
                            'error'
                        );
                    },
                });
        } else {
            this.service.create(route).subscribe({
                next: () => {
                    this.toast.show('Parcours créé avec succès', 'success');
                    this.selected.old = {
                        drivingLicenceNumber: driver.drivingLicenceNumber,
                        serviceSchedule,
                    };
                    this.refresh();
                    this.opened = false;
                },
                error: (e) => {
                    console.error(e);

                    this.toast.show('Impossible de créer ce parcours', 'error');
                },
            });
        }
    }

    delete() {
        if (!confirm('Voulez-vous vraiment supprimer ce parcours ?')) {
            return;
        }
        if (this.selected.old) {
            this.service
                .delete(
                    this.selected.old.drivingLicenceNumber,
                    this.selected.old.serviceSchedule
                )
                .subscribe({
                    next: () => {
                        this.toast.show(
                            'Parcours supprimé avec succès',
                            'success'
                        );
                        this.selected = this.newBus();
                        this.refresh();
                        this.opened = false;
                    },
                    error: (e) => {
                        console.error(e);

                        this.toast.show(
                            'Impossible de supprimer le parcours',
                            'error'
                        );
                    },
                });
        }
    }

    getTime(date: string) {
        return new Date(date).toLocaleTimeString(undefined, {
            timeStyle: 'short',
        });
    }

    getDate(date: string) {
        return new Date(date).toLocaleDateString(undefined, {});
    }
}

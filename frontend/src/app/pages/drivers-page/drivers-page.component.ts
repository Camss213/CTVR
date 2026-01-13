import { AsyncPipe } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { ToastService } from '../../components/toast/toast.service';
import { DriverSummary } from './driver';
import { DriverService } from './driver.service';

@Component({
    selector: 'app-drivers-page',
    imports: [ReactiveFormsModule, AsyncPipe],
    templateUrl: './drivers-page.component.html',
    styleUrl: './drivers-page.component.css',
})
export class DriversPageComponent {
    form = new FormGroup({
        oldDrivingLicenceNumber: new FormControl('', { nonNullable: true }),
        drivingLicenceNumber: new FormControl('', { nonNullable: true }),
        drivingLicenceDate: new FormControl('', { nonNullable: true }),
        drivingLicenceIssueCity: new FormControl('', { nonNullable: true }),
        takingOfficeDate: new FormControl('', { nonNullable: true }),
        lastName: new FormControl('', { nonNullable: true }),
        firstName: new FormControl('', { nonNullable: true }),
        birthday: new FormControl('', { nonNullable: true }),
        phoneNumber: new FormControl('', { nonNullable: true }),
        email: new FormControl('', { nonNullable: true }),
        address: new FormControl('', { nonNullable: true }),
        postalCode: new FormControl('', { nonNullable: true }),
        city: new FormControl('', { nonNullable: true }),
        user: new FormGroup({ id: new FormControl(0, { nonNullable: true }) }),
    });

    drivers$?: Observable<DriverSummary[]>;
    opened: boolean = false;

    constructor(private service: DriverService, private toast: ToastService) {
        this.reload();
    }

    private reload() {
        this.drivers$ = this.service.getList().pipe(
            tap({
                error: (e) => {
                    console.error(e);
                    this.toast.show(
                        'Impossible de récupérer les conducteurs',
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

    onSelect(summary: DriverSummary) {
        this.service.get(summary.drivingLicenceNumber).subscribe({
            next: (driver) => {
                // TODO: show username and remove role then use setValue without username
                this.opened = true;
                this.form.patchValue({
                    ...driver,
                    oldDrivingLicenceNumber: driver.drivingLicenceNumber,
                });
            },
            error: (e) => {
                console.error(e);
                this.toast.show('Impossible de charger le conducteur', 'error');
            },
        });
    }

    newDriver() {
        this.form.reset();
        this.opened = true;
    }

    onDelete() {
        if (!confirm('Voulez-vous vraiment supprimer ce conducteur ?')) {
            return;
        }
        this.service
            .delete(this.form.controls.oldDrivingLicenceNumber.value)
            .subscribe({
                next: () => {
                    this.toast.show('Conducteur supprimé', 'success');
                    this.opened = false;
                    this.form.reset();

                    this.reload();
                },
                error: (e) => {
                    console.error(e);
                    this.toast.show(
                        'Impossible de supprimer le conducteur',
                        'error'
                    );
                },
            });
    }

    onSubmit() {
        if (this.form.invalid) {
            this.toast.show(
                'Veuillez remplir tous les champs requis.',
                'error'
            );
            return;
        }
        const { oldDrivingLicenceNumber, ...driver } = this.form.getRawValue();
        if (oldDrivingLicenceNumber) {
            this.service.update(driver, oldDrivingLicenceNumber).subscribe({
                next: () => {
                    this.toast.show('Conducteur mis à jour', 'success');
                    this.opened = false;

                    this.reload();
                },
                error: (e) => {
                    console.error(e);
                    this.toast.show(
                        'Impossible de mettre à jour le conducteur',
                        'error'
                    );
                },
            });
        } else {
            this.service.create(driver).subscribe({
                next: () => {
                    this.toast.show('Conducteur créé', 'success');
                    this.opened = false;

                    this.reload();
                },
                error: (e) => {
                    console.error(e);
                    this.toast.show(
                        'Impossible de créer le conducteur',
                        'error'
                    );
                },
            });
        }
    }
}

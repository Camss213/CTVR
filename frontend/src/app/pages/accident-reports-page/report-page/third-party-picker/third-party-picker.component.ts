import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { FieldComponent } from '../../../../components/field/field.component';
import { ToastService } from '../../../../components/toast/toast.service';
import {
    ExistingThirdParty,
    ThirdParty,
} from '../../../third-parties-page/third-party';
import { ThirdPartyService } from '../../../third-parties-page/third-party.service';

@Component({
    selector: 'app-third-party-picker',
    imports: [DialogComponent, ReactiveFormsModule, FieldComponent],
    templateUrl: './third-party-picker.component.html',
    styleUrl: './third-party-picker.component.css',
})
export class ThirdPartyPickerComponent {
    @Output() selected = new EventEmitter<ExistingThirdParty>();
    @ViewChild('dialog') dialog!: DialogComponent;

    form = new FormGroup({
        id: new FormControl<number | null>(null),
        firstName: new FormControl('', { nonNullable: true }),
        lastName: new FormControl('', { nonNullable: true }),
        birthDate: new FormControl('', { nonNullable: true }),
        address: new FormControl('', { nonNullable: true }),
        postalCode: new FormControl('', { nonNullable: true }),
        city: new FormControl('', { nonNullable: true }),
    });

    thirdParties?: ThirdParty[];

    constructor(
        private thirdPartyService: ThirdPartyService,
        private toast: ToastService
    ) {
        this.thirdPartyService.getAll().subscribe({
            next: (tps) => {
                this.thirdParties = tps;
            },
            error: (e) => {
                console.error(e);
                this.toast.show('Impossible de charger les tiers', 'error');
            },
        });
    }

    show() {
        this.dialog.show();
    }

    onFirstNameInput(e: Event) {
        if (e instanceof InputEvent) {
            if (this.form.controls.id.value !== null) {
                this.form.controls.id.setValue(null);
                this.form.enable();
            }
        } else {
            const firstName = (e.target as HTMLInputElement).value;
            const thirdParty = this.thirdParties?.find(
                (tp) => tp.firstName === firstName
            );
            if (thirdParty) {
                this.select(thirdParty);
            }
        }
    }

    onLastNameInput(e: Event) {
        if (e instanceof InputEvent) {
            if (this.form.controls.id.value !== null) {
                this.form.controls.id.setValue(null);
                this.form.enable();
            }
        } else {
            const lastName = (e.target as HTMLInputElement).value;
            const thirdParty = this.thirdParties?.find(
                (tp) => tp.lastName === lastName
            );
            if (thirdParty) {
                this.select(thirdParty);
            }
        }
    }

    private select(thirdParty: ThirdParty) {
        this.form.setValue(thirdParty);
        this.form.disable();
        this.form.controls.firstName.enable();
        this.form.controls.lastName.enable();
    }

    onSubmit() {
        const data = this.form.getRawValue();

        if (data.id !== null) {
            this.close(data as ExistingThirdParty);
        } else {
            if (this.form.invalid) {
                this.toast.show('Veuillez remplir tous les champs', 'error');
                return;
            }

            this.thirdPartyService.save(data).subscribe((thirdPartyId) => {
                data.id = Number(thirdPartyId);
                this.close(data as ExistingThirdParty);
            });
        }
    }

    private close(thirdParty: ExistingThirdParty) {
        this.selected.emit(thirdParty);
        this.dialog.close();
    }

    onClose() {
        this.form.reset();
        this.form.enable();
    }
}

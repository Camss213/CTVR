import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {
    FormArray,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
} from '@angular/forms';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { FieldComponent } from '../../../../components/field/field.component';
import { ToastService } from '../../../../components/toast/toast.service';
import { AccidentId, Validation } from '../../accident';
import { AccidentService } from '../../accident.service';

@Component({
    selector: 'app-validation-form',
    imports: [DialogComponent, ReactiveFormsModule, FieldComponent],
    templateUrl: './validation-form.component.html',
    styleUrl: './validation-form.component.css',
})
export class ValidationFormComponent {
    @Output() sended = new EventEmitter<Validation>();
    @ViewChild('dialog') dialog!: DialogComponent;

    id: AccidentId | null = null;

    form = new FormGroup({
        moneyReceived: new FormControl(0, { nonNullable: true }),
        involves: new FormArray<
            FormGroup<{
                thirdPartyId: FormControl<number>;
                thirdPartyName: FormControl<string>;
                amountPaid: FormControl<number>;
            }>
        >([]),
    });

    constructor(
        private toast: ToastService,
        private service: AccidentService
    ) {}

    show(
        id: AccidentId,
        thirdParties: { id: number; firstName: string; lastName: string }[]
    ) {
        this.form.reset();
        this.form.controls.involves.clear();
        for (const thirdParty of thirdParties) {
            this.form.controls.involves.push(
                new FormGroup({
                    thirdPartyId: new FormControl(thirdParty.id, {
                        nonNullable: true,
                    }),
                    thirdPartyName: new FormControl(
                        thirdParty.firstName + ' ' + thirdParty.lastName,
                        { nonNullable: true }
                    ),
                    amountPaid: new FormControl(0, { nonNullable: true }),
                })
            );
        }

        this.id = id;
        this.dialog.show();
    }

    onSubmit() {
        if (!this.id) {
            this.dialog.close();
            return;
        }

        if (this.form.invalid) {
            this.toast.show('Veuillez remplir tous les champs', 'error');
            return;
        }

        const data = this.form.getRawValue();

        this.service.validate(this.id, data).subscribe({
            next: () => {
                this.sended.emit(data);
                this.dialog.close();
            },
            error: (e) => {
                console.error(e);
                this.toast.show(
                    "Impossible de valider la déclaration d'accident",
                    'error'
                );
            },
        });
    }
}

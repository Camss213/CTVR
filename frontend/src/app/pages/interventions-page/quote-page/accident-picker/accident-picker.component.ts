import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { ToastService } from '../../../../components/toast/toast.service';
import { AccidentId } from '../../../accident-reports-page/accident';
import { AccidentService } from '../../../accident-reports-page/accident.service';

@Component({
    selector: 'app-accident-picker',
    imports: [AsyncPipe, DialogComponent],
    templateUrl: './accident-picker.component.html',
    styleUrl: './accident-picker.component.css',
})
export class AccidentPickerComponent {
    @Output() selected = new EventEmitter<AccidentId | null>();
    @ViewChild('dialog') dialog!: DialogComponent;

    accidentIds$!: Observable<AccidentId[]>;

    constructor(private service: AccidentService, private toast: ToastService) {
        this.accidentIds$ = this.service.getAccidentIds().pipe(
            tap({
                error: (e) => {
                    console.error(e);
                    this.toast.show(
                        'Impossible de charger les accidents',
                        'error'
                    );
                },
            })
        );
    }

    show() {
        this.dialog.show();
    }

    select(accident: AccidentId | null) {
        this.dialog.close();
        this.selected.emit(accident);
    }
}

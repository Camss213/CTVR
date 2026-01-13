import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DialogComponent } from '../../../components/dialog/dialog.component';
import { ToastService } from '../../../components/toast/toast.service';
import { Stop } from '../../stops-page/stop';
import { StopService } from '../../stops-page/stop.service';

@Component({
    selector: 'app-stop-picker',
    imports: [AsyncPipe, DialogComponent],
    templateUrl: './stop-picker.component.html',
    styleUrl: './stop-picker.component.css',
})
export class StopPickerComponent {
    @Output() selected = new EventEmitter<Stop>();
    @ViewChild('dialog') dialog!: DialogComponent;

    stops$!: Observable<Stop[]>;

    constructor(private service: StopService, private toast: ToastService) {
        this.stops$ = this.service.getStops().pipe(
            tap({
                error: (e) => {
                    console.error(e);
                    this.toast.show(
                        'Impossible de charger les parcours',
                        'error'
                    );
                },
            })
        );
    }

    show() {
        this.dialog.show();
    }

    select(stop: Stop) {
        this.dialog.close();
        this.selected.emit(stop);
    }

    toLocalDate(date: string) {
        return new Date(date).toLocaleString(undefined, {
            timeStyle: 'short',
            dateStyle: 'medium',
        });
    }
}

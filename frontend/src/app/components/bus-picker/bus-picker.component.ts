import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BusIdentity } from '../../pages/bus-page/bus';
import { BusService } from '../../pages/bus-page/bus.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ToastService } from '../toast/toast.service';

@Component({
    selector: 'app-bus-picker',
    imports: [AsyncPipe, DialogComponent],
    templateUrl: './bus-picker.component.html',
    styleUrl: './bus-picker.component.css',
})
export class BusPickerComponent {
    @Output() selected = new EventEmitter<BusIdentity>();
    @ViewChild('dialog') dialog!: DialogComponent;

    buses$!: Observable<BusIdentity[]>;

    constructor(private service: BusService, private toast: ToastService) {
        this.buses$ = this.service.getIdentities().pipe(
            tap({
                error: (e) => {
                    console.error(e);
                    this.toast.show('Impossible de charger les bus', 'error');
                },
            })
        );
    }

    show() {
        this.dialog.show();
    }

    select(bus: BusIdentity) {
        this.dialog.close();
        this.selected.emit(bus);
    }
}

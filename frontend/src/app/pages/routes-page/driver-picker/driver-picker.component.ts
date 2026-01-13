import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DialogComponent } from '../../../components/dialog/dialog.component';
import { ToastService } from '../../../components/toast/toast.service';
import { DriverIdentity } from '../../drivers-page/driver';
import { DriverService } from '../../drivers-page/driver.service';

@Component({
    selector: 'app-driver-picker',
    imports: [AsyncPipe, DialogComponent],
    templateUrl: './driver-picker.component.html',
    styleUrl: './driver-picker.component.css',
})
export class DriverPickerComponent {
    @Output() selected = new EventEmitter<DriverIdentity>();
    @ViewChild('dialog') dialog!: DialogComponent;

    drivers$!: Observable<DriverIdentity[]>;

    constructor(private service: DriverService, private toast: ToastService) {
        this.drivers$ = this.service.getList().pipe(
            tap({
                error: (e) => {
                    console.error(e);
                    this.toast.show(
                        'Impossible de charger les conducteurs',
                        'error'
                    );
                },
            })
        );
    }

    show() {
        this.dialog.show();
    }

    select(driver: DriverIdentity) {
        this.dialog.close();
        this.selected.emit(driver);
    }
}

import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { ToastService } from '../../../../components/toast/toast.service';
import { RouteSummary } from '../../../routes-page/route';
import { AccidentService } from '../../accident.service';

@Component({
    selector: 'app-route-picker',
    imports: [AsyncPipe, DialogComponent],
    templateUrl: './route-picker.component.html',
    styleUrl: './route-picker.component.css',
})
export class RoutePickerComponent {
    @Output() selected = new EventEmitter<RouteSummary>();
    @ViewChild('dialog') dialog!: DialogComponent;

    routes$!: Observable<RouteSummary[]>;

    constructor(private service: AccidentService, private toast: ToastService) {
        this.routes$ = this.service.getRoutes().pipe(
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

    select(route: RouteSummary) {
        this.dialog.close();
        this.selected.emit(route);
    }

    toLocalDate(date: string) {
        return new Date(date).toLocaleString(undefined, {
            timeStyle: 'short',
            dateStyle: 'medium',
        });
    }
}

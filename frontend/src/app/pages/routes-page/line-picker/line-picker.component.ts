import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DialogComponent } from '../../../components/dialog/dialog.component';
import { ToastService } from '../../../components/toast/toast.service';
import { Line } from '../../lines-page/line';
import { LineService } from '../../lines-page/line.service';

@Component({
    selector: 'app-line-picker',
    imports: [AsyncPipe, DialogComponent],
    templateUrl: './line-picker.component.html',
    styleUrl: './line-picker.component.css',
})
export class LinePickerComponent {
    @Output() selected = new EventEmitter<Line>();
    @ViewChild('dialog') dialog!: DialogComponent;

    lines$!: Observable<Line[]>;

    constructor(private service: LineService, private toast: ToastService) {
        this.lines$ = this.service.getList().pipe(
            tap({
                error: (e) => {
                    console.error(e);
                    this.toast.show(
                        'Impossible de charger les lignes',
                        'error'
                    );
                },
            })
        );
    }

    show() {
        this.dialog.show();
    }

    select(line: Line) {
        this.dialog.close();
        this.selected.emit(line);
    }
}

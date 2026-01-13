import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../../components/toast/toast.service';
import { AccidentSummary } from '../accident';
import { AccidentService } from '../accident.service';

@Component({
    selector: 'app-accident-report-preview',
    imports: [RouterLink],
    templateUrl: './accident-report-preview.component.html',
    styleUrl: './accident-report-preview.component.css',
})
export class AccidentReportPreviewComponent {
    @Input({ required: true }) report!: AccidentSummary;
    @Output() reload = new EventEmitter<never>();

    constructor(
        private service: AccidentService,
        private toast: ToastService
    ) {}

    remove(e: MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
        if (!confirm('Voulez-vous vraiment supprimer cette déclaration ?')) {
            return;
        }
        this.service.delete(this.report.year, this.report.noSeq).subscribe({
            next: () => {
                this.reload.emit();
            },
            error: (e) => {
                console.error(e);
                this.toast.show(
                    "Impossible de supprimer la déclaration d'accident",
                    'error'
                );
            },
        });
    }

    toDate(date: string) {
        return new Date(date).toLocaleString(undefined, {
            dateStyle: 'long',
            timeStyle: 'short',
        });
    }
}

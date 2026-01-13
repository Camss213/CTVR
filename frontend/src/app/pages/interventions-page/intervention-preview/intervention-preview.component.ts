import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastService } from '../../../components/toast/toast.service';
import { InterventionSummary } from '../intervention';
import { InterventionService } from '../intervention.service';

@Component({
    selector: 'app-intervention-preview',
    imports: [RouterLink],
    templateUrl: './intervention-preview.component.html',
    styleUrl: './intervention-preview.component.css',
})
export class InterventionPreviewComponent {
    @Input({ required: true }) intervention!: InterventionSummary;
    @Output() reload = new EventEmitter<never>();

    constructor(
        private service: InterventionService,
        private toast: ToastService
    ) {}

    getLocalDate(date: string) {
        return new Date(date).toLocaleDateString();
    }

    remove(e: MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
        if (!confirm('Voulez-vous vraiment supprimer cette intervention ?')) {
            return;
        }
        this.service.delete(this.intervention.id).subscribe({
            next: () => {
                this.reload.emit();
            },
            error: (e) => {
                console.error(e);
                this.toast.show(
                    "Impossible de supprimer l'intervention",
                    'error'
                );
            },
        });
    }
}

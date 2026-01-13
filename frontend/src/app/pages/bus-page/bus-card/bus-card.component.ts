import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../components/toast/toast.service';
import { Bus } from '../bus';
import { BusService } from '../bus.service';

@Component({
    selector: 'app-bus-card',
    imports: [FormsModule],
    templateUrl: './bus-card.component.html',
    styleUrl: './bus-card.component.css',
})
export class BusCardComponent {
    aBus: Bus & { oldRegistration: string } = {
        oldRegistration: '',
        registration: '',
        implementationDate: new Date().toISOString().slice(0, 10),
        model: '',
        number: 0,
        state: 'IN_SERVICE',
    };
    // TODO: Add latest interventions

    @Input()
    set bus(bus: Bus) {
        this.aBus = {
            oldRegistration: bus.registration,
            ...bus,
        };
    }

    @Output() reload = new EventEmitter<void>();
    @Output() close = new EventEmitter<void>();
    @Input() new = false;

    constructor(private service: BusService, private toast: ToastService) {}

    onDelete() {
        if (!confirm('Voulez-vous vraiment supprimer ce bus ?')) {
            return;
        }
        this.service.delete(this.aBus.registration).subscribe({
            next: () => {
                this.reload.emit();
            },
            error: (e) => {
                console.error(e);

                this.toast.show('Impossible de supprimer ce bus', 'error');
            },
        });
    }

    onSubmit() {
        if (
            !this.aBus.registration ||
            !this.aBus.model ||
            !this.aBus.number ||
            !this.aBus.implementationDate
        ) {
            this.toast.show('Veuillez remplir tous les champs', 'error');

            return;
        }

        const sub = {
            next: () => {
                this.aBus.oldRegistration = bus.registration;
                if (this.new) {
                    this.close.emit();
                }
                this.reload.emit();
            },
            error: (e: HttpErrorResponse) => {
                console.error(e);

                this.toast.show('Impossible de sauvegarder ce bus', 'error');
            },
        };

        const { oldRegistration, ...bus } = this.aBus;
        if (oldRegistration === '') {
            this.service.create(bus).subscribe(sub);
        } else {
            this.service.update(this.aBus, oldRegistration).subscribe(sub);
        }
    }
}

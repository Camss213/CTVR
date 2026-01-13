import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../components/toast/toast.service';
import { ThirdParty } from '../third-party';
import { ThirdPartyService } from '../third-party.service';

@Component({
    selector: 'app-third-party-card',
    imports: [FormsModule],
    templateUrl: './third-party-card.component.html',
    styleUrl: './third-party-card.component.css',
})
export class ThirdPartyCardComponent {
    @Input() thirdParty: ThirdParty = {
        id: null,
        firstName: '',
        lastName: '',
        birthDate: '',
        address: '',
        postalCode: '',
        city: '',
    };

    @Output() reload = new EventEmitter<void>();
    @Output() close = new EventEmitter<void>();
    @Input() new = false;

    constructor(
        private service: ThirdPartyService,
        private toast: ToastService
    ) {}

    onDelete() {
        if (!confirm('Voulez-vous vraiment supprimer ce tiers ?')) {
            return;
        }
        this.service.delete(this.thirdParty.id!).subscribe({
            next: () => {
                this.reload.emit();
            },
            error: (e) => {
                console.error(e);

                this.toast.show('Impossible de supprimer ce tiers', 'error');
            },
        });
    }

    onSubmit() {
        if (
            !this.thirdParty.firstName ||
            !this.thirdParty.lastName ||
            !this.thirdParty.birthDate ||
            !this.thirdParty.address ||
            !this.thirdParty.postalCode ||
            !this.thirdParty.city
        ) {
            this.toast.show('Veuillez remplir tous les champs', 'error');
            return;
        }

        this.service.save(this.thirdParty).subscribe({
            next: () => {
                if (this.new) {
                    this.close.emit();
                }
                this.reload.emit();
            },
            error: (e) => {
                console.error(e);
                this.toast.show('Impossible de sauvegarder ce tiers', 'error');
            },
        });
    }
}

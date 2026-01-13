import { AsyncPipe } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { ToastService } from '../../components/toast/toast.service';
import { Line } from '../lines-page/line';
import { Stop } from './stop';
import { StopService } from './stop.service';

@Component({
    selector: 'app-stops-page',
    imports: [AsyncPipe, FormsModule],
    templateUrl: './stops-page.component.html',
    styleUrl: './stops-page.component.css',
})
export class StopsPageComponent {
    stops$?: Observable<Stop[]>;

    opened = false;
    selected = this.getNewStop();

    constructor(private service: StopService, private toast: ToastService) {
        this.refresh();
    }

    refresh() {
        this.stops$ = this.service.getStops().pipe(
            tap({
                error: (e) => {
                    this.toast.show(
                        'Impossible de charger les arrêts',
                        'error'
                    );
                },
            })
        );
    }

    @HostListener('window:keyup.escape')
    handleKeyUp() {
        this.opened = false;
    }

    getNewStop(): { oldName: string; name: string; lines: Line[] } {
        return {
            oldName: '',
            name: '',
            lines: [],
        };
    }

    new() {
        this.opened = true;
        this.selected = this.getNewStop();
    }

    select(stop: Stop) {
        this.service.getLines(stop.name).subscribe({
            next: (lines) => {
                this.opened = true;
                this.selected = {
                    oldName: stop.name,
                    name: stop.name,
                    lines: lines,
                };
            },
            error: (e) => {
                console.error(e);
                this.toast.show('Impossible de charger les lignes', 'error');
            },
        });
    }

    delete() {
        if (!confirm('Voulez-vous vraiment supprimer cet arrêt ?')) {
            return;
        }
        this.service.delete(this.selected.oldName).subscribe({
            next: () => {
                this.toast.show('Arrêt supprimé avec succès', 'success');
                this.opened = false;
                this.selected = this.getNewStop();
                this.refresh();
            },
            error: (e) => {
                console.error(e);
                this.toast.show("Impossible de supprimer l'arrêt", 'error');
            },
        });
    }

    save() {
        const { lines, oldName, ...stop } = this.selected;

        if (oldName) {
            this.service.update(oldName, stop).subscribe({
                next: () => {
                    this.toast.show('Arrêt mis à jour avec succès', 'success');
                    this.refresh();
                    this.opened = false;
                    this.selected.oldName = stop.name;
                },
                error: (e) => {
                    console.error(e);
                    this.toast.show(
                        "Impossible de mettre à jour l'arrêt",
                        'error'
                    );
                },
            });
        } else {
            this.service.create(stop).subscribe({
                next: () => {
                    this.toast.show('Arrêt créé avec succès', 'success');
                    this.refresh();
                    this.selected.oldName = stop.name;
                },
                error: (e) => {
                    console.error(e);
                    this.toast.show("Impossible de créer l'arrêt", 'error');
                },
            });
        }
    }
}

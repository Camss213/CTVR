import { AsyncPipe } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { ToastService } from '../../components/toast/toast.service';
import { Stop } from '../stops-page/stop';
import { Line, LineSummary } from './line';
import { LineService } from './line.service';
import { StopPickerComponent } from './stop-picker/stop-picker.component';

interface LineWithStops extends Line {
    oldNumber: number;
    stops: Stop[] | null;
}

@Component({
    selector: 'app-lines-page',
    imports: [AsyncPipe, FormsModule, StopPickerComponent],
    templateUrl: './lines-page.component.html',
    styleUrl: './lines-page.component.css',
})
export class LinesPageComponent {
    lines$?: Observable<LineSummary[]>;

    selected = this.newLine();

    opened = false;

    constructor(private service: LineService, private toast: ToastService) {
        this.reload();
    }

    @HostListener('window:keyup.escape')
    handleKeyUp() {
        this.opened = false;
    }

    private reload() {
        this.lines$ = this.service.getList().pipe(
            tap({
                error: (e) => {
                    console.error(e);
                    this.toast.show(
                        'Impossible de récupérer les lignes',
                        'error'
                    );
                },
            })
        );
    }

    new() {
        this.selected = this.newLine();
        this.opened = true;
    }

    newLine(): LineWithStops {
        return {
            oldNumber: 0,
            number: 0,
            color: '',
            stops: [],
        };
    }

    select(line: LineSummary) {
        this.selected = {
            oldNumber: line.number,
            number: line.number,
            color: line.color,
            stops: null,
        };
        this.opened = true;
        this.refreshStop();
    }

    private refreshStop() {
        this.service.getStops(this.selected.oldNumber).subscribe({
            next: (stops) => {
                this.selected.stops = stops;
            },
            error: (e) => {
                console.error(e);
                this.toast.show(
                    'Impossible de récupérer les arrêts de la ligne',
                    'error'
                );
            },
        });
    }

    onDelete() {
        if (!confirm('Voulez-vous vraiment supprimer cette ligne ?')) {
            return;
        }
        this.service.delete(this.selected.oldNumber).subscribe({
            next: () => {
                this.toast.show('Ligne supprimée avec succès', 'success');
                this.selected = this.newLine();
                this.opened = false;
                this.reload();
            },
            error: (e) => {
                console.error(e);
                this.toast.show('Impossible de supprimer la ligne', 'error');
            },
        });
    }

    onSubmit() {
        const { stops, oldNumber, ...line } = this.selected;
        if (line.number < 1 || !Number.isInteger(line.number)) {
            this.toast.show("Le numéro de la ligne n'est pas correct", 'error');
        } else {
            if (oldNumber === 0) {
                this.service.create(line).subscribe({
                    next: () => {
                        this.toast.show('Ligne créée avec succès', 'success');
                        this.reload();
                        this.opened = false;
                        this.selected.oldNumber = line.number;
                    },
                    error: (e) => {
                        console.error(e);
                        this.toast.show(
                            'Impossible de créer la ligne',
                            'error'
                        );
                    },
                });
            } else {
                this.service.update(line, oldNumber).subscribe({
                    next: () => {
                        this.toast.show(
                            'Ligne mise à jour avec succès',
                            'success'
                        );
                        this.reload();
                        this.opened = false;
                        this.selected.oldNumber = line.number;
                    },
                    error: (e) => {
                        console.error(e);
                        this.toast.show(
                            'Impossible de mettre à jour la ligne',
                            'error'
                        );
                    },
                });
            }
        }
    }

    // upStop(i: number) {}

    // downStop(i: number) {}

    deleteStop(name: string) {
        this.service.removePass(this.selected.oldNumber, name).subscribe({
            next: () => {
                this.toast.show('Arrêt délié avec succès', 'success');
                this.refreshStop();
                this.reload();
            },
            error: (e) => {
                console.error(e);
                this.toast.show("Impossible de délier l'arrêt", 'error');
            },
        });
    }

    linkStop(stop: Stop) {
        this.service
            .addPass({
                lineNumber: this.selected.oldNumber,
                stopName: stop.name,
                position: this.selected.stops!.length,
            })
            .subscribe({
                next: () => {
                    this.toast.show('Arrêt lié avec succès', 'success');
                    this.refreshStop();
                    this.reload();
                },
                error: (e) => {
                    console.error(e);
                    this.toast.show("Impossible de lier l'arrêt", 'error');
                },
            });
    }
}

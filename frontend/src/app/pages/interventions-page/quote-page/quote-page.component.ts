import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BusPickerComponent } from '../../../components/bus-picker/bus-picker.component';
import { ToastService } from '../../../components/toast/toast.service';
import { AccidentId } from '../../accident-reports-page/accident';
import { BusIdentity } from '../../bus-page/bus';
import { BusService } from '../../bus-page/bus.service';
import { QuoteComponent, QuoteRow } from '../intervention';
import { InterventionService } from '../intervention.service';
import { AccidentPickerComponent } from './accident-picker/accident-picker.component';

const DEFAULT_ROW: QuoteRow = {
    code: '',
    quantity: 0,
    unitPrice: 0,
    label: '',
    type: 'WORKFORCE',
};

interface DatalistProps {
    position: { x: number; y: number };
    row: QuoteRow;
    reversed: boolean;
    type: 'code' | 'label';
}

@Component({
    selector: 'app-quote-page',
    imports: [AsyncPipe, AccidentPickerComponent, BusPickerComponent],
    templateUrl: './quote-page.component.html',
    styleUrl: './quote-page.component.css',
})
export class QuotePageComponent {
    date = new Date().toISOString().slice(0, 10);

    bus: BusIdentity | null = null;
    accidentId: AccidentId | null = null;

    rows: QuoteRow[] = [structuredClone(DEFAULT_ROW)];
    components$?: Observable<QuoteComponent[]>;

    private internalId: number | null = null;

    constructor(
        private service: InterventionService,
        private busService: BusService,
        private toast: ToastService
    ) {
        this.components$ = this.service.getComponents().pipe(
            tap({
                error: (e) => {
                    console.error(e);
                    this.toast.show(
                        "Impossible de récupérer les mains d'oeuvre et les fournitures",
                        'error'
                    );
                },
            })
        );
    }

    @Input()
    get id(): number | null {
        return this.internalId;
    }

    set id(interventionId: string) {
        const id = Number(interventionId);
        // TODO: Show 404 page on conversion or 404 status error
        if (id) {
            this.internalId = id;
            this.service.getQuote(id).subscribe({
                next: async (quote) => {
                    this.date = quote.date;
                    this.rows = [
                        ...quote.needs.map(
                            ({ hourNumber, hourlyRate, ...need }) =>
                                ({
                                    ...need,
                                    type: 'WORKFORCE',
                                    quantity: hourNumber,
                                    unitPrice: hourlyRate,
                                } as const)
                        ),
                        ...quote.uses.map(
                            (use) => ({ ...use, type: 'SUPPLY' } as const)
                        ),
                    ];

                    this.accidentId = quote.accidentId;

                    // Default bus to be enable to update the bus even if the request has failed
                    this.bus = {
                        registration: quote.busRegistration,
                        number: 0,
                    };
                    this.busService
                        .getIdentity(quote.busRegistration)
                        .subscribe({
                            next: (bus) => {
                                this.bus = bus;
                            },
                            error: (e) => {
                                console.error(e);
                                this.toast.show(
                                    'Impossible de charger le bus',
                                    'error'
                                );
                            },
                        });
                },
                error: (e) => {
                    console.error(e);
                    this.toast.show('Impossible de charger le devis', 'error');
                },
            });
        }
    }

    onSubmit(e: Event) {
        e.preventDefault();

        if (!this.bus) {
            this.toast.show('Veuillez sélectionner un bus', 'error');
            return;
        }

        const quote = {
            date: this.date,
            busRegistration: this.bus.registration,
            accidentId: this.accidentId,
            needs: this.rows
                .filter((row) => row.type === 'WORKFORCE')
                .map(({ type, unitPrice, quantity, ...need }) => ({
                    ...need,
                    hourlyRate: unitPrice,
                    hourNumber: quantity,
                })),
            uses: this.rows
                .filter((row) => row.type === 'SUPPLY')
                .map(({ type, ...use }) => use),
        };

        if (this.id) {
            this.service.updateQuote(quote, this.id).subscribe({
                next: () => {
                    this.toast.show('Devis enregistré avec succès', 'success');
                },
                error: (e) => {
                    console.error(e);
                    this.toast.show('Impossible de modifier le devis', 'error');
                },
            });
        } else {
            this.service.sendQuote(quote).subscribe({
                next: () => {
                    this.toast.show('Devis envoyé avec succès', 'success');
                },
                error: (e) => {
                    console.error(e);
                    this.toast.show("Impossible d'envoyer le devis", 'error');
                },
            });
        }
    }

    remove(id: number) {
        if (!confirm('Voulez-vous vraiment supprimer ce devis ?')) {
            return;
        }
        this.service.delete(id).subscribe({
            error: (e) => {
                console.error(e);
                this.toast.show(
                    "Impossible de supprimer l'intervention",
                    'error'
                );
            },
        });
    }

    get withoutTaxTotal() {
        return this.rows.reduce(
            (acc, row) => acc + row.quantity * row.unitPrice,
            0
        );
    }

    get withTaxTotal() {
        return Math.round(this.withoutTaxTotal * 120) / 100;
    }

    get taxTotal() {
        return Math.round(this.withoutTaxTotal * 20) / 100;
    }

    getCurrency(value: number) {
        return value.toLocaleString(undefined, {
            style: 'currency',
            currency: 'EUR',
        });
    }

    addRow() {
        this.rows.push(structuredClone(DEFAULT_ROW));
    }

    deleteRow(rowIndex: number) {
        this.rows.splice(rowIndex, 1);
    }

    updateCode(event: Event, row: QuoteRow) {
        const input = event.currentTarget as HTMLTableCellElement;
        const text = input.textContent || '';
        row.code = text;

        setTimeout(() => {
            row.code = text.replaceAll(/\s/g, '').trim().slice(0, 10);

            if (text !== row.code) {
                this.updateCaret(input);
            }
        });
    }

    updateLabel(event: Event, row: QuoteRow) {
        const input = event.currentTarget as HTMLTableCellElement;
        row.label = input.textContent || '';
    }

    updateType(event: Event, row: QuoteRow) {
        const input = event.currentTarget as HTMLSelectElement;
        if (input.value === 'WORKFORCE' || input.value === 'SUPPLY') {
            row.type = input.value;
        }
    }

    updatePrice(event: Event, row: QuoteRow) {
        this.updatePositiveFloat(
            event,
            row.unitPrice,
            (value) => (row.unitPrice = value)
        );
    }

    updateQuantity(event: Event, row: QuoteRow) {
        this.updatePositiveFloat(
            event,
            row.quantity,
            (value) => (row.quantity = value)
        );
    }

    increaseQuantity(row: QuoteRow) {
        row.quantity++;
    }

    decreaseQuantity(rowIndex: number) {
        if (this.rows[rowIndex].quantity > 0) {
            this.rows[rowIndex].quantity--;
        } else {
            this.rows.splice(rowIndex, 1);
        }
    }

    updatePositiveFloat(
        e: Event,
        oldValue: number,
        updater: (value: number) => void
    ) {
        const input = e.currentTarget as HTMLElement;
        const text = input.textContent || '';
        const formattedText = text
            .replaceAll(/\s/g, '')
            .replaceAll(',', '.')
            .trim();
        let value = Number(formattedText);

        // This update the text only if the value is different than before
        // When a bad number is entered the value is set to NaN so the text is updated
        // When a comma is entered the value is same as before so the text is not updated
        updater(value);

        // Wait for the text to be updated
        setTimeout(() => {
            // We restore the old value if the new one is invalid
            if (isNaN(value) || value < 0) {
                value = oldValue;
                updater(value);
            }

            if (text !== value.toLocaleString()) {
                this.updateCaret(input);
            }
        });
    }

    updateCaret(element: HTMLElement) {
        setTimeout(() => {
            const selection = window.getSelection();
            if (!selection) {
                return;
            }

            const range = document.createRange();
            range.setStart(
                element.childNodes[0],
                element.textContent?.length || 0
            );
            range.collapse(true);

            selection.removeAllRanges();
            selection.addRange(range);
        });
    }

    datalistProps: DatalistProps | null = null;

    onDatalistFocus(e: FocusEvent, row: QuoteRow, type: 'code' | 'label') {
        const input = e.currentTarget as HTMLTableCellElement;
        const rect = input.getBoundingClientRect();
        const reversed = rect.top < document.body.scrollHeight / 2;

        this.datalistProps = {
            reversed,
            position: { x: rect.left, y: reversed ? rect.bottom : rect.top },
            row,
            type,
        };
    }

    onDatalistBlur() {
        this.datalistProps = null;
    }

    onDatalistClick(component: QuoteComponent) {
        if (this.datalistProps === null) {
            return;
        }

        this.datalistProps.row.code = component.code;
        this.datalistProps.row.label = component.label;
        this.datalistProps.row.type = component.type;
        this.datalistProps.row.unitPrice = component.unitPrice;

        this.datalistProps = null;
    }

    linkAccident(accidentId: AccidentId | null) {
        this.accidentId = accidentId;
    }

    linkBus(bus: BusIdentity) {
        this.bus = bus;
    }
}

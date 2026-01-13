import { AccidentId } from '../accident-reports-page/accident';
import { BusIdentity } from '../bus-page/bus';

export interface Intervention {
    id: number;
    description: string;
    busEntranceDate: string | null;
    startRepairDate: string | null;
    endRepairDate: string | null;
    quoteDate: string;
    accident: AccidentId | null;
    bus: BusIdentity;
}

export interface InterventionSummary {
    id: number;
    description: string;
    busEntranceDate: string | null;
    startRepairDate: string | null;
    endRepairDate: string | null;
    accidentYear: number;
    accidentNoSeq: number;
    busRegistration: string;
    busNumber: number;
}

export interface QuoteComponent {
    code: string;
    label: string;
    unitPrice: number;
    type: 'WORKFORCE' | 'SUPPLY';
}

export interface QuoteRow extends QuoteComponent {
    quantity: number;
}

interface QuoteUse {
    code: string;
    label: string;
    quantity: number;
    unitPrice: number;
}

interface QuoteNeed {
    code: string;
    label: string;
    hourNumber: number;
    hourlyRate: number;
}

export interface Quote {
    date: string;
    busRegistration: string;
    accidentId: AccidentId | null;
    uses: QuoteUse[];
    needs: QuoteNeed[];
}

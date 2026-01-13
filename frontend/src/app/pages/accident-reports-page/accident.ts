import { BusIdentity } from '../bus-page/bus';
import { DriverIdentity } from '../drivers-page/driver';
import { Line } from '../lines-page/line';
import { AccidentRouteSummary } from '../routes-page/route';
import { ExistingThirdParty } from '../third-parties-page/third-party';

export interface AccidentId {
    noSeq: number;
    year: number;
}

export interface AccidentSummary extends AccidentId {
    date: string;
    time: string;
    routes: AccidentRouteSummary[];
    street: string;
    postalCode: string;
    city: string;
}

interface InvolveReport {
    thirdPartyId: number;
    injuriesNature: string;
    materialDamage: string;
}

interface OccurReport {
    busDamages: string;
    driverDamages: string;
    driverSignature: boolean;
    controllerSignature: boolean;
    routeDrivingLicenceNumber: string;
    routeServiceSchedule: string;
}

export type Weather = 'SUN' | 'SNOW' | 'RAIN' | 'FOG';

export interface Report {
    date: string;
    time: string;
    street: string;
    postalCode: string;
    city: string;
    circumstancesSummary: string;
    weather: Weather;
    involves: InvolveReport[];
    occurs: OccurReport[];
}

interface Route {
    serviceSchedule: string;
    driver: DriverIdentity;
    line: Line;
    bus: BusIdentity;
}

export interface Accident extends Report {
    year: number;
    noSeq: number;
    fileOpeningDate: string;
    insuranceTransmissionDate: string | null;
    insuranceValidationDate: string | null;
    fileClosingDate: string | null;
    moneyReceived: number | null;
    occurs: (OccurReport & { route: Route })[];
    involves: (InvolveReport & {
        amountPaid: number | null;
        thirdParty: ExistingThirdParty;
    })[];
}

export interface Validation {
    moneyReceived: number;
    involves: {
        thirdPartyId: number;
        amountPaid: number;
    }[];
}

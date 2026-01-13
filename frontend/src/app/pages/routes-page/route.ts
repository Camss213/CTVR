import { BusIdentity } from '../bus-page/bus';
import { Line } from '../lines-page/line';

export interface AccidentRouteSummary {
    busNumber: number;
    lineNumber: number;
    lineColor: string;
    driverName: string;
}

export interface RouteSummary extends AccidentRouteSummary {
    drivingLicenceNumber: string;
    serviceSchedule: string;
    busRegistration: string;
}

export interface Route {
    serviceSchedule: string;
    drivingLicenceNumber: string;
    line: { number: number };
    bus: { registration: string };
}

export interface SelectedRoute {
    old?: {
        serviceSchedule: string;
        drivingLicenceNumber: string;
    };

    serviceSchedule: string;
    driver: { name: string; drivingLicenceNumber: string } | null;
    line: Line | null;
    bus: BusIdentity | null;
}

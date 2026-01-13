export interface BusIdentity {
    registration: string;
    number: number;
}

export interface Bus extends BusIdentity {
    implementationDate: string;
    model: string;
    state: 'IN_SERVICE' | 'UNDER_REPAIR';
}

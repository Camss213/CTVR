export type Role = 'DRIVER' | 'S_TECH' | 'S_ADMIN' | 'ADMIN';

export interface User {
    id: number | null;
    driverName: string | null;
    drivingLicenceNumber: string | null;
    username: string;
    role: Role;
}

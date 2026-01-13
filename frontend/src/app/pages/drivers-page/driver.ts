export interface DriverIdentity {
    drivingLicenceNumber: string;
    firstName: string;
    lastName: string;
}

export interface DriverSummary extends DriverIdentity {
    phoneNumber: string;
    email: string;
}

export interface Driver extends DriverSummary {
    drivingLicenceDate: string;
    drivingLicenceIssueCity: string;
    takingOfficeDate: string;
    birthday: string;
    address: string;
    postalCode: string;
    city: string;
    user: { id: number };
}

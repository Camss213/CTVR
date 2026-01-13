export interface ThirdParty {
    id: number | null;
    firstName: string;
    lastName: string;
    birthDate: string;
    address: string;
    postalCode: string;
    city: string;
}

export interface ExistingThirdParty extends ThirdParty {
    id: number;
}

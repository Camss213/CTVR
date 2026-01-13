export interface Stats {
    accidentsPerYear: {
        year: number;
        nbAccident: number;
    }[];
    averageBusLifeTime: number;
    averageReparationTime: number;
    furnitureCostPerYear: {
        year: number;
        furnitureCostPerYear: number;
    }[];
    averageSeniorityDriver: number;
}

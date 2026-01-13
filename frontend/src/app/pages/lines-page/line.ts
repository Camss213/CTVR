export interface Line {
    number: number;
    color: string;
}

export interface LineSummary extends Line {
    firstStopName: string | null;
    lastStopName: string | null;
}

export interface Pass {
    lineNumber: number;
    stopName: string;
    position: number;
}

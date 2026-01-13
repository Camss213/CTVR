package fr.iut.valence.but.info.ctvr.backend.dto;

public record AccidentSummaryRoute(
        Byte busNumber,
        Integer lineNumber,
        String lineColor,
        String driverName
) {
}

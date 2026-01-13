package fr.iut.valence.but.info.ctvr.backend.dto;

import java.time.LocalDateTime;

public record RouteSummary(
        String drivingLicenceNumber,
        LocalDateTime serviceSchedule,
        String driverName,
        Integer lineNumber,
        String lineColor,
        Byte busNumber,
        String busRegistration
) {
}

package fr.iut.valence.but.info.ctvr.backend.model;

import java.time.LocalDateTime;

public record RouteId(String drivingLicenceNumber, LocalDateTime serviceSchedule) {
}

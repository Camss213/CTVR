package fr.iut.valence.but.info.ctvr.backend.dto;

public record DriverSummary(
        String drivingLicenceNumber,
        String firstName,
        String lastName,
        String phoneNumber,
        String email
) {
}

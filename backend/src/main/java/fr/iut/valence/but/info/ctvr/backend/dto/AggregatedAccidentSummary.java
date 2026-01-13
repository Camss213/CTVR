package fr.iut.valence.but.info.ctvr.backend.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record AggregatedAccidentSummary(
        Integer year,
        Integer noSeq,
        LocalDate date,
        LocalTime time,
        List<AccidentSummaryRoute> routes,
        String street,
        String postalCode,
        String city
) {
}
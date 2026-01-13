package fr.iut.valence.but.info.ctvr.backend.dto;

import java.time.LocalDate;

public record InterventionSummary(
        Integer id,
        LocalDate busEntranceDate,
        String description,
        LocalDate startRepairDate,
        LocalDate endRepairDate,
        Integer accidentYear,
        Integer accidentNoSeq,
        String busRegistration,
        Byte busNumber
) {
}
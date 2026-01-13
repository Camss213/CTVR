package fr.iut.valence.but.info.ctvr.backend.model;

import java.time.LocalDateTime;

public record OccurId(
        Integer accidentYear,
        Integer accidentNoSeq,
        String routeDrivingLicenceNumber,
        LocalDateTime routeServiceSchedule
) {
}

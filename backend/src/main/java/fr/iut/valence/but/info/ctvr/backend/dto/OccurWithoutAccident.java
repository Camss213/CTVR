package fr.iut.valence.but.info.ctvr.backend.dto;

import fr.iut.valence.but.info.ctvr.backend.model.Occur;
import fr.iut.valence.but.info.ctvr.backend.model.Route;

import java.time.LocalDateTime;

public interface OccurWithoutAccident {
    String getRouteDrivingLicenceNumber();

    LocalDateTime getRouteServiceSchedule();

    String getBusDamages();

    String getDriverDamages();

    Boolean getDriverSignature();

    Boolean getControllerSignature();

    Route getRoute();

    default Occur toOccur() {
        Occur occur = new Occur();
        occur.setRouteDrivingLicenceNumber(this.getRouteDrivingLicenceNumber());
        occur.setRouteServiceSchedule(this.getRouteServiceSchedule());
        occur.setBusDamages(this.getBusDamages());
        occur.setDriverDamages(this.getDriverDamages());
        occur.setDriverSignature(this.getDriverSignature());
        occur.setControllerSignature(this.getControllerSignature());
        occur.setRoute(this.getRoute());
        return occur;
    }
}

package fr.iut.valence.but.info.ctvr.backend.dto;

import fr.iut.valence.but.info.ctvr.backend.model.Occur;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record OccurReport(@NotNull String busDamages,
                          @NotNull String driverDamages,
                          boolean driverSignature,
                          boolean controllerSignature,
                          String routeDrivingLicenceNumber,
                          LocalDateTime routeServiceSchedule) {
    public Occur getOccur() {
        Occur occur = new Occur();
        occur.setBusDamages(this.busDamages);
        occur.setDriverDamages(this.driverDamages);
        occur.setDriverSignature(this.driverSignature);
        occur.setControllerSignature(this.controllerSignature);
        occur.setRouteDrivingLicenceNumber(this.routeDrivingLicenceNumber);
        occur.setRouteServiceSchedule(this.routeServiceSchedule);
        return occur;
    }
}

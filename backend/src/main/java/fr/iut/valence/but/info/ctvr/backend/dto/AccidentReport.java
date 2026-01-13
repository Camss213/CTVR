package fr.iut.valence.but.info.ctvr.backend.dto;

import fr.iut.valence.but.info.ctvr.backend.model.Accident;
import fr.iut.valence.but.info.ctvr.backend.model.Weather;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record AccidentReport(LocalDate date,
                             Weather weather,
                             LocalTime time,
                             String street,
                             String postalCode,
                             String city,
                             String circumstancesSummary,
                             List<InvolveReport> involves,
                             List<OccurReport> occurs) {
    public Accident getAccident() {
        Accident accident = new Accident();
        accident.setDate(this.date);
        accident.setTime(this.time);
        accident.setWeather(this.weather);
        accident.setStreet(this.street);
        accident.setPostalCode(this.postalCode);
        accident.setCity(this.city);
        accident.setCircumstancesSummary(this.circumstancesSummary);
        return accident;
    }
}

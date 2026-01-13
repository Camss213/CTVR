package fr.iut.valence.but.info.ctvr.backend.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public interface AccidentSummary {
    Integer getYear();

    Integer getNoSeq();

    LocalDate getDate();

    LocalTime getTime();

    Byte getBusNumber();

    Integer getLineNumber();

    String getLineColor();

    String getDriverName();

    String getStreet();

    String getPostalCode();

    String getCity();
}

package fr.iut.valence.but.info.ctvr.backend.dto;

import fr.iut.valence.but.info.ctvr.backend.model.Involve;

import java.math.BigDecimal;

public record Validation(
        BigDecimal moneyReceived,
        Iterable<Involve> involves
) {
}

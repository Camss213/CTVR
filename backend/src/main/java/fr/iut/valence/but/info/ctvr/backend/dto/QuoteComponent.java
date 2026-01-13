package fr.iut.valence.but.info.ctvr.backend.dto;

import java.math.BigDecimal;

public record QuoteComponent(
        String code,
        String label,
        BigDecimal unitPrice,
        QuoteRowType type
) {
}

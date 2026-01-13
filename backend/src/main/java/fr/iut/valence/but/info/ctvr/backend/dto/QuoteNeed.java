package fr.iut.valence.but.info.ctvr.backend.dto;

import fr.iut.valence.but.info.ctvr.backend.model.Need;
import fr.iut.valence.but.info.ctvr.backend.model.Workforce;

import java.math.BigDecimal;

public record QuoteNeed(
        String code,
        String label,
        BigDecimal hourNumber,
        BigDecimal hourlyRate
) {
    public Need getNeed() {
        Need need = new Need();
        need.setWorkforceCode(this.code);
        need.setQuoteHourNumber(this.hourNumber);
        need.setHourlyRate(this.hourlyRate);

        Workforce workforce = new Workforce();
        workforce.setCode(this.code);
        workforce.setLabel(this.label);
        workforce.setCurrentHourlyRate(this.hourlyRate);
        
        need.setWorkforce(workforce);

        return need;
    }
}

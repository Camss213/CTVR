package fr.iut.valence.but.info.ctvr.backend.dto;

import fr.iut.valence.but.info.ctvr.backend.model.Supply;
import fr.iut.valence.but.info.ctvr.backend.model.Use;

import java.math.BigDecimal;

public record QuoteUse(
        String code,
        String label,
        BigDecimal quantity,
        BigDecimal unitPrice
) {
    public Use getUse() {
        Use use = new Use();
        use.setSupplyCode(this.code);
        use.setQuoteQuantity(this.quantity);
        use.setUnitPrice(this.unitPrice);

        Supply supply = new Supply();
        supply.setCode(this.code);
        supply.setLabel(this.label);
        supply.setCurrentUnitPrice(this.unitPrice);
        use.setSupply(supply);
        return use;
    }
}

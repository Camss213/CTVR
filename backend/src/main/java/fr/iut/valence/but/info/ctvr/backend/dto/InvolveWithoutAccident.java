package fr.iut.valence.but.info.ctvr.backend.dto;

import fr.iut.valence.but.info.ctvr.backend.model.Involve;
import fr.iut.valence.but.info.ctvr.backend.model.ThirdParty;

import java.math.BigDecimal;

public interface InvolveWithoutAccident {
    Integer getThirdPartyId();

    String getInjuriesNature();

    String getMaterialDamage();

    BigDecimal getAmountPaid();

    ThirdParty getThirdParty();

    default Involve toInvolve() {
        Involve involve = new Involve();
        involve.setThirdPartyId(this.getThirdPartyId());
        involve.setInjuriesNature(this.getInjuriesNature());
        involve.setMaterialDamage(this.getMaterialDamage());
        involve.setAmountPaid(this.getAmountPaid());
        involve.setThirdParty(this.getThirdParty());
        return involve;
    }
}

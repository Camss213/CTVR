package fr.iut.valence.but.info.ctvr.backend.dto;

import fr.iut.valence.but.info.ctvr.backend.model.Involve;

public record InvolveReport(int thirdPartyId, String injuriesNature, String materialDamage) {
    public Involve getInvolve() {
        Involve involve = new Involve();
        involve.setThirdPartyId(thirdPartyId);
        involve.setInjuriesNature(injuriesNature);
        involve.setMaterialDamage(materialDamage);
        return involve;
    }
}

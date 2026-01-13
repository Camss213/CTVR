package fr.iut.valence.but.info.ctvr.backend.repository;

import fr.iut.valence.but.info.ctvr.backend.dto.QuoteUse;
import fr.iut.valence.but.info.ctvr.backend.model.Intervention;
import fr.iut.valence.but.info.ctvr.backend.model.Use;
import fr.iut.valence.but.info.ctvr.backend.model.UseId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface UseRepository extends Repository<Use, UseId> {
    void save(Use use);

    List<Use> findAllByIntervention(Intervention intervention);

    @Query("select new fr.iut.valence.but.info.ctvr.backend.dto.QuoteUse(u.supplyCode, u.supply.label, u.quoteQuantity, u.unitPrice) from Use u where u.interventionId = :interventionId")
    List<QuoteUse> getQuoteUses(int interventionId);

    void deleteByIntervention(Intervention intervention);
}

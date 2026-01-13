package fr.iut.valence.but.info.ctvr.backend.repository;

import fr.iut.valence.but.info.ctvr.backend.dto.QuoteNeed;
import fr.iut.valence.but.info.ctvr.backend.model.Intervention;
import fr.iut.valence.but.info.ctvr.backend.model.Need;
import fr.iut.valence.but.info.ctvr.backend.model.NeedId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface NeedRepository extends Repository<Need, NeedId> {
    void save(Need need);

    List<Need> findAllByIntervention(Intervention intervention);

    @Query("select new fr.iut.valence.but.info.ctvr.backend.dto.QuoteNeed(n.workforceCode, n.workforce.label, n.quoteHourNumber, n.hourlyRate) from Need n where n.interventionId = :interventionId")
    List<QuoteNeed> getQuoteNeeds(int interventionId);

    void deleteByIntervention(Intervention intervention);
}

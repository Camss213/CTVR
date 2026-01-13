package fr.iut.valence.but.info.ctvr.backend.repository;

import fr.iut.valence.but.info.ctvr.backend.dto.OccurWithoutAccident;
import fr.iut.valence.but.info.ctvr.backend.model.Accident;
import fr.iut.valence.but.info.ctvr.backend.model.Occur;
import fr.iut.valence.but.info.ctvr.backend.model.OccurId;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface OccurRepository extends Repository<Occur, OccurId> {
    void save(Occur occur);

    List<OccurWithoutAccident> findAllByAccident(Accident accident);
}

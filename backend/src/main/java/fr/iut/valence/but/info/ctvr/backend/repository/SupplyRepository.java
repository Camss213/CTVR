package fr.iut.valence.but.info.ctvr.backend.repository;

import fr.iut.valence.but.info.ctvr.backend.model.Supply;
import org.springframework.data.repository.Repository;

public interface SupplyRepository extends Repository<Supply, String> {
    void save(Supply supply);
}

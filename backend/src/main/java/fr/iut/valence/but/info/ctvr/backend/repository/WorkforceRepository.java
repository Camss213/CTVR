package fr.iut.valence.but.info.ctvr.backend.repository;

import fr.iut.valence.but.info.ctvr.backend.model.Workforce;
import org.springframework.data.repository.Repository;

public interface WorkforceRepository extends Repository<Workforce, String> {
    void save(Workforce supply);
}

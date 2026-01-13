package fr.iut.valence.but.info.ctvr.backend.repository;

import fr.iut.valence.but.info.ctvr.backend.model.Stop;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

public interface StopRepository extends Repository<Stop, String> {
    Iterable<Stop> findAllByOrderByName();

    void save(Stop stop);

    int deleteByName(String name);

    @Modifying
    @Query("update Stop s set s = :stop where s.name = :oldName")
    int update(String oldName, Stop stop);
}

package fr.iut.valence.but.info.ctvr.backend.repository;

import fr.iut.valence.but.info.ctvr.backend.dto.BusIdentity;
import fr.iut.valence.but.info.ctvr.backend.model.Bus;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface BusRepository extends Repository<Bus, Integer> {
    void save(Bus bus);

    Iterable<Bus> findAllByOrderByNumber();

    int deleteByRegistration(String registration);

    @Query("select new fr.iut.valence.but.info.ctvr.backend.dto.BusIdentity(b.number, b.registration) from Bus b order by b.number")
    List<BusIdentity> getIdentities();

    @Query("select new fr.iut.valence.but.info.ctvr.backend.dto.BusIdentity(b.number, b.registration) from Bus b where b.registration = :registration")
    BusIdentity getIdentity(String registration);

    @Modifying
    @Query("update Bus b set b = :bus where b.registration = :registration")
    int update(Bus bus, String registration);
}

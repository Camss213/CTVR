package fr.iut.valence.but.info.ctvr.backend.repository;

import fr.iut.valence.but.info.ctvr.backend.model.ThirdParty;
import org.springframework.data.repository.Repository;

public interface ThirdPartyRepository extends Repository<ThirdParty, Integer> {
    void save(ThirdParty thirdParty);

    Iterable<ThirdParty> findAllByOrderByLastNameAscFirstName();

    void deleteById(int id);
}

package fr.iut.valence.but.info.ctvr.backend.service;

import fr.iut.valence.but.info.ctvr.backend.model.ThirdParty;
import fr.iut.valence.but.info.ctvr.backend.repository.ThirdPartyRepository;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ThirdPartyService {
    private final ThirdPartyRepository thirdPartyRepository;

    public int save(ThirdParty thirdParty) {
        this.thirdPartyRepository.save(thirdParty);
        return thirdParty.getId();
    }

    public Iterable<ThirdParty> getList() {
        return this.thirdPartyRepository.findAllByOrderByLastNameAscFirstName();
    }

    public void delete(int id) throws BadRequestException {
        this.thirdPartyRepository.deleteById(id);
    }
}

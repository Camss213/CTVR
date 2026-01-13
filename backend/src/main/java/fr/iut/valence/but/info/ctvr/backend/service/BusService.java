package fr.iut.valence.but.info.ctvr.backend.service;

import fr.iut.valence.but.info.ctvr.backend.dto.BusIdentity;
import fr.iut.valence.but.info.ctvr.backend.model.Bus;
import fr.iut.valence.but.info.ctvr.backend.repository.BusRepository;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class BusService {
    private final BusRepository repository;

    public Iterable<Bus> getList() {
        return this.repository.findAllByOrderByNumber();
    }

    public void create(Bus bus) {
        this.repository.save(bus);
    }

    @Transactional
    public void update(Bus bus, String registration) throws BadRequestException {
        int rowCount = this.repository.update(bus, registration);
        if (rowCount != 1) {
            throw new BadRequestException("Bus introuvable");
        }
        this.repository.save(bus);
    }

    @Transactional
    public void delete(String registration) throws BadRequestException {
        int count = this.repository.deleteByRegistration(registration);
        if (count != 1) {
            throw new BadRequestException("Bus introuvable");
        }
    }

    public List<BusIdentity> getIdentities() {
        return this.repository.getIdentities();
    }

    public BusIdentity getIdentity(String registration) {
        return this.repository.getIdentity(registration);
    }
}

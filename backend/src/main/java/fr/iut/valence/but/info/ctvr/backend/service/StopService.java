package fr.iut.valence.but.info.ctvr.backend.service;

import fr.iut.valence.but.info.ctvr.backend.model.Line;
import fr.iut.valence.but.info.ctvr.backend.model.Stop;
import fr.iut.valence.but.info.ctvr.backend.repository.PassRepository;
import fr.iut.valence.but.info.ctvr.backend.repository.StopRepository;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class StopService {
    private final StopRepository repository;
    private final PassRepository passRepository;

    public Iterable<Stop> getList() {
        return this.repository.findAllByOrderByName();
    }

    public Iterable<Line> getLines(String name) {
        return this.passRepository.getLines(name);
    }

    public void save(Stop stop) {
        this.repository.save(stop);
    }

    @Transactional
    public void update(String oldName, Stop stop) throws BadRequestException {
        int count = this.repository.update(oldName, stop);
        if (count != 1) {
            throw new BadRequestException("Arrêt introuvable");
        }
    }

    @Transactional
    public void delete(String name) throws BadRequestException {
        int count = this.repository.deleteByName(name);
        if (count != 1) {
            throw new BadRequestException("Arrêt introuvable");
        }
    }
}

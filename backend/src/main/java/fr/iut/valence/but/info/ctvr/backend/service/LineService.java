package fr.iut.valence.but.info.ctvr.backend.service;

import fr.iut.valence.but.info.ctvr.backend.dto.LineSummary;
import fr.iut.valence.but.info.ctvr.backend.model.Line;
import fr.iut.valence.but.info.ctvr.backend.model.Pass;
import fr.iut.valence.but.info.ctvr.backend.model.Stop;
import fr.iut.valence.but.info.ctvr.backend.repository.LineRepository;
import fr.iut.valence.but.info.ctvr.backend.repository.PassRepository;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class LineService {
    private final LineRepository repository;
    private final PassRepository passRepository;

    public Iterable<LineSummary> getList() {
        return this.repository.getList();
    }

    public Iterable<Stop> getStops(int lineNumber) {
        return this.passRepository.getStops(lineNumber);
    }

    @Transactional
    public void delete(int number) throws BadRequestException {
        int count = this.repository.deleteByNumber(number);
        if (count != 1) {
            throw new BadRequestException("Ligne introuvable");
        }
    }

    public void create(Line line) {
        this.repository.save(line);
    }

    @Transactional
    public void update(Line line, int number) throws BadRequestException {
        int count = this.repository.update(line, number);
        if (count != 1) {
            throw new BadRequestException("Ligne introuvable");
        }
    }

    public void savePass(Pass pass) {
        this.passRepository.save(pass);
    }

    @Transactional
    public void deletePass(int lineNumber, String stopName) throws BadRequestException {
        int position = this.passRepository.getPosition(lineNumber, stopName)
                .orElseThrow(() -> new BadRequestException("Arrêt introuvable"));
        this.passRepository.deleteByLineNumberAndStopName(lineNumber, stopName);
        this.passRepository.updatePassPositions(lineNumber, position);
    }
}

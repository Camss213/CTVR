package fr.iut.valence.but.info.ctvr.backend.service;

import fr.iut.valence.but.info.ctvr.backend.dto.Stats;
import fr.iut.valence.but.info.ctvr.backend.repository.StatsRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class StatsService {
    private final StatsRepository statsRepository;

    public Stats getStats() {
        return new Stats(
                this.statsRepository.getAccidentPerYears(),
                this.statsRepository.getAverageBusLifeTime(),
                this.statsRepository.getAverageReparationTime(),
                this.statsRepository.getFurnitureCostPerYear(),
                this.statsRepository.getAverageSeniorityDriver()
        );
    }
}


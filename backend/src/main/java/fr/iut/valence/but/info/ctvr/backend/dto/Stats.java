package fr.iut.valence.but.info.ctvr.backend.dto;

import java.util.List;

public record Stats(
        List<StatsAccidentPerYear> accidentsPerYear,
        Double averageBusLifeTime,
        Double averageReparationTime,
        List<StatsFurnitureCostPerYear> furnitureCostPerYear,
        Double averageSeniorityDriver
) {
}

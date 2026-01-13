package fr.iut.valence.but.info.ctvr.backend.repository;

import fr.iut.valence.but.info.ctvr.backend.dto.StatsAccidentPerYear;
import fr.iut.valence.but.info.ctvr.backend.dto.StatsFurnitureCostPerYear;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class StatsRepository {
    @PersistenceContext
    EntityManager entityManager;

    public List<StatsAccidentPerYear> getAccidentPerYears() {
        Query query = entityManager.createQuery("select new fr.iut.valence.but.info.ctvr.backend.dto.StatsAccidentPerYear(" +
                "a.year, count(*)" +
                ") from Accident a group by a.year order by a.year");
        return (List<StatsAccidentPerYear>) query.getResultList();
    }

    @Transactional
    public Double getAverageBusLifeTime() {
        Query query = entityManager.createQuery("SELECT AVG((CURRENT_DATE - b.implementationDate) by day) FROM Bus b");
        return (Double) query.getSingleResult();
    }

    @Transactional
    public Double getAverageReparationTime() {
        Query query = entityManager.createQuery("SELECT AVG((i.endRepairDate - i.startRepairDate) by year) FROM Intervention i");
        return (Double) query.getSingleResult();
    }

    @Transactional
    public Double getAverageSeniorityDriver() {
        Query query = entityManager.createQuery("SELECT AVG((CURRENT_DATE - d.takingOfficeDate) by year) FROM Driver d");
        return (Double) query.getSingleResult();
    }

    public List<StatsFurnitureCostPerYear> getFurnitureCostPerYear() {
        Query query = entityManager.createQuery("select new fr.iut.valence.but.info.ctvr.backend.dto.StatsFurnitureCostPerYear(" +
                "EXTRACT(YEAR FROM u.intervention.startRepairDate), " +
                "sum(u.quoteQuantity * u.unitPrice)" +
                ") from Use u group by EXTRACT(YEAR FROM u.intervention.startRepairDate) order by EXTRACT(YEAR FROM u.intervention.startRepairDate)");
        return (List<StatsFurnitureCostPerYear>) query.getResultList();
    }
}

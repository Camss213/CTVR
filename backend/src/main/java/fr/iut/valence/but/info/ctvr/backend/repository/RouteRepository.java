package fr.iut.valence.but.info.ctvr.backend.repository;

import fr.iut.valence.but.info.ctvr.backend.dto.RouteSummary;
import fr.iut.valence.but.info.ctvr.backend.model.Route;
import fr.iut.valence.but.info.ctvr.backend.model.RouteId;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.time.LocalDateTime;

public interface RouteRepository extends Repository<Route, RouteId> {
    @Query("select new fr.iut.valence.but.info.ctvr.backend.dto.RouteSummary(" +
            "r.drivingLicenceNumber, " +
            "r.serviceSchedule, " +
            "r.driver.firstName || ' ' || r.driver.lastName, " +
            "r.line.number, " +
            "r.line.color, " +
            "r.bus.number, " +
            "r.bus.registration" +
            ") from Route r order by (case when r.driver.user.username = :username then 0 else 1 end)," +
            " (case when r.serviceSchedule < CURRENT_TIMESTAMP then 0 else 1 end)," +
            " r.serviceSchedule desc")
    Iterable<RouteSummary> getAccidentRoutes(String username);

    @Query("select new fr.iut.valence.but.info.ctvr.backend.dto.RouteSummary(" +
            "r.drivingLicenceNumber, " +
            "r.serviceSchedule, " +
            "r.driver.firstName || ' ' || r.driver.lastName, " +
            "r.line.number, " +
            "r.line.color, " +
            "r.bus.number, " +
            "r.bus.registration" +
            ") from Route r order by r.line.number, r.serviceSchedule")
    Iterable<RouteSummary> getList();

    void save(Route route);

    int deleteByDrivingLicenceNumberAndServiceSchedule(String drivingLicenceNumber, LocalDateTime serviceSchedule);

    @Modifying
    @Query("update Route r set r.serviceSchedule = :serviceSchedule, r.drivingLicenceNumber = :drivingLicenceNumber, r.line.number = :lineNumber, r.bus.registration = :busRegistration where r.drivingLicenceNumber = :oldDrivingLicenceNumber and r.serviceSchedule = :oldServiceSchedule")
    int update(String oldDrivingLicenceNumber, LocalDateTime oldServiceSchedule, String drivingLicenceNumber, LocalDateTime serviceSchedule, int lineNumber, String busRegistration);
}

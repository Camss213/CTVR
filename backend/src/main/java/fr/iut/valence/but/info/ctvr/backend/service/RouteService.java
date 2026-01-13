package fr.iut.valence.but.info.ctvr.backend.service;

import fr.iut.valence.but.info.ctvr.backend.dto.RouteSummary;
import fr.iut.valence.but.info.ctvr.backend.model.Route;
import fr.iut.valence.but.info.ctvr.backend.repository.RouteRepository;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class RouteService {
    private final RouteRepository routeRepository;

    public Iterable<RouteSummary> getAccidentList(String username) {
        return this.routeRepository.getAccidentRoutes(username);
    }

    public Iterable<RouteSummary> getList() {
        return this.routeRepository.getList();
    }

    public void create(Route route) {
        this.routeRepository.save(route);
    }

    @Transactional
    public void update(Route route, String drivingLicenceNumber, LocalDateTime serviceSchedule) throws BadRequestException {
        int count = this.routeRepository.update(drivingLicenceNumber, serviceSchedule, route.getDrivingLicenceNumber(), route.getServiceSchedule(), route.getLine().getNumber(), route.getBus().getRegistration());
        if (count != 1) {
            throw new BadRequestException("Parcours introuvable");
        }
    }

    @Transactional
    public void delete(String drivingLicenceNumber, LocalDateTime serviceSchedule) throws BadRequestException {
        int count = this.routeRepository.deleteByDrivingLicenceNumberAndServiceSchedule(drivingLicenceNumber, serviceSchedule);
        if (count != 1) {
            throw new BadRequestException("Parcours introuvable");
        }
    }
}

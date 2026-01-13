package fr.iut.valence.but.info.ctvr.backend.controller;

import fr.iut.valence.but.info.ctvr.backend.dto.RouteSummary;
import fr.iut.valence.but.info.ctvr.backend.model.Route;
import fr.iut.valence.but.info.ctvr.backend.service.RouteService;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/routes")
@AllArgsConstructor
public class RouteController {
    private final RouteService routeService;

    @GetMapping
    @PreAuthorize("hasAnyRole('S_ADMIN', 'ADMIN')")
    public Iterable<RouteSummary> getList() {
        return this.routeService.getList();
    }

    @GetMapping("/accident")
    @PreAuthorize("hasAnyRole('DRIVER', 'S_ADMIN', 'ADMIN')")
    public Iterable<RouteSummary> getAccident(Principal principal) {
        return this.routeService.getAccidentList(principal.getName());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('S_ADMIN', 'ADMIN')")
    public String create(@RequestBody Route route) {
        this.routeService.create(route);
        return "Success";
    }

    @PutMapping("/{drivingLicenceNumber}/{serviceSchedule}")
    @PreAuthorize("hasAnyRole('S_ADMIN', 'ADMIN')")
    public String update(@RequestBody Route route, @PathVariable String drivingLicenceNumber, @PathVariable LocalDateTime serviceSchedule) throws BadRequestException {
        this.routeService.update(route, drivingLicenceNumber, serviceSchedule);
        return "Success";
    }

    @DeleteMapping("/{drivingLicenceNumber}/{serviceSchedule}")
    @PreAuthorize("hasAnyRole('S_ADMIN', 'ADMIN')")
    public String delete(@PathVariable String drivingLicenceNumber, @PathVariable LocalDateTime serviceSchedule) throws BadRequestException {
        this.routeService.delete(drivingLicenceNumber, serviceSchedule);
        return "Success";
    }
}

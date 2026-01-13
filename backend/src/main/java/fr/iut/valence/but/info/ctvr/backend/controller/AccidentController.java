package fr.iut.valence.but.info.ctvr.backend.controller;

import fr.iut.valence.but.info.ctvr.backend.dto.AccidentReport;
import fr.iut.valence.but.info.ctvr.backend.dto.AggregatedAccidentSummary;
import fr.iut.valence.but.info.ctvr.backend.dto.Validation;
import fr.iut.valence.but.info.ctvr.backend.model.Accident;
import fr.iut.valence.but.info.ctvr.backend.model.AccidentId;
import fr.iut.valence.but.info.ctvr.backend.service.AccidentService;
import fr.iut.valence.but.info.ctvr.backend.service.DriverService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accidents")
@PreAuthorize("hasAnyRole('DRIVER', 'S_ADMIN', 'ADMIN')")
@AllArgsConstructor
public class AccidentController {
    private final AccidentService accidentService;
    private final DriverService driverService;

    @GetMapping
    public List<AggregatedAccidentSummary> getAccidentSummary(Authentication authentication) {
        if (authentication.getAuthorities().stream().anyMatch((a) -> a.getAuthority().equals("ROLE_DRIVER"))) {
            return this.accidentService.getDriverAccidents(authentication.getName());
        }
        return this.accidentService.getSummary();
    }

    @GetMapping("/ids")
    public List<AccidentId> getAccidentIds() {
        return this.accidentService.getAccidentIds();
    }

    @PostMapping("/new")
    public AccidentId report(@RequestBody @Valid AccidentReport accident) throws BadRequestException {
        return this.accidentService.report(accident);
    }

    @GetMapping("/{year}/{noSeq}")
    public Accident getAccident(@PathVariable int year, @PathVariable int noSeq, Authentication authentication) throws BadRequestException {
        Accident accident = this.accidentService.get(new AccidentId(year, noSeq));
        if (authentication.getAuthorities().stream().anyMatch((a) -> a.getAuthority().equals("ROLE_DRIVER"))) {
            String drivingLicence = this.driverService.getDriverLicence(authentication.getName());
            if (accident.getOccurs().stream().noneMatch((o) -> o.getRouteDrivingLicenceNumber().equals(drivingLicence))) {
                throw new AccessDeniedException("Tu n'as pas l'autorisation de consulter cet accident");
            }
        }
        return accident;
    }

    @PutMapping("/{year}/{noSeq}")
    public String report(@RequestBody @Valid AccidentReport accident, @PathVariable int year, @PathVariable int noSeq, Authentication authentication) throws BadRequestException {
        if (authentication.getAuthorities().stream().anyMatch((a) -> a.getAuthority().equals("ROLE_DRIVER"))) {
            String drivingLicence = this.driverService.getDriverLicence(authentication.getName());
            if (accident.occurs().stream().noneMatch((o) -> o.routeDrivingLicenceNumber().equals(drivingLicence))) {
                throw new AccessDeniedException("Tu n'as pas l'autorisation de modifier cet accident");
            }
        }
        this.accidentService.report(accident, year, noSeq);
        return "ok";
    }

    @DeleteMapping("/{year}/{noSeq}")
    public String delete(@PathVariable int year, @PathVariable int noSeq) throws BadRequestException {
        this.accidentService.delete(year, noSeq);
        return "success";
    }

    @PatchMapping("/send")
    @PreAuthorize("hasAnyRole('S_ADMIN', 'ADMIN')")
    public String send(@RequestBody @Valid AccidentId accidentId) throws BadRequestException {
        this.accidentService.send(accidentId);
        return "Success";
    }

    @PatchMapping("/{year}/{noSeq}/validate")
    @PreAuthorize("hasAnyRole('S_ADMIN', 'ADMIN')")
    public String validate(@RequestBody @Valid Validation validation, @PathVariable int year, @PathVariable int noSeq) throws BadRequestException {
        this.accidentService.validate(year, noSeq, validation);
        return "Success";
    }

    @PatchMapping("/close")
    @PreAuthorize("hasAnyRole('S_ADMIN', 'ADMIN')")
    public String close(@RequestBody @Valid AccidentId accidentId) throws BadRequestException {
        this.accidentService.close(accidentId);
        return "Success";
    }
}

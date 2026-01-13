package fr.iut.valence.but.info.ctvr.backend.controller;

import fr.iut.valence.but.info.ctvr.backend.dto.DriverSummary;
import fr.iut.valence.but.info.ctvr.backend.model.Driver;
import fr.iut.valence.but.info.ctvr.backend.service.DriverService;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/drivers")
@PreAuthorize("hasAnyRole('S_ADMIN', 'ADMIN')")
@AllArgsConstructor
public class DriverController {
    private final DriverService service;

    @GetMapping
    public Iterable<DriverSummary> getDrivers() {
        return this.service.getDrivers();
    }

    @GetMapping("/{licence}")
    Driver getDriver(@PathVariable String licence) throws BadRequestException {
        return this.service.getDriver(licence).orElseThrow(() -> new BadRequestException("Conducteur introuvable"));
    }

    @PostMapping
    String create(@RequestBody Driver driver) {
        this.service.create(driver);
        return "Success";
    }

    @PutMapping("/{licence}")
    String update(@RequestBody Driver driver, @PathVariable String licence) throws BadRequestException {
        this.service.update(driver, licence);
        return "Success";
    }

    @DeleteMapping("/{licence}")
    String deleteDriver(@PathVariable String licence) throws BadRequestException {
        this.service.delete(licence);
        return "Success";
    }
}

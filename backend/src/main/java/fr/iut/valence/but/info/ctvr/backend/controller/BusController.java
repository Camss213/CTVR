package fr.iut.valence.but.info.ctvr.backend.controller;

import fr.iut.valence.but.info.ctvr.backend.dto.BusIdentity;
import fr.iut.valence.but.info.ctvr.backend.model.Bus;
import fr.iut.valence.but.info.ctvr.backend.service.BusService;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bus")
@PreAuthorize("hasAnyRole('S_ADMIN', 'ADMIN')")
@AllArgsConstructor
public class BusController {
    private final BusService service;

    @GetMapping
    public Iterable<Bus> list() {
        return this.service.getList();
    }

    @PostMapping
    public String create(@RequestBody Bus bus) {
        this.service.create(bus);
        return "Success";
    }

    @DeleteMapping("/{registration}")
    public String delete(@PathVariable String registration) throws BadRequestException {
        this.service.delete(registration);
        return "Success";
    }

    @PutMapping("/{registration}")
    public String update(@RequestBody Bus bus, @PathVariable String registration) throws BadRequestException {
        this.service.update(bus, registration);
        return "Success";
    }

    @GetMapping("/identities")
    public List<BusIdentity> getIdentities() {
        return this.service.getIdentities();
    }

    @GetMapping("/{registration}/identity")
    public BusIdentity getIdentity(@PathVariable String registration) {
        return this.service.getIdentity(registration);
    }
}

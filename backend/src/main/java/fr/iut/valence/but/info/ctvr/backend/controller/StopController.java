package fr.iut.valence.but.info.ctvr.backend.controller;

import fr.iut.valence.but.info.ctvr.backend.model.Line;
import fr.iut.valence.but.info.ctvr.backend.model.Stop;
import fr.iut.valence.but.info.ctvr.backend.service.StopService;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stops")
@PreAuthorize("hasAnyRole('S_ADMIN', 'ADMIN')")
@AllArgsConstructor
public class StopController {
    private final StopService service;

    @GetMapping
    Iterable<Stop> getList() {
        return this.service.getList();
    }

    @PostMapping
    String add(@RequestBody Stop stop) {
        this.service.save(stop);
        return "Success";
    }

    @PutMapping("/{name}")
    String update(@PathVariable String name, @RequestBody Stop stop) throws BadRequestException {
        this.service.update(name, stop);
        return "Success";
    }

    @DeleteMapping("/{name}")
    String delete(@PathVariable String name) throws BadRequestException {
        this.service.delete(name);
        return "Success";
    }

    @GetMapping("/{name}/lines")
    Iterable<Line> getLines(@PathVariable String name) {
        return this.service.getLines(name);
    }
}

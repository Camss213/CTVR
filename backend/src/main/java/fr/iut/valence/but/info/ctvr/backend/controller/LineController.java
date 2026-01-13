package fr.iut.valence.but.info.ctvr.backend.controller;

import fr.iut.valence.but.info.ctvr.backend.dto.LineSummary;
import fr.iut.valence.but.info.ctvr.backend.model.Line;
import fr.iut.valence.but.info.ctvr.backend.model.Pass;
import fr.iut.valence.but.info.ctvr.backend.model.Stop;
import fr.iut.valence.but.info.ctvr.backend.service.LineService;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lines")
@PreAuthorize("hasAnyRole('S_ADMIN', 'ADMIN')")
@AllArgsConstructor
public class LineController {
    private final LineService service;

    @GetMapping
    public Iterable<LineSummary> getList() {
        return this.service.getList();
    }

    @PostMapping
    public String create(@RequestBody Line line) {
        this.service.create(line);
        return "Success";
    }

    @GetMapping("/{number}/stops")
    public Iterable<Stop> getStops(@PathVariable int number) {
        return this.service.getStops(number);
    }

    @DeleteMapping("/{number}")
    public String delete(@PathVariable int number) throws BadRequestException {
        this.service.delete(number);
        return "Success";
    }

    @PutMapping("/{number}")
    public String update(@RequestBody Line line, @PathVariable int number) throws BadRequestException {
        this.service.update(line, number);
        return "Success";
    }

    @PostMapping("/pass")
    public String addPass(@RequestBody Pass pass) {
        this.service.savePass(pass);
        return "Success";
    }

    @DeleteMapping("/{lineNumber}/pass/{stopName}")
    public String deletePass(@PathVariable int lineNumber, @PathVariable String stopName) throws BadRequestException {
        this.service.deletePass(lineNumber, stopName);
        return "Success";
    }
}

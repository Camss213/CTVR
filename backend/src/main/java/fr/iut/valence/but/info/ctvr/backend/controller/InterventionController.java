package fr.iut.valence.but.info.ctvr.backend.controller;

import fr.iut.valence.but.info.ctvr.backend.dto.InterventionSummary;
import fr.iut.valence.but.info.ctvr.backend.dto.Quote;
import fr.iut.valence.but.info.ctvr.backend.dto.QuoteComponent;
import fr.iut.valence.but.info.ctvr.backend.model.Intervention;
import fr.iut.valence.but.info.ctvr.backend.service.InterventionService;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/interventions")
@PreAuthorize("hasAnyRole('S_TECH', 'S_ADMIN', 'ADMIN')")
@AllArgsConstructor
public class InterventionController {
    private final InterventionService interventionService;

    @GetMapping
    public Iterable<InterventionSummary> getInterventions() {
        return this.interventionService.getList();
    }

    @PostMapping("/new")
    public int quote(@RequestBody Quote quote) {
        return this.interventionService.createByQuote(quote);
    }

    @GetMapping("/{id}")
    public Intervention getIntervention(@PathVariable int id) throws BadRequestException {
        return this.interventionService.get(id).orElseThrow(() -> new BadRequestException("Intervention introuvable"));
    }

    @GetMapping("/{id}/quote")
    public Quote getQuote(@PathVariable int id) throws BadRequestException {
        return this.interventionService.getQuote(id).orElseThrow(() -> new BadRequestException("Devis introuvable"));
    }

    @PutMapping("/{id}/quote")
    public String updateQuote(@PathVariable int id, @RequestBody Quote quote) throws BadRequestException {
        this.interventionService.updateQuote(id, quote);
        return "Success";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable int id) throws BadRequestException {
        this.interventionService.delete(id);
        return "Success";
    }

    @PatchMapping("/{id}")
    public String update(@RequestBody Intervention intervention) {
        this.interventionService.update(intervention);
        return "Success";
    }

    @GetMapping("/quote-components")
    public Iterable<QuoteComponent> quoteComponents() {
        return this.interventionService.getQuoteComponents();
    }
}

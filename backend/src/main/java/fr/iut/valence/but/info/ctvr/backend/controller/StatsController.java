package fr.iut.valence.but.info.ctvr.backend.controller;

import fr.iut.valence.but.info.ctvr.backend.dto.Stats;
import fr.iut.valence.but.info.ctvr.backend.service.StatsService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/stats")
@AllArgsConstructor
public class StatsController {
    private final StatsService stats;

    @GetMapping
    @PreAuthorize("hasAnyRole('S_ADMIN', 'ADMIN')")
    public Stats getList() {
        return this.stats.getStats();
    }
}

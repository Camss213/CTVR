package fr.iut.valence.but.info.ctvr.backend.controller;

import fr.iut.valence.but.info.ctvr.backend.model.ThirdParty;
import fr.iut.valence.but.info.ctvr.backend.service.ThirdPartyService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/third-parties")
@PreAuthorize("hasAnyRole('DRIVER', 'S_ADMIN', 'ADMIN')")
@AllArgsConstructor
public class ThirdPartyController {
    private final ThirdPartyService thirdPartyService;

    @GetMapping
    public Iterable<ThirdParty> getList() {
        return thirdPartyService.getList();
    }

    @PostMapping
    public int save(@RequestBody @Valid ThirdParty thirdParty) {
        return this.thirdPartyService.save(thirdParty);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable int id) throws BadRequestException {
        this.thirdPartyService.delete(id);
        return "Success";
    }
}

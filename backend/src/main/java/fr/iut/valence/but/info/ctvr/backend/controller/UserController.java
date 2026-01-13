package fr.iut.valence.but.info.ctvr.backend.controller;

import fr.iut.valence.but.info.ctvr.backend.dto.UserSummary;
import fr.iut.valence.but.info.ctvr.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@PreAuthorize("hasAnyRole('ADMIN')")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public Iterable<UserSummary> getList() {
        return this.userService.getList();
    }

    @PostMapping
    public int save(@RequestBody UserSummary user) throws BadRequestException {
        return this.userService.save(user);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable int id) {
        this.userService.delete(id);
        return "Success";
    }
}

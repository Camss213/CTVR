package fr.iut.valence.but.info.ctvr.backend.controller;

import fr.iut.valence.but.info.ctvr.backend.dto.AuthRequest;
import fr.iut.valence.but.info.ctvr.backend.dto.Password;
import fr.iut.valence.but.info.ctvr.backend.dto.Username;
import fr.iut.valence.but.info.ctvr.backend.service.JWTService;
import fr.iut.valence.but.info.ctvr.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@AllArgsConstructor
public class AuthController {
    private final JWTService jwtService;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public String getToken(@RequestBody @Valid AuthRequest authRequest) {
        Authentication authentication;

        try {
            authentication = this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.username(), authRequest.password()));
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Nom d'utilisateur ou mot de passe invalide");
        }

        return this.jwtService.generateToken(authentication);
    }

    @PatchMapping("/account/username")
    String editUsername(Principal principal, @RequestBody Username user) throws BadRequestException {
        this.userService.editUsername(user, principal.getName());
        return this.jwtService.generateToken(new UsernamePasswordAuthenticationToken(user.username(), null));
    }

    @PatchMapping("/account/password")
    String editPassword(Principal principal, @RequestBody Password password) throws BadRequestException {
        try {
            this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(principal.getName(), password.oldPassword()));
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Mot de passe invalide");
        }

        this.userService.editPassword(principal.getName(), password);
        return "Success";
    }
}

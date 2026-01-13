package fr.iut.valence.but.info.ctvr.backend.dto;

import jakarta.validation.constraints.NotEmpty;

public record AuthRequest(@NotEmpty(message = "Username is required") String username,
                          @NotEmpty(message = "Password is required") String password) {
}
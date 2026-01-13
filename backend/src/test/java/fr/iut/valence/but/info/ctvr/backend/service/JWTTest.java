package fr.iut.valence.but.info.ctvr.backend.service;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.BadJwtException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
public class JWTTest {
    @Autowired
    private JWTService jwtService;

    @Autowired
    private JwtDecoder jwtDecoder;

    @Test
    public void jwtTokenEncodingTest() {
        Authentication auth = new UsernamePasswordAuthenticationToken("test", "test");
        String token = this.jwtService.generateToken(auth);

        Jwt jwt = this.jwtDecoder.decode(token);
        assertThat(jwt.getSubject()).isEqualTo("test");
    }

    @Test
    public void jwtTokenDecodeBadTokenTest() {
        assertThrows(BadJwtException.class, () -> this.jwtDecoder.decode(""));

        assertThrows(BadJwtException.class, () -> this.jwtDecoder.decode("ajmklgqhsjmdlg.qsdmlgqsg.qsdfqsdf"));
    }
}

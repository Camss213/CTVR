package fr.iut.valence.but.info.ctvr.backend.service;

import fr.iut.valence.but.info.ctvr.backend.model.Role;
import fr.iut.valence.but.info.ctvr.backend.model.User;
import fr.iut.valence.but.info.ctvr.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.aot.DisabledInAotMode;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@DisabledInAotMode
@SpringBootTest
public class UserTest {
    @Autowired
    private AuthService authService;

    @MockBean
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    public void beforeEach() {
        User sampleUser = new User();
        sampleUser.setId(1);
        sampleUser.setUsername("test");
        sampleUser.setPassword(passwordEncoder.encode("test"));
        sampleUser.setRole(Role.ADMIN);

        when(userRepository.findByUsername("test")).thenReturn(Optional.of(sampleUser));
    }

    @Test
    public void usernameSearchTest() {
        UserDetails user = this.authService.loadUserByUsername("test");
        assertThat(user.getUsername()).isEqualTo("test");
        assertThat(this.passwordEncoder.matches("test", user.getPassword())).isTrue();
        assertThat(user.getAuthorities().size()).isEqualTo(1);
        assertThat(user.getAuthorities().iterator().next().getAuthority()).isEqualTo("ROLE_ADMIN");
    }

    @Test
    public void badUsernameSearchTest() {
        assertThrows(UsernameNotFoundException.class, () -> this.authService.loadUserByUsername("a"));
    }
}

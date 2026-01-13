package fr.iut.valence.but.info.ctvr.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    @JsonIgnore
    private String password;

    @Column(nullable = false, length = 10)
    @Enumerated(EnumType.STRING)
    private Role role;

    @JsonIgnore
    public UserDetails getDetails() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(this.role.getAuthority());
        return new org.springframework.security.core.userdetails.User(this.username, this.password, authorities);
    }
}
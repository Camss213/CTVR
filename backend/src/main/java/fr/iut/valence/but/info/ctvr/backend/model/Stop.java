package fr.iut.valence.but.info.ctvr.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "stop")
public class Stop {
    @Id
    @Column(length = 50)
    private String name;
}

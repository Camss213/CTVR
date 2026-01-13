package fr.iut.valence.but.info.ctvr.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Table(name = "bus")
@Entity
public class Bus {
    @Id
    @Column(length = 9)
    private String registration;

    @Column(nullable = false)
    private LocalDate implementationDate;

    @Column(length = 50, nullable = false)
    private String model;

    @Column(nullable = false, unique = true)
    private Byte number;

    @Column(length = 20, nullable = false)
    @Enumerated(EnumType.STRING)
    private BusState state;
}

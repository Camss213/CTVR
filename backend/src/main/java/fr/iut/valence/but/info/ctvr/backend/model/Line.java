package fr.iut.valence.but.info.ctvr.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "lines")
public class Line {
    @Id
    private Integer number;

    @Column(length = 20, nullable = false)
    private String color;
}

package fr.iut.valence.but.info.ctvr.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Data
@Table(name = "workforce")
public class Workforce {
    @Id
    @Column(length = 10)
    private String code;

    @Column(length = 50, nullable = false)
    private String label;

    @Column(precision = 15, scale = 2, nullable = false)
    private BigDecimal currentHourlyRate;
}

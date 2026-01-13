package fr.iut.valence.but.info.ctvr.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "supply")
public class Supply {
    @Id
    @Column(length = 10)
    private String code;

    @Column(nullable = false)
    private String label;

    @Column(precision = 15, scale = 2, nullable = false)
    private BigDecimal currentUnitPrice;
}

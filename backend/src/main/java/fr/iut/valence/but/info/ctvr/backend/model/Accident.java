package fr.iut.valence.but.info.ctvr.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@Entity
@Table(name = "accidents")
@IdClass(AccidentId.class)
public class Accident {
    @Id
    private Integer year;

    @Id
    private Integer noSeq;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private LocalTime time;

    @Column(nullable = false, length = 50)
    private String street;

    @Column(nullable = false, columnDefinition = "CHAR(5)")
    private String postalCode;

    @Column(nullable = false, length = 50)
    private String city;

    @Column(nullable = false)
    private String circumstancesSummary;

    @Column(nullable = false, updatable = false)
    @ColumnDefault("NOW()")
    @CreationTimestamp
    private LocalDate fileOpeningDate;

    private LocalDate insuranceTransmissionDate;

    private LocalDate insuranceValidationDate;

    private LocalDate fileClosingDate;

    @Column(precision = 15, scale = 2)
    private BigDecimal moneyReceived;

    @Column(nullable = false, length = 4)
    @Enumerated(EnumType.STRING)
    private Weather weather;

    @OneToMany(mappedBy = "accident")
    @JsonManagedReference
    private List<Occur> occurs;

    @OneToMany(mappedBy = "accident")
    @JsonManagedReference
    private List<Involve> involves;
}
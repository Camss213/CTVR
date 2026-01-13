package fr.iut.valence.but.info.ctvr.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;

@Entity
@Data
@Table(name = "needs")
@IdClass(NeedId.class)
public class Need {
    @Id
    private Integer interventionId;

    @Id
    @Column(length = 10)
    private String workforceCode;

    @Column(precision = 5, scale = 2, nullable = false)
    private BigDecimal quoteHourNumber;

    @Column(precision = 5, scale = 2)
    private BigDecimal validatedHourNumber;

    @Column(precision = 15, scale = 2)
    private BigDecimal hourlyRate;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "interventionId")
    @JsonBackReference
    @MapsId
    private Intervention intervention;

    @ManyToOne
    @JoinColumn(name = "workforceCode")
    @MapsId
    private Workforce workforce;
}

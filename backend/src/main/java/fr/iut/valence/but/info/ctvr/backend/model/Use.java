package fr.iut.valence.but.info.ctvr.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;

@Data
@Table(name = "uses")
@IdClass(UseId.class)
@Entity
public class Use {
    @Id
    private Integer interventionId;

    @Id
    @Column(length = 10)
    private String supplyCode;

    @Column(precision = 5, scale = 2, nullable = false)
    private BigDecimal quoteQuantity;

    @Column(precision = 5, scale = 2)
    private BigDecimal validatedQuantity;

    @Column(precision = 15, scale = 2, nullable = false)
    private BigDecimal unitPrice;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "interventionId")
    @JsonBackReference
    @MapsId
    private Intervention intervention;

    @ManyToOne
    @JoinColumn(name = "supplyCode")
    @MapsId
    private Supply supply;
}

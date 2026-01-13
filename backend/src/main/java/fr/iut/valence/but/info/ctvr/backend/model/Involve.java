package fr.iut.valence.but.info.ctvr.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;

@Data
@Table(name = "involves")
@Entity
@IdClass(InvolveId.class)
public class Involve {
    @Id
    private Integer thirdPartyId;

    @Id
    private Integer accidentYear;

    @Id
    private Integer accidentNoSeq;

    @Column(nullable = false)
    private String injuriesNature;

    @Column(nullable = false)
    private String materialDamage;

    @Column(precision = 15, scale = 2)
    private BigDecimal amountPaid;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "accidentYear")
    @JoinColumn(name = "accidentNoSeq")
    @MapsId
    @JsonBackReference
    private Accident accident;

    @ManyToOne
    @JoinColumn(name = "thirdPartyId")
    @MapsId
    private ThirdParty thirdParty;
}

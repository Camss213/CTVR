package fr.iut.valence.but.info.ctvr.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Data
@Table(name = "occurs")
@Entity
@IdClass(OccurId.class)
public class Occur {
    @Id
    private Integer accidentYear;

    @Id
    private Integer accidentNoSeq;

    @Id
    @Column(length = 15)
    private String routeDrivingLicenceNumber;

    @Id
    private LocalDateTime routeServiceSchedule;

    @Column(nullable = false)
    private String busDamages;

    @Column(nullable = false)
    private String driverDamages;

    private Boolean driverSignature;

    private Boolean controllerSignature;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "accidentYear")
    @JoinColumn(name = "accidentNoSeq")
    @MapsId
    @JsonBackReference
    private Accident accident;

    @ManyToOne
    @JoinColumn(name = "routeDrivingLicenceNumber")
    @JoinColumn(name = "routeServiceSchedule")
    @MapsId
    private Route route;
}

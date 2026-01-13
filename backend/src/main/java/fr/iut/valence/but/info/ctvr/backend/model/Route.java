package fr.iut.valence.but.info.ctvr.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "routes")
@IdClass(RouteId.class)
public class Route {
    @Id
    @Column(length = 15)
    private String drivingLicenceNumber;

    @Id
    private LocalDateTime serviceSchedule;

    @ManyToOne
    @JoinColumn(name = "drivingLicenceNumber")
    @MapsId
    private Driver driver;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Line line;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Bus bus;
}

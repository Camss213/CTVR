package fr.iut.valence.but.info.ctvr.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Table(name = "drivers")
@Entity
public class Driver {
    @Id
    @Column(length = 15)
    private String drivingLicenceNumber;

    @Column(nullable = false)
    private LocalDate drivingLicenceDate;

    @Column(length = 50, nullable = false)
    private String drivingLicenceIssueCity;

    @Column(nullable = false)
    private LocalDate takingOfficeDate;

    @Column(length = 50, nullable = false)
    private String lastName;

    @Column(length = 50, nullable = false)
    private String firstName;

    @Column(nullable = false)
    private LocalDate birthday;

    @Column(length = 10, nullable = false)
    private String phoneNumber;

    @Column(length = 50, nullable = false)
    private String email;

    @Column(length = 50, nullable = false)
    private String address;

    @Column(length = 5, nullable = false)
    private String postalCode;

    @Column(length = 50, nullable = false)
    private String city;

    @OneToOne
    @JoinColumn(nullable = false)
    private User user;
}

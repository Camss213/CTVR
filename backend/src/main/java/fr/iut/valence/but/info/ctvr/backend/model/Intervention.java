package fr.iut.valence.but.info.ctvr.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Table(name = "interventions")
@Entity
public class Intervention {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDate busEntranceDate;

    private String description;

    @Column(nullable = false)
    private LocalDate quoteDate;

    private LocalDate startRepairDate;

    private LocalDate endRepairDate;

    @ManyToOne
    private Accident accident;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Bus bus;

    @OneToMany(mappedBy = "intervention")
    @JsonManagedReference
    private List<Need> needs;

    @OneToMany(mappedBy = "intervention")
    @JsonManagedReference
    private List<Use> uses;
}

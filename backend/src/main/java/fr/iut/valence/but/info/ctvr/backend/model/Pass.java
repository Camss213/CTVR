package fr.iut.valence.but.info.ctvr.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Entity
@Table(name = "pass", uniqueConstraints = @UniqueConstraint(columnNames = {"lineNumber", "position"}))
@IdClass(PassId.class)
public class Pass {
    @Id
    private Integer lineNumber;

    @Id
    @Column(length = 50)
    private String stopName;

    @Column(nullable = false)
    private Byte position;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "lineNumber")
    @MapsId
    private Line line;

    @ManyToOne
    @JoinColumn(name = "stopName")
    @MapsId
    private Stop stop;
}
package fr.iut.valence.but.info.ctvr.backend.repository;

import fr.iut.valence.but.info.ctvr.backend.model.Line;
import fr.iut.valence.but.info.ctvr.backend.model.Pass;
import fr.iut.valence.but.info.ctvr.backend.model.PassId;
import fr.iut.valence.but.info.ctvr.backend.model.Stop;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface PassRepository extends Repository<Pass, PassId> {
    void save(Pass pass);

    @Query("select l from Pass p join p.line l where p.stopName = :stopName order by p.lineNumber")
    Iterable<Line> getLines(String stopName);

    @Query("select s from Pass p join p.stop s where p.lineNumber = :lineNumber order by p.position")
    Iterable<Stop> getStops(int lineNumber);

    @Query("select p.position from Pass p where p.lineNumber = :lineNumber and p.stopName = :stopName")
    Optional<Integer> getPosition(int lineNumber, String stopName);

    void deleteByLineNumberAndStopName(int lineNumber, String stopName);

    @Modifying
    @Query("update Pass p set p.position = p.position - 1 where p.position > :position and p.lineNumber = :lineNumber")
    void updatePassPositions(int lineNumber, int position);
}

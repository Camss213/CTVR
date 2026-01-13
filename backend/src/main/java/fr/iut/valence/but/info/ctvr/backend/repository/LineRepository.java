package fr.iut.valence.but.info.ctvr.backend.repository;

import fr.iut.valence.but.info.ctvr.backend.dto.LineSummary;
import fr.iut.valence.but.info.ctvr.backend.model.Line;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

public interface LineRepository extends Repository<Line, Integer> {
    void save(Line line);

    int deleteByNumber(int number);

    @Query("SELECT DISTINCT new fr.iut.valence.but.info.ctvr.backend.dto.LineSummary(" +
            "l.number, l.color, first_value(p.stopName) over (partition by l.number, l.color order by p.position), " +
            "first_value(p.stopName) over (partition by l.number, l.color order by p.position desc)" +
            ") from Line l left join Pass p on p.lineNumber = l.number " +
            "order by l.number")
    Iterable<LineSummary> getList();


    @Modifying
    @Query("update Line l set l = :line where l.number = :number")
    int update(Line line, int number);
}

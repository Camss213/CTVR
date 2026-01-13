package fr.iut.valence.but.info.ctvr.backend.repository;

import fr.iut.valence.but.info.ctvr.backend.dto.AccidentSummary;
import fr.iut.valence.but.info.ctvr.backend.model.Accident;
import fr.iut.valence.but.info.ctvr.backend.model.AccidentId;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface AccidentRepository extends Repository<Accident, AccidentId> {
    String LIST_QUERY = "select " +
            "a.year as year, a.noSeq as noSeq, a.date as date, a.time as time, b.number as busNumber, " +
            "l.number as lineNumber, l.color as lineColor, d.firstName || ' ' || d.lastName as driverName, " +
            "a.street as street, a.postalCode as postalCode, a.city as city" +
            " from Accident a " +
            " left join a.occurs o" +
            " left join o.route r" +
            " left join r.bus b" +
            " left join r.driver d" +
            " left join r.line l";

    void save(Accident accident);

    @Query("SELECT max(a.noSeq) + 1 FROM Accident a where a.year = :year")
    Optional<Integer> findNextNoSeq(int year);

    @Modifying
    @Query("update Accident a set a.insuranceTransmissionDate = CURRENT_DATE where a.noSeq = ?1 and a.year = ?2")
    int send(int noSeq, int year);

    @Modifying
    @Query("update Accident a set a.insuranceValidationDate = CURRENT_DATE, a.moneyReceived = :moneyReceived where a.noSeq = :noSeq and a.year = :year and a.insuranceTransmissionDate is not null")
    int validate(int noSeq, int year, BigDecimal moneyReceived);

    @Modifying
    @Query("update Accident a set a.fileClosingDate = CURRENT_DATE where a.noSeq = ?1 and a.year = ?2 and a.insuranceValidationDate is not null")
    int close(int noSeq, int year);

    @Query(LIST_QUERY + " order by a.year, a.noSeq")
    Iterable<AccidentSummary> getSummaryList();

    @Query(LIST_QUERY + " left join d.user u where u.username = :username order by a.year, a.noSeq")
    Iterable<AccidentSummary> getDriverList(String username);

    Optional<Accident> findById(AccidentId id);

    int deleteByYearAndNoSeqAndInsuranceTransmissionDateNull(Integer year, Integer noSeq);

    @Query("select new fr.iut.valence.but.info.ctvr.backend.model.AccidentId(a.year, a.noSeq) from Accident a order by a.year, a.noSeq")
    List<AccidentId> getAccidentIdList();
}

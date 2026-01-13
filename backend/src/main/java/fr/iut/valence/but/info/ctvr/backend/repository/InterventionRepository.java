package fr.iut.valence.but.info.ctvr.backend.repository;

import fr.iut.valence.but.info.ctvr.backend.dto.InterventionSummary;
import fr.iut.valence.but.info.ctvr.backend.dto.Quote;
import fr.iut.valence.but.info.ctvr.backend.dto.QuoteComponent;
import fr.iut.valence.but.info.ctvr.backend.model.Accident;
import fr.iut.valence.but.info.ctvr.backend.model.Bus;
import fr.iut.valence.but.info.ctvr.backend.model.Intervention;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.time.LocalDate;
import java.util.Optional;

public interface InterventionRepository extends Repository<Intervention, Integer> {
    void save(Intervention intervention);

    void deleteById(int id);

    Optional<Intervention> findById(int id);

    @Query("SELECT new fr.iut.valence.but.info.ctvr.backend.dto.InterventionSummary(" +
            "i.id, " +
            "i.busEntranceDate, " +
            "i.description, " +
            "i.startRepairDate, " +
            "i.endRepairDate, " +
            "i.accident.year, " +
            "i.accident.noSeq, " +
            "i.bus.registration, " +
            "i.bus.number" +
            ") FROM Intervention i")
    Iterable<InterventionSummary> findAll();

    @Query("select new fr.iut.valence.but.info.ctvr.backend.dto.QuoteComponent(" +
            "f.code, f.label, f.currentHourlyRate, " +
            "fr.iut.valence.but.info.ctvr.backend.dto.QuoteRowType.WORKFORCE" +
            ") from Workforce f union " +
            "select new fr.iut.valence.but.info.ctvr.backend.dto.QuoteComponent(" +
            "s.code, s.label, s.currentUnitPrice, " +
            "fr.iut.valence.but.info.ctvr.backend.dto.QuoteRowType.SUPPLY" +
            ") from Supply s")
    Iterable<QuoteComponent> getQuoteComponents();

    @Query("select new fr.iut.valence.but.info.ctvr.backend.dto.Quote(i.quoteDate, i.bus.registration, i.accident.year, i.accident.noSeq) from Intervention i where i.id = :id")
    Optional<Quote> getQuote(int id);

    @Modifying
    @Query("update Intervention i set i.quoteDate = :date, i.bus = :bus, i.accident = :accident where i.id = :id")
    int updateQuote(int id, LocalDate date, Bus bus, Accident accident);
}

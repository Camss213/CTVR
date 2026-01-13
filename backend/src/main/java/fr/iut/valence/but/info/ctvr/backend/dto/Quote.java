package fr.iut.valence.but.info.ctvr.backend.dto;

import fr.iut.valence.but.info.ctvr.backend.model.Accident;
import fr.iut.valence.but.info.ctvr.backend.model.AccidentId;
import fr.iut.valence.but.info.ctvr.backend.model.Bus;
import fr.iut.valence.but.info.ctvr.backend.model.Intervention;
import lombok.Data;

import java.time.LocalDate;

@Data
public class Quote {
    private LocalDate date;
    private String busRegistration;
    private AccidentId accidentId;
    private Iterable<QuoteUse> uses;
    private Iterable<QuoteNeed> needs;

    public Quote(LocalDate date, String busRegistration, Integer accidentYear, Integer accidentNoSeq) {
        this.date = date;
        this.busRegistration = busRegistration;
        if (accidentYear != null && accidentNoSeq != null) {
            this.accidentId = new AccidentId(accidentYear, accidentNoSeq);
        }
    }

    public Intervention getIntervention() {
        Intervention intervention = new Intervention();
        intervention.setQuoteDate(this.date);

        Bus emptyBus = new Bus();
        emptyBus.setRegistration(this.busRegistration);
        intervention.setBus(emptyBus);

        if (this.accidentId == null) {
            intervention.setAccident(null);
        } else {
            Accident emptyAccident = new Accident();
            emptyAccident.setNoSeq(this.accidentId.noSeq());
            emptyAccident.setYear(this.accidentId.year());
            intervention.setAccident(emptyAccident);
        }

        return intervention;
    }
}

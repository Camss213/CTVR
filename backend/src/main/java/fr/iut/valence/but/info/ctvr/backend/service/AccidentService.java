package fr.iut.valence.but.info.ctvr.backend.service;

import fr.iut.valence.but.info.ctvr.backend.dto.*;
import fr.iut.valence.but.info.ctvr.backend.model.Accident;
import fr.iut.valence.but.info.ctvr.backend.model.AccidentId;
import fr.iut.valence.but.info.ctvr.backend.model.Involve;
import fr.iut.valence.but.info.ctvr.backend.model.Occur;
import fr.iut.valence.but.info.ctvr.backend.repository.AccidentRepository;
import fr.iut.valence.but.info.ctvr.backend.repository.InvolveRepository;
import fr.iut.valence.but.info.ctvr.backend.repository.OccurRepository;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AccidentService {
    private final AccidentRepository accidentRepository;
    private final InvolveRepository involveRepository;
    private final OccurRepository occurRepository;

    @Transactional
    public AccidentId report(AccidentReport report) throws BadRequestException {
        int year = report.date().getYear();
        Optional<Integer> noSeq = this.accidentRepository.findNextNoSeq(year);

        return this.report(report, year, noSeq.orElse(1));
    }

    @Transactional
    public AccidentId report(AccidentReport report, int year, int noSeq) throws BadRequestException {
        if (report.occurs().isEmpty()) {
            throw new BadRequestException("L'accident doit survenir sur au moins un parcours");
        }

        Accident accident = report.getAccident();
        accident.setYear(year);
        accident.setNoSeq(noSeq);

        this.accidentRepository.save(accident);

        for (InvolveReport involveReport : report.involves()) {
            Involve involve = involveReport.getInvolve();
            involve.setAccidentYear(accident.getYear());
            involve.setAccidentNoSeq(accident.getNoSeq());
            this.involveRepository.save(involve);
        }

        for (OccurReport occurReport : report.occurs()) {
            Occur occur = occurReport.getOccur();
            occur.setAccidentYear(accident.getYear());
            occur.setAccidentNoSeq(accident.getNoSeq());
            this.occurRepository.save(occur);
        }

        return new AccidentId(accident.getYear(), accident.getNoSeq());
    }

    @Transactional
    public void send(AccidentId id) throws BadRequestException {
        int rowCount = this.accidentRepository.send(id.noSeq(), id.year());
        if (rowCount != 1) {
            throw new BadRequestException("Accident introuvable");
        }
    }


    @Transactional
    public void validate(int year, int noSeq, Validation validation) throws BadRequestException {
        int rowCount = this.accidentRepository.validate(noSeq, year, validation.moneyReceived());
        if (rowCount != 1) {
            throw new BadRequestException("Accident introuvable ou non envoyé");
        }
        for (Involve involve : validation.involves()) {
            int involveCount = this.involveRepository.updateMoney(noSeq, year, involve.getThirdPartyId(), involve.getAmountPaid());
            if (involveCount != 1) {
                throw new BadRequestException("Tiers impliqué introuvable");
            }
        }
    }

    @Transactional
    public void close(AccidentId id) throws BadRequestException {
        int rowCount = this.accidentRepository.close(id.noSeq(), id.year());
        if (rowCount != 1) {
            throw new BadRequestException("Accident introuvable ou non validé");
        }
    }

    public List<AggregatedAccidentSummary> getSummary() {
        return getAggregatedAccidents(this.accidentRepository.getSummaryList());
    }

    public List<AggregatedAccidentSummary> getDriverAccidents(String username) {
        return getAggregatedAccidents(this.accidentRepository.getDriverList(username));
    }

    private List<AggregatedAccidentSummary> getAggregatedAccidents(Iterable<AccidentSummary> accidents) {
        List<AggregatedAccidentSummary> summaries = new ArrayList<>();
        AggregatedAccidentSummary aggregatedSummary = null;
        for (AccidentSummary summary : accidents) {
            if (aggregatedSummary == null || !aggregatedSummary.noSeq().equals(summary.getNoSeq()) || !aggregatedSummary.date().equals(summary.getDate())) {
                aggregatedSummary = new AggregatedAccidentSummary(summary.getYear(), summary.getNoSeq(), summary.getDate(), summary.getTime(), new ArrayList<>(), summary.getStreet(), summary.getPostalCode(), summary.getCity());
                summaries.add(aggregatedSummary);
            }
            if (summary.getBusNumber() != null) {
                aggregatedSummary.routes().add(new AccidentSummaryRoute(summary.getBusNumber(), summary.getLineNumber(), summary.getLineColor(), summary.getDriverName()));
            }
        }
        return summaries;
    }

    public Accident get(AccidentId id) throws BadRequestException {
        return this.accidentRepository.findById(id).map((accident) -> {
            accident.setInvolves(this.involveRepository.findAllByAccident(accident).stream().map(InvolveWithoutAccident::toInvolve).toList());
            accident.setOccurs(this.occurRepository.findAllByAccident(accident).stream().map(OccurWithoutAccident::toOccur).toList());
            return accident;
        }).orElseThrow(() -> new BadRequestException("Accident introuvable"));
    }

    @Transactional
    public void delete(int year, int noSeq) throws BadRequestException {
        int count = this.accidentRepository.deleteByYearAndNoSeqAndInsuranceTransmissionDateNull(year, noSeq);
        if (count != 1) {
            throw new BadRequestException("Accident introuvable");
        }
    }

    public List<AccidentId> getAccidentIds() {
        return this.accidentRepository.getAccidentIdList();
    }
}

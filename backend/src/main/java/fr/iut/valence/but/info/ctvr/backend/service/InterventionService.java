package fr.iut.valence.but.info.ctvr.backend.service;

import fr.iut.valence.but.info.ctvr.backend.dto.*;
import fr.iut.valence.but.info.ctvr.backend.model.Intervention;
import fr.iut.valence.but.info.ctvr.backend.model.Need;
import fr.iut.valence.but.info.ctvr.backend.model.Use;
import fr.iut.valence.but.info.ctvr.backend.repository.*;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
public class InterventionService {
    private final InterventionRepository interventionRepository;
    private final UseRepository useRepository;
    private final NeedRepository needRepository;
    private final WorkforceRepository workforceRepository;
    private final SupplyRepository supplyRepository;

    @Transactional
    public int createByQuote(Quote quote) {
        Intervention intervention = quote.getIntervention();

        this.interventionRepository.save(intervention);

        int id = intervention.getId();

        this.createLines(id, quote);

        return id;
    }

    public void update(Intervention intervention) {
        this.interventionRepository.save(intervention);
    }

    public void delete(int interventionId) throws BadRequestException {
        this.interventionRepository.deleteById(interventionId);
    }

    public Iterable<InterventionSummary> getList() {
        return this.interventionRepository.findAll();
    }

    public Optional<Intervention> get(int interventionId) {
        return this.interventionRepository.findById(interventionId).map((intervention -> {
            intervention.setUses(this.useRepository.findAllByIntervention(intervention));
            intervention.setNeeds(this.needRepository.findAllByIntervention(intervention));
            if (intervention.getAccident() != null) {
                intervention.getAccident().setOccurs(null);
                intervention.getAccident().setInvolves(null);
            }
            return intervention;
        }));
    }

    public Iterable<QuoteComponent> getQuoteComponents() {
        return this.interventionRepository.getQuoteComponents();
    }

    public Optional<Quote> getQuote(int id) {
        return this.interventionRepository.getQuote(id).map(quote -> {
            quote.setUses(this.useRepository.getQuoteUses(id));
            quote.setNeeds(this.needRepository.getQuoteNeeds(id));
            return quote;
        });
    }

    @Transactional
    public void updateQuote(int id, Quote quote) throws BadRequestException {
        Intervention intervention = quote.getIntervention();

        intervention.setId(id);

        int count = this.interventionRepository.updateQuote(id, intervention.getQuoteDate(), intervention.getBus(), intervention.getAccident());
        if (count != 1) {
            throw new BadRequestException("Intervention introuvable");
        }

//        TODO: Try to insert, update and delete only necessary rows (need to be done at frontend)
//        Maybe spring can handle this in updateQuote query
        this.useRepository.deleteByIntervention(intervention);
        this.needRepository.deleteByIntervention(intervention);

        this.createLines(id, quote);
    }

    private void createLines(int id, Quote quote) {
        for (QuoteUse quoteUse : quote.getUses()) {
            Use use = quoteUse.getUse();
            use.setInterventionId(id);
            this.supplyRepository.save(use.getSupply());
            this.useRepository.save(use);
        }

        for (QuoteNeed quoteNeed : quote.getNeeds()) {
            Need need = quoteNeed.getNeed();
            need.setInterventionId(id);
            this.workforceRepository.save(need.getWorkforce());
            this.needRepository.save(need);
        }
    }
}

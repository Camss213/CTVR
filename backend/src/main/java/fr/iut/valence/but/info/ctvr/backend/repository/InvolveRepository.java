package fr.iut.valence.but.info.ctvr.backend.repository;

import fr.iut.valence.but.info.ctvr.backend.dto.InvolveWithoutAccident;
import fr.iut.valence.but.info.ctvr.backend.model.Accident;
import fr.iut.valence.but.info.ctvr.backend.model.Involve;
import fr.iut.valence.but.info.ctvr.backend.model.InvolveId;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.math.BigDecimal;
import java.util.List;

public interface InvolveRepository extends Repository<Involve, InvolveId> {
    void save(Involve involve);

    List<InvolveWithoutAccident> findAllByAccident(Accident accident);

    @Modifying
    @Query("update Involve i set i.amountPaid = :amountPaid where i.accidentNoSeq = :accidentNoSeq and i.accidentYear = :accidentYear and i.thirdPartyId = :thirdPartyId")
    int updateMoney(int accidentNoSeq, int accidentYear, int thirdPartyId, BigDecimal amountPaid);
}

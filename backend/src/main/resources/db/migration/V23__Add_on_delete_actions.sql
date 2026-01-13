ALTER TABLE involves
    DROP CONSTRAINT fk_involve_on_acac;

ALTER TABLE involves
    ADD CONSTRAINT fk_involve_on_acac
        FOREIGN KEY (accident_year, accident_no_seq)
            REFERENCES accidents (year, no_seq)
            ON DELETE CASCADE;

ALTER TABLE occurs
    DROP CONSTRAINT fk_occurs_on_acac;

ALTER TABLE occurs
    ADD CONSTRAINT fk_occurs_on_acac
        FOREIGN KEY (accident_year, accident_no_seq)
            REFERENCES accidents (year, no_seq)
            ON DELETE CASCADE;

ALTER TABLE needs
    DROP CONSTRAINT fk_needs_on_interventionid;

ALTER TABLE needs
    ADD CONSTRAINT fk_needs_on_interventionid
        FOREIGN KEY (intervention_id)
            REFERENCES interventions (id)
            ON DELETE CASCADE;

ALTER TABLE uses
    DROP CONSTRAINT fk_uses_on_interventionid;

ALTER TABLE uses
    ADD CONSTRAINT fk_uses_on_interventionid
        FOREIGN KEY (intervention_id)
            REFERENCES interventions (id)
            ON DELETE CASCADE;
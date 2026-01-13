ALTER TABLE involve
    ADD amount_paid DECIMAL(15, 2);

ALTER TABLE third_parties
    DROP COLUMN amount_paid;
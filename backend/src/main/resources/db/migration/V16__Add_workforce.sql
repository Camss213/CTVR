CREATE TABLE needs
(
    id                    INTEGER       NOT NULL,
    code                  VARCHAR(10)   NOT NULL,
    quote_hour_number     DECIMAL(5, 2) NOT NULL,
    validated_hour_number DECIMAL(5, 2),
    hourly_rate           DECIMAL(15, 2),
    CONSTRAINT pk_needs PRIMARY KEY (id, code)
);

CREATE TABLE workforce
(
    code                VARCHAR(10)    NOT NULL,
    label               VARCHAR(50)    NOT NULL,
    current_hourly_rate DECIMAL(15, 2) NOT NULL,
    CONSTRAINT pk_workforce PRIMARY KEY (code)
);

ALTER TABLE needs
    ADD CONSTRAINT FK_NEEDS_ON_CODE FOREIGN KEY (code) REFERENCES workforce (code);

ALTER TABLE needs
    ADD CONSTRAINT FK_NEEDS_ON_NOREP FOREIGN KEY (id) REFERENCES interventions (id);
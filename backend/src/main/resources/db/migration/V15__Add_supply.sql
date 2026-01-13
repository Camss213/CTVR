CREATE TABLE supply
(
    code               VARCHAR(10)    NOT NULL,
    label              VARCHAR(255)   NOT NULL,
    current_unit_price DECIMAL(15, 2) NOT NULL,
    CONSTRAINT pk_supply PRIMARY KEY (code)
);

CREATE TABLE uses
(
    id                 INTEGER        NOT NULL,
    code               VARCHAR(10)    NOT NULL,
    quote_quantity     DECIMAL(5, 2)  NOT NULL,
    validated_quantity DECIMAL(5, 2),
    unit_price         DECIMAL(15, 2) NOT NULL,
    CONSTRAINT pk_uses PRIMARY KEY (id, code)
);

ALTER TABLE uses
    ADD CONSTRAINT FK_USES_ON_CODE FOREIGN KEY (code) REFERENCES supply (code);

ALTER TABLE uses
    ADD CONSTRAINT FK_USES_ON_NOREP FOREIGN KEY (id) REFERENCES interventions (id);
CREATE TABLE accidents
(
    year                        SMALLINT     NOT NULL,
    no_seq                      INTEGER      NOT NULL,
    accident_date               date         NOT NULL,
    accident_hour               time WITHOUT TIME ZONE NOT NULL,
    street                      VARCHAR(50)  NOT NULL,
    postal_code                 CHAR         NOT NULL,
    city                        VARCHAR(50)  NOT NULL,
    circumstances_summary       VARCHAR(255) NOT NULL,
    file_opening_date           date         NOT NULL,
    insurance_transmission_date date,
    insurance_validation_date   date,
    file_closing_date           date,
    money_received              DECIMAL(15, 2),
    current_weather             VARCHAR(4)   NOT NULL,
    CONSTRAINT pk_accidents PRIMARY KEY (year, no_seq)
);
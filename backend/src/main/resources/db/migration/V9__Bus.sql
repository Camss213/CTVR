CREATE TABLE bus
(
    registration   VARCHAR(9)  NOT NULL,
    implementation date        NOT NULL,
    model          VARCHAR(50) NOT NULL,
    number         SMALLINT    NOT NULL,
    state          VARCHAR(10) NOT NULL,
    CONSTRAINT pk_bus PRIMARY KEY (registration)
);
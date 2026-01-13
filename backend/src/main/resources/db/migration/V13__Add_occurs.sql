CREATE TABLE occurs
(
    year                   INTEGER                     NOT NULL,
    no_seq                 INTEGER                     NOT NULL,
    driving_licence_number VARCHAR(15)                 NOT NULL,
    service_schedule       TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    bus_damages            VARCHAR(255)                NOT NULL,
    driver_damages         VARCHAR(255)                NOT NULL,
    driver_signature       BOOLEAN,
    controller_signature   BOOLEAN,
    CONSTRAINT pk_occurs PRIMARY KEY (year, no_seq, driving_licence_number, service_schedule)
);

ALTER TABLE occurs
    ADD CONSTRAINT FK_OCCURS_ON_DRSE FOREIGN KEY (driving_licence_number, service_schedule) REFERENCES routes (driving_licence_number, service_schedule);

ALTER TABLE occurs
    ADD CONSTRAINT FK_OCCURS_ON_YENO FOREIGN KEY (year, no_seq) REFERENCES accidents (year, no_seq);
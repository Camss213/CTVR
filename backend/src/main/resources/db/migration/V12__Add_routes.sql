CREATE TABLE routes
(
    driving_licence_number VARCHAR(15)                 NOT NULL,
    service_schedule       TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    line_number            INTEGER,
    registration           VARCHAR(9),
    CONSTRAINT pk_routes PRIMARY KEY (driving_licence_number, service_schedule)
);

ALTER TABLE routes
    ADD CONSTRAINT FK_ROUTES_ON_DRIVINGLICENCENUMBER FOREIGN KEY (driving_licence_number) REFERENCES drivers (driving_licence_number);

ALTER TABLE routes
    ADD CONSTRAINT FK_ROUTES_ON_LINENUMBER FOREIGN KEY (line_number) REFERENCES lines (line_number);

ALTER TABLE routes
    ADD CONSTRAINT FK_ROUTES_ON_REGISTRATION FOREIGN KEY (registration) REFERENCES bus (registration);
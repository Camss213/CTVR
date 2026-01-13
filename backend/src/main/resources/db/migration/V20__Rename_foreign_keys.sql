ALTER TABLE lines
    RENAME COLUMN line_number TO number;

ALTER TABLE interventions
    DROP CONSTRAINT fk_interventions_on_registration;

ALTER TABLE interventions
    DROP CONSTRAINT fk_interventions_on_yeno;

ALTER TABLE interventions
    RENAME COLUMN no_seq TO accident_no_seq;

ALTER TABLE interventions
    RENAME COLUMN year TO accident_year;

ALTER TABLE interventions
    RENAME COLUMN registration TO bus_registration;

ALTER TABLE interventions
    ADD CONSTRAINT FK_INTERVENTIONS_ON_BUS_REGISTRATION FOREIGN KEY (bus_registration) REFERENCES bus (registration);

ALTER TABLE interventions
    ADD CONSTRAINT FK_INTERVENTIONS_ON_ACYEACNO FOREIGN KEY (accident_year, accident_no_seq) REFERENCES accidents (year, no_seq);

ALTER TABLE involve
    DROP CONSTRAINT fk_involve_on_yeno;

ALTER TABLE involve
    RENAME COLUMN no_seq TO accident_no_seq;

ALTER TABLE involve
    RENAME COLUMN year TO accident_year;

ALTER TABLE involve
    ADD CONSTRAINT FK_INVOLVE_ON_ACAC FOREIGN KEY (accident_year, accident_no_seq) REFERENCES accidents (year, no_seq);

ALTER TABLE needs
    DROP CONSTRAINT fk_needs_on_code;

ALTER TABLE needs
    DROP CONSTRAINT fk_needs_on_norep;

ALTER TABLE needs
    RENAME COLUMN id TO intervention_id;

ALTER TABLE needs
    RENAME COLUMN code TO workforce_code;

ALTER TABLE needs
    ADD CONSTRAINT FK_NEEDS_ON_INTERVENTIONID FOREIGN KEY (intervention_id) REFERENCES interventions (id);

ALTER TABLE needs
    ADD CONSTRAINT FK_NEEDS_ON_WORKFORCECODE FOREIGN KEY (workforce_code) REFERENCES workforce (code);

ALTER TABLE occurs
    DROP CONSTRAINT fk_occurs_on_drse;

ALTER TABLE occurs
    DROP CONSTRAINT fk_occurs_on_yeno;

ALTER TABLE occurs
    RENAME COLUMN no_seq TO accident_no_seq;

ALTER TABLE occurs
    RENAME COLUMN service_schedule TO route_service_schedule;

ALTER TABLE occurs
    RENAME COLUMN year TO accident_year;

ALTER TABLE occurs
    RENAME COLUMN driving_licence_number TO route_driving_licence_number;

ALTER TABLE occurs
    ADD CONSTRAINT FK_OCCURS_ON_ACAC FOREIGN KEY (accident_year, accident_no_seq) REFERENCES accidents (year, no_seq);

ALTER TABLE occurs
    ADD CONSTRAINT FK_OCCURS_ON_RORO FOREIGN KEY (route_driving_licence_number, route_service_schedule) REFERENCES routes (driving_licence_number, service_schedule);

ALTER TABLE pass
    DROP CONSTRAINT fk_pass_on_linenumber;

ALTER TABLE pass
    DROP CONSTRAINT fk_pass_on_name;

ALTER TABLE pass
    RENAME COLUMN name TO stop_name;

ALTER TABLE pass
    ADD CONSTRAINT FK_PASS_ON_LINENUMBER FOREIGN KEY (line_number) REFERENCES lines (number);

ALTER TABLE pass
    ADD CONSTRAINT FK_PASS_ON_STOPNAME FOREIGN KEY (stop_name) REFERENCES stop (name);

ALTER TABLE routes
    DROP CONSTRAINT fk_routes_on_linenumber;

ALTER TABLE routes
    DROP CONSTRAINT fk_routes_on_registration;

ALTER TABLE routes
    RENAME COLUMN registration TO bus_registration;

ALTER TABLE routes
    ADD CONSTRAINT FK_ROUTES_ON_BUS_REGISTRATION FOREIGN KEY (bus_registration) REFERENCES bus (registration);

ALTER TABLE routes
    ADD CONSTRAINT FK_ROUTES_ON_LINE_NUMBER FOREIGN KEY (line_number) REFERENCES lines (number);

ALTER TABLE uses
    DROP CONSTRAINT fk_uses_on_code;

ALTER TABLE uses
    DROP CONSTRAINT fk_uses_on_norep;

ALTER TABLE uses
    RENAME COLUMN code TO supply_code;

ALTER TABLE uses
    RENAME COLUMN id TO intervention_id;

ALTER TABLE uses
    ADD CONSTRAINT FK_USES_ON_INTERVENTIONID FOREIGN KEY (intervention_id) REFERENCES interventions (id);

ALTER TABLE uses
    ADD CONSTRAINT FK_USES_ON_SUPPLYCODE FOREIGN KEY (supply_code) REFERENCES supply (code);

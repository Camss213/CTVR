ALTER TABLE interventions
    DROP CONSTRAINT fk_interventions_on_bus_registration;

ALTER TABLE interventions
    ADD CONSTRAINT fk_interventions_on_bus_registration
        FOREIGN KEY (bus_registration) REFERENCES bus (registration) ON UPDATE CASCADE;

ALTER TABLE routes
    DROP CONSTRAINT fk_routes_on_bus_registration;

ALTER TABLE routes
    ADD CONSTRAINT fk_routes_on_bus_registration
        FOREIGN KEY (bus_registration) REFERENCES bus (registration) ON UPDATE CASCADE;

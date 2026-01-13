ALTER TABLE s3_01.occurs
    DROP CONSTRAINT fk_occurs_on_roro;

ALTER TABLE s3_01.occurs
    ADD CONSTRAINT fk_occurs_on_roro
        FOREIGN KEY (route_driving_licence_number, route_service_schedule) REFERENCES s3_01.routes (driving_licence_number, service_schedule) ON UPDATE CASCADE;

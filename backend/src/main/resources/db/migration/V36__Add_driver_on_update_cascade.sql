ALTER TABLE s3_01.routes
    DROP CONSTRAINT fk_routes_on_drivinglicencenumber;

ALTER TABLE s3_01.routes
    ADD CONSTRAINT fk_routes_on_drivinglicencenumber
        FOREIGN KEY (driving_licence_number) REFERENCES s3_01.drivers (driving_licence_number) ON UPDATE CASCADE;


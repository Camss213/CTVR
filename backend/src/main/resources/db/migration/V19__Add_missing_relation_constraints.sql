ALTER TABLE drivers
    ADD CONSTRAINT uc_drivers_user UNIQUE (user_id);

ALTER TABLE routes
    ALTER COLUMN line_number SET NOT NULL;

ALTER TABLE interventions
    ALTER COLUMN registration SET NOT NULL;

ALTER TABLE routes
    ALTER COLUMN registration SET NOT NULL;

ALTER TABLE drivers
    ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE lines
    ADD color VARCHAR(20);

UPDATE lines
set color = 'red';

ALTER TABLE lines
    ALTER COLUMN color SET NOT NULL;
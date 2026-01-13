ALTER TABLE pass
    DROP CONSTRAINT fk_pass_on_linenumber;

ALTER TABLE pass
    ADD CONSTRAINT fk_pass_on_linenumber
        FOREIGN KEY (line_number) REFERENCES lines (number) ON DELETE CASCADE;

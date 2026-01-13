ALTER TABLE pass
    DROP CONSTRAINT fk_pass_on_linenumber;

ALTER TABLE pass
    ADD CONSTRAINT fk_pass_on_linenumber
        FOREIGN KEY (line_number) REFERENCES lines (number) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE pass
    DROP CONSTRAINT fk_pass_on_stopname;

ALTER TABLE pass
    ADD CONSTRAINT fk_pass_on_stopname
        FOREIGN KEY (stop_name) REFERENCES stop (name) ON UPDATE CASCADE;

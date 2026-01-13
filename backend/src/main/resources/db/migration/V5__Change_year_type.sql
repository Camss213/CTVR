ALTER TABLE accidents
    DROP
        COLUMN year;

ALTER TABLE accidents
    ADD year INTEGER NOT NULL;

ALTER TABLE accidents
    add constraint pk_accidents PRIMARY KEY (year, no_seq);
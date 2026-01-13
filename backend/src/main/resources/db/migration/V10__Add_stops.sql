CREATE TABLE pass
(
    line_number INTEGER     NOT NULL,
    name        VARCHAR(50) NOT NULL,
    "order"     SMALLINT    NOT NULL,
    CONSTRAINT pk_pass PRIMARY KEY (line_number, name)
);

CREATE TABLE stop
(
    name VARCHAR(50) NOT NULL,
    CONSTRAINT pk_stop PRIMARY KEY (name)
);

ALTER TABLE pass
    ADD CONSTRAINT FK_PASS_ON_LINENUMBER FOREIGN KEY (line_number) REFERENCES lines (line_number);

ALTER TABLE pass
    ADD CONSTRAINT FK_PASS_ON_NAME FOREIGN KEY (name) REFERENCES stop (name);
CREATE TABLE drivers
(
    driving_licence_number     VARCHAR(15) NOT NULL,
    driving_licence_date       date        NOT NULL,
    driving_licence_issue_city VARCHAR(50) NOT NULL,
    taking_office_date         date        NOT NULL,
    last_name                  VARCHAR(50) NOT NULL,
    first_name                 VARCHAR(50) NOT NULL,
    birthday                   date        NOT NULL,
    phone_number               VARCHAR(10) NOT NULL,
    email                      VARCHAR(50) NOT NULL,
    address                    VARCHAR(50) NOT NULL,
    post_code                  VARCHAR(5)  NOT NULL,
    city                       VARCHAR(50) NOT NULL,
    user_id                    INTEGER,
    CONSTRAINT pk_drivers PRIMARY KEY (driving_licence_number)
);

ALTER TABLE drivers
    ADD CONSTRAINT FK_DRIVERS_ON_USER FOREIGN KEY (user_id) REFERENCES users (id);
CREATE SCHEMA s3_01;

GRANT CONNECT ON DATABASE songisc TO chalency, boulanos, ozilmilg, dific;

GRANT ALL PRIVILEGES ON SCHEMA s3_01 TO songisc, boulanos, chalency, ozilmilg, dific WITH GRANT OPTION;

-- Set default privileges
ALTER DEFAULT PRIVILEGES IN SCHEMA s3_01
    GRANT ALL PRIVILEGES ON TABLES TO songisc, boulanos, chalency, ozilmilg, dific WITH GRANT OPTION;

ALTER DEFAULT PRIVILEGES IN SCHEMA s3_01
    GRANT ALL PRIVILEGES ON SEQUENCES TO songisc, boulanos, chalency, ozilmilg, dific WITH GRANT OPTION;

-- Set existing tables
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA s3_01 TO songisc, boulanos, chalency, ozilmilg, dific WITH GRANT OPTION;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA s3_01 TO songisc, boulanos, chalency, ozilmilg, dific WITH GRANT OPTION;
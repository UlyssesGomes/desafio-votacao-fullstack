CREATE TABLE pautas (
    id                  BIGSERIAL     PRIMARY KEY,
    titulo              VARCHAR(50)  NOT NULL,
    descricao           VARCHAR(2000),
    data_abertura       TIMESTAMPTZ,
    data_encerramento   TIMESTAMPTZ
);
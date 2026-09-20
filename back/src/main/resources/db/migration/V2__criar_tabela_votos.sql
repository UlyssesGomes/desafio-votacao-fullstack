CREATE TABLE votos (
    id              BIGSERIAL    PRIMARY KEY,
    pauta_id        BIGINT       NOT NULL REFERENCES pautas (id),
    usuario_id      BIGINT  NOT NULL,
    voto         VARCHAR(3)   NOT NULL,
    CONSTRAINT fk_pauta FOREIGN KEY (pauta_id) REFERENCES pautas(id)
);
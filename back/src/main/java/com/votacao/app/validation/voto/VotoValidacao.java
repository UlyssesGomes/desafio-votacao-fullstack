package com.votacao.app.validation.voto;

import com.votacao.app.model.Pauta;

public interface VotoValidacao {
    void validar(Pauta pauta, Long usuarioId);
}

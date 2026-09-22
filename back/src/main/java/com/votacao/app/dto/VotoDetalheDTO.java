package com.votacao.app.dto;

import com.votacao.app.enums.VotoOpcaoEnum;
import com.votacao.app.model.Voto;

public record VotoDetalheDTO(
    Long id,
    Long usuarioId,
    VotoOpcaoEnum opcao
) {
    public VotoDetalheDTO(Voto voto) {
        this(voto.getId(), voto.getUsuarioId(), voto.getVoto());
    }
}

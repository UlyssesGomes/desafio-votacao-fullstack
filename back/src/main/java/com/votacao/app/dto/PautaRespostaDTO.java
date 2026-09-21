package com.votacao.app.dto;

import com.votacao.app.model.Pauta;

public record PautaRespostaDTO(
        Long id,
        String titulo,
        String descricao
) {
    public PautaRespostaDTO(Pauta pauta) {
        this(pauta.getId(), pauta.getTitulo(), pauta.getDescricao());
    }
}

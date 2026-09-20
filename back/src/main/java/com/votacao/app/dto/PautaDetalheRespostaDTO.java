package com.votacao.app.dto;

import com.votacao.app.model.Pauta;

import java.util.List;

public record PautaDetalheRespostaDTO(
        Long id,
        String titulo,
        String decricao,
        List<VotoDetalheDTO> votos
) {
    public PautaDetalheRespostaDTO(Pauta pauta) {
        this(pauta.getId(), pauta.getTitulo(), pauta.getDescricao(), pauta.getVotos().stream().map(voto -> new VotoDetalheDTO(voto)).toList());
    }
}

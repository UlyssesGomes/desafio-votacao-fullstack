package com.votacao.app.dto;

import com.votacao.app.model.Pauta;

import java.util.List;

public record PautaDetalheRespostaDTO(
        Long id,
        String titulo,
        String descricao,
        List<VotoDetalheDTO> votos
) {
    public PautaDetalheRespostaDTO(Pauta pauta) {
        List<VotoDetalheDTO> votoDetalheDTOList = null;
        if(pauta.getVotos() != null && pauta.getVotos().size() > 0) {
            votoDetalheDTOList = pauta.getVotos().stream().map(voto -> new VotoDetalheDTO(voto)).toList();
        }
        this(pauta.getId(), pauta.getTitulo(), pauta.getDescricao(), votoDetalheDTOList);
    }
}

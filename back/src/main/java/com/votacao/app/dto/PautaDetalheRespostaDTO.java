package com.votacao.app.dto;

import com.votacao.app.model.Pauta;

import java.time.Instant;
import java.util.List;

public record PautaDetalheRespostaDTO(
        Long id,
        String titulo,
        String descricao,
        Instant dataAbertura,
        Instant dataEncerramento,
        boolean sessaoFinalizada,
        List<VotoDetalheDTO> votos
) {
    public PautaDetalheRespostaDTO(Pauta pauta) {
        List<VotoDetalheDTO> votoDetalheDTOList = null;
        if(pauta.getVotos() != null && pauta.getVotos().size() > 0) {
            votoDetalheDTOList = pauta.getVotos().stream().map(voto -> new VotoDetalheDTO(voto)).toList();
        }
        this(pauta.getId(), pauta.getTitulo(), pauta.getDescricao(), pauta.getDataAbertura(),
                pauta.getDataEncerramento(), pauta.isSessaoFinalizada(), votoDetalheDTOList);
    }
}

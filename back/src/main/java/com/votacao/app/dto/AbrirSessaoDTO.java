package com.votacao.app.dto;

import jakarta.validation.constraints.Positive;

public record AbrirSessaoDTO(
        @Positive(message = "{sessao.duracao}")
        Long duracao
) {
}

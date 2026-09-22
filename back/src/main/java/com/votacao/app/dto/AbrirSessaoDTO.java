package com.votacao.app.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;

public record AbrirSessaoDTO(
        @Positive(message = "{sessao.duracao}")
        @Min(value = 60, message = "{sessao.duracao}")
        Long duracao
) {
}

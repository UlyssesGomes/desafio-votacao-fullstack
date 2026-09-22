package com.votacao.app.dto;

public record ResultadoDTO(
        Long id,
        String title,
        long SIM,
        long NAO
) {
}

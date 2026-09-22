package com.votacao.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record EditarPautaDTO(
        @NotBlank(message = "titulo.obrigatorio")
        @Size(min = 5, max = 50, message = "{titulo.tamanho}")
        String titulo,
        @NotBlank(message = "{descricao.obrigatorio}")
        @Size(min = 10, max = 2000, message = "{descricao.tamanho}")
        String descricao
) {
}

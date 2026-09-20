package com.votacao.app.dto;

import com.votacao.app.enums.VotoOpcaoEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record VotoRecebidoDTO(
        @NotNull(message = "{voto.usuario}")
        Long usuarioId,
        @NotBlank(message = "{voto.opcao}")
        VotoOpcaoEnum opcao
) {
}

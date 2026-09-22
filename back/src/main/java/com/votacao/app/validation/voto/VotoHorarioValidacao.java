package com.votacao.app.validation.voto;

import com.votacao.app.dto.VotoRecebidoDTO;
import com.votacao.app.exceptions.UsuarioVotoException;
import com.votacao.app.model.Pauta;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
@Slf4j
public class VotoHorarioValidacao implements VotoValidacao {
    @Override
    public void validar(Pauta pauta, VotoRecebidoDTO votoRecebidoDTO) {
        if(pauta.getDataAbertura() == null) {
            String errorMessage = "O voto não pode ser computado, a sessão ainda não iniciou.";
            log.error(errorMessage);
            throw new UsuarioVotoException(errorMessage);
        }
        if(Instant.now().isAfter(pauta.getDataEncerramento())) {
            String errorMessage = "O voto não será computado, a sessão já finalizou.";
            log.error(errorMessage);
            throw new UsuarioVotoException(errorMessage);
        }
    }
}

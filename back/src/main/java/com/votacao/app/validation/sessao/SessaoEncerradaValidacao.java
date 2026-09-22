package com.votacao.app.validation.sessao;

import com.votacao.app.exceptions.SessaoException;
import com.votacao.app.model.Pauta;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
@Slf4j
public class SessaoEncerradaValidacao implements SessaoValidacao {
    @Override
    public void validar(Pauta pauta) {
        if(pauta.getDataEncerramento()  != null && Instant.now().isAfter(pauta.getDataEncerramento())) {
            String errorMessage = "A sessão já foi encerrada, não pode ser aberta novamente.";
            log.error(errorMessage);
            throw new SessaoException(errorMessage);
        }
    }
}

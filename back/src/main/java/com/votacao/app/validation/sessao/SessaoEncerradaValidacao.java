package com.votacao.app.validation.sessao;

import com.votacao.app.exceptions.SessaoException;
import com.votacao.app.model.Pauta;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class SessaoEncerradaValidacao implements SessaoValidacao {
    @Override
    public void validar(Pauta pauta) {
        if(pauta.getDataEncerramento()  != null && Instant.now().isAfter(pauta.getDataEncerramento())) {
            throw new SessaoException("A sessão já foi encerrada, não pode ser aberta novamente.");
        }
    }
}

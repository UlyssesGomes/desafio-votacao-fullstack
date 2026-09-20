package com.votacao.app.validation.sessao;

import com.votacao.app.exceptions.SessaoException;
import com.votacao.app.model.Pauta;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class SessaoJaAbertaValidadao implements SessaoValidacao {
    @Override
    public void validar(Pauta pauta) {
        if(pauta.getDataAbertura() != null)
            throw new SessaoException("A sessão já foi aberta anteriormente.");
    }
}

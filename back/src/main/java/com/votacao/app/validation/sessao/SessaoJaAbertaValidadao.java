package com.votacao.app.validation.sessao;

import com.votacao.app.exceptions.SessaoException;
import com.votacao.app.model.Pauta;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
@Slf4j
public class SessaoJaAbertaValidadao implements SessaoValidacao {
    @Override
    public void validar(Pauta pauta) {
        if(pauta.getDataAbertura() != null){
            String errorMessage = "A sessão já foi aberta anteriormente.";
            log.error(errorMessage);
            throw new SessaoException(errorMessage);
        }
    }
}

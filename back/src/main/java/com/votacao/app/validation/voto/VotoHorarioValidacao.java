package com.votacao.app.validation.voto;

import com.votacao.app.exceptions.UsuarioVotoException;
import com.votacao.app.model.Pauta;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class VotoHorarioValidacao implements VotoValidacao {
    @Override
    public void validar(Pauta pauta, Long usuarioId) {
        if(pauta.getDataAbertura() == null) {
            throw new UsuarioVotoException("O voto não pode ser computado, a sessão ainda não iniciou.");
        }
        if(Instant.now().isAfter(pauta.getDataEncerramento())) {
            throw new UsuarioVotoException("O voto não será computado, a sessão já finalizou.");
        }
    }
}

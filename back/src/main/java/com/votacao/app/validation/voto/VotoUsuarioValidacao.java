package com.votacao.app.validation.voto;

import com.votacao.app.exceptions.UsuarioVotoException;
import com.votacao.app.model.Pauta;
import org.springframework.stereotype.Component;

@Component
public class VotoUsuarioValidacao implements VotoValidacao {
    @Override
    public void validar(Pauta pauta, Long usuarioId) {
        pauta.getVotos().forEach(voto -> {
            if(voto.getUsuarioId().equals(usuarioId))
                throw new UsuarioVotoException("Usuário já realizou o seu voto anteriormente.");
        });
    }
}

package com.votacao.app.validation.voto;

import com.votacao.app.dto.VotoRecebidoDTO;
import com.votacao.app.exceptions.UsuarioVotoException;
import com.votacao.app.model.Pauta;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class VotoUsuarioValidacao implements VotoValidacao {
    @Override
    public void validar(Pauta pauta, VotoRecebidoDTO votoRecebidoDTO) {
        if(pauta.getVotos() != null) {
            pauta.getVotos().forEach(voto -> {
                if(voto.getUsuarioId().equals(votoRecebidoDTO.usuarioId())) {
                    String errorMessage = "Usuário já realizou o seu voto anteriormente.";
                    log.error(errorMessage);
                    throw new UsuarioVotoException(errorMessage);
                }
            });
        }
    }
}

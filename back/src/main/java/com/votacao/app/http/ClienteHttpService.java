package com.votacao.app.http;

import com.votacao.app.dto.ClienteHTTPRespostaDTO;
import com.votacao.app.enums.ClienteVotoStatusEnum;
import org.springframework.stereotype.Service;

@Service
public class ClienteHttpService {

    public ClienteHTTPRespostaDTO verificarCpfClient(String cpf) {
        double numeroRandom = Math.random();
        if(numeroRandom > 0.5f) {
            return new ClienteHTTPRespostaDTO(ClienteVotoStatusEnum.ABLE_TO_VOTE.getValue());
        }

        return new ClienteHTTPRespostaDTO(ClienteVotoStatusEnum.UNABLE_TO_VOTE.getValue());
    }

}

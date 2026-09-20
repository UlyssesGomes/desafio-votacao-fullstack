package com.votacao.app.validation.voto;


import com.votacao.app.ClienteHttpService;
import com.votacao.app.dto.ClienteHTTPRespostaDTO;
import com.votacao.app.dto.VotoRecebidoDTO;
import com.votacao.app.enums.ClienteVotoStatusEnum;
import com.votacao.app.exceptions.RecursoNaoEncontradoException;
import com.votacao.app.model.Pauta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class VotoUsuarioHabilitadoValidacao implements VotoValidacao {

    @Autowired
    private ClienteHttpService clienteHttpService;

    @Override
    public void validar(Pauta pauta, VotoRecebidoDTO votoRecebidoDTO) {
        ClienteHTTPRespostaDTO resposta = clienteHttpService.verificarCpfClient(votoRecebidoDTO.cpf());

        if(resposta.status().equals(ClienteVotoStatusEnum.UNABLE_TO_VOTE.getValue())) {
            throw new RecursoNaoEncontradoException("Usuário com CPF " + votoRecebidoDTO.cpf() + " não encontrado.");
        }
    }
}

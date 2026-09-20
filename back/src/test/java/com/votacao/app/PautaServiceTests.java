package com.votacao.app;

import com.votacao.app.dto.*;
import com.votacao.app.enums.ClienteVotoStatusEnum;
import com.votacao.app.enums.VotoOpcaoEnum;
import com.votacao.app.exceptions.ContabilizacaoException;
import com.votacao.app.exceptions.RecursoNaoEncontradoException;
import com.votacao.app.exceptions.SessaoException;
import com.votacao.app.exceptions.UsuarioVotoException;
import com.votacao.app.http.ClienteHttpService;
import com.votacao.app.service.PautaService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoSpyBean;
import org.springframework.transaction.annotation.Transactional;

import static org.mockito.Mockito.doReturn;

import java.time.Instant;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class PautaServiceTests {

    @Autowired
    private PautaService pautaService;

    @PersistenceContext
    private EntityManager entityManager;

    @MockitoSpyBean
    private ClienteHttpService clienteHttpService;

    private PautaRespostaDTO pautaExistente;

    @BeforeEach
    void setUp() {
        pautaExistente = pautaService.criarPauta(
                new CriarPautaDTO("Pauta pré-existente", "Criada no BeforeEach"));
    }

    @Test
    void criarPauta() {
        String titulo = "Aprovar orçamento 2026";
        String descricao = "Votação do orçamento anual";

        PautaRespostaDTO resposta = pautaService.criarPauta(
                new CriarPautaDTO(titulo, descricao));

        assertThat(resposta.id()).isNotNull();
        assertThat(resposta.titulo()).isEqualTo(titulo);
        assertThat(resposta.decricao()).isEqualTo(descricao);
    }

    @Test
    void editarPauta() {
        String titulo = "Pauta pre existente editada";
        String descricao = pautaExistente.decricao();

        PautaRespostaDTO resposta = pautaService.editarPauta(
                new EditarPautaDTO(titulo, descricao), pautaExistente.id());

        assertThat(resposta.id()).isEqualTo(pautaExistente.id());
        assertThat(resposta.titulo()).isEqualTo(titulo);
        assertThat(resposta.decricao()).isEqualTo(descricao);
    }

    @Test
    void editarPautaEnexistente() {
        String titulo = "Título de uma pauta que não existe.";
        String descricao = "Descrição de uma pauta que não existe.";

        assertThatThrownBy(() -> pautaService.editarPauta(
                new EditarPautaDTO(titulo, descricao), 0L))
                .isInstanceOf(RecursoNaoEncontradoException.class)
                .hasMessage("Pauta com id %d não encontrada.".formatted(0L));
    }

    @Test
    void listarPautas() {
        int quantidadePautasCriadas = 5;
        criarPautas(quantidadePautasCriadas);

        Pageable pageable = PageRequest.of(0, 10);
        Page<PautaRespostaDTO> resposta = pautaService.listarPautas(pageable);

        assertThat(resposta.getTotalElements()).isEqualTo(quantidadePautasCriadas + 1);
    }

    @Test
    void buscarPautaPorId() {
        PautaDetalheRespostaDTO pautaDTO = pautaService.buscarPautaPorId(pautaExistente.id());

        assertThat(pautaDTO).isNotNull();
    }

    @Test
    void buscarPautaInexistentePorId() {
        assertThatThrownBy(() -> pautaService.buscarPautaPorId(0L))
                .isInstanceOf(RecursoNaoEncontradoException.class)
                .hasMessage("Pauta com id %d não encontrada.".formatted(0L));
    }

    @Test
    void deletarPautaPorId() {
        pautaService.deletarPorId(pautaExistente.id());

        assertThatThrownBy(() -> pautaService.buscarPautaPorId(pautaExistente.id()))
                .isInstanceOf(RecursoNaoEncontradoException.class)
                .hasMessage("Pauta com id %d não encontrada.".formatted(pautaExistente.id()));
    }

    @Test
    void abrirSessaoInexistente() {
        AbrirSessaoDTO abrirSessaoDTO = new AbrirSessaoDTO(60L);

        assertThatThrownBy(() -> pautaService.abrirSessao(abrirSessaoDTO, 0L))
                .isInstanceOf(RecursoNaoEncontradoException.class)
                .hasMessage("Pauta com id %d não encontrada.".formatted(0L));
    }

    @Test
    void abrirSessaoJaAberta() {
        AbrirSessaoDTO abrirSessaoDTO = new AbrirSessaoDTO(60L);
        pautaService.abrirSessao(abrirSessaoDTO, pautaExistente.id());

        assertThatThrownBy(() -> pautaService.abrirSessao(abrirSessaoDTO, pautaExistente.id()))
                .isInstanceOf(SessaoException.class)
                .hasMessage("A sessão já foi aberta anteriormente.");
    }

    @Test
    void abrirSessaoJaFinalizada() {
        entityManager.createQuery(
                        "update Pauta p set p.dataAbertura = :dataAbertura, p.dataEncerramento = :dataEncerramento where p.id = :id")
                .setParameter("dataAbertura", Instant.now().minusSeconds(120))
                .setParameter("dataEncerramento", Instant.now().minusSeconds(60))
                .setParameter("id", pautaExistente.id())
                .executeUpdate();
        entityManager.clear();

        AbrirSessaoDTO abrirSessaoDTO = new AbrirSessaoDTO(0L);
        assertThatThrownBy(() -> pautaService.abrirSessao(abrirSessaoDTO, pautaExistente.id()))
                .isInstanceOf(SessaoException.class)
                .hasMessage("A sessão já foi encerrada, não pode ser aberta novamente.");
    }

    @Test
    void votar() {
        var votoRecebidoDTO = abrirSessaoPraVotoECriarVotoDto(60L, ClienteVotoStatusEnum.ABLE_TO_VOTE);

        adicionarVotoPrevio();

        pautaService.votar(votoRecebidoDTO, pautaExistente.id());

        PautaDetalheRespostaDTO pautaDetalheRespostaDTO = pautaService.buscarPautaPorId(pautaExistente.id());

        assertThat(pautaDetalheRespostaDTO.votos().size()).isEqualTo(2);
    }

    @Test
    void votarUsuarioCpfInvalido() {
        var votoRecebidoDTO = abrirSessaoPraVotoECriarVotoDto(60L, ClienteVotoStatusEnum.UNABLE_TO_VOTE);

        assertThatThrownBy(() -> pautaService.votar(votoRecebidoDTO, pautaExistente.id()))
                .isInstanceOf(RecursoNaoEncontradoException.class)
                .hasMessage("Usuário com CPF %s não encontrado.".formatted(votoRecebidoDTO.cpf()));
    }

    @Test
    void votarUsarioRepetido() {
        var votoRecebidoDTO = abrirSessaoPraVotoECriarVotoDto(60L, ClienteVotoStatusEnum.ABLE_TO_VOTE);

        adicionarVotoPrevio();

        pautaService.votar(votoRecebidoDTO, pautaExistente.id());

        assertThatThrownBy(() -> pautaService.votar(votoRecebidoDTO, pautaExistente.id()))
                .isInstanceOf(UsuarioVotoException.class)
                .hasMessage("Usuário já realizou o seu voto anteriormente.");
    }

    @Test
    void votarSessaoEncerrada() {

        var votoRecebidoDTO = abrirSessaoPraVotoECriarVotoDto(0L, ClienteVotoStatusEnum.ABLE_TO_VOTE);

        adicionarVotoPrevio();

        assertThatThrownBy(() -> pautaService.votar(votoRecebidoDTO, pautaExistente.id()))
                .isInstanceOf(UsuarioVotoException.class)
                .hasMessage("O voto não será computado, a sessão já finalizou.");
    }

    @Test
    void contabilizarVotos() {
        abrirSessaoPraVotoECriarVotoDto(0L, ClienteVotoStatusEnum.ABLE_TO_VOTE);
        adicionarVotoPrevio();

        ResultadoDTO resultado = pautaService.contabilizarVotacao(pautaExistente.id());

        assertThat(resultado.SIM()).isEqualTo(1);
        assertThat(resultado.NAO()).isEqualTo(0);
    }

    @Test
    void contabilizarVotosSessaoNaoIniciada() {
        assertThatThrownBy(() -> pautaService.contabilizarVotacao(pautaExistente.id()))
                .isInstanceOf(ContabilizacaoException.class)
                .hasMessage("A sessão dessa pauta ainda não iniciou.");
    }

    private VotoRecebidoDTO abrirSessaoPraVotoECriarVotoDto(long duracao, ClienteVotoStatusEnum clienteVotoStatusEnum) {
        String usuarioCPF = "000.000.000-00";
        ClienteHTTPRespostaDTO clienteResposta = new ClienteHTTPRespostaDTO(clienteVotoStatusEnum.getValue());
        doReturn(clienteResposta).when(clienteHttpService).verificarCpfClient(usuarioCPF);

        AbrirSessaoDTO abrirSessaoDTO = new AbrirSessaoDTO(duracao);
        VotoRecebidoDTO votoRecebidoDTO = new VotoRecebidoDTO(1L, usuarioCPF, VotoOpcaoEnum.SIM);

        pautaService.abrirSessao(abrirSessaoDTO, pautaExistente.id());

        return votoRecebidoDTO;
    }


    private void adicionarVotoPrevio() {
        entityManager.createNativeQuery("INSERT INTO votos (usuario_id, voto, pauta_id) VALUES (?,?,?)")
                .setParameter(1, 2)
                .setParameter(2, "SIM")
                .setParameter(3, pautaExistente.id())
                .executeUpdate();
        entityManager.clear();
    }

    private void criarPautas(int quantidade) {
        for(int u = 0; u < quantidade; u++) {
            pautaService.criarPauta(
                    new CriarPautaDTO("Pauta " + u, "Descrição da pauta  " + u));
        }
    }
}

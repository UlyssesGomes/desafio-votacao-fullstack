package com.votacao.app.service;

import com.votacao.app.dto.*;
import com.votacao.app.enums.VotoOpcaoEnum;
import com.votacao.app.exceptions.ContabilizacaoException;
import com.votacao.app.exceptions.RecursoNaoEncontradoException;
import com.votacao.app.model.Pauta;
import com.votacao.app.model.Voto;
import com.votacao.app.repository.PautaRepository;
import com.votacao.app.validation.sessao.SessaoValidacao;
import com.votacao.app.validation.voto.VotoValidacao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class PautaService {

    @Autowired
    private PautaRepository repository;

    @Autowired
    private List<SessaoValidacao> sessaoValidacoes;

    @Autowired
    private List<VotoValidacao> votoValidacoes;

    @Value("${votacao.sessao.duracao-padrao}")
    private int sessaoDuracaoPadrao;

    @Transactional
    public PautaRespostaDTO criarPauta(CriarPautaDTO pautaDto) {
        Pauta pauta = new Pauta(null,
                pautaDto.titulo(),
                pautaDto.descricao(),
                null,
                null,
                0, 0, false, null);
        Pauta pautaSaved = repository.save(pauta);
        return new PautaRespostaDTO(pautaSaved);
    }

    @Transactional
    public PautaRespostaDTO editarPauta(EditarPautaDTO pautaDto, Long id) {
        Pauta pauta = repository.findById(id).orElseThrow(() -> new RecursoNaoEncontradoException("Pauta com id " + id + " não encontrada."));
        pauta.setTitulo(pautaDto.titulo());
        pauta.setDescricao(pautaDto.descricao());

        return new PautaRespostaDTO(pauta);
    }

    public PautaDetalheRespostaDTO buscarPautaPorId(Long id) {
        Pauta pauta = repository.findById(id).orElseThrow(() -> new RecursoNaoEncontradoException("Pauta com id " + id + " não encontrada."));

        return new PautaDetalheRespostaDTO(pauta);
    }

    public Page<PautaRespostaDTO> listarPautas(Pageable pageable) {
        Page<Pauta> page = repository.findAll(pageable);

        return page.map(p -> new PautaRespostaDTO(p));
    }

    public void deletarPorId(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    public void abrirSessao(AbrirSessaoDTO sessao, Long pautaId) {
        Pauta pauta = repository.findById(pautaId).orElseThrow(() -> new RecursoNaoEncontradoException("Pauta com id " +  pautaId + " não encontrada."));

        Long duracao = null;
        if(sessao.duracao() == null) {
            duracao = (long) sessaoDuracaoPadrao;
        } else {
            duracao = sessao.duracao();
        }

        sessaoValidacoes.forEach(validacao -> validacao.validar(pauta));

        Instant now = Instant.now();
        pauta.setDataAbertura(now);
        pauta.setDataEncerramento(now.plusSeconds(duracao));
    }

    @Transactional
    public void votar(VotoRecebidoDTO votoDto, Long pautaId) {
        Pauta pauta = repository.findById(pautaId).orElseThrow(() -> new RecursoNaoEncontradoException("Pauta com id " +  pautaId + " não encontrada."));

        votoValidacoes.forEach(validacao -> validacao.validar(pauta, votoDto));

        Voto v = new Voto(null, votoDto.usuarioId(), votoDto.opcao(), pauta);

        pauta.getVotos().add(v);
    }

    @Transactional
    public ResultadoDTO contabilizarVotacao(Long pautaId) {
        Pauta pauta = repository.findById(pautaId).orElseThrow(() -> new RecursoNaoEncontradoException("Pauta com id " +  pautaId + " não encontrada."));

        if(pauta.getDataAbertura() == null)
            throw new ContabilizacaoException("A sessão dessa pauta ainda não iniciou.");

        if(pauta.isSessaoFinalizada()) {
            return new ResultadoDTO(pauta.getId(), pauta.getTitulo(), pauta.getVotosSim(), pauta.getVotosNao());
        }

        long sim = 0;
        long nao = 0;

        for(Voto voto : pauta.getVotos()) {
            if(voto.getVoto() == VotoOpcaoEnum.SIM)
                sim++;
            else
                nao++;
        }

        if(Instant.now().isAfter(pauta.getDataEncerramento())) {
            pauta.setVotosSim(sim);
            pauta.setVotosNao(nao);
            pauta.setSessaoFinalizada(true);
        }

        return new ResultadoDTO(pauta.getId(), pauta.getTitulo(), sim, nao);
    }

}

package com.votacao.app.service;

import com.votacao.app.dto.CriarPautaDTO;
import com.votacao.app.dto.EditarPautaDTO;
import com.votacao.app.dto.PautaRespostaDTO;
import com.votacao.app.exceptions.RecursoNaoEncontradoException;
import com.votacao.app.model.Pauta;
import com.votacao.app.repository.PautaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PautaService {

    @Autowired
    private PautaRepository repository;

    @Transactional
    public PautaRespostaDTO criarPauta(CriarPautaDTO pautaDto) {
        Pauta pauta = new Pauta(null, pautaDto.titulo(), pautaDto.descricao(), null, null, null);
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

    public PautaRespostaDTO buscarPautaPorId(Long id) {
        Pauta pauta = repository.findById(id).orElseThrow(() -> new RecursoNaoEncontradoException("Pauta com id " + id + " não encontrada."));

        return new PautaRespostaDTO(pauta);
    }

    public Page<PautaRespostaDTO> listarPautas(Pageable pageable) {
        Page<Pauta> page = repository.findAll(pageable);

        return page.map(p -> new PautaRespostaDTO(p));
    }

    public void deletarPorId(Long id) {
        repository.deleteById(id);
    }

}

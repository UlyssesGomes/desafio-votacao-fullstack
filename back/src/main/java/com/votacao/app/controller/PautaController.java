package com.votacao.app.controller;

import com.votacao.app.dto.CriarPautaDTO;
import com.votacao.app.dto.EditarPautaDTO;
import com.votacao.app.dto.PautaRespostaDTO;
import com.votacao.app.service.PautaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pautas")
public class PautaController {

    @Autowired
    private PautaService service;

    @PostMapping
    public ResponseEntity<PautaRespostaDTO> criarPauta(@Valid @RequestBody CriarPautaDTO pauta) {
        PautaRespostaDTO pautaDto = service.criarPauta(pauta);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(pautaDto.id()).toUri();
        return ResponseEntity.created(location).body(pautaDto);
    }

    @GetMapping
    public ResponseEntity<Page<PautaRespostaDTO>> listarPautas(@PageableDefault(size = 10, sort = {"id"}) Pageable page) {
        return ResponseEntity.ok(service.listarPautas(page));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PautaRespostaDTO> buscarPautaPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPautaPorId(id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<PautaRespostaDTO> editarPauta(@Valid @RequestBody EditarPautaDTO pauta, @PathVariable Long id) {
        return ResponseEntity.ok(service.editarPauta(pauta, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletarPautaPorId(@PathVariable Long id) {
        return ResponseEntity.noContent().build();
    }
}

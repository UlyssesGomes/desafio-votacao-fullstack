package com.votacao.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "pautas")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Pauta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String descricao;
    private Instant dataAbertura;
    private Instant dataEncerramento;
    private long votosSim;
    private long votosNao;
    private boolean sessaoFinalizada;

    @OneToMany(mappedBy = "pauta", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Voto> votos;
}

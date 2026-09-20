package com.votacao.app.model;

import com.votacao.app.enums.VotoOpcaoEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="votos")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Voto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long usuarioId;

    @Enumerated(EnumType.STRING)
    private VotoOpcaoEnum voto;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "pauta_id", nullable = false)
    private Pauta pauta;

}

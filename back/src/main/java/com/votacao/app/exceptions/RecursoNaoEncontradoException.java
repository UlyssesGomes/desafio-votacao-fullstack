package com.votacao.app.exceptions;

public class RecursoNaoEncontradoException extends RuntimeException {
    public RecursoNaoEncontradoException(String messagem) {
        super(messagem);
    }
}

package com.votacao.app.config.exception;

import com.votacao.app.exceptions.ContabilizacaoException;
import com.votacao.app.exceptions.RecursoNaoEncontradoException;
import com.votacao.app.exceptions.SessaoException;
import com.votacao.app.exceptions.UsuarioVotoException;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class ErrorHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(RecursoNaoEncontradoException.class)
    public ResponseEntity<ProblemDetail> naoEncontrado(RecursoNaoEncontradoException ex) {
        return resposta(HttpStatus.NOT_FOUND, "Recurso não encontrado", ex.getMessage());
    }

    @ExceptionHandler(UsuarioVotoException.class)
    public ResponseEntity<ProblemDetail> erroNaVotacao(UsuarioVotoException ex) {
        return resposta(HttpStatus.CONFLICT, "Operação De Voto Inválida", ex.getMessage());
    }

    @ExceptionHandler(SessaoException.class)
    public ResponseEntity<ProblemDetail> erroNaSessao(SessaoException ex) {
        return resposta(HttpStatus.BAD_REQUEST, "Operação Na Sessão Inválida", ex.getMessage());
    }

    @ExceptionHandler(ContabilizacaoException.class)
    public ResponseEntity<ProblemDetail> naoEncontrado(ContabilizacaoException ex) {
        return resposta(HttpStatus.BAD_REQUEST, "Erro Na Contabilização", ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ProblemDetail> inesperado(Exception ex) {
        return resposta(HttpStatus.INTERNAL_SERVER_ERROR, "Erro interno", "Ocorreu um erro inesperado.");
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        Map<String, String> erros = new LinkedHashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(erro -> erros.putIfAbsent(erro.getField(), erro.getDefaultMessage()));

        ProblemDetail problema = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST,
                "Um ou mais campos são inválidos.");
        problema.setTitle("Requisição inválida");
        problema.setProperty("erros", erros);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).headers(headers).body(problema);
    }

    private static ResponseEntity<ProblemDetail> resposta(HttpStatus status, String titulo, String detalhe) {
        ProblemDetail problema = ProblemDetail.forStatusAndDetail(status, detalhe);
        problema.setTitle(titulo);
        return ResponseEntity.status(status).body(problema);
    }
}

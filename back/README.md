# API de Votação para Assembleias de Cooperativa

API REST (Java 25 + Spring Boot 4 + PostgreSQL + Maven) para cadastrar pautas, abrir sessões de votação,
receber votos dos associados e apurar o resultado.

## Como executar

**Docker** (banco):

```bash
docker compose up -d
```

**Só o banco no Docker, app local** :

```bash
docker compose up -d
mvn spring-boot:run
```

- API: `http://localhost:8080/api/v1/pautas`
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- Health: `http://localhost:8080/actuator/health`

Configuração por variáveis de ambiente: `DB_URL`, `DB_USER`, `DB_PASSWORD`.
A duração padrão da sessão fica em `votacao.sessao.duracao-padrao` (`application.yml`, padrão `1m`).

## Endpoints

| Método | Rota | Descrição | Sucesso |
|---|---|---|---|
| POST | `/api/v1/pautas` | Cadastra uma pauta | 201 |
| GET | `/api/v1/pautas/{id}` | Consulta uma pauta | 200 |
| GET | `/api/v1/pautas` | Listagem paginada | 200 |
| PATCH | `/api/v1/pautas/{id}` | Editar uma pauta | 200 |
| PATCH | `/api/v1/pautas/{id}/abrir-sessao` | Abre a sessão de votação | 200 |
| PATCH | `/api/v1/pautas/{id}/votar` | Registra o voto de um associado | 204 |
| PATCH | `/api/v1/pautas/{id}/contabilizar-votos` | Contabiliza e retorna o resultado | 200 |
| DELETE | `/api/v1/pautas/{id}` | Deletar uma pauta | 200 |

### Erros (RFC 9457, `application/problem+json`)

| Status | Quando |
|---|---|
| 400 | Campos inválidos, voto diferente de Sim/Não, JSON malformado |
| 404 | Pauta inexistente |
| 409 | Sessão já aberta para a pauta; associado já votou na pauta |
| 422 | Voto em pauta sem sessão ou com sessão encerrada |


## Testes

```bash
mvn test
```

- Unitários do serviço PautaService.


# Testes E2E — Cypress

Testes end-to-end do front-end do sistema de votação, escritos com [Cypress](https://www.cypress.io/).

## Sumário

- [Instalação](#instalação)
- [Como rodar](#como-rodar)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Configuração](#configuração)
- [Comandos customizados](#comandos-customizados)
- [Convenções](#convenções)
- [Escrevendo um novo teste](#escrevendo-um-novo-teste)
- [Boas práticas adotadas](#boas-práticas-adotadas)

## Instalação

O Cypress já está nas dependências de desenvolvimento do projeto. Basta instalar as dependências do front normalmente:

```bash
npm install
```

## Como rodar

O front, backend e o banco precisam estar no ar antes de abrir o Cypress:

```bash
ng serve
```

Em outro terminal:

```bash
# interface interativa (recomendado durante o desenvolvimento dos testes)
npx cypress open
```

> Ajuste `front` para o nome real do projeto no `angular.json`, se for diferente.

## Estrutura de pastas

```
cypress/
├── e2e/                  # os testes (*.cy.ts)
├── fixtures/             # massas de dados em JSON, quando necessário
├── support/
│   ├── commands.ts       # comandos customizados (campo, botao, erro, toast...)
│   └── e2e.ts            # carregado antes de cada teste
└── tsconfig.json
cypress.config.ts
```

## Configuração

As opções gerais ficam em `cypress.config.ts`, na raiz do front:

```ts
export default defineConfig({
  expose: {
    apiUrl: 'http://localhost:8080/api'
  },
  e2e: {
    baseUrl: 'http://localhost:4200',
    retries: {
      runMode: 2,
      openMode: 0
    }
  }
});
```

- **`baseUrl`**: permite usar `cy.visit('/pautas')` em vez da URL completa.
- **`expose`**: valores não sensíveis, lidos nos testes com `Cypress.expose('apiUrl')`. Substituiu o antigo `Cypress.env()`, removido a partir do Cypress 16.
- **`retries`**: reduz falhas intermitentes só no modo headless, sem esconder falhas reais durante o desenvolvimento.

Para apontar para outro ambiente sem editar o arquivo:

```bash
npx cypress run --expose apiUrl=https://homologacao.exemplo.com/api
```

## Comandos customizados

Definidos em `cypress/support/commands.ts`, para não repetir seletores do PrimeNG nos testes e para isolar os testes de mudanças internas da biblioteca.

| Comando | Para que serve |
|---|---|
| `cy.campo(nome)` | Devolve o `<input>`/`<textarea>` real de um campo marcado com `data-cy` |
| `cy.selecionarOpcao(nome, texto)` | Abre um `p-select` e escolhe uma opção pelo texto visível |
| `cy.botao(nome)` | Devolve o `<button>` real de dentro de um `p-button` |
| `cy.erro(campo)` | Devolve a mensagem de erro (`p-message`) associada a um campo |
| `cy.toast(texto?, tipo?)` | Devolve uma mensagem do `p-toast`, filtrando por texto e/ou severidade |
| `cy.encerrarPauta(id)` | Altera a data de fim de uma pauta direto no banco, via `cy.task` |

Exemplos de uso:

```ts
cy.campo('titulo').type('Aprovação do balanço');
cy.selecionarOpcao('voto', 'Sim');
cy.botao('salvar').click();

cy.erro('cpf').should('contain.text', 'CPF inválido.');
cy.toast('Pauta cadastrada com sucesso', 'success').should('be.visible');
```

## Convenções

- **Seletores `data-cy`**: todo elemento que um teste precisa encontrar recebe um atributo `data-cy` próprio (`data-cy="titulo"`, `data-cy="salvar"`, `data-cy="erro-cpf"`...). Nunca usamos classes CSS do PrimeNG ou do Tailwind como seletor, porque elas mudam entre versões e não têm relação com o comportamento testado.
- **`p-message`/`p-toast`**: o `data-cy` fica no componente (`<p-message data-cy="erro-cpf">`), e os comandos (`erro`, `toast`) sabem encontrar o conteúdo real por dentro, incluindo o `role="alert"` interno.
- **Requisições HTTP**: sempre interceptadas com `cy.intercept(...).as('nomeDoAlias')`, declarado **antes** da ação que dispara a chamada. O `cy.wait('@alias')` prova que a requisição foi enviada e permite inspecionar `request` e `response`.
- **Sem esperas fixas**: não usamos `cy.wait(milissegundos)` para esperar elementos, requisições ou textos. Todo `should` do Cypress já repete a verificação sozinho (retry-ability) até passar ou expirar o timeout.

## Escrevendo um novo teste

```ts
describe('Cadastro de pauta', () => {
  const api = () => Cypress.expose('apiUrl');

  beforeEach(() => {
    cy.visit('/pautas/nova');
  });

  it('envia os dados e mostra a confirmação', () => {
    const titulo = 'Aprovação do balanço anual';
    const descricao = 'Votação para aprovar o balanço do exercício.';

    cy.intercept('POST', `${api()}/pautas`, {
      statusCode: 201,
      body: { id: 99, titulo, descricao }
    }).as('salvarPauta');

    cy.campo('titulo').type(titulo);
    cy.campo('descricao').type(descricao);
    cy.botao('salvar').click();

    cy.wait('@salvarPauta')
      .its('request.body')
      .should('include', { titulo, descricao });

    cy.toast('Pauta cadastrada com sucesso', 'success').should('be.visible');
  });
});
```

Checklist rápido antes de abrir um PR com testes novos:

- [ ] Os elementos usados têm `data-cy`?
- [ ] As requisições relevantes estão interceptadas (`cy.intercept` + `cy.wait`)?
- [ ] O teste roda sozinho, sem depender da ordem de execução de outros testes?
- [ ] Não há `cy.wait(ms)` disfarçando uma espera que poderia ser um `should`?
- [ ] Mensagens de erro/sucesso são checadas por `contain.text`, não `have.text`?

## Boas práticas adotadas

- **Stub vs. requisição real**: a maioria dos testes simula a resposta da API (`cy.intercept` com `body`), o que deixa o teste rápido e independente do back-end. Alguns cenários críticos são testados também contra o back-end real, sem stub, para pegar problemas de integração (CORS, contrato da API, regras de negócio).
- **Manipulação de dados de teste**: quando um cenário depende de um estado específico no banco (por exemplo, uma pauta já encerrada), usamos `cy.task` para alterar o dado diretamente, em vez de esperar o tempo passar de verdade.
- **Independência entre testes**: cada teste parte de um estado conhecido (`beforeEach` com `cy.visit`) e não depende de testes anteriores.
- **Legibilidade**: comandos customizados escondem os detalhes de implementação do PrimeNG, para os testes lerem como uma descrição do comportamento esperado.

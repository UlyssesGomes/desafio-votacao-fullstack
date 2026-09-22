# VotacaoCooperativismo

Interface web do sistema de votação para assembleias de cooperativas, onde é possível listar pautas, cadastrar pautas, detalhar uma pauta, visualizar resultado da votação e registrar votos dos associados.

## Stack

- **[Angular 20](https://angular.dev/)** — standalone components, Reactive Forms
- **[PrimeNG](https://primeng.org/)** com o tema **Aura** (`@primeuix/themes`) — componentes de UI
- **[Tailwind CSS](https://tailwindcss.com/)** — utilitários de layout e espaçamento

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão compatível com Angular 20 — LTS mais recente recomendada)
- [Angular CLI](https://angular.dev/tools/cli) instalado globalmente:

  ```bash
  npm install -g @angular/cli
  ```

- O back-end da aplicação rodando (por padrão em `http://localhost:8080`) — necessário para o front funcionar por completo

## Instalação

```bash
npm install
```

## Servidor de desenvovolvimento

Para executar local, execute o comando abaixo:

```bash
ng serve
```

Uma vez rodando, ficará disponível em `http://localhost:4200/`.

## Estrutura do projeto

```
src/
├── app/
│   ├── core/            	# componentes core da aplicação
│   ├── shared/           	# componentes, pipes e diretivas reutilizáveis
│   ├── pages/         		# telas e fluxos (pautas, votação...)
│   ├── app.config.ts      	# providers globais (HttpClient, PrimeNG, MessageService...)
│   └── app.html
├── tailwind.css           	# diretivas do Tailwind e do tailwindcss-primeui
├── styles.scss            	# estilos globais
└── index.html
public/
└── resources/              # imagens e outros arquivos estáticos
```

## Building

Para buildar o projeto, execute:

```bash
ng build
```

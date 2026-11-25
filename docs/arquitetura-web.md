# Arquitetura do Projeto Web — Museu Gamificado da Evolução do Software

Projeto Integrador 2026/2 — SENAI FATESG — Engenharia de Software (6º período)
Abordagem: **Museu Gamificado** | Eixo: **Software**

## Visão geral

Monorepo com uma API e um front-end web (o app mobile entra depois, em `mobile/`, consumindo a mesma API).

```
projeto-integrador/
├── backend/   API REST — Java + Spring Boot + H2
├── web/       Front-end web — React + TypeScript
└── docs/      Documentação técnica (arquitetura, decisões, fontes)
```

O jogo, **"Jornada do Código: a evolução do software"**, é organizado pelos **5 períodos históricos** do edital (cada período é uma "era" do jogo, liberada de forma linear). Cada era contém **marcos históricos** (mundo e Brasil) e **desafios**. Toda ação do jogador é registrada como **interação** para Analytics.

> **Versão 1:** apenas desafios do tipo **Quiz**. A hierarquia `Desafio` (abstrata) já nasce preparada para novos tipos (Linha do Tempo, Ache o Bug, Associação) sem alterar o código existente (princípio aberto/fechado).

---

## Backend (`backend/`)

**Organização por funcionalidade (package-by-feature)** com **camadas internas**. Cada módulo de negócio é independente e tem as mesmas camadas, o que facilita localizar código e evita classes "faz-tudo".

```
backend/src/main/java/br/senai/fatesg/museusoftware/
├── config/                 Configurações (CORS, H2, OpenAPI, carga inicial de dados)
├── shared/
│   ├── exception/          Exceções de negócio + tratador global (@RestControllerAdvice)
│   ├── dto/                Respostas genéricas (erro padronizado, paginação)
│   ├── model/              Classes base abstratas (ex.: entidade com id e datas de auditoria)
│   └── util/               Utilitários puros e sem estado
├── historia/               Períodos, marcos históricos, personagens e referências (fontes)
├── desafio/                Desafios do jogo e suas respostas
├── jogador/                Jogador / sessão de jogo
├── progresso/              Pontuação, fases concluídas e conquistas
└── interacao/              Registro de eventos para Analytics (data/hora, tipo, tela/fase, sessão)

Cada módulo contém:
├── controller/   Endpoints REST. Só recebe a requisição, valida (@Valid) e delega ao service.
├── service/      Regras de negócio. Depende de interfaces de repositório, nunca de controllers.
├── repository/   Interfaces Spring Data JPA (acesso ao H2).
├── model/        Entidades JPA e enums do domínio.
├── dto/          Objetos de entrada (Request) e saída (Response). Entidades nunca saem da API.
└── mapper/       Conversão entidade <-> DTO.

backend/src/main/resources/
├── db/          Scripts de schema (se necessário)
└── data/        Carga inicial do conteúdo histórico (períodos, marcos, desafios)

backend/src/test/java/...   Espelha os módulos — testes unitários dos services (entrega de Teste de Software)
```

### Fluxo de uma requisição

`Controller → Service → Repository → H2`, e na volta `Entidade → Mapper → DTO → JSON`.

### Onde a orientação a objetos aparece (critérios de Paradigmas)

| Conceito | Aplicação planejada |
|---|---|
| Abstração / herança | `shared/model`: entidade base abstrata herdada pelas demais. `desafio/model`: `Desafio` abstrato com subtipos `DesafioQuiz`, `DesafioLinhaDoTempo`, `DesafioCodigo` (herança JPA). |
| Polimorfismo | Cada tipo de desafio implementa sua própria forma de **corrigir a resposta** e **calcular a pontuação**; o service chama o mesmo método sem saber o tipo concreto. |
| Encapsulamento | Atributos privados; mudanças de estado por métodos com regra (ex.: o progresso só avança se a fase anterior foi concluída). |
| Responsabilidade única | Controller só trata HTTP; service só regra; repository só dados; mapper só conversão. |
| Inversão de dependência | Injeção por construtor; services dependem de interfaces. |

---

## Web (`web/`)

**Organização por funcionalidade (feature-based)**, com o **domínio do jogo em classes TypeScript** separado da interface. Assim a lógica pode ser reaproveitada pelo app mobile.

```
web/
├── public/                    Arquivos estáticos servidos como estão
├── tests/unit/                Testes unitários (domínio e utilitários)
└── src/
    ├── app/
    │   ├── router/            Definição de rotas
    │   └── providers/         Provedores globais (estado, tema, sessão)
    ├── assets/                images/, icons/, sounds/, fonts/ (identidade visual do museu)
    ├── components/
    │   ├── ui/                Componentes reutilizáveis e sem regra de negócio (Botão, Card, Modal, Barra de progresso)
    │   └── layout/            Estrutura das telas (Cabeçalho, Rodapé, HUD do jogo)
    ├── domain/                Modelo do jogo em POO, sem React
    │   ├── entities/          Periodo, MarcoHistorico, Jogador, Progresso
    │   ├── challenges/        Desafio (abstrato) e subclasses: Quiz, LinhaDoTempo, AcheOBug
    │   └── value-objects/     Valores imutáveis (Pontuacao, Resposta)
    ├── features/              Cada funcionalidade com components/, hooks/, services/, types/
    │   ├── historia/          Exibição de períodos e marcos (mundo x Brasil, fontes)
    │   ├── jogo/              Motor do jogo: fluxo das fases, HUD, regras de avanço
    │   ├── desafios/          Telas e interação de cada tipo de desafio
    │   └── progresso/         Pontuação, conquistas e resumo do aprendizado
    ├── pages/                 Telas (compõem features; não têm regra própria)
    │   ├── home/              Tela inicial e instruções
    │   ├── mapa-periodos/     Seleção de fase (linha do tempo dos 5 períodos)
    │   ├── fase/              Tela de jogo de um período
    │   ├── resultado/         Final: conhecimentos trabalhados e pontuação
    │   ├── creditos/          Equipe e referências
    │   └── not-found/         Página 404
    ├── services/
    │   ├── api/               Cliente HTTP e um serviço por recurso da API
    │   └── tracking/          Envio das interações do jogador para a API
    ├── store/                 Estado global (sessão, progresso)
    ├── hooks/                 Hooks compartilhados (ex.: requisição com carregamento/erro)
    ├── utils/                 Funções puras
    ├── constants/             Rotas, tipos de evento, chaves de armazenamento
    ├── types/                 Tipos globais e contratos da API (DTOs)
    └── styles/                Tema, cores, tipografia, breakpoints (responsividade)
```

### Regras de dependência

```
pages → features → domain
          ↓
       services → API
components/ui não depende de nenhuma feature.
domain não depende de React nem de services.
```

### Boas práticas adotadas

- **POO no domínio**: classes com estado encapsulado; o polimorfismo dos desafios é o mesmo do backend.
- **Programação funcional na UI**: componentes funcionais, estado imutável, funções puras em `utils/`.
- **Estado reativo**: `useState` e `useEffect`, com estados de carregamento e erro em toda chamada à API.
- **Componentes declarativos e reutilizáveis** em `components/ui`.
- **Tipagem forte** com TypeScript; contratos da API em `types/`.
- **Nomenclatura**: pastas em `kebab-case`, componentes e classes em `PascalCase`, funções e variáveis em `camelCase`; domínio nomeado em português (Periodo, Desafio), seguindo o edital.

---

## Próximos passos

1. Inicializar o projeto Spring Boot (Maven, Web, JPA, H2, Validation) dentro de `backend/`.
2. Inicializar o projeto React + TypeScript (Vite) dentro de `web/`.
3. Modelar as entidades e o modelo de dados de interação.
4. Popular o conteúdo histórico a partir de `pesquisa-eixo-software.md`.

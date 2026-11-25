# Pesquisa — Eixo Temático: SOFTWARE

Museu Interativo da Computação — Projeto Integrador 2026/2 (SENAI FATESG, Eng. de Software, 6º período)

Organização: 5 períodos históricos definidos no edital, cada um com **contexto**, **marcos mundiais**, **marcos brasileiros**, **personagens** e **curiosidades**. No fim: temas transversais, ideias de uso no museu e referências.

Legenda de confiabilidade: itens marcados com **[fonte verificada]** foram conferidos em fonte primária/institucional durante a pesquisa (links na seção de referências). Os demais são fatos amplamente documentados na literatura clássica de história da computação (CERUZZI, 2003; CAMPBELL-KELLY et al., 2014; WIRTH, 2008).

---

## Visão geral: o que é a história do software?

Software é o conjunto de instruções que diz ao hardware o que fazer. Sua história é a história de **como a humanidade aprendeu a escrever essas instruções de forma cada vez mais abstrata, produtiva e confiável**:

| Período | Ideia central | Como se programava |
|---|---|---|
| Antes de 1950 | O "programa" como conceito matemático e mecânico | Cartões perfurados, cabos, chaves, notas em papel |
| 1950–1970 | Nascem as linguagens, os compiladores e a "engenharia de software" | Assembly, FORTRAN, COBOL, LISP, em lote (batch) |
| 1970–1990 | Software vira produto e chega às pessoas comuns | C, Pascal, BASIC, planilhas, interfaces gráficas |
| 1990–2010 | A web conecta tudo; o código aberto e o ágil mudam a indústria | Java, JavaScript, PHP, Python, Linux, metodologias ágeis |
| 2010–hoje | Nuvem, mobile, DevOps e IA que escreve código | TypeScript, React, containers, microsserviços, assistentes de IA |

---

## Período 1 — Primórdios da Computação (antes de 1950)

### Contexto
Antes de existir "software" como palavra, já existia a ideia de **separar a máquina das instruções que ela executa**. Teares, máquinas analíticas e a lógica matemática prepararam o terreno. O conceito de **programa armazenado na memória** (base de todo software moderno) só se concretizou em 1948.

### Marcos mundiais
- **1804 — Tear de Jacquard** (França): cartões perfurados controlam o padrão do tecido. Primeira vez que uma "sequência de instruções" trocável controla uma máquina.
- **1837 — Máquina Analítica de Charles Babbage**: projeto de computador mecânico de uso geral, programável por cartões perfurados (nunca concluída).
- **1843 — Ada Lovelace** traduz e comenta um artigo sobre a Máquina Analítica. Na **Nota G**, descreve um algoritmo para calcular **números de Bernoulli** — considerado o **primeiro programa de computador publicado**. Ela também intuiu que a máquina poderia manipular símbolos (música, por exemplo), não só números.
- **1847/1854 — George Boole**: álgebra booleana (verdadeiro/falso), base lógica de todo software.
- **1890 — Herman Hollerith**: tabuladora com cartões perfurados no censo dos EUA; sua empresa daria origem à IBM.
- **1931 — Kurt Gödel**: teoremas da incompletude, limites da formalização.
- **1936 — Alan Turing**: "On Computable Numbers" — define a **Máquina de Turing** e a máquina universal (uma máquina que executa qualquer programa). Mesmo ano: **Alonzo Church** e o **cálculo lambda**, origem da programação funcional.
- **1942–1945 — Konrad Zuse** projeta o **Plankalkül**, primeira linguagem de programação de alto nível projetada (publicada só em 1972).
- **1945 — ENIAC** (EUA): programado religando cabos e chaves. As **seis programadoras do ENIAC** (Kathleen McNulty, Jean Jennings, Betty Snyder, Marlyn Wescoff, Frances Bilas e Ruth Lichterman) foram pioneiras da programação.
- **1945 — John von Neumann**: "First Draft of a Report on the EDVAC" descreve a **arquitetura de programa armazenado** (dados e instruções na mesma memória).
- **1947 — O "bug"**: equipe de Grace Hopper encontra uma mariposa presa num relé do Harvard Mark II e cola no diário de bordo: "first actual case of bug being found". (O termo "bug" já existia na engenharia, mas o episódio o popularizou.)
- **21/06/1948 — Manchester Baby** (Inglaterra): **primeiro programa armazenado em memória eletrônica a ser executado** na história.
- **1949 — EDSAC** (Cambridge): primeiro computador de programa armazenado em uso regular; Maurice Wilkes e David Wheeler criam **bibliotecas de sub-rotinas** (a "chamada de função" de Wheeler).
- **1949 — Short Code** (John Mauchly): uma das primeiras linguagens de alto nível efetivamente usadas (interpretada).

### Brasil no período
- O Brasil ainda **não tinha computadores**; o processamento de dados era feito com **máquinas de cartões perfurados (tabuladoras Hollerith/IBM)**, usadas, por exemplo, nos recenseamentos do IBGE.
- Formação de base em matemática e engenharia (Escola Politécnica de SP, Escola Nacional de Engenharia no RJ) e a criação do **ITA (1950)** e do **CNPq (1951)** preparam a geração que traria a computação ao país na década seguinte.
- Sugestão de abordagem no museu: mostrar que o Brasil **entra na história como usuário** (cartões perfurados no governo), e que a virada vem nos anos 1950–60.

### Personagens-chave
Ada Lovelace, Charles Babbage, George Boole, Alan Turing, Alonzo Church, Konrad Zuse, John von Neumann, Grace Hopper, as programadoras do ENIAC, Maurice Wilkes.

### Curiosidades
- A linguagem **Ada** (1980) foi batizada em homenagem a Ada Lovelace.
- As programadoras do ENIAC não foram citadas na apresentação pública de 1946; o reconhecimento veio décadas depois.

---

## Período 2 — Fundação da Computação Moderna (1950–1970)

### Contexto
Computadores deixam os laboratórios e entram em governos, bancos e universidades. Programar em código de máquina é lento e sujeito a erros, então nascem **compiladores, linguagens de alto nível e sistemas operacionais**. No fim da década de 1960, projetos gigantes atrasam e estouram orçamentos: é a **"crise do software"**, que dá origem à **Engenharia de Software**.

### Marcos mundiais
- **1952 — Grace Hopper cria o A-0**, considerado o primeiro **compilador** (na prática, um "linker/carregador" de sub-rotinas). Ela defendia que programas deveriam ser escritos em algo próximo do inglês.
- **1957 — FORTRAN** (John Backus, IBM): primeira linguagem de alto nível amplamente usada, para cálculo científico. Provou que código compilado podia ser quase tão eficiente quanto o escrito à mão.
- **1958 — LISP** (John McCarthy, MIT): processamento simbólico, recursão, coleta de lixo (garbage collection); base da IA simbólica e da programação funcional.
- **1958 — A palavra "software"** aparece em texto impresso pelo estatístico John W. Tukey (uso já circulava oralmente).
- **1958/1960 — ALGOL 58/60**: introduz estrutura em blocos e escopo léxico; descrito com a **notação BNF** (Backus–Naur Form) — base da descrição formal de linguagens até hoje.
- **1959/1960 — COBOL** (comitê CODASYL, forte influência de Grace Hopper): linguagem para negócios, legível. **Ainda roda em bancos e governos** no mundo todo.
- **1961 — CTSS (MIT)**: um dos primeiros sistemas de **tempo compartilhado** (time-sharing).
- **1962 — Spacewar!** (MIT, PDP-1): um dos primeiros jogos de computador.
- **1964 — BASIC** (John Kemeny e Thomas Kurtz, Dartmouth): linguagem para iniciantes; seria a porta de entrada dos microcomputadores.
- **1964 — IBM System/360 e OS/360**: família compatível de computadores. O OS/360 foi um dos maiores projetos de software da época; o gerente **Fred Brooks** escreveria "**O Mítico Homem-Mês**" (1975), com a **Lei de Brooks**: "adicionar pessoas a um projeto atrasado o atrasa ainda mais".
- **1965–1969 — Multics** (MIT, Bell Labs, GE): sistema operacional ambicioso que inspirou o Unix.
- **1967 — Simula 67** (Ole-Johan Dahl e Kristen Nygaard, Noruega): introduz **classes, objetos e herança** — origem da **programação orientada a objetos**.
- **1968 — Conferência da OTAN em Garmisch (Alemanha)**: o termo **"Engenharia de Software"** é adotado oficialmente para enfrentar a **"crise do software"**.
- **1968 — Edsger Dijkstra**: "Go To Statement Considered Harmful" — marco da **programação estruturada**.
- **1969 — Software da Apollo 11**: equipe de **Margaret Hamilton** (MIT) escreve o software de bordo; a priorização de tarefas evitou abortar o pouso lunar. Hamilton popularizou o termo "engenharia de software".
- **1969 — IBM "unbundling"**: IBM passa a vender software separado do hardware — **nasce a indústria de software como negócio**.
- **1969 — Unix** (Ken Thompson e Dennis Ritchie, Bell Labs).
- **1969 — ARPANET**: primeira mensagem entre computadores (UCLA–Stanford).
- **1970 — Winston Royce** publica o artigo que seria interpretado como o **modelo em cascata** (curiosamente, ele próprio alertava para os riscos de um processo puramente sequencial).

### Brasil no período
- **1957 — Primeiro computador no Brasil**: **UNIVAC-120**, comprado pelo Governo do Estado de São Paulo para calcular o consumo de água da capital; 4.500 válvulas; operado por engenheiros formados no ITA. **[fonte verificada]**
- **1959 — Primeiro computador do setor privado**: IBM RAMAC 305, adquirido pela Anderson Clayton. **[fonte verificada]**
- **1959 — GEACE** (Grupo Executivo para Aplicação de Computadores Eletrônicos), criado pelo governo JK para incentivar o uso de computadores. **[fonte verificada]**
- **13/06/1960 — PUC-Rio inaugura o Burroughs B-205**, primeiro computador de grande porte para uso acadêmico na América Latina; os primeiros brasileiros são treinados para programá-lo. **[fonte verificada]**
- **1960 — IBGE** adquire um UNIVAC 1105 para processar o **Censo de 1960**. **[fonte verificada]**
- **1961 — "Zezinho" (ITA)**: computador didático transistorizado, trabalho de graduação de Alfred Volkmer, András Vásárhelyi, Fernando Vieira de Souza e José Ellis Ripper Filho; primeiro computador não comercial **totalmente projetado e construído no Brasil**. **[fonte verificada]**
- **01/12/1964 — Criação do SERPRO** (Lei nº 4.516), empresa pública de processamento de dados do governo federal — uma das maiores organizações públicas de TI do mundo. **[fonte verificada]**
- **1968 — Laboratório de Sistemas Digitais (LSD) da Poli-USP**, onde nasceria o Patinho Feio; os alunos estudavam um IBM 1620 por engenharia reversa. **[fonte verificada]**
- Fim dos anos 1960: surgem os primeiros cursos e centros de computação em universidades (USP, PUC-Rio, Unicamp, UFRJ, ITA).

### Personagens-chave
Grace Hopper, John Backus, John McCarthy, Kemeny & Kurtz, Fred Brooks, Dahl & Nygaard, Edsger Dijkstra, Margaret Hamilton, Ken Thompson, Dennis Ritchie. No Brasil: equipe do Zezinho (ITA), Antônio Hélio Guerra Vieira (Poli-USP).

### Curiosidades
- No pouso da Apollo 11, alarmes "1202" e "1201" apareceram por sobrecarga; o software descartou tarefas de menor prioridade e o pouso continuou.
- O COBOL voltou às manchetes em 2020, quando governos nos EUA precisaram de programadores COBOL para sistemas de seguro-desemprego.

---

## Período 3 — Expansão da Computação (1970–1990)

### Contexto
O microprocessador barateia o computador e o software **chega às casas e escritórios**. Surgem empresas de software (Microsoft, Apple, Oracle), a interface gráfica, a orientação a objetos e o movimento do software livre. A Engenharia de Software amadurece com modelos de processo e de qualidade. No Brasil, é a era da **reserva de mercado de informática**.

### Marcos mundiais
- **1970 — Pascal** (Niklaus Wirth): linguagem para ensino de programação estruturada.
- **1970 — Modelo relacional** (Edgar F. Codd, IBM) → **SQL** (SEQUEL, 1974) → **Oracle** (1979): nasce o banco de dados como o conhecemos.
- **1972 — Linguagem C** (Dennis Ritchie); Unix é reescrito em C (1973), tornando-se portável.
- **1972 — Smalltalk** (Alan Kay e equipe, Xerox PARC): orientação a objetos "pura" e ambiente gráfico.
- **1972 — Prolog** (Alain Colmerauer): programação lógica.
- **1973 — Xerox Alto**: interface gráfica com janelas, ícones e mouse.
- **1974 — CP/M** (Gary Kildall): sistema operacional para microcomputadores.
- **1975 — Microsoft** fundada (Bill Gates e Paul Allen) com o **Altair BASIC**.
- **1976 — Apple** fundada; **1977** — Apple II.
- **1979 — VisiCalc**: primeira planilha eletrônica, a "killer app" que vendia computadores.
- **1981 — IBM PC e MS-DOS**.
- **1983 — Projeto GNU** (Richard Stallman); **1985 — Free Software Foundation**; **1989 — licença GPL**. Nasce o **software livre**.
- **1983 — TCP/IP** adotado na ARPANET (nascimento técnico da internet).
- **1983/1985 — C++** (Bjarne Stroustrup): orientação a objetos sobre C.
- **1984 — Apple Macintosh** populariza a interface gráfica. **1985 — Windows 1.0**.
- **1985–1987 — Therac-25**: falhas de software numa máquina de radioterapia causam mortes por overdose de radiação — caso clássico sobre **segurança e testes de software**.
- **1986 — Fred Brooks**, "No Silver Bullet": não existe solução mágica para a produtividade em software.
- **1986/1988 — Modelo Espiral** (Barry Boehm): desenvolvimento iterativo orientado a riscos.
- **1987 — Perl**; **1987 — CMM** (SEI/Carnegie Mellon), modelo de maturidade de processos (versão formal em 1991).
- **1988 — Verme de Morris**: primeiro grande incidente de malware na internet.

### Brasil no período
- **1972 — Patinho Feio (Poli-USP)**, inaugurado em 24/07/1972, primeiro minicomputador projetado e construído no Brasil. Como **não existia software algum para ele**, a equipe criou **tudo do zero**: montador (assembler), carregador, desmontador, depurador (debugger) e compiladores (**Algol** e a linguagem **Patol**). O software básico foi tema da dissertação de **João José Neto** (1975). **[fonte verificada]**
- **G-10 (USP + PUC-Rio, para a Marinha)** — compilador FORTRAN desenvolvido localmente; base do **MC 500 / Sistema 500 da Cobra**, primeiro computador comercial brasileiro (1975). **[fonte verificada]**
- **1974 — Cobra (Computadores e Sistemas Brasileiros)**, estatal para desenvolver tecnologia nacional. **[fonte verificada]**
- **1974 — DATAPREV** (processamento de dados da Previdência).
- **24/07/1978 — Fundação da Sociedade Brasileira de Computação (SBC)**. **[fonte verificada]**
- **1979 — SEI (Secretaria Especial de Informática)**. **[fonte verificada]**
- **29/10/1984 — Lei nº 7.232 (Política Nacional de Informática)**: institui a **reserva de mercado** por 8 anos e inclui explicitamente o **software** como atividade de informática a ser protegida. **[fonte verificada]**
- **1986 — ABES** (Associação Brasileira das Empresas de Software). **[fonte verificada]**
- **1987 — Lei nº 7.646, a primeira "Lei do Software"**: estende a reserva ao software; programas estrangeiros só podiam ser comercializados por meio de empresas brasileiras. Na prática, teve pouco efeito para fomentar a indústria local e conviveu com muita pirataria. **[fonte verificada]**
- **Anos 1980 — Microcomputadores nacionais** (CP-500, TK-85, Itautec, Prológica, Microdigital, MSX da Gradiente e Sharp), com **clones de sistemas e software estrangeiros** adaptados — e um forte movimento de **revistas de programação** (ex.: Micro Sistemas, INPUT) com listagens de programas em BASIC digitadas pelos leitores.
- **1983 — Fundação da Microsiga** (hoje **TOTVS**), que se tornaria a maior empresa brasileira de software de gestão (ERP).
- **Automação bancária**: nos anos 1980, os bancos brasileiros (Itaú, Bradesco, etc.) desenvolveram sistemas próprios de automação, impulsionados pela inflação alta (era necessário processar transações no mesmo dia). O Brasil se tornou referência mundial em software bancário.

### Personagens-chave
Niklaus Wirth, Dennis Ritchie, Ken Thompson, Alan Kay, Edgar Codd, Bill Gates, Steve Jobs & Steve Wozniak, Richard Stallman, Bjarne Stroustrup, Barry Boehm. No Brasil: Glen Langdon Jr. (orientador do Patinho Feio), João José Neto, equipe do LSD/Poli-USP, Arndt von Staa (PUC-Rio).

### Curiosidades
- Na inauguração do Patinho Feio não houve demonstração funcionando: um fotógrafo pisou no fio e desligou a máquina. **[fonte verificada]**
- O nome "Patinho Feio" era uma brincadeira com o projeto "Cisne Branco" da Unicamp para a Marinha — que nunca ficou pronto. **[fonte verificada]**

---

## Período 4 — Internet e Conectividade (1990–2010)

### Contexto
A **World Wide Web** transforma o software em algo **distribuído, em rede e acessado pelo navegador**. O **código aberto** (Linux, Apache, MySQL) vira infraestrutura do mundo. Metodologias **ágeis** substituem processos pesados. No fim do período, **smartphones e lojas de aplicativos** mudam de novo a forma de distribuir software.

### Marcos mundiais
- **1989–1991 — World Wide Web** (Tim Berners-Lee, CERN): HTML, HTTP, URL e o primeiro navegador.
- **1991 — Linux** (Linus Torvalds), **Python** (Guido van Rossum) e **Visual Basic**.
- **1993 — Mosaic**, primeiro navegador gráfico popular; **1994 — Netscape**.
- **1994 — "Design Patterns"** (Gamma, Helm, Johnson, Vlissides — a "Gangue dos Quatro").
- **1995 — o "ano das linguagens da web"**: **Java** (Sun, "escreva uma vez, rode em qualquer lugar"), **JavaScript** (Brendan Eich, em ~10 dias), **PHP** (Rasmus Lerdorf), **Ruby** (Yukihiro Matsumoto). Também: **Apache HTTP Server**, **MySQL**, **Windows 95** e o primeiro artigo formal sobre **Scrum** (Schwaber e Sutherland).
- **1996 — Ariane 5** explode 37 s após o lançamento por um **erro de conversão numérica** (64 → 16 bits) em software reaproveitado.
- **1997 — UML** padronizada pela OMG.
- **1998 — Termo "Open Source"** e Open Source Initiative; **Google** fundado.
- **1999 — Extreme Programming (XP)** (Kent Beck); **1999/2000 — Bug do Milênio (Y2K)**.
- **2001 — Manifesto Ágil** (17 autores em Snowbird, EUA). **Wikipedia** criada.
- **2002 — .NET e C#** (Microsoft).
- **2004 — Ruby on Rails**; **2005 — Git** (Linus Torvalds).
- **2006 — Amazon Web Services (S3, EC2)**: início da computação em nuvem comercial.
- **2007 — iPhone**; **2008 — App Store e Android**: o software passa a ser distribuído por lojas de apps.
- **2008 — GitHub** e **Stack Overflow**.
- **2009 — Node.js** (JavaScript no servidor), linguagem **Go** (Google), termo **DevOps**.

### Brasil no período
- **1991 — Lei nº 8.248 (nova Lei de Informática)**: **fim da reserva de mercado**, substituída por incentivos fiscais a P&D. **[fonte verificada]**
- **1989 — RNP (Rede Nacional de Ensino e Pesquisa)** é criada; **1995** — início da internet comercial no Brasil.
- **1993 — Linguagem Lua** (Tecgraf/PUC-Rio, em parceria com a **Petrobras**), criada por **Roberto Ierusalimschy, Luiz Henrique de Figueiredo e Waldemar Celes**. Nasceu da fusão das minilinguagens **DEL** e **SOL** ("sol" → "lua"). Requisitos: simples, pequena, **portável** (a Petrobras tinha máquinas DOS, Windows, Mac e Unix) e **embarcável** via API em C. **É a única linguagem criada em país em desenvolvimento a alcançar relevância global**: usada em Adobe Lightroom, World of Warcraft, Angry Birds, Roblox (Luau), Neovim, Nginx/OpenResty, e no Ginga da TV digital. **[fonte verificada]**
- **1993 — Programa SOFTEX** criado pelo CNPq para promover a exportação de software; em 1996 vira a **Sociedade SOFTEX**. **[fonte verificada]**
- **1995 — Conectiva** (Curitiba), pioneira do Linux na América Latina; lança o **Conectiva Linux** (1997) e cria o gerenciador de pacotes **Synaptic**, usado até hoje. Em 2005 se funde à MandrakeSoft, originando a **Mandriva**. **[fonte verificada]**
- **1996 — Urna eletrônica**: usada em municípios com mais de 200 mil eleitores (~30% do eleitorado). As primeiras urnas rodavam o **VirtuOS** (clone brasileiro do MS-DOS); depois Windows CE; em **2008** todas passaram a usar o **Uenux** (Linux) desenvolvido pela equipe do próprio TSE. **[fonte verificada]**
- **1996–1997 — Receita Federal**: em 1996 o programa do IR pode ser baixado pela internet; em **17/03/1997 é lançado o ReceitaNet**, entrega da declaração pela internet — pioneiro no mundo. **[fonte verificada]**
- **1998 — Lei nº 9.609 (nova Lei do Software)**: software protegido pelo regime de **direitos autorais** (como obra literária) por **50 anos**; revoga a Lei 7.646/87. **[fonte verificada]**
- **2003 — Governo federal adota preferencialmente software livre**; **dezembro de 2003 — MPS.BR** (Melhoria de Processo do Software Brasileiro), modelo de qualidade da Softex baseado em CMMI e ISO/IEC 12207/15504, pensado para pequenas e médias empresas. **[fonte verificada]**
- **2003 — Kurumin Linux** (Carlos Morimoto), distribuição brasileira popular.
- **Abril de 2007 — Portal do Software Público Brasileiro**, para compartilhar software desenvolvido por e para o governo (ex.: CACIC). **[fonte verificada]**
- **2007–2009 — Ginga e NCL** (Laboratório TeleMídia/PUC-Rio + LAViD/UFPB): middleware da **TV digital brasileira**; em **29/04/2009** a linguagem **NCL e o Ginga-NCL** tornam-se a **Recomendação ITU-T H.761** — **padrão internacional a partir de proposta integralmente brasileira**. NCL usa **Lua** como linguagem de script. **[fonte verificada]**

### Personagens-chave
Tim Berners-Lee, Linus Torvalds, Guido van Rossum, James Gosling, Brendan Eich, Kent Beck, Ken Schwaber & Jeff Sutherland. No Brasil: Roberto Ierusalimschy, Luiz Henrique de Figueiredo, Waldemar Celes, Luiz Fernando Gomes Soares (Ginga/NCL), Arnaldo Carvalho de Melo (Conectiva).

### Curiosidades
- "Lua" foi sugerido por Carlos Henrique Levy, colega do Tecgraf, porque a linguagem derivava da "SOL". **[fonte verificada]**
- O teclado numérico da urna, parecido com o de telefone, veio de uma proposta do TRE-MG para tornar o voto simples. **[fonte verificada]**

---

## Período 5 — Era Digital e Inteligência Artificial (2010–presente)

### Contexto
Software "come o mundo" (Marc Andreessen, 2011). Aplicações são construídas em **nuvem**, com **microsserviços, containers e entrega contínua (DevOps)**. Frameworks declarativos dominam o front-end e o mobile. Desde 2021, **assistentes de IA geram código** e mudam o próprio ato de programar. Ao mesmo tempo, cresce a preocupação com **privacidade, segurança da cadeia de suprimentos de software e regulação**.

### Marcos mundiais
- **2011 — "Why Software Is Eating the World"** (Marc Andreessen).
- **2012 — TypeScript** (Microsoft, Anders Hejlsberg): JavaScript com tipagem estática.
- **2013 — React** (Facebook) e **Docker** (containers).
- **2014 — Kubernetes** (Google), **Swift** (Apple), **Spring Boot** (Pivotal), **AWS Lambda** (serverless); popularização do termo **microsserviços** (Lewis & Fowler).
- **2015 — React Native** (apps nativos com React) e **Rust 1.0**.
- **2016/2017 — Kotlin** e **Flutter**; 2017 — Kotlin passa a ser oficial no Android.
- **2018 — Microsoft compra o GitHub**; **GDPR** entra em vigor na Europa.
- **2021 — GitHub Copilot** (IA que sugere código); **Log4Shell**, falha numa biblioteca Java presente em milhões de sistemas, expõe o risco da **cadeia de dependências**.
- **Nov/2022 — ChatGPT**: IA generativa conversacional se populariza; ferramentas de IA passam a escrever, explicar e revisar código.
- **2023–2025 — Agentes de IA para programação** em IDEs e terminais; crescimento do "vibe coding" e debates sobre qualidade, segurança e autoria do código gerado.
- **Jul/2024 — Incidente CrowdStrike**: uma atualização defeituosa derruba cerca de 8,5 milhões de computadores Windows no mundo — exemplo atual da importância de **testes e implantação gradual**.

### Brasil no período
- **2012 — Elixir** (José Valim, brasileiro, na Plataformatec, São Paulo): linguagem funcional sobre a máquina virtual do Erlang; trabalho iniciado em 2011, v0.5 em maio/2012, v1.0 em 2014. A Plataformatec depois foi incorporada ao Nubank. Usada por empresas como Discord e Pinterest. **[fonte verificada]**
- **2013 — Nubank**: fintech nativa de software (Clojure, microsserviços) que se tornou um dos maiores bancos digitais do mundo.
- **2014 — Marco Civil da Internet** (Lei nº 12.965/2014): neutralidade de rede, privacidade, responsabilidades.
- **2018 — LGPD** (Lei nº 13.709/2018), em vigor desde 2020: proteção de dados pessoais muda a forma de projetar software ("privacy by design"). *Relevante para o nosso próprio app, que grava interações dos visitantes.*
- **2019 — gov.br**: unificação dos serviços digitais do governo federal.
- **16/11/2020 — Pix** (Banco Central): sistema de pagamentos instantâneos 24x7; **734 instituições** no lançamento; mais de 71 milhões de chaves cadastradas antes da abertura plena. **Caso de sucesso mundial de software público.** **[fonte verificada]**
- **2021 — Open Finance Brasil**: APIs padronizadas para compartilhamento de dados financeiros.
- Ecossistema: forte comunidade de software livre e de desenvolvedores (Brasil está entre os países com mais usuários no GitHub), unicórnios de software (iFood, QuintoAndar, VTEX, Hotmart, etc.) e a continuidade de Lua (Lua 5.4) como linguagem brasileira com uso global.

### Personagens-chave
Anders Hejlsberg, Jordan Walke (React), Solomon Hykes (Docker). No Brasil: José Valim, Roberto Ierusalimschy (Lua segue ativa), equipe do Banco Central responsável pelo Pix.

### Curiosidades
- O Pix foi desenvolvido e é operado pelo próprio Banco Central (infraestrutura centralizada), algo incomum em sistemas de pagamento.
- O app do nosso projeto usa exatamente tecnologias deste período: **React Native (2015) + TypeScript (2012) + Spring Boot (2014)**. Pode virar uma "sala final" do museu: "o software que você está usando agora".

---

## Temas transversais (úteis para conectar os períodos)

1. **Abstração crescente**: cartões → código de máquina → Assembly → linguagens de alto nível → frameworks → IA gerando código.
2. **Paradigmas de programação**: imperativo/estruturado (FORTRAN, C), orientado a objetos (Simula, Smalltalk, C++, Java), funcional (LISP, ML, Haskell, Elixir), lógico (Prolog), declarativo (SQL, HTML, React, NCL). *Útil para a disciplina de Paradigmas.*
3. **Processos de engenharia de software**: crise do software (1968) → cascata (1970) → espiral (1986) → CMM/CMMI e MPS.BR → ágil (2001) → DevOps (2009). *Útil para UC1/UC5.*
4. **Qualidade e falhas célebres**: Therac-25, Ariane 5, Y2K, Log4Shell, CrowdStrike. *Útil para Teste de Software.*
5. **Software livre x proprietário**: unbundling da IBM (1969), GNU/GPL, Linux, software público brasileiro.
6. **Brasil**: de importador (1957) a criador de tecnologia (Patinho Feio, Lua, Ginga/NCL, Elixir, urna, Pix); papel da política pública (reserva de mercado, Lei de Informática, Softex, MPS.BR, LGPD).

### Gancho para o relatório de Análise e Projeto de Algoritmos (eixo Software)
- **Compiladores e linguagens** permitiram expressar algoritmos mais eficientes (ex.: recursão no ALGOL/LISP viabilizou quicksort, de Tony Hoare, 1961; mergesort de von Neumann, 1945).
- **Estruturas de dados nas bibliotecas** (tabelas hash, árvores balanceadas, STL do C++, Collections do Java) democratizaram algoritmos \(O(\log n)\) e \(O(1)\) amortizado.
- **SQL e o otimizador de consultas** escolhem automaticamente algoritmos de junção (nested loop \(O(n \cdot m)\), hash join \(O(n+m)\)).
- **Diferença essencial**: hardware mais rápido melhora o **desempenho** (constantes); só um algoritmo melhor muda a **complexidade assintótica** (ex.: busca linear \(O(n)\) → busca binária \(O(\log n)\)). O PDF do PI exige explicitamente essa distinção.
- Exemplo do Brasil: a tabela de Lua (híbrida array + hash) e o uso de **coleta de lixo incremental** (Lua 5.1) — decisões de projeto de software com impacto em complexidade e desempenho.

---

## Ideias de uso no museu

**Se for Museu Web:**
- Linha do tempo com 5 "salas"; cada sala com cards "Mundo" e "Brasil" lado a lado (atende os requisitos 3.1.3 e 3.2.6).
- Página de detalhe por marco (texto, imagem, personagem, fonte).
- "Sala de código": mostrar o mesmo programa (ex.: "Olá, mundo" ou soma de 1 a 10) em FORTRAN, COBOL, BASIC, C, Java, Lua, TypeScript.

**Se for Museu Gamificado:**
- Quiz por período ("Quem escreveu o primeiro programa publicado?").
- Linha do tempo para ordenar (arrastar marcos para a ordem correta).
- "Ache o bug": desafios inspirados em falhas reais (Ariane 5 com overflow, Y2K com ano de 2 dígitos).
- Missão Brasil: "monte o software do Patinho Feio" (montador → carregador → compilador).
- Feedback educativo em cada resposta, com a fonte.

**Eventos de interação para a API (Construção de Software II)** — exemplos derivados desta pesquisa: `PERIODO_ACESSADO`, `EIXO_ACESSADO`, `CONTEUDO_ABERTO` (id do marco), `DESTAQUE_BRASIL_ABERTO`, `QUIZ_RESPONDIDO` (acerto/erro), `DESAFIO_CONCLUIDO`.

---

## Referências

### Fontes verificadas nesta pesquisa (online)
- BRASIL. **Lei nº 4.516, de 1º de dezembro de 1964**. Cria o Serviço Federal de Processamento de Dados. Disponível em: https://www2.camara.leg.br/legin/fed/lei/1960-1969/lei-4516-1-dezembro-1964-377653-norma-pl.html
- BRASIL. **Lei nº 7.232, de 29 de outubro de 1984**. Dispõe sobre a Política Nacional de Informática. Disponível em: https://www.planalto.gov.br/ccivil_03/leis/l7232.htm
- BRASIL. **Lei nº 9.609, de 19 de fevereiro de 1998**. Dispõe sobre a proteção da propriedade intelectual de programa de computador. Disponível em: https://www.planalto.gov.br/ccivil_03/leis/l9609.htm
- BANCO CENTRAL DO BRASIL. **Agenda BC#: 734 instituições iniciam em 16/11 a operação plena do Pix**. 2020. Disponível em: https://www.bcb.gov.br/detalhenoticia/17245/nota
- CTI RENATO ARCHER. **Base legal**. Disponível em: https://www.gov.br/cti/pt-br/trajetoria-historica/base-legal-tabela
- ABES. **História**. Disponível em: https://abes.org.br/abes/historia/
- IERUSALIMSCHY, R.; FIGUEIREDO, L. H.; CELES, W. **The Evolution of Lua**. In: HOPL III – ACM SIGPLAN History of Programming Languages Conference, 2007. Disponível em: https://www.lua.org/doc/hopl.pdf
- IERUSALIMSCHY, R.; FIGUEIREDO, L. H.; CELES, W. **The evolution of an extension language: a history of Lua**. Disponível em: https://www.tecgraf.puc-rio.br/lua/local/history.html
- ITA. **Divisão de Ciência da Computação – histórico**. Disponível em: https://comp.ita.br/iec/
- JUSTIÇA ELEITORAL. **Cronologia da informatização do processo eleitoral**. Disponível em: https://www.justicaeleitoral.jus.br/urna-eletronica/cronologia-da-informatizacao-do-processo-eleitoral.html
- TSE. **O que faz a urna funcionar?** Revista Eletrônica EJE, n. 5, ano 5. Disponível em: https://www.tse.jus.br/institucional/escola-judiciaria-eleitoral/publicacoes/revistas-da-eje/
- MUSEU DA INFORMÁTICA. **Linha do tempo**. Disponível em: https://museu-informatica.com.br/tempo/tempo1.php
- NÚCLEO DE MEMÓRIA PUC-RIO. **Inauguração do Centro de Processamento de Dados com o Burroughs B205**. Disponível em: https://nucleodememoria.vrac.puc-rio.br/70anos/no-tempo/ha-50-anos/1960/
- NÚCLEO DE MEMÓRIA PUC-RIO. **O início da computação no Brasil**. Disponível em: https://nucleodememoria.vrac.puc-rio.br/primeiro_site/textosfinais/iniciocomputacaobrasil.pdf
- PESQUISA FAPESP. **O legado do Patinho Feio**. Disponível em: https://revistapesquisa.fapesp.br/o-legado-do-patinho-feio/
- FDTE/POLI-USP. **Patinho Feio – O fato gerador, hardware, software e gestão**. Disponível em: https://www.patinho-fdte.com.br/conteudo/o-fato-gerador-hardware-software-e-gestao
- POLI-USP / PCS. **História do Departamento**. Disponível em: https://pcs.usp.br/departamento/historia/
- CIÊNCIA E CULTURA. **Os primeiros computadores nos laboratórios brasileiros**. v. 76, n. 2. Disponível em: https://cienciaecultura.bvs.br/pdf/cic/v76n2/v76n2a27.pdf
- NETO, J. J. **Aspectos do projeto de software de um minicomputador**. Dissertação (Mestrado) – Escola Politécnica, USP, 1975. Disponível em: https://archive.org/details/AspectosDoProjetoDeSoftwareDeUmMinicomputador
- RECEITA FEDERAL. **1997: entrega da declaração de ajuste anual do IRPF pela internet**. Disponível em: https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/institucional/memoria/
- SBC. **Sobre a SBC**. Disponível em: https://www.sbc.org.br/sobre-asbc/
- SERPRO. **Lei de criação**. Disponível em: https://www.transparencia.serpro.gov.br/acesso-a-informacao/institucional/base-juridica/lei-de-criacao
- SOFTEX. **MPS.BR completa 20 anos**. Disponível em: https://softex.br/mpsbr-completa-20-anos/
- MCTI. **Programa SOFTEX – Resultados da Lei de Informática**. Disponível em: https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/lei-de-tics/arquivos_programas_prioritarios_em_informatica/softex.pdf
- SOARES, L. F. G. et al. **Ginga-NCL: Declarative Middleware for Multimedia IPTV Services**. IEEE Communications Magazine, jun. 2010. Disponível em: https://telemidia.puc-rio.br/files/biblio/2010_06_soares.pdf
- GINGA. **Ginga Documentation Portal**. Disponível em: https://ginga.org.br/en/
- VALIM, J. **Elixir v0.5.0 released**. 2012. Disponível em: https://elixir-lang.org/blog/2012/05/25/elixir-v0-5-0-released/
- WIKIPEDIA. **Conectiva**; **História do software livre no Brasil**. (usar apenas como apoio; preferir fontes primárias no texto final)

### Bibliografia clássica recomendada (para o relatório em ABNT)
- BROOKS, F. P. **O mítico homem-mês**: ensaios sobre engenharia de software. Rio de Janeiro: Alta Books, 2018.
- CAMPBELL-KELLY, M. et al. **Computer: a history of the information machine**. 3. ed. Boulder: Westview Press, 2014.
- CERUZZI, P. E. **A history of modern computing**. 2. ed. Cambridge: MIT Press, 2003.
- DANTAS, V. **Guerrilha tecnológica**: a verdadeira história da política nacional de informática. Rio de Janeiro: LTC, 1988.
- ISAACSON, W. **Os inovadores**: uma biografia da revolução digital. São Paulo: Companhia das Letras, 2014.
- PRESSMAN, R. S.; MAXIM, B. R. **Engenharia de software**: uma abordagem profissional. 9. ed. Porto Alegre: AMGH, 2021.
- SOMMERVILLE, I. **Engenharia de software**. 10. ed. São Paulo: Pearson, 2019.
- WIRTH, N. A brief history of software engineering. **IEEE Annals of the History of Computing**, v. 30, n. 3, p. 32-39, 2008.
- NAUR, P.; RANDELL, B. (ed.). **Software Engineering**: report on a conference sponsored by the NATO Science Committee, Garmisch, 1968. Bruxelas: NATO, 1969.

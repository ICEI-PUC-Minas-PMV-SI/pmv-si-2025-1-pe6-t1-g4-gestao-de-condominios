# Front-end Web

Este projeto consiste no desenvolvimento de uma interface web interativa para uma aplicação distribuída, cujo objetivo é permitir que usuários consultem, interajam e realizem operações em um sistema com backend em nuvem. A interface será responsiva, acessível e intuitiva, visando atender tanto usuários em desktop quanto em dispositivos móveis.

## Projeto da Interface Web

O projeto da interface web busca facilitar a experiência do usuário (UX) com um design moderno e minimalista, focando na clareza das informações e na redução de atritos na navegação. O layout será composto por:

Página inicial (Apartamentos): gestão de apartamentos.

Página de login/cadastro: autenticação de usuários com campos de email e senha.

Página de detalhes: exibição detalhada de registros ou objetos do sistema.

Navegação: barra lateral (sidebar) para desktop e menu hambúrguer para dispositivos móveis.

Interações do usuário incluirão botões responsivos, notificações, tooltips e formulários validados em tempo real.

### Wireframes

[Inclua os wireframes das páginas principais da interface, mostrando a disposição dos elementos na página.]

### Design Visual

O design visual da aplicação de gestão de condomínios foi desenvolvido com base nos princípios do Material Design 3, utilizando tokens de design para garantir consistência, escalabilidade e acessibilidade em toda a interface.

Esses tokens representam decisões visuais reutilizáveis, como cores, tipografia, espaçamento e formas, e são implementados como variáveis CSS no projeto web.

Paleta de Cores
A paleta de cores segue os tokens de sistema do Material Design 3, promovendo uma hierarquia clara e acessível:

`--md-sys-color-primary`: Cor principal utilizada para elementos de destaque e ações primárias.

`--md-sys-color-secondary`: Cor secundária para elementos complementares.

`--md-sys-color-surface`: Cor de fundo para superfícies da interface.

`--md-sys-color-background`: Cor de fundo geral da aplicação.

`--md-sys-color-error`: Cor utilizada para indicar erros e alertas.

Essas cores são definidas como variáveis CSS, permitindo fácil manutenção e personalização do tema.

Tipografia
A tipografia é baseada nos tokens tipográficos do Material Design 3, assegurando legibilidade e hierarquia visual:

`--md-sys-typescale-display-large`: Títulos principais.

`--md-sys-typescale-headline-medium`: Cabeçalhos secundários.

`--md-sys-typescale-body-large`: Texto principal.

`--md-sys-typescale-label-small`: Rótulos e legendas.

A fonte padrão utilizada é "Roboto", conforme recomendado pelo Material Design.

Espaçamento e Layout
O espaçamento e layout são definidos utilizando tokens de espaçamento do Material Design 3, garantindo uma estrutura coerente e responsiva:

`--md-sys-spacing-small`: Espaçamento pequeno para elementos agrupados.

`--md-sys-spacing-medium`: Espaçamento padrão entre seções.

`--md-sys-spacing-large`: Espaçamento amplo para separação de conteúdos distintos.

Formas e Componentes
As formas dos componentes seguem os tokens de forma do Material Design 3, proporcionando uma aparência moderna e acessível:

`--md-sys-shape-corner-smal`: Cantos levemente arredondados para botões e campos de entrada.

`--md-sys-shape-corner-medium`: Cantos moderadamente arredondados para cartões e modais.

`--md-sys-shape-corner-large`: Cantos mais arredondados para elementos destacados.

A implementação desses tokens no projeto é realizada por meio de variáveis CSS, facilitando a manutenção e a adaptação da interface conforme as necessidades do usuário e as diretrizes de acessibilidade.

## Fluxo de Dados

O fluxo de dados da aplicação seguirá o padrão MVC (Model-View-Controller) no frontend, utilizando requisições assíncronas via API REST para o backend. O diagrama simplificado é:

1. Usuário interage com a View (interface)

2. View dispara evento → Controller processa

3. Controller faz chamada assíncrona à API

4. API retorna dados → Controller processa resposta

5. View é atualizada dinamicamente com os dados recebidos

## Tecnologias Utilizadas

As principais tecnologias a serem utilizadas no front-end são:

React.js: biblioteca principal para criação de interfaces reativas

Vite ou Next.js: build tool ou framework de React

Tailwind CSS: framework de CSS utilitário

Axios: cliente HTTP para comunicação com APIs

Docker (opcional): containerização da aplicação para desenvolvimento e produção


## Considerações de Segurança

Para garantir a segurança da aplicação distribuída no front-end, serão aplicadas as seguintes medidas:

1. Autenticação baseada em tokens JWT, armazenados em cookies HttpOnly ou no localStorage com precauções.

2. Proteção contra XSS: escaping de HTML, uso de bibliotecas seguras.

3. Proteção contra CSRF: tokens anti-CSRF ou cookies SameSite.

4. Controle de acesso baseado em permissões do usuário (RBAC).

5. Uso de HTTPS obrigatório em todas as comunicações.

6. Validação de dados no front-end e backend para evitar injeções e envios inválidos.

## Implantação

Para implantar a aplicação distribuída em ambiente de produção, seguir os passos:

- Requisitos de hardware/software:

    - Servidor com mínimo de 1 vCPU, 2GB RAM
    - Node.js LTS instalado
    - Nginx ou outro servidor web reverso

- Plataforma de hospedagem:

    - Netlify, Vercel, AWS Amplify ou servidor próprio com Docker

- Configuração do ambiente:

    - Instalar dependências via npm install
    - Configurar variáveis de ambiente (ex.: API_URL)
    - Configurar domínio, certificado SSL (Let’s Encrypt)

- Deploy da aplicação:

    - Build do projeto: npm run build
    - Publicar /dist ou /out no serviço de hospedagem
    - Configurar regras de rewrite/redirecionamento (caso SPA)

- Testes de produção:

    - Verificar HTTPS, carregamento da página, chamadas à API
    - Testar responsividade em diferentes dispositivos
    - Validar fluxos críticos (login, formulários, navegação)

## Testes

[Descreva a estratégia de teste, incluindo os tipos de teste a serem realizados (unitários, integração, carga, etc.) e as ferramentas a serem utilizadas.]

### Teste APT1 - Criar Apartamento

Entrada: Criar apartamento com os dados: bloco B, número 101, andar 1 e condomínio Residencial Flor do Campo.
Saída Esperada: Apartamento criado com os dados de entrada.
Evidência:

![GravacaodeTela2025-05-10as11 11 18-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/23eff35f-16a9-424a-a4e0-55b17e880d0c)


### Teste APT2 - Editar Apartamento

Entrada: Editar número do apartamento de 101 para 102.
Saída Esperada: Apartamento editado com o novo número.
Evidência:

### Teste APT3 - Remover Apartamento

Entrada: Remover apartamento 102.
Saída Esperada: Apartamento de número 102 removido.
Evidência:



1. Crie casos de teste para cobrir todos os requisitos funcionais e não funcionais da aplicação.
2. Implemente testes unitários para testar unidades individuais de código, como funções e classes.
3. Realize testes de integração para verificar a interação correta entre os componentes da aplicação.
4. Execute testes de carga para avaliar o desempenho da aplicação sob carga significativa.
5. Utilize ferramentas de teste adequadas, como frameworks de teste e ferramentas de automação de teste, para agilizar o processo de teste.

# Referências

1. MDN Web Docs: https://developer.mozilla.org/
2. React.js Documentation: https://reactjs.org/docs/
3. Tailwind CSS Documentation: https://tailwindcss.com/docs
4. OWASP Cheat Sheets: https://cheatsheetseries.owasp.org/
5. Axios GitHub Repository: https://github.com/axios/axios
6. Jest Documentation: https://jestjs.io/
7. React Testing Library Docs: https://testing-library.com/docs/react-testing-library/intro/
8. Netlify Documentation: https://docs.netlify.com/
9. Vercel Documentation: https://vercel.com/docs
10. Material Design Token: https://m3.material.io/foundations/design-tokens/overview

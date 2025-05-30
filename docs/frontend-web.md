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

Os wireframes foram desenvolvidos de forma inteligente, pensando no desempenho e na produtividade das atividades de desenvolvimento do frontend.

#### Tela de Login
![Tela de Login](img/Wireframes/Tela_de_Login.jpg)

O wireframe da tela de login mostra uma interface simples e direta, focada na autenticação do usuário com campos para e-mail e senha.

#### Tela Inicial
![Tela Inicial](img/Wireframes/Tela_Inicial.jpg)

O wireframe da tela inicial apresenta o layout principal do sistema após o login, com elementos para navegação e acesso rápido às funções mais importantes.

#### Tela Inicial (Menu Aberto)
![Tela Inicial - Menu Aberto](img/Wireframes/Tela_Inicial_Menu_aberto.jpg)

Nesta variação, o wireframe detalha como o menu lateral é exibido, permitindo ao usuário navegar entre as diferentes seções.

#### Apartamentos - Cadastrar
![Apartamentos - Cadastrar](img/Wireframes/Apartamentos_Cadastrar.jpg)

Esta tela permite ao usuário cadastrar novos apartamentos, com campos claros e organizados para inserção de informações.

#### Apartamentos - Editar
![Apartamentos - Editar](img/Wireframes/Apartamentos_Editar.jpg)

O wireframe para edição de apartamentos foca na modificação de dados existentes, seguindo uma estrutura similar ao cadastro.

#### Apartamentos - Visualização
![Apartamentos - Visualização](img/Wireframes/Apartamentos_Visualização.jpg)

Nesta tela, o usuário pode visualizar os detalhes de um apartamento específico, organizados de forma limpa e acessível.

#### Pagamentos - Cadastrar
![Pagamentos - Cadastrar](img/Wireframes/Pagamentos_Cadastrar.jpg)

Este wireframe ilustra o formulário para cadastro de novos pagamentos, com campos bem estruturados para entrada de dados.

#### Pagamentos - Editar
![Pagamentos - Editar](img/Wireframes/Pagamentos_Editar.jpg)

A interface para edição de pagamentos mantém a consistência com o modelo de cadastro, facilitando a experiência do usuário.

#### Pagamentos - Excluir
![Pagamentos - Excluir](img/Wireframes/Pagamentos_Excluir.jpg)

Aqui, o wireframe mostra a confirmação para exclusão de pagamentos, garantindo que a ação seja intencional e informada.

#### Pagamentos - Visualização
![Pagamentos - Visualização](img/Wireframes/Pagamentos_Visualização.jpg)

Este wireframe detalha como os pagamentos são exibidos, com informações organizadas em uma tabela ou lista.

#### Taxas - Cadastrar
![Taxas - Cadastrar](img/Wireframes/Taxas_Cadastrar.jpg)

A tela de cadastro de taxas apresenta campos específicos para a inserção de dados relevantes.

#### Taxas - Editar
![Taxas - Editar](img/Wireframes/Taxas_Editar.jpg)

Este wireframe ilustra a edição de taxas já cadastradas, oferecendo uma experiência consistente com outras telas.

#### Usuários - Cadastrar
![Usuários - Cadastrar](img/Wireframes/Usuários_Cadastrar.jpg)

A tela de cadastro de usuários fornece campos claros para entrada de informações do novo usuário.

#### Usuários - Editar
![Usuários - Editar](img/Wireframes/Usuários_Editar.jpg)

O wireframe para edição de usuários permite modificar dados de usuários existentes, seguindo o mesmo padrão de design.

#### Usuários - Visualização
![Usuários - Visualização](img/Wireframes/Usuários_Visualização.jpg)


Para visualização completa: [Wireframes Figma](https://www.figma.com/design/C4hqUDqe0u2XnmomMzLDZf/Wireframe---Sistema-Condominio?node-id=27-536&t=XJJ0t4t3RpiEQpCF-1)

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

* Entrada: Criar apartamento com os dados: bloco B, número 101, andar 1 e condomínio Residencial Flor do Campo.
* Saída Esperada: Apartamento criado com os dados de entrada.
* Evidência:

![GravacaodeTela2025-05-10as11 11 18-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/23eff35f-16a9-424a-a4e0-55b17e880d0c)


### Teste APT2 - Editar Apartamento

* Entrada: Editar número do apartamento de 101 para 102.
* Saída Esperada: Apartamento editado com o novo número.
* Evidência:

![GravacaodeTela2025-05-10as11 20 49-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/3648b0d4-09b8-4aaf-bdf5-00b65aee3a21)

### Teste USR1 - Formulário em branco

* Entrada: Tentar criar um usuário com o formulário estando em branco (sem preenchimento)
* Saída esperada: Exibir erros informando campos de preenchimento obrigatório
* Evidência:

![empty_form](gif/user/empty_form.gif)

### Teste USR2 - Formulário preenchido com valores inválidos

* Entrada: Tentar criar um usuário com o formulário estando com valores inválidos
* Saída esperada: Exibir erros informando quais campos estão inválidos
* Evidência:

![invalid_form](gif/user/invalid_form.gif)

### Teste USR3 - Formulário preenchido corretamente

* Entrada: Tentar criar um usuário com o formulário preenchido corretamente
* Saída esperada: Usuário deve ser criado e exibido na listagem
* Evidência:

![success_create_user](gif/user/success_create_user.gif)

### Teste USR4 - Editar usuário pré-cadastrado

* Entrada: Tentar editar um usuário
* Saída esperada: Usuário deve possuir edição efetivada e atualizada na tela
* Evidência:

![success_edit_user](gif/user/success_edit_user.gif)

### Teste USR5 - Exclusão usuário pré-cadastrado

* Entrada: Tentar excluir um usuário
* Saída esperada: Deve-se exibir mensagem de confirmação de exclusão e após confirmação o usuário deve ser excluído
* Evidência:

![success_delete_user](gif/user/success_delete_user.gif)

### Teste FEE1 - Formulário em branco

* Entrada: Tentar criar uma Taxa com o formulário estando em branco (sem preenchimento)
* Saída esperada: Exibir erros informando campos de preenchimento obrigatório
* Evidência:

![FeeEmpty](gif/fee/FeeEmpty.gif)

### Teste FEE2 - Formulário preenchido corretamente

* Entrada: Tentar criar uma Taxa com o formulário preenchido corretamente
* Saída esperada: Taxa deve ser criada e exibida na listagem
* Evidência:

![FeeCorrect](gif/fee/FeeCorrect.gif)

### Teste FEE3 - Editar Taxa pré-cadastrada

* Entrada: Tentar editar uma Taxa
* Saída esperada: Taxa deve possuir edição efetivada e atualizada na tela
* Evidência:

![FeeEdit](gif/fee/FeeEdit.gif)

### Teste FEE4 - Exclusão Taxa pré-cadastrada

* Entrada: Tentar excluir uma Taxa
* Saída esperada: Deve-se exibir mensagem de confirmação de exclusão e após confirmação a Taxa deve ser excluída
* Evidência:

![FeeDelete](gif/fee/FeeDelete.gif)


### Teste PYM1 - Formulário em branco

* Entrada: Tentar criar um Pagamento com o formulário estando em branco (sem preenchimento)
* Saída esperada: Exibir erros informando campos de preenchimento obrigatório
* Evidência:

![PaymentEmpty](gif/payment/PaymentEmpty.gif)

### Teste PYM2 - Formulário preenchido corretamente

* Entrada: Tentar criar um Pagamento com o formulário preenchido corretamente
* Saída esperada: Pagamento deve ser criada e exibida na listagem
* Evidência:

![PaymentCorrect](gif/payment/PaymentCorrect.gif)

### Teste PYM3 - Editar Pagamento pré-cadastrado

* Entrada: Tentar editar um Pagamento
* Saída esperada: Pagamento deve possuir edição efetivada e atualizada na tela
* Evidência:

![PaymentEdit](gif/payment/PaymentEdit.gif)

### Teste PYM4 - Exclusão de Pagamento pré-cadastrado

* Entrada: Tentar excluir um Pagamento
* Saída esperada: Deve-se exibir mensagem de confirmação de exclusão e após confirmação o Pagamento deve ser excluído
* Evidência:

![PaymentDelete](gif/payment/PaymentDelete.gif)

### Teste NM-C1 – Criar Novo Aviso

* Entrada:  
  - Título: “Avisos - Pagar IPTU 2025”  
  - Descrição: “Pagar ate 11/06/2025.”  
  - Data: “11/05/2025”  
  - Condomínio: “Residencial Flor do Campo”  
* Saída Esperada:  
  - Aviso cadastrado com sucesso e exibido na listagem com os dados informados.  
* Evidência:

![noticeManagementnoticeManagementCreat](gif/noticeManagement/noticeManagementCreate.gif)

---

### Teste NM-E1 – Editar Aviso

* Entrada:  
  - Selecionar um aviso existente e clicar em **Editar**.  
  - Alterar Descrição para “Alteração de Descrição" e Data para “12/05/2025”.  
  - Salvar as alterações.  
* Saída Esperada:  
  - Edição realizada com sucesso; na listagem, o aviso aparece com a nova descrição e data.  
* Evidência:

![noticeManagementnoticeManagementEdit](gif/noticeManagement/noticeManagementEdit.gif)

---

### Teste NM-D1 – Excluir Aviso

* Entrada:  
  - Selecionar um aviso na listagem e clicar em **Deletar**, confirmando a ação.  
* Saída Esperada:  
  - Aviso removido com sucesso e não aparece mais na listagem mesmo após reload.  
* Evidência:

![noticeManagementnoticeManagementDelete](gif/noticeManagement/noticeManagementDelete.gif)

---

### Teste NM-S1 – Visualizar Detalhes do Aviso

* Entrada:  
  - Selecionar um aviso na listagem e clicar em **Detalhes**.  
* Saída Esperada:  
  - Exibição de Título, “Criado em” formatado, Descrição e “Enviado por” com o nome do usuário.  
* Evidência:

![noticeManagementnoticeManagementShow](gif/noticeManagement/noticeManagementShow.gif)

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
